"use client";

import { useState, useRef } from "react";
import { useLanguage } from "@/contexts/language-context";
import { Button } from "./button";

export function UploadZone() {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("File selected:", file.name);
    }
    e.target.value = "";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      console.log("File dropped:", file.name);
    }
  };

  const active = isHovered || isDragging;

  return (
    <section
      className={`border-ink bg-paper relative flex min-h-[300px] flex-col items-center justify-center overflow-hidden border-[3px] [background-image:radial-gradient(var(--ink)_15%,transparent_15%)] [background-size:6px_6px] [background-position:0_0] transition-all duration-300 ${
        active
          ? "-translate-x-0.5 -translate-y-0.5 opacity-100 shadow-[4px_4px_0_var(--ink)]"
          : "translate-x-0 translate-y-0 opacity-95 shadow-none"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={handleFileChange}
      />

      <span className="font-dela absolute top-[10px] left-[15px] text-2xl leading-none font-bold">
        PDF
      </span>
      <span className="font-dela absolute top-[10px] right-[15px] text-2xl leading-none font-bold">
        XLS
      </span>

      <div className="z-[2] mb-2 mb-8 max-w-[400px] text-center font-mono">
        <span className="font-dela mb-[var(--space-sm)] block text-6xl">⬇</span>
        <h1 className="font-dela mb-[var(--space-xs)] text-2xl uppercase">{t("upload.title")}</h1>
        <p className="mb-[var(--space-md)] text-xl leading-[1.5]">
          {t("upload.subtitle1")}
          <br />
          {t("upload.subtitle2")}
        </p>
        <Button onClick={handleFileSelect}>{t("upload.selectFile")}</Button>
      </div>

      <div className="border-ink absolute right-0 bottom-0 h-5 w-full border-t-[3px] [background:repeating-linear-gradient(45deg,var(--ink),var(--ink)_2px,var(--paper)_2px,var(--paper)_6px)]" />
    </section>
  );
}
