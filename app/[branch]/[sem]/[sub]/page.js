"use client"

import Link from 'next/link';
import useShowToast from '@/hooks/useShowToast';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { apiUrl } from '@/app/lib/api';
import { getNoteFileExtension, isImageNote } from '@/app/lib/noteFile';
import RecommendedNotes from '@/app/components/RecommendedNotes';

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

const formatDate = (dateStr) => {
  if (!dateStr) return 'Recently Uploaded';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return 'Recently Uploaded';
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return 'Recently Uploaded';
  }
};

const Page = () => {
  const params = useParams();
  const branch = params.branch || "";
  const sem = params.sem || "";
  const sub = params.sub || "";
  const branchDisplayName = branchFullNames[branch] || `${branch} Engineering`;
  const subjectName = decodeURIComponent(sub);

  const [notes, setNotes] = useState([]);
  const showToast = useShowToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const cleanBranch = decodeURIComponent(branch);
        const cleanSem = decodeURIComponent(sem);
        const cleanSub = decodeURIComponent(sub);

        const res = await fetch(apiUrl(`/api/notes/${encodeURIComponent(cleanBranch)}/${encodeURIComponent(cleanSem)}/${encodeURIComponent(cleanSub)}`))
        const data = await res.json();

        if (!res.ok || data.error) {
          setNotes([]);
          return;
        }

        setNotes(Array.isArray(data) ? data : []);
      }
      catch (error) {
        showToast('Error', error.response?.data?.message || error.message, 'error')
      }
      finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [branch, sem, showToast, sub]);


  const getFileMaterialIcon = (note) => {
    const ext = getNoteFileExtension(note);
    if (ext === 'pdf') return 'picture_as_pdf';
    if (isImageNote(note)) return 'image';
    return 'description';
  };



  return (
    <main className="flex-grow max-w-[1280px] mx-auto w-full px-8 py-24 decorative-bg text-[#191c1e] min-h-[85vh]">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 mb-8 text-on-surface-variant font-label-sm text-label-sm select-none">
        <Link className="hover:text-primary transition-colors font-medium" href="/">
          Home
        </Link>
        <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
        <Link className="hover:text-primary transition-colors font-medium" href={`/${branch}`}>
          {branch}
        </Link>
        <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
        <Link className="hover:text-primary transition-colors font-medium" href={`/${branch}/${sem}`}>
          Sem {sem}
        </Link>
        <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
        <span className="text-primary font-bold truncate max-w-[160px] md:max-w-none">{subjectName}</span>
      </nav>

      {/* Header section */}
      <div className="mb-12">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#00658d]">
          {branchDisplayName} / Sem {sem}
        </p>
        <h1 className="mt-2 font-headline-xl text-headline-xl font-extrabold text-on-surface select-none">
          {subjectName}
        </h1>
        <p className="mt-2 text-body-md text-[#576065]">
          Browse uploaded documents and study resources for this subject.
        </p>
      </div>


      {/* Loading Skeletons */}
      {loading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className="border border-[#bdc8d1] rounded-2xl p-6 bg-white flex flex-col gap-4 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl shimmer"></div>
                <div className="w-20 h-4 rounded shimmer"></div>
              </div>
              <div className="w-3/4 h-6 rounded shimmer mt-2"></div>
              <div className="w-1/2 h-4 rounded shimmer"></div>
              <div className="w-full h-10 rounded shimmer mt-4"></div>
            </div>
          ))}
        </div>
      )}

      {/* Notes Grid */}
      {!loading && (
        <>
          {notes.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {notes.map((note) => {
                const iconName = getFileMaterialIcon(note);
                const subtitleDetails = [
                  note.subjectCode || note.subject, 
                  note.branch, 
                  note.semester && `Sem ${note.semester}`
                ].filter(Boolean).join(' • ');

                return (
                  <div 
                    className="bg-white border border-[#bdc8d1] rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,173,239,0.08)] hover:-translate-y-1" 
                    key={note._id}
                  >
                    <div>
                      <div className="flex justify-between items-start gap-4 mb-4">
                        {/* File Icon */}
                        <div className="w-12 h-12 bg-[#c6e7ff]/30 text-primary rounded-xl flex items-center justify-center select-none shadow-sm">
                          <span className="material-symbols-outlined text-[28px]">
                            {iconName}
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-[#576065] select-none bg-[#f2f4f6] px-2 py-1 rounded">
                          {formatDate(note.createdAt)}
                        </span>
                      </div>

                      <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface break-words leading-snug">
                        {note.fileName}
                      </h3>
                      

                      {/* Description / Additional details */}
                      {note.description && (
                        <p className="mt-3 text-sm text-[#3e4850] line-clamp-3 bg-[#f2f4f6]/40 p-2.5 rounded-lg border border-[#bdc8d1]/30">
                          {note.description}
                        </p>
                      )}

                      {/* Uploader Details */}
                      <div className="flex items-center gap-2 mt-4">
                        <img 
                          src={note.uploaderAvatar || '/user.svg'} 
                          alt={note.uploaderName || 'User'} 
                          className="w-6 h-6 rounded-full object-cover border border-[#bdc8d1]/50" 
                          onError={(e) => { e.target.src = '/user.svg'; }}
                        />
                        <p className="text-xs text-[#576065] font-semibold truncate">
                          Uploaded by: <span className="text-on-surface font-bold">{note.uploaderName || note.postedBy?.split('@')[0]}</span>
                        </p>
                      </div>

                      {/* Tag list */}
                      {Array.isArray(note.tags) && note.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {note.tags.map((tag) => (
                            <span 
                              key={tag} 
                              className="rounded bg-[#c6e7ff]/60 px-2.5 py-0.5 text-xs font-semibold text-[#004c6c] select-none"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Open Action Button */}
                    <div className="mt-6 pt-4 border-t border-[#bdc8d1]/30">
                      <a 
                        href={note.file} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="w-full inline-flex justify-center items-center gap-2 bg-[#00658d] text-white px-4 py-2.5 rounded-lg font-label-md text-label-md hover:bg-opacity-95 shadow-sm active:scale-95 transition-all"
                      >
                        <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                        Open / View Resource
                      </a>
                    </div>

                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="my-10 w-full rounded-2xl border border-dashed border-[#bdc8d1] bg-white p-12 text-center max-w-xl mx-auto shadow-sm">
              <div className="w-16 h-16 bg-[#bdc8d1]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#bdc8d1]">
                <span className="material-symbols-outlined text-4xl">folder_off</span>
              </div>
              <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                No resources uploaded yet
              </h2>
              <p className="mt-2 text-body-md text-[#576065]">
                Be the first to upload lecture notes or exams for this subject!
              </p>
              <div className="flex gap-4 justify-center mt-6">
                <Link href="/uploadnotes" className="inline-flex rounded-lg bg-[#00658d] px-6 py-3 font-semibold text-white hover:bg-opacity-95 shadow-sm active:scale-95 transition-all">
                  Upload Note
                </Link>
                <Link href="/#contacts" className="inline-flex rounded-lg border border-primary text-primary px-6 py-3 font-semibold hover:bg-primary hover:text-white shadow-sm active:scale-95 transition-all">
                  Request Note
                </Link>
              </div>
            </div>
          )}
        </>
      )}

      {/* Recommended Section */}
      <RecommendedNotes />
    </main>
  );
};

export default Page;
