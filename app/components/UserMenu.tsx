"use client";

import { UserButton } from "@clerk/nextjs";

export default function UserMenu() {
  return (
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Link
          label="View profile"
          href="/profile"
          labelIcon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          }
        />
        <UserButton.Link
            label="Settings"
            href="/settings"
            labelIcon={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                <path d="M19 12a7 7 0 00-.1-1.2l2-1.6-2-3.4-2.4 1a7 7 0 00-2.1-1.2L14 2h-4l-.4 2.6a7 7 0 00-2.1 1.2l-2.4-1-2 3.4 2 1.6A7 7 0 005 12a7 7 0 00.1 1.2l-2 1.6 2 3.4 2.4-1c.6.5 1.3 1 2.1 1.2L10 22h4l.4-2.6c.8-.3 1.5-.7 2.1-1.2l2.4 1 2-3.4-2-1.6c.1-.4.1-.8.1-1.2z" />
                </svg>
            }
            />
      </UserButton.MenuItems>
    </UserButton>
  );
}