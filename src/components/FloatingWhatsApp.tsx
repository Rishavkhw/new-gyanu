import { buildWhatsAppUrl } from '../utils/whatsapp';

export function FloatingWhatsApp() {
  return (
    <div className="group fixed bottom-5 right-5 z-40 flex items-center gap-3 sm:bottom-6 sm:right-6">
      <span className="pointer-events-none hidden translate-x-1 rounded-md border border-[#E6DFD4] bg-white px-3 py-1.5 text-xs font-medium text-[#141210] opacity-0 shadow-md transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 sm:inline-block">
        Chat with us
      </span>
      <a
        href={buildWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Gyanu Photo Studio on WhatsApp"
        title="Chat with us"
        className="relative flex h-13 w-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-[#20BD5A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141210]"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/35 [animation-duration:2.8s]"
        />
        <svg
          viewBox="0 0 32 32"
          fill="currentColor"
          className="relative h-6 w-6"
          aria-hidden="true"
        >
          <path d="M16.04 2.67c-7.37 0-13.36 5.99-13.36 13.36 0 2.36.62 4.66 1.79 6.69L2.58 29.3l6.75-1.77a13.32 13.32 0 0 0 6.71 1.81h.01c7.37 0 13.36-5.99 13.36-13.36S23.41 2.67 16.04 2.67Zm7.77 18.98c-.33.93-1.91 1.78-2.66 1.89-.68.1-1.55.14-2.5-.16-.58-.19-1.32-.43-2.28-.85-4-1.73-6.61-5.76-6.81-6.03-.2-.27-1.63-2.17-1.63-4.14 0-1.97 1.03-2.94 1.4-3.34.37-.4.8-.5 1.07-.5.27 0 .53 0 .77.01.25.01.58-.09.9.69.33.8 1.13 2.77 1.23 2.97.1.2.17.44.03.7-.13.27-.2.43-.4.67-.2.23-.42.52-.6.7-.2.2-.41.42-.18.82.23.4 1.04 1.72 2.24 2.79 1.54 1.37 2.84 1.8 3.24 2 .4.2.64.17.87-.1.23-.27 1-1.17 1.27-1.57.27-.4.53-.33.9-.2.37.13 2.34 1.1 2.74 1.3.4.2.67.3.77.47.1.17.1.97-.23 1.9Z" />
        </svg>
      </a>
    </div>
  );
}
