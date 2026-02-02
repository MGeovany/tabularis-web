"use client";

import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/language-context";
import { useAuth } from "@/contexts/auth-context";
import { NavItem } from "./nav-item";

const navItemIds = [
  { id: "CONVERT", key: "nav.convert", href: "/dashboard" },
  { id: "HISTORY", key: "nav.history", href: "/dashboard/history" },
  { id: "ACCOUNT", key: "nav.account", href: "/dashboard/account" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { apiUser } = useAuth();

  const getActive = (item: (typeof navItemIds)[0]) => {
    if (item.href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(item.href);
  };

  const used = apiUser?.conversions_used ?? 0;
  const limit = apiUser?.conversions_limit ?? 0;
  const plan = (apiUser?.plan || "FREE").toUpperCase();
  const isPro = plan === "PRO";
  const planLabel = isPro ? "Pro" : t("sidebar.freeTrial");
  const progressPct = limit > 0 ? Math.min(100, (used / limit) * 100) : 0;

  return (
    <aside className="border-ink bg-paper flex h-full flex-col gap-[var(--space-lg)] border-r-[3px] p-[var(--space-md)]">
      <nav>
        <ul className="flex list-none flex-col gap-0">
          {navItemIds.map((item) => (
            <NavItem key={item.id} active={getActive(item)} href={item.href}>
              {t(item.key)}
            </NavItem>
          ))}
        </ul>
      </nav>

      <div className="border-ink relative mt-auto border-[1.5px] p-[var(--space-sm)] text-[0.75rem]">
        <div className="bg-paper absolute top-[-10px] left-2.5 px-1.5 font-bold">
          {t("sidebar.plan")}
        </div>
        <div className="mb-2 flex justify-between">
          <span>{planLabel}</span>
          <span>{limit > 0 ? `${used}/${limit}` : "∞"}</span>
        </div>
        {limit > 0 ? (
          <div className="border-ink h-2 w-full border-[1.5px] p-px">
            <div
              className="bg-ink h-full [background-image:radial-gradient(var(--ink)_15%,transparent_15%)] [background-size:6px_6px] opacity-100 transition-[width] duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        ) : (
          <div className="border-ink bg-ink/5 border-[1.5px] px-2 py-1 text-[0.7rem] font-bold uppercase">
            Unlimited
          </div>
        )}

        {isPro && (
          <a
            className="border-ink hover:bg-ink hover:text-paper mt-3 inline-flex w-full items-center justify-center border-[1.5px] px-2 py-2 text-[0.75rem] font-bold uppercase transition-colors"
            href="mailto:marlon.castro@thefndrs.com"
          >
            {t("sidebar.askSupport")}
          </a>
        )}
      </div>
    </aside>
  );
}
