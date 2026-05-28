"use client"

import React, { useEffect, useState } from 'react'
import useShowToast from '@/hooks/useShowToast';
import { apiUrl } from '@/app/lib/api';
import { useAuth } from '@/app/lib/useAuth';
import Link from 'next/link';

const EditProfilePage = () => {
    const [profile, setProfile] = useState({});
    const [avatarInput, setAvatarInput] = useState('');
    const [savingProfile, setSavingProfile] = useState(false);
    const [uploadingAvatar, setUploadingAvatar] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const { user, isLoading } = useAuth();
    const showToast = useShowToast();

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

    const saveProfile = async (newAvatarUrl = null) => {
        if (!user?.email) {
            return;
        }

        setSavingProfile(true);
        try {
            const res = await fetch(apiUrl('/api/profiles'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: user.email,
                    name: profile.name || '',
                    avatar: newAvatarUrl || avatarInput || '/user.svg',
                    branch: profile.branch || '',
                    collegeYear: profile.collegeYear || '',
                    semester: profile.semester || '',
                }),
            });
            const data = await res.json();
            setProfile(data);
            setAvatarInput(data?.avatar || '/user.svg');
            showToast('Success', 'Profile updated successfully', 'success');
        } catch (error) {
            showToast('Error', error.message, 'error');
        } finally {
            setSavingProfile(false);
        }
    };

    const handleFileSelect = (event) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        if (!file.type.startsWith('image/')) {
            showToast('Error', 'Please select an image file', 'error');
            return;
        }

        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const confirmUpload = async () => {
        if (!selectedFile) return;

        const formdata = new FormData();
        formdata.append('file', selectedFile);
        if (avatarInput && avatarInput !== '/user.svg') {
            formdata.append('oldAvatarUrl', avatarInput);
        }

        setUploadingAvatar(true);
        try {
            const res = await fetch(apiUrl('/api/profiles/upload-avatar'), {
                method: 'POST',
                body: formdata
            });
            const data = await res.json();
            if (!res.ok || data.message) {
                throw new Error(data.message || 'Image upload failed');
            }
            setAvatarInput(data.avatarUrl);
            setSelectedFile(null);
            setPreviewUrl(null);
            
            // Automatically save profile after upload to fix DB sync issue
            await saveProfile(data.avatarUrl);
            
        } catch (error) {
            showToast('Error', error.message || 'Image upload failed', 'error');
        } finally {
            setUploadingAvatar(false);
        }
    };

    const cancelUpload = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        const fileInput = document.getElementById('avatar-upload');
        if (fileInput) fileInput.value = '';
    };

    return (
        <main className="max-w-[800px] mx-auto w-full px-8 py-24 text-[#191c1e] min-h-[90vh]">
            <div className="flex items-center gap-4 mb-8 border-b border-[#bdc8d1]/30 pb-4">
                <Link href="/usernotes" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#f2f4f6] transition-colors">
                    <span className="material-symbols-outlined text-[#576065]">arrow_back</span>
                </Link>
                <div>
                    <h1 className="font-headline-lg text-headline-lg font-bold italic text-on-surface leading-tight">
                        Edit Profile
                    </h1>
                    <p className="text-xs text-[#576065] mt-1 font-semibold">
                        Update your personal details and avatar.
                    </p>
                </div>
            </div>

            <div className="bg-white border border-[#bdc8d1] rounded-2xl p-6 md:p-8 shadow-[0px_4px_12px_rgba(0,0,0,0.02)] space-y-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Avatar Upload Section */}
                    <div className="flex flex-col items-center text-center w-full md:w-1/3">
                        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary-container p-1 shadow-sm mb-4 select-none group">
                            <img 
                                src={previewUrl || avatarInput || "/user.svg"} 
                                alt="User avatar" 
                                className="w-full h-full object-cover rounded-full bg-[#f2f4f6]" 
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full m-1 pointer-events-none">
                                <span className="material-symbols-outlined text-white text-3xl">photo_camera</span>
                            </div>
                        </div>

                        {!selectedFile ? (
                            <>
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handleFileSelect} 
                                    id="avatar-upload"
                                    className="hidden"
                                />
                                <label 
                                    htmlFor="avatar-upload"
                                    className="text-xs font-semibold uppercase tracking-wider text-[#00658d] bg-[#c6e7ff]/40 hover:bg-[#c6e7ff]/60 px-4 py-2 rounded-lg cursor-pointer transition-colors"
                                >
                                    Change Photo
                                </label>
                            </>
                        ) : (
                            <div className="flex gap-2">
                                <button 
                                    onClick={confirmUpload}
                                    disabled={uploadingAvatar}
                                    className="text-xs font-semibold uppercase tracking-wider text-white bg-[#00658d] hover:bg-[#004d6e] px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    {uploadingAvatar ? 'Uploading...' : 'Confirm'}
                                </button>
                                <button 
                                    onClick={cancelUpload}
                                    disabled={uploadingAvatar}
                                    className="text-xs font-semibold uppercase tracking-wider text-[#ba1a1a] bg-[#ffdad6]/50 hover:bg-[#ffdad6] px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Edit Form */}
                    <div className="space-y-5 flex-1 text-left">
                        <div className="flex flex-col gap-1.5">
                            <label className="font-label-sm text-label-sm text-[#576065] font-bold">Full Name</label>
                            <input 
                                value={profile.name || ''} 
                                onChange={(e) => setProfile({ ...profile, name: e.target.value })} 
                                placeholder="Enter your full name" 
                                className="w-full bg-[#f2f4f6] border border-[#bdc8d1] rounded-lg px-3 py-2.5 text-sm outline-none transition focus:border-[#00658d] placeholder:text-[#bfc8ce]"
                            />
                        </div>

                        {/* Metadata inputs */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold text-[#576065] uppercase">Branch</label>
                                <input 
                                    value={profile.branch || ''} 
                                    onChange={(e) => setProfile({ ...profile, branch: e.target.value.toUpperCase() })} 
                                    placeholder="ex: CSE" 
                                    className="w-full bg-[#f2f4f6] border border-[#bdc8d1] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#00658d]"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold text-[#576065] uppercase">Year</label>
                                <input 
                                    value={profile.collegeYear || ''} 
                                    onChange={(e) => setProfile({ ...profile, collegeYear: e.target.value })} 
                                    placeholder="ex: 3rd" 
                                    className="w-full bg-[#f2f4f6] border border-[#bdc8d1] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#00658d]"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold text-[#576065] uppercase">Semester</label>
                                <input 
                                    value={profile.semester || ''} 
                                    onChange={(e) => setProfile({ ...profile, semester: e.target.value })} 
                                    placeholder="ex: 6" 
                                    className="w-full bg-[#f2f4f6] border border-[#bdc8d1] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#00658d]"
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-[#bdc8d1]/30">
                            <button 
                                onClick={() => saveProfile()} 
                                disabled={savingProfile || uploadingAvatar} 
                                className="w-full bg-[#00658d] text-white py-3 rounded-xl font-label-md text-label-md uppercase tracking-wider hover:opacity-95 shadow-sm active:scale-95 disabled:opacity-60 transition-all flex items-center justify-center gap-1.5"
                            >
                                <span className="material-symbols-outlined text-[18px]">save</span>
                                {savingProfile ? 'Saving...' : 'Save Profile'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default EditProfilePage;
