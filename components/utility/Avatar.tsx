"use client";

import useAuth from "@/context/AuthProvider";
import Image from "next/image";

export default function ({ w = 4, h = 4 }) {
  const { currentUser } = useAuth();

  return currentUser ? (
    typeof currentUser.avatar === "string" ? (
      <Image
        alt="avatar"
        height={Math.floor(h * 16)}
        width={Math.floor(w * 16)}
        className="rounded-full"
        style={{ width: `${w}rem`, height: `${h}rem` }}
        src={currentUser.avatar}
      />
    ) : (
      <div
        className="rounded-full flex"
        style={{
          backgroundColor: currentUser.avatar.bg,
          width: `${w}rem`,
          height: `${h}rem`,
        }}
      >
        <span
          className="m-auto text-3xl"
          style={{ color: currentUser.avatar.fg }}
        >
          {currentUser.avatar.char.toUpperCase()}
        </span>
      </div>
    )
  ) : null;
}
