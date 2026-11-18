import React from 'react';
import { BackToTop } from '../components/BackToTop';
import { CartDrawer } from '../components/CartDrawer';
import { FloatingWhatsApp } from '../components/FloatingWhatsApp';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAF8F5] text-[#141210]">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <BackToTop />
      <FloatingWhatsApp />
    </div>
  );
}
