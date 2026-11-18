import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-4 pt-24 pb-16 text-center sm:px-6">
      <p className="text-xs font-semibold text-gold">404 · Page Not Found</p>
      <h1 className="mt-3 font-serif text-4xl font-semibold text-obsidian sm:text-5xl">
        This frame is out of view.
      </h1>
      <p className="mt-3 text-base text-taupe">
        The page you requested does not exist or may have been moved. Let’s take you back to the studio.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex h-11 items-center gap-2 rounded-lg bg-obsidian px-6 text-sm font-semibold text-white hover:bg-[#2A2622]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Return Home</span>
        </Link>
        <Link
          to="/shop"
          className="inline-flex h-11 items-center rounded-lg border border-[#E6DFD4] bg-white px-6 text-sm font-semibold text-obsidian hover:bg-sand"
        >
          Visit Shop
        </Link>
      </div>
    </div>
  );
}
