"use client";

import React, { useState, useEffect } from 'react';
import { apiUrl } from '@/app/lib/api';
import Link from 'next/link';

export default function BranchLayout({ children }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        setSearching(false);
        return;
      }

      setSearching(true);
      try {
        const res = await fetch(apiUrl(`/api/notes/search?q=${encodeURIComponent(searchQuery.trim())}`));
        const data = await res.json();
        if (res.ok) {
          setSearchResults(data);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error('Error searching notes', error);
        setSearchResults([]);
      } finally {
        setSearching(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const getFileMaterialIcon = (note) => {
    const ext = note.file?.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') return 'picture_as_pdf';
    if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'].includes(ext)) return 'image';
    return 'description';
  };

  return (
    <div className="w-full min-h-screen py-16 px-4 md:px-8 max-w-[1280px] mx-auto mt-16 md:mt-24 academic-pattern">
      <div className="mb-12">
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-on-surface font-bold mb-3 tracking-tight text-center">
          Search Academic Materials
        </h1>
        
        {/* Global Search Bar */}
        <div className="max-w-3xl mx-auto mt-8 relative z-20 group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-[#576065] group-focus-within:text-[#00658d] transition-colors">
              search
            </span>
          </div>
          <input
            type="text"
            placeholder="Search notes globally by name, subject, semester, tags, uploaded by..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-4 bg-white border border-[#bdc8d1] rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#c6e7ff] focus:border-[#00658d] transition-all font-body-lg text-on-surface placeholder:text-[#576065]/70"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-4 flex items-center justify-center text-[#576065] hover:text-[#191c1e] transition-colors focus:outline-none"
            >
              <span className="material-symbols-outlined text-[20px] bg-[#f2f4f6] rounded-full p-1 hover:bg-[#bdc8d1]/30">close</span>
            </button>
          )}
        </div>
        
        {searchQuery.trim() && (
          <div className="mt-4 text-center">
            <p className="text-sm font-semibold text-[#00658d] bg-[#c6e7ff]/30 inline-block px-4 py-1.5 rounded-full border border-[#c6e7ff]/60">
              {searching ? 'Searching resources...' : `Found ${searchResults.length} ${searchResults.length === 1 ? 'result' : 'results'} for "${searchQuery}"`}
            </p>
          </div>
        )}
      </div>

      {/* Conditional Rendering: Search Results vs Children */}
      {searchQuery.trim() ? (
        <div className="w-full">
          {searching ? (
             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((s) => (
                <div key={s} className="border border-outline-variant rounded-2xl p-6 bg-surface-container-lowest flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl shimmer"></div>
                    <div className="w-8 h-8 rounded-full shimmer"></div>
                  </div>
                  <div className="w-3/4 h-6 rounded shimmer mt-2"></div>
                  <div className="w-1/2 h-4 rounded shimmer"></div>
                </div>
              ))}
            </div>
          ) : searchResults.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {searchResults.map((item) => {
                const iconName = getFileMaterialIcon(item);
                const subtitleDetails = [item.subjectCode || item.subject, item.branch, item.semester && `Sem ${item.semester}`].filter(Boolean).join(' • ');

                return (
                  <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,173,239,0.06)] hover:-translate-y-0.5" key={item._id}>
                    <div className="flex justify-between items-start gap-4">
                      <a href={item.file} target="_blank" rel="noreferrer" className="flex items-start gap-3.5 min-w-0">
                        <div className="w-11 h-11 bg-primary-container/30 text-primary rounded-xl flex flex-shrink-0 items-center justify-center select-none shadow-sm border border-primary-container/50">
                          <span className="material-symbols-outlined text-[24px]">
                            {iconName}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface truncate group-hover:text-primary transition-colors leading-tight">
                            {item.fileName}
                          </h3>
                          <p className="mt-1.5 text-xs text-on-surface-variant font-semibold truncate leading-none">
                            {subtitleDetails}
                          </p>
                        </div>
                      </a>
                    </div>
                    {Array.isArray(item.tags) && item.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <span key={tag} className="rounded bg-secondary-container/40 px-2.5 py-0.5 text-xs font-semibold text-on-secondary-container select-none border border-secondary-container/30">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="my-12 rounded-2xl border border-dashed border-outline-variant bg-surface-container-lowest p-12 text-center max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-surface-variant rounded-full flex items-center justify-center mx-auto mb-4 text-on-surface-variant">
                <span className="material-symbols-outlined text-4xl">search_off</span>
              </div>
              <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                No matching notes found
              </h2>
              <p className="mt-2 text-body-md text-on-surface-variant">
                We couldn't find any resources matching your search. Try adjusting your query.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  );
}
