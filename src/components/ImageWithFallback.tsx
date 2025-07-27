"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { LABELS } from "@/constants/labels";

interface Props extends Omit<ImageProps, "src" | "alt"> {
  src: string;
  alt: string;
  className?: string;
}

export default function ImageWithFallback({
  src,
  alt,
  className,
  sizes,
  ...rest
}: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className={`relative bg-gray-200 overflow-hidden ${className}`}>
      {!error ? (
        <>
          <Image
            src={src}
            alt={alt}
            fill
            className={`object-cover transition-opacity duration-500 ${
              loading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setLoading(false)}
            onError={() => {
              setError(true);
              setLoading(false);
            }}
            sizes={sizes}
            {...rest}
          />
          {/* Skeleton Loader */}
          {loading && (
            <div className="absolute inset-0 animate-pulse bg-gray-300" />
          )}
        </>
      ) : (
        // Fallback UI
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-gray-500 text-sm">
            {LABELS.IMAGE_UNAVAILABLE}
          </span>
        </div>
      )}
    </div>
  );
}
