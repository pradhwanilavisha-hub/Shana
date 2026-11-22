import { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
  loading?: 'eager' | 'lazy';
}

export function ResilientImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackLabel,
  loading = 'eager',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#F8F5F0] via-[#E8DCCB]/70 to-[#E8DCCB] text-[#292522] p-6 text-center"
        role="img"
        aria-label={alt}
      >
        <Sparkles className="w-6 h-6 text-[#B89A65] mb-3" strokeWidth={1.5} />
        <span className="font-serif text-base tracking-wide text-[#292522]">
          {fallbackLabel || "Shana's Boutique"}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
