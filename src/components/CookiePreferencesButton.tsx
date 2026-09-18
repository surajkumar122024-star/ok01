"use client";

import { Button } from "@/components/ui/button";

const STORAGE_KEY = "opticshift-cookie-consent";

export function CookiePreferencesButton() {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        localStorage.removeItem(STORAGE_KEY);
        window.location.reload();
      }}
    >
      Manage Cookie Preferences
    </Button>
  );
}
