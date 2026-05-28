"use client"

import useShowToast from '@/hooks/useShowToast'
import Link from 'next/link'
import { ThreeDots } from "react-loader-spinner"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { apiUrl } from '@/app/lib/api';
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

const Page = () => {
  const params = useParams();
  const branch = params.branch || "";
  const semester = params.sem || "";
  const branchDisplayName = branchFullNames[branch] || `${branch} Engineering`;

  const showToast = useShowToast();

  const [subjects, setSubjects] = useState([]); // List of { name, count, code }
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(apiUrl(`/api/notes/${encodeURIComponent(branch)}/${encodeURIComponent(semester)}`))
        const data = await res.json();

        if (!res.ok || data.error || !Array.isArray(data)) {
          setSubjects([]);
          return;
        }

        // Group by subject and count files
        const grouped = data.reduce((acc, item) => {
          const subName = item.subject || item.subjectCode;
          if (!subName) return acc;
          const subKey = subName.trim();
          
          if (!acc[subKey]) {
            acc[subKey] = {
              name: subKey,
              code: item.subjectCode || '',
              count: 0
            };
          }
          acc[subKey].count += 1;
          return acc;
        }, {});

        setSubjects(Object.values(grouped));
      }
      catch (error) {
        showToast('Error', error.message, 'error')
      }
      finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [branch, semester, showToast]);


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
        <span className="text-primary font-bold">Sem {semester}</span>
      </nav>

      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[#00658d]">
            {branchDisplayName} / Semester {semester}
          </p>
          <h1 className="mt-2 font-headline-xl text-headline-xl font-extrabold text-on-surface select-none">
            Semester-wise Notes
          </h1>
          <p className="mt-2 text-body-md text-[#576065]">
            Browse subject folders. Materials are grouped by subject and code automatically.
          </p>
        </div>

      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {!loading && subjects.map((sub, idx) => (
          <Link 
            key={idx}
            href={`/${branch}/${semester}/${encodeURIComponent(sub.name)}`}
            className="group bg-white border border-[#bdc8d1] rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,173,239,0.08)] hover:-translate-y-1"
          >
            <div className="flex items-start gap-4">
              {/* Folder Icon */}
              <div className="w-12 h-12 bg-[#c6e7ff]/30 text-primary rounded-xl flex items-center justify-center select-none group-hover:scale-105 transition-transform duration-300">
                <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  folder
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface group-hover:text-primary transition-colors leading-tight break-words">
                  {sub.name}
                </h3>
                {sub.code && (
                  <span className="inline-block mt-1.5 rounded bg-[#c6e7ff]/60 px-2 py-0.5 text-xs font-semibold text-[#004c6c] select-none">
                    {sub.code}
                  </span>
                )}
                <p className="mt-3 text-xs font-semibold text-[#576065]">
                  {sub.count} {sub.count === 1 ? 'file' : 'files'} available
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#00adef"
            radius="9"
            ariaLabel="three-dots-loading"
          />
        </div>
      )}

      {/* Empty State */}
      {!loading && subjects.length === 0 && (
        <div className="my-10 w-full rounded-2xl border border-dashed border-[#bdc8d1] bg-white p-12 text-center max-w-xl mx-auto shadow-sm">
          <div className="w-16 h-16 bg-[#bdc8d1]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#bdc8d1]">
            <span className="material-symbols-outlined text-4xl">folder_off</span>
          </div>
          <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
            No subjects uploaded yet
          </h2>
          <p className="mt-2 text-body-md text-[#576065]">
            Start by uploading the first resource for this semester.
          </p>
          <Link href="/uploadnotes" className="mt-6 inline-flex rounded-lg bg-[#00658d] px-6 py-3 font-semibold text-white hover:bg-opacity-95 shadow-sm active:scale-95 transition-all">
            Upload Note
          </Link>
        </div>
      )}


      {/* Recommended Section */}
      <RecommendedNotes />
    </main>
  );
};

export default Page;
