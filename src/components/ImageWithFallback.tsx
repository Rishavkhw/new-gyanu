import { useState } from 'react';
import { Camera } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

export function ImageWithFallback({
  src,
  alt,
  className = '',
  loading = 'lazy',
}: ImageWithFallbackProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  if (status === 'error') {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-[#EFE9E0] p-6 text-center text-[#665E54] ${className}`}
      >
        <Camera className="mb-2 h-7 w-7 text-[#A8823A]" aria-hidden="true" />
        <span className="max-w-[200px] text-xs font-medium leading-relaxed text-[#665E54]">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#EFE9E0]">
      {status === 'loading' && (
        <div
          aria-hidden="true"
          className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#EFE9E0] via-[#F6F2EC] to-[#E8E0D4]"
        />
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        referrerPolicy="no-referrer"
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
        className={`h-full w-full object-cover transition-opacity duration-300 ${
          status === 'loaded' ? 'opacity-100' : 'opacity-0'
        } ${className}`}
      />
    </div>
  );
}
