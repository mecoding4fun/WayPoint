// app/components/ClerkProfileCard.tsx
"use client";

import { UserProfile } from "@clerk/nextjs";

export default function ClerkProfileCard() {
  return (
    <UserProfile
      routing="hash"
      appearance={{
        variables: {
          colorPrimary: "#1C2536",
          colorBackground: "#FFFFFF",
          colorForeground: "#1C2536",
          colorMutedForeground: "#4A5C7A",
          borderRadius: "0.75rem",
          fontFamily: "var(--font-sans)",
        },
        elements: {
          rootBox: "w-full",
          card: "shadow-none border border-[#E4E0D6] rounded-2xl",
          navbar: "hidden",
          navbarMobileMenuButton: "hidden",
          headerTitle: "font-display",
          profileSectionTitleText: "font-semibold text-[#1C2536]",
        },
      }}
    />
  );
}