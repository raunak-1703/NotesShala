"use client";

import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="section_footer" className="bg-surface-container-low border-t border-outline-variant w-full px-4 md:px-8 py-12 flex flex-col gap-6 items-center text-center relative overflow-hidden">
      {/* Background decoration icon */}
      <div className="absolute inset-0 pointer-events-none opacity-5 flex items-end justify-center select-none">
        <span className="material-symbols-outlined text-[240px]" style={{ fontVariationSettings: "'wght' 100" }}>
          menu_book
        </span>
      </div>

      <div className="font-headline-sm text-headline-sm font-bold text-primary mb-1 select-none">
        NoteShaala
      </div>

      <nav className="flex flex-wrap justify-center gap-6 mb-4 z-10">
        <Link className="font-label-sm text-label-sm text-on-secondary-container hover:underline hover:text-primary transition-colors duration-200" href="/#about">
          About Us
        </Link>
        <Link className="font-label-sm text-label-sm text-on-secondary-container hover:underline hover:text-primary transition-colors duration-200" href="/#notes">
          Notes
        </Link>
        <Link className="font-label-sm text-label-sm text-on-secondary-container hover:underline hover:text-primary transition-colors duration-200" href="/uploadnotes">
          Upload
        </Link>
        <Link className="font-label-sm text-label-sm text-on-secondary-container hover:underline hover:text-primary transition-colors duration-200" href="/members">
          Members
        </Link>
        <Link className="font-label-sm text-label-sm text-on-secondary-container hover:underline hover:text-primary transition-colors duration-200" href="/#contacts">
          Contact Us
        </Link>
      </nav>

      <div className="w-full border-t border-outline-variant pt-6 flex flex-col md:flex-row justify-between items-center gap-4 max-w-[1280px] z-10">
        <p className="font-label-sm text-label-sm text-on-surface-variant">
          Copyright © {currentYear}, NoteShaala. All Rights Reserved.
        </p>
        <div className="flex gap-4">
          <Link className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-all" href="#">
            <span className="material-symbols-outlined text-[20px]">share</span>
          </Link>
          <Link className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-all" href="#">
            <span className="material-symbols-outlined text-[20px]">public</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
