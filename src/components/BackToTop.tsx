import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 480);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      title="Back to top"
      className="fixed bottom-20 right-5 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-[#E6DFD4] bg-white/95 text-obsidian shadow-md backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-gold hover:text-gold sm:bottom-22 sm:right-7"
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}
