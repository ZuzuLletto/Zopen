'use client';

import { useState } from 'react';
import type { CSSProperties } from 'react';
import Image from 'next/image';

interface SkinImageProps {
  src: string;
  alt: string;
  fallbackText: string;
  className?: string;
  imageClassName?: string;
  style?: CSSProperties;
}

export default function SkinImage({
  src,
  alt,
  fallbackText,
  className = '',
  imageClassName = '',
  style,
}: SkinImageProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {!hasError && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className={`relative z-10 object-contain ${imageClassName}`}
          style={style}
          onError={() => setHasError(true)}
          draggable={false}
        />
      )}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-gray-600">
          {fallbackText}
        </div>
      )}
    </div>
  );
}
