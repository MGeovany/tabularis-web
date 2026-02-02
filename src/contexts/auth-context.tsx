"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { User as SupabaseUser, Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { fetchMe, type UserMe } from "@/lib/api";

const DEBUG_PLAN = (process.env.NEXT_PUBLIC_DEBUG_PLAN || "").toUpperCase();

function applyDebugPlan(user: UserMe): UserMe {
  if (DEBUG_PLAN !== "FREE" && DEBUG_PLAN !== "PRO") return user;
  const plan = DEBUG_PLAN;
  const conversions_limit = plan === "PRO" ? 0 : 10;
  const conversions_used = plan === "PRO" ? 0 : user.conversions_used;
  return {
    ...user,
    plan,
    conversions_limit,
    conversions_used,
  };
}

type AuthState = {
  user: SupabaseUser | null;
  session: Session | null;
  apiUser: UserMe | null;
  loading: boolean;
  error: string | null;
};

type AuthContextValue = AuthState & {
  signInWithMicrosoft: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshApiUser: () => Promise<void>;
  accessToken: string | null;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    apiUser: null,
    loading: true,
    error: null,
  });

  const [supabase] = useState(() => createClient());

  const refreshApiUser = useCallback(async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session?.access_token) {
      setState((s) => ({ ...s, apiUser: null }));
      return;
    }
    try {
      const apiUser = applyDebugPlan(await fetchMe(session.access_token));
      setState((s) => ({ ...s, apiUser }));
    } catch {
      setState((s) => ({ ...s, apiUser: null }));
    }
  }, [supabase]);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setState((s) => ({
        ...s,
        user: session?.user ?? null,
        session: session ?? null,
        loading: false,
        error: null,
      }));
      if (session?.access_token) {
        try {
          const apiUser = applyDebugPlan(await fetchMe(session.access_token));
          setState((s) => ({ ...s, apiUser }));
        } catch {
          setState((s) => ({ ...s, apiUser: null }));
        }
      } else {
        setState((s) => ({ ...s, apiUser: null }));
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setState((s) => ({
        ...s,
        user: session?.user ?? null,
        session: session ?? null,
        loading: false,
      }));
      if (session?.access_token) {
        fetchMe(session.access_token)
          .then((apiUser) => setState((s) => ({ ...s, apiUser: applyDebugPlan(apiUser) })))
          .catch(() => setState((s) => ({ ...s, apiUser: null })));
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const signInWithMicrosoft = useCallback(async () => {
    setState((s) => ({ ...s, error: null }));
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      (typeof window !== "undefined" ? window.location.origin : "");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "azure",
      options: {
        redirectTo: `${baseUrl}/dashboard`,
        scopes: "email openid profile",
      },
    });
    if (error) {
      setState((s) => ({ ...s, error: error.message }));
      throw new Error(error.message);
    }
  }, [supabase]);

  const signOut = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    const { error } = await supabase.auth.signOut();
    if (error) {
      setState((s) => ({ ...s, loading: false, error: error.message }));
      throw new Error(error.message);
    }

    // Ensure local state clears even if auth event is delayed.
    setState((s) => ({
      ...s,
      user: null,
      session: null,
      apiUser: null,
      loading: false,
    }));
  }, [supabase]);

  const accessToken = state.session?.access_token ?? null;

  useEffect(() => {
    if (typeof window !== "undefined" && accessToken) {
      console.log("[Tabularis] JWT (access_token):", accessToken);
    }
  }, [accessToken]);

  const value: AuthContextValue = {
    ...state,
    signInWithMicrosoft,
    signOut,
    refreshApiUser,
    accessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
