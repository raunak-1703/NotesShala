"use client";

import { useEffect, useState } from "react";
import { apiUrl } from "@/app/lib/api";
import { getNoteIcon } from "@/app/lib/noteFile";

const RecommendedNotes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const res = await fetch(apiUrl("/api/notes/recommended"));
        const data = await res.json();
        setNotes(Array.isArray(data) ? data : []);
      } catch {
        setNotes([]);
      }
    };

    fetchRecommended();
  }, []);

  if (!notes.length) {
    return null;
  }

  return (
    <section className="mt-12 border-t border-[#c0c7cf] pt-8">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[#18638b]">Recommended</p>
          <h2 className="font-serif text-2xl font-semibold text-[#1b1c1c]">Recently uploaded notes</h2>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <a
            key={note._id}
            href={note.file}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-[#c0c7cf] bg-white p-4 transition hover:border-[#18638b] hover:shadow-md"
          >
            <div className="flex items-start gap-3">
              <img src={getNoteIcon(note)} alt="" className="h-10 w-10 object-contain" />
              <div className="min-w-0">
                <p className="truncate font-semibold text-[#1b1c1c]">{note.fileName}</p>
                <p className="mt-1 text-sm text-[#40484e]">
                  {[note.subjectCode || note.subject, note.branch, note.semester && `Sem ${note.semester}`].filter(Boolean).join(" • ")}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default RecommendedNotes;
