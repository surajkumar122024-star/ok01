"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";

type ConsentChoice = "granted" | "denied";

const STORAGE_KEY = "opticshift-cookie-consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function updateConsent(choice: ConsentChoice) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(...args: unknown[]) { window.dataLayer!.push(args); };
  window.gtag("consent", "update", {
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
    analytics_storage: choice,
  });
}

/**
 * Cookie consent banner using Google Consent Mode v2.
 *
 * The default (denied) consent state is set separately in the root layout,
 * inline, so it fires before the AdSense/Analytics scripts load — this
 * banner only handles the visible UI and the "update" call once the
 * visitor chooses. Required for Google's EU User Consent Policy for any
 * EEA/UK/Swiss visitors; applied to all visitors here for simplicity.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "granted" || stored === "denied") {
      updateConsent(stored);
    } else {
      setVisible(true);
    }
  }, []);

  const choose = (choice: ConsentChoice) => {
    localStorage.setItem(STORAGE_KEY, choice);
    updateConsent(choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[100] p-4 animate-in fade-in slide-in-from-bottom-4 duration-500"
    >
      <div className="max-w-3xl mx-auto glass border-2 border-primary/20 rounded-2xl shadow-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-10 h-10 shrink-0 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          <Cookie size={20} />
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
          We use cookies for basic site functionality. If advertising or analytics services are enabled,
          they may use non-essential cookies or similar technologies. You can accept or decline non-essential
          cookies at any time — see our{" "}
          <Link href="/privacy" className="text-primary underline underline-offset-2">
            Privacy Policy
          </Link>{" "}
          for details.
        </p>
        <div className="flex gap-2 w-full sm:w-auto shrink-0">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 sm:flex-none"
            onClick={() => choose("denied")}
          >
            Decline
          </Button>
          <Button
            size="sm"
            className="flex-1 sm:flex-none"
            onClick={() => choose("granted")}
          >
            Accept All
          </Button>
        </div>
      </div>
    </div>
  );
}
