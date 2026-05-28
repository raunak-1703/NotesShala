"use client"

import React, { useEffect, useState } from 'react'
import { ThreeDots } from "react-loader-spinner"
import useShowToast from '@/hooks/useShowToast';
import DeleteComponent from '../components/DeleteComponent';
import { apiUrl } from '@/app/lib/api';
import { getNoteFileExtension, isImageNote } from '@/app/lib/noteFile';
import { useAuth } from '@/app/lib/useAuth';
import Link from 'next/link';
import AuthOnly from '@/app/components/AuthOnly';

const Page = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false)
    const [profile, setProfile] = useState({});
    const [avatarInput, setAvatarInput] = useState('');
    const [savingProfile, setSavingProfile] = useState(false);
    const [uploadingAvatar, setUploadingAvatar] = useState(false);

    const { user, isLoading } = useAuth();
    const showToast = useShowToast();

    useEffect(() => {
        const fetchData = async () => {
            if (isLoading || !user?.email) {
                return;
            }

            const postedBy = user.email;
            setLoading(true);
            try {
                const res = await fetch(apiUrl(`/api/notes/name/${encodeURIComponent(postedBy)}`))
                const data = await res.json();

                if (!res.ok || data.error) {
                    setNotes([]);
                    return;
                }

                setNotes(Array.isArray(data) ? data : []);
            }
            catch (error) {
                showToast('Error', error.response?.data?.message || 'Something went wrong', 'error')
            }
            finally {
                setLoading(false)
            }
        }

        fetchData();
    }, [isLoading, user, showToast]);

    useEffect(() => {
        const fetchProfile = async () => {
            if (isLoading || !user?.email) {
                return;
            }

            try {
                const res = await fetch(apiUrl(`/api/profiles/${encodeURIComponent(user.email)}`));
                const data = await res.json();
                setProfile(data || {});
                setAvatarInput(data?.avatar || "/user.svg");
            } catch {
                setAvatarInput("/user.svg");
            }
        };

        fetchProfile();
    }, [isLoading, user]);

    const getFileMaterialIcon = (note) => {
        const ext = getNoteFileExtension(note);
        if (ext === 'pdf') return 'picture_as_pdf';
        if (isImageNote(note)) return 'image';
        return 'description';
    };

    return (
        <AuthOnly>
            <main className="max-w-[1280px] mx-auto w-full px-8 py-24 text-[#191c1e] min-h-[90vh]">
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    
                    {/* Left Sidebar - Profile & Settings */}
                    <div className="w-full lg:w-1/3 bg-white border border-[#bdc8d1] rounded-2xl p-6 shadow-[0px_4px_12px_rgba(0,0,0,0.02)] space-y-6">
                        <div className="flex flex-col items-center text-center pb-4">
                            {/* Avatar */}
                            <div className="relative w-24 h-24 rounded-full overflow-hidden border-[3px] border-[#00658d] p-1 shadow-sm mb-4 select-none">
                                <img 
                                    src={profile?.avatar || user?.picture || "/user.svg"} 
                                    alt="User avatar" 
                                    className="w-full h-full object-cover rounded-full bg-[#f2f4f6]" 
                                />
                            </div>
                            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface mt-1 truncate max-w-full">
                                {profile?.name || user?.given_name || user?.email?.split('@')[0]}
                            </h2>
                            {profile?.registrationNumber && (
                                <p className="text-sm font-semibold text-[#00658d] mt-2 mb-1 bg-[#c6e7ff]/30 px-3 py-1 rounded-full inline-block uppercase tracking-wider">
                                    {profile.registrationNumber}
                                </p>
                            )}
                            <p className="text-sm text-[#576065] mt-1 break-all max-w-full select-all">
                                {profile?.branch ? `${profile.branch}${profile.collegeYear ? `, ${profile.collegeYear}` : ''}` : user?.email}
                            </p>
                        </div>

                        <div className="pt-4 border-t border-[#bdc8d1]/30">
                            <Link 
                                href="/usernotes/edit" 
                                className="w-full bg-[#f2f4f6] text-[#00658d] border border-[#00658d]/30 py-2.5 rounded-xl font-label-md text-label-md uppercase tracking-wider hover:bg-[#c6e7ff]/30 shadow-sm active:scale-95 transition-all flex items-center justify-center gap-1.5"
                            >
                                <span className="material-symbols-outlined text-[18px]">edit</span>
                                Edit Profile
                            </Link>
                        </div>
                    </div>

                    {/* Right Workspace - User Notes list */}
                    <div className="w-full lg:w-2/3 flex flex-col gap-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-[#bdc8d1]/30 pb-4 gap-4">
                            <div>
                                <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface leading-tight">
                                    My Uploaded Notes
                                </h1>
                                <p className="text-sm text-[#576065] mt-1">
                                    Manage your shared academic materials.
                                </p>
                            </div>
                            <Link 
                                href="/uploadnotes"
                                className="text-sm font-bold text-white bg-[#00658d] hover:bg-[#004c6c] px-4 py-2 rounded shadow-sm flex items-center gap-2 transition-colors"
                            >
                                <span className="material-symbols-outlined text-[18px]">upload</span>
                                Upload New
                            </Link>
                        </div>

                        {/* Skeletons loader */}
                        {loading && notes.length === 0 && (
                            <div className="grid gap-6 md:grid-cols-2">
                                {[1, 2].map((s) => (
                                    <div key={s} className="border border-[#bdc8d1] rounded-2xl p-6 bg-white flex flex-col gap-4 shadow-sm">
                                        <div className="flex items-start justify-between">
                                            <div className="w-10 h-10 rounded-xl shimmer"></div>
                                            <div className="w-8 h-8 rounded-full shimmer"></div>
                                        </div>
                                        <div className="w-3/4 h-6 rounded shimmer mt-2"></div>
                                        <div className="w-1/2 h-4 rounded shimmer"></div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Notes grid list */}
                        {!loading && notes.length > 0 && (
                            <div className="grid gap-6 md:grid-cols-2">
                                {notes.map((item) => {
                                    const iconName = getFileMaterialIcon(item);
                                    const subtitleDetails = [
                                        item.subjectCode || item.subject, 
                                        item.branch, 
                                        item.semester && `Sem ${item.semester}`
                                    ].filter(Boolean).join(' • ');

                                    return (
                                        <div 
                                            className="bg-white border border-[#bdc8d1] rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,173,239,0.06)] hover:-translate-y-0.5" 
                                            key={item._id}
                                        >
                                            <div className="flex justify-between items-start gap-4">
                                                <a href={item.file} target="_blank" rel="noreferrer" className="flex items-start gap-3.5 min-w-0">
                                                    {/* File Icon */}
                                                    <div className="w-11 h-11 bg-[#c6e7ff]/30 text-primary rounded-xl flex flex-shrink-0 items-center justify-center select-none shadow-sm">
                                                        <span className="material-symbols-outlined text-[24px]">
                                                            {iconName}
                                                        </span>
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface truncate group-hover:text-primary transition-colors leading-tight">
                                                            {item.fileName}
                                                        </h3>
                                                        <p className="mt-1.5 text-xs text-[#576065] font-semibold truncate leading-none">
                                                            {subtitleDetails}
                                                        </p>
                                                    </div>
                                                </a>
                                                
                                                {/* Delete Action button */}
                                                <div className="text-xl text-[#ba1a1a] hover:scale-105 active:scale-95 transition-transform flex-shrink-0 bg-[#ffdad6]/60 rounded-xl p-1 shadow-sm border border-[#ffdad6]">
                                                    <DeleteComponent 
                                                        id={item._id} 
                                                        onDelete={(deletedId) => setNotes(notes.filter(n => n._id !== deletedId))} 
                                                    />
                                                </div>
                                            </div>

                                            {/* Tag pills */}
                                            {Array.isArray(item.tags) && item.tags.length > 0 && (
                                                <div className="mt-4 flex flex-wrap gap-1.5">
                                                    {item.tags.map((tag) => (
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
                                    );
                                })}
                            </div>
                        )}

                        {/* Empty State */}
                        {!loading && notes.length === 0 && (
                            <div className="my-6 rounded-2xl border border-dashed border-[#bdc8d1] bg-white p-12 text-center max-w-xl mx-auto shadow-sm">
                                <div className="w-16 h-16 bg-[#bdc8d1]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#bdc8d1]">
                                    <span className="material-symbols-outlined text-4xl">folder_off</span>
                                </div>
                                <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                                    You have not uploaded notes yet
                                </h2>
                                <p className="mt-2 text-body-md text-[#576065]">
                                    Share lecture notes, syllabus materials, or pyqs with your batch!
                                </p>
                                <Link href="/uploadnotes" className="mt-6 inline-flex rounded-lg bg-[#00658d] px-6 py-3 font-semibold text-white hover:bg-opacity-95 shadow-sm active:scale-95 transition-all">
                                    Upload Your First Note
                                </Link>
                            </div>
                        )}
                    </div>

                </div>
            </main>
        </AuthOnly>
    );
};

export default Page;
