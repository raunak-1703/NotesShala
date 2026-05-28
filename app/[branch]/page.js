"use client"

import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';

const branchFullNames = {
  EE: "Electrical Engineering",
  ECE: "Electronics & Communication Engineering",
  ME: "Mechanical Engineering",
  CSE: "Computer Science & IT",
  CE: "Civil Engineering",
  MME: "Metallurgical & Materials Engineering",
  PIE: "Production & Industrial Engineering",
  ECM: "Computational Mechanics"
};

const semesterIcons = {
  1: "auto_stories",
  2: "electric_bolt",
  3: "terminal",
  4: "memory",
  5: "power",
  6: "settings_input_component",
  7: "precision_manufacturing",
  8: "workspace_premium"
};

const Page = () => {
  const params = useParams();
  const branchValue = params.branch || "";
  const branchDisplayName = branchFullNames[branchValue] || `${branchValue} Engineering`;

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <main className="flex-grow max-w-[1280px] mx-auto w-full px-8 py-24 decorative-bg text-[#191c1e]">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 mb-8 text-on-surface-variant font-label-sm text-label-sm select-none">
        <Link className="hover:text-primary transition-colors font-medium" href="/">
          Home
        </Link>
        <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
        <span className="hover:text-primary transition-colors font-medium">Engineering</span>
        <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
        <span className="text-primary font-bold">{branchValue}</span>
      </nav>

      {/* Header Section */}
      <div className="mb-12">
        <h1 className="font-headline-xl text-headline-xl font-extrabold text-on-surface mb-2 select-none">
          {branchDisplayName} Notes
        </h1>
        <p className="font-body-lg text-[#3e4850] max-w-2xl leading-relaxed">
          Access a curated library of high-quality study materials, lecture notes, and exam prep resources specifically for {branchDisplayName} students.
        </p>
      </div>

      {/* Semester Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {semesters.map((sem) => {
          const iconName = semesterIcons[sem] || "auto_stories";
          
          return (
            <div 
              key={sem} 
              className="semester-card group relative overflow-hidden bg-white border border-[#bdc8d1] rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,173,239,0.08)] hover:-translate-y-1"
            >
              <div className="flex flex-col items-center text-center gap-4">
                {/* Icon wrapper */}
                <div className="w-16 h-16 bg-[#c6e7ff]/30 rounded-full flex items-center justify-center text-primary shadow-sm select-none group-hover:scale-105 transition-transform duration-300">
                  <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 0" }}>
                    {iconName}
                  </span>
                </div>
                
                {/* Details */}
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    Semester {sem}
                  </h3>
                  <p className="font-label-sm text-label-sm text-[#576065] mt-1 font-semibold">
                    Resource Archive
                  </p>
                </div>
                
                {/* Action button */}
                <Link href={`/${branchValue}/${sem}`} className="w-full mt-2">
                  <button className="w-full border border-primary text-primary px-4 py-2 rounded-lg font-label-md text-label-md hover:bg-primary hover:text-white transition-all duration-200">
                    View Resources
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Request/Upload Banner Section */}
      <section className="mt-16 bg-[#e0e3e5]/40 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 border border-[#bdc8d1] overflow-hidden relative">
        <div className="flex-1 z-10 space-y-4">
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold italic leading-tight">
            Can't find what you need?
          </h2>
          <p className="font-body-md text-[#3e4850] max-w-xl leading-relaxed">
            Request specific semester study materials or contribute your own to earn reputation and help fellow {branchValue} students.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/uploadnotes">
              <button className="bg-[#00658d] text-white px-6 py-3 rounded-lg font-label-md text-label-md flex items-center gap-2 hover:bg-opacity-95 transition-all shadow-sm active:scale-95">
                <span className="material-symbols-outlined text-[18px]">upload</span>
                Upload Notes
              </button>
            </Link>
            <Link href="/#contacts">
              <button className="bg-transparent border border-primary text-primary px-6 py-3 rounded-lg font-label-md text-label-md hover:bg-primary hover:text-white transition-all active:scale-95">
                Request Materials
              </button>
            </Link>
          </div>
        </div>
        <div className="flex-shrink-0 w-full md:w-[350px] select-none">
          <img 
            alt="Technical study background" 
            className="rounded-2xl shadow-md rotate-2 group-hover:rotate-0 transition-transform duration-500 max-h-[220px] w-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBu-UO4r0HE4qqRRttFW3MmlrF6gymaIm4WTgYLzHGwNU1ORdBGvMxpKcjTGf2E-jb8Ru7gkxPoF1G7LNWp2Is5wmOHo5JboLjy15yXqME3iUfGW8nrDKrw8XT4ePIQ1IC5UvBhZTKmvqCkar8jkrLWFihMFvM80lXi4zsqE-umsCEolwod8SwQAY3FcbkPV5i1fASWklIejO6WxWGnPBrPhIK-BqSaa0oAI_5c_9dg2MxG1nzEErS6GFtVNZ0__WoJumGPaxUAwkQq"
          />
        </div>
      </section>

    </main>
  );
};

export default Page;
