"use client";

import Image from "next/image";

interface AvatarProps {
  src: string;
  alt: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  score?: number;
  ring?: boolean;
  className?: string;
}

const SIZES = {
  xs: { px: 24, text: "text-[8px]" },
  sm: { px: 32, text: "text-[9px]" },
  md: { px: 40, text: "text-[10px]" },
  lg: { px: 56, text: "text-xs" },
  xl: { px: 80, text: "text-sm" },
} as const;

export function Avatar({
  src,
  alt,
  size = "md",
  score,
  ring = false,
  className = "",
}: AvatarProps) {
  const { px, text } = SIZES[size];

  return (
    <div className={`relative inline-flex shrink-0 ${className}`}>
      <div
        className={`overflow-hidden rounded-full ${
          ring
            ? "ring-2 ring-accent ring-offset-2 ring-offset-background"
            : ""
        }`}
        style={{ width: px, height: px }}
      >
        <Image
          src={src}
          alt={alt}
          width={px}
          height={px}
          className="h-full w-full object-cover"
          unoptimized
        />
      </div>
      {score !== undefined && (
        <div
          className={`absolute -bottom-1 -right-1 flex items-center justify-center rounded-full border-2 border-background bg-accent ${text} font-bold text-white`}
          style={{
            width: Math.max(px * 0.4, 18),
            height: Math.max(px * 0.4, 18),
          }}
        >
          {score}
        </div>
      )}
    </div>
  );
}
