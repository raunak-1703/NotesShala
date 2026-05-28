"use client"

import React, { useState } from 'react'
import Sub from './subject.json'
import Branch from './branch.json'
import axios from 'axios'
import useShowToast from '@/hooks/useShowToast'
import { apiUrl } from '@/app/lib/api';
import { useAuth } from '@/app/lib/useAuth';
import AuthOnly from '@/app/components/AuthOnly';

const Page = () => {
    const fileSizeLimitMb = 500;
    const [subject, setSubject] = useState('')
    const [subjectCode, setSubjectCode] = useState('')
    const [tags, setTags] = useState('')
    const [branch, setBranch] = useState('')
    const [sem, setSem] = useState('1')
    const [file, setFile] = useState('')
    const [description, setDescription] = useState('')
    const fileSizeLimit = fileSizeLimitMb * 1024 * 1024;

    const { user, isLoading } = useAuth();
    const postedBy = user?.email;

    const showToast = useShowToast();
    const [loading, setloading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const fileExtensionFunctionCheck = (pdf, e, showToast) => {
        const fileName = pdf.name
        const fileExtension = fileName.split('.').pop().toLowerCase()
        const allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png'];
        if (!allowedExtensions.includes(fileExtension)) {
            showToast('Error', "File must be .pdf, .jpg, .jpeg, or .png", 'error')
            e.target.value = '';
            setFile('');
            return false;
        }
        return true;
    }

    const handleFile = (e) => {
        const pdf = e.target.files[0];

        if (!pdf) {
            return;
        }

        if (!fileExtensionFunctionCheck(pdf, e, showToast)) {
            return;
        }

        if (pdf.size > fileSizeLimit) {
            showToast('Error', `File size exceeds the limit of ${fileSizeLimitMb} MB.`, 'error')
            e.target.value = '';
            setFile('');
        } else {
            setFile(pdf);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading(true)
        try {
            if (!file || !branch || !sem || !subject) {
                showToast("Error", "All fields must be filled", 'error')
                return;
            }
            if (isLoading || !postedBy) {
                showToast("Error", "Please wait for login session to load", 'error')
                return;
            }

            const wordCount = description.trim().split(/\s+/).filter(Boolean).length;
            if (wordCount > 50) {
                showToast("Error", "Description must be 50 words or less", 'error')
                return;
            }

            const formdata = new FormData();
            formdata.append("postedBy", postedBy)
            formdata.append("branch", branch)
            formdata.append("semester", sem)
            formdata.append("subject", subject)
            formdata.append("subjectCode", subjectCode)
            formdata.append("tags", tags)
            formdata.append("description", description)
            formdata.append("file", file)

            const res = await axios.post(apiUrl('/api/notes/upload'), formdata, {
                headers: { "Content-Type": "multipart/form-data" },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                }
            })

            if (res.data?.error) {
                showToast('Error', res.data.error, 'error')
                return
            }

            showToast('Success', 'Notes uploaded successfully', 'success')

            setBranch('')
            setSubject('')
            setSubjectCode('')
            setTags('')
            setDescription('')
            setSem('1')
            setFile('')
            const fileInput = document.getElementById('file');
            if (fileInput) fileInput.value = '';
        }
        catch (error) {
            showToast('Error', error.response?.data?.message || error.message, 'error')
        }
        finally {
            setloading(false)
            setUploadProgress(0)
        }
    }

    return (
        <AuthOnly>
        <main className="max-w-[1280px] mx-auto w-full px-8 py-24 text-[#191c1e] min-h-[90vh]">
            <div className="flex flex-col-reverse lg:flex-row gap-8 items-start justify-center">
                
                {/* Left Column - Form Container */}
                <form 
                    className="w-full lg:w-3/5 bg-white border border-[#bdc8d1] rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,173,239,0.04)] relative overflow-hidden" 
                    onSubmit={handleSubmit}
                >
                    {/* Decorative element */}
                    <div className="absolute top-0 right-0 w-36 h-36 bg-[#00adef]/5 rounded-bl-full pointer-events-none"></div>

                    <div className="mb-8 relative z-10">
                        <span className="text-sm font-semibold uppercase tracking-wide text-[#00658d]">Upload resource</span>
                        <h1 className="mt-2 font-headline-lg text-headline-lg italic font-bold text-on-surface leading-tight">
                            Share a note with your batch
                        </h1>
                        <p className="mt-2 text-body-md text-[#576065]">
                            Add clear metadata so students can discover the right file quickly.
                        </p>
                    </div>

                    <div className="space-y-5 relative z-10">
                        
                        {/* Branch */}
                        <div className="flex flex-col gap-2">
                            <label className="font-label-md text-label-md text-on-surface" htmlFor="branch">
                                Branch
                            </label>
                            <select
                                className="w-full bg-[#f2f4f6] border border-[#bdc8d1] rounded-lg px-4 py-2.5 focus:border-[#00658d] focus:ring-2 focus:ring-[#83cfff]/40 outline-none transition-all placeholder:text-[#bfc8ce]"
                                id="branch"
                                value={branch}
                                onChange={(e) => setBranch(e.target.value)}
                            >
                                <option value="">Select branch</option>
                                {Branch.map((item) => (
                                    <option key={item.stream} value={item.stream}>
                                        {item.stream}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Semester */}
                        <div className="flex flex-col gap-2">
                            <label className="font-label-md text-label-md text-on-surface" htmlFor="semester">
                                Semester
                            </label>
                            <select 
                                id="semester"
                                className="w-full bg-[#f2f4f6] border border-[#bdc8d1] rounded-lg px-4 py-2.5 focus:border-[#00658d] focus:ring-2 focus:ring-[#83cfff]/40 outline-none transition-all"
                                value={sem}
                                onChange={(e) => setSem(e.target.value)}
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                                    <option key={s} value={String(s)}>{s}</option>
                                ))}
                            </select>
                        </div>

                        {/* Subject Code */}
                        <div className="flex flex-col gap-2">
                            <label className="font-label-md text-label-md text-on-surface" htmlFor="subjectCode">
                                Subject Code
                            </label>
                            <input
                                className="w-full bg-[#f2f4f6] border border-[#bdc8d1] rounded-lg px-4 py-2.5 focus:border-[#00658d] focus:ring-2 focus:ring-[#83cfff]/40 outline-none transition-all placeholder:text-[#bfc8ce]"
                                id="subjectCode"
                                type="text"
                                placeholder="ex: CS101, EE204"
                                value={subjectCode}
                                onChange={(e) => setSubjectCode(e.target.value.toUpperCase())}
                            />
                        </div>

                        {/* Subject */}
                        <div className="flex flex-col gap-2">
                            <label className="font-label-md text-label-md text-on-surface" htmlFor="subject">
                                Subject
                            </label>
                            <input
                                className="w-full bg-[#f2f4f6] border border-[#bdc8d1] rounded-lg px-4 py-2.5 focus:border-[#00658d] focus:ring-2 focus:ring-[#83cfff]/40 outline-none transition-all placeholder:text-[#bfc8ce]"
                                id="subject"
                                type="text"
                                placeholder="ex: Digital Signal Processing"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                            {/* Suggestions Dropdown */}
                            {subject.trim() !== '' && (
                                <div className="bg-white border border-[#bdc8d1] rounded-lg max-h-36 overflow-y-auto shadow-md">
                                    {Sub.filter((item) => {
                                        const searchItem = subject.toLowerCase();
                                        const subName = item.sub.toLowerCase();
                                        return subName.startsWith(searchItem) && subName !== searchItem;
                                    }).map((item, i) => (
                                        <div 
                                            key={i} 
                                            onClick={() => setSubject(item.sub)} 
                                            className="px-4 py-2 hover:bg-[#f2f4f6] cursor-pointer text-sm font-medium border-b border-[#bdc8d1]/30 last:border-b-0"
                                        >
                                            {item.sub}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Tags */}
                        <div className="flex flex-col gap-2">
                            <label className="font-label-md text-label-md text-on-surface" htmlFor="tags">
                                Tags
                            </label>
                            <input
                                className="w-full bg-[#f2f4f6] border border-[#bdc8d1] rounded-lg px-4 py-2.5 focus:border-[#00658d] focus:ring-2 focus:ring-[#83cfff]/40 outline-none transition-all placeholder:text-[#bfc8ce]"
                                id="tags"
                                type="text"
                                placeholder="ex: pyq, handwritten, assignment"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                            />
                            <p className="text-xs text-[#576065] font-semibold">Separate multiple tags with commas.</p>
                        </div>

                        {/* Additional Details */}
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <label className="font-label-md text-label-md text-on-surface" htmlFor="description">
                                    Additional Details (Optional)
                                </label>
                                <span className={`text-xs font-semibold ${description.trim().split(/\s+/).filter(Boolean).length > 50 ? 'text-red-500' : 'text-[#576065]'}`}>
                                    {description.trim().split(/\s+/).filter(Boolean).length} / 50 words
                                </span>
                            </div>
                            <textarea
                                className="w-full bg-[#f2f4f6] border border-[#bdc8d1] rounded-lg px-4 py-2.5 focus:border-[#00658d] focus:ring-2 focus:ring-[#83cfff]/40 outline-none transition-all placeholder:text-[#bfc8ce] h-24 resize-none"
                                id="description"
                                placeholder="ex: Contains lecture slides for Unit 3 and solutions to previous year questions."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        {/* Upload File */}
                        <div className="flex flex-col gap-2">
                            <label className="font-label-md text-label-md text-on-surface" htmlFor="file">
                                Upload File (.pdf, .jpg, .jpeg, .png)
                            </label>
                            <input
                                className="w-full bg-[#f2f4f6] border border-[#bdc8d1] rounded-lg px-4 py-2.5 focus:border-[#00658d] focus:ring-2 focus:ring-[#83cfff]/40 outline-none transition-all file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-[#c6e7ff]/40 file:text-[#004c6c] hover:file:bg-[#c6e7ff]/60 cursor-pointer"
                                id="file"
                                type="file"
                                onChange={handleFile}
                            />
                        </div>

                        {/* Submit */}
                        <div className="pt-4 flex flex-col gap-3">
                            {loading ? (
                                <div className="w-full bg-[#f2f4f6] rounded-xl overflow-hidden shadow-sm flex flex-col relative h-12 justify-center">
                                    <div 
                                        className="bg-[#00658d]/20 h-full absolute top-0 left-0 transition-all duration-300 ease-out" 
                                        style={{ width: `${uploadProgress}%` }}
                                    ></div>
                                    <div className="z-10 text-center w-full font-label-md text-label-md uppercase tracking-wider text-[#00658d] flex items-center justify-center gap-2">
                                        <span className="material-symbols-outlined text-[18px] animate-pulse">cloud_sync</span>
                                        {uploadProgress < 100 ? `Uploading... ${uploadProgress}%` : 'Processing File...'}
                                    </div>
                                </div>
                            ) : (
                                <button 
                                    type="submit"
                                    className="w-full bg-[#00658d] text-white py-3.5 rounded-xl font-label-md text-label-md uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 hover:shadow-md"
                                >
                                    <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
                                    Submit Resource
                                </button>
                            )}
                        </div>

                    </div>
                </form>

                {/* Right Column - Instructions Guidelines */}
                <div className="w-full lg:w-2/5 bg-[#f2f4f6]/60 border border-[#bdc8d1] rounded-3xl p-8 shadow-sm">
                    <h2 className="font-headline-sm text-headline-sm font-bold text-[#191c1e] select-none">
                        Instructions To Upload Notes
                    </h2>
                    
                    <ul className="mt-8 space-y-6">
                        <li className="flex items-start gap-4">
                            <div className="mt-1 bg-[#00adef] text-white p-1 rounded-full flex items-center justify-center shadow-sm select-none">
                                <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                            </div>
                            <span className="text-sm font-medium text-[#191c1e]">
                                Please choose the branch from the dropdown and select the closest subject suggestion while typing.
                            </span>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="mt-1 bg-[#00adef] text-white p-1 rounded-full flex items-center justify-center shadow-sm select-none">
                                <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                            </div>
                            <span className="text-sm font-medium text-[#191c1e]">
                                The maximum allowed file size is <strong>{fileSizeLimitMb} MB</strong>.
                            </span>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="mt-1 bg-[#00adef] text-white p-1 rounded-full flex items-center justify-center shadow-sm select-none">
                                <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                            </div>
                            <span className="text-sm font-medium text-[#191c1e]">
                                Please compress large PDF files before uploading. Processing may take a few minutes.
                            </span>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="mt-1 bg-[#00adef] text-white p-1 rounded-full flex items-center justify-center shadow-sm select-none">
                                <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                            </div>
                            <span className="text-sm font-medium text-[#191c1e]">
                                Give a clear, recognizable filename to the uploaded file.
                            </span>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="mt-1 bg-[#00adef] text-white p-1 rounded-full flex items-center justify-center shadow-sm select-none">
                                <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                            </div>
                            <span className="text-sm font-medium text-[#191c1e]">
                                Double check that you select the correct branch, semester, and subject folder.
                            </span>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="mt-1 bg-[#00adef] text-white p-1 rounded-full flex items-center justify-center shadow-sm select-none">
                                <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                            </div>
                            <span className="text-sm font-medium text-[#191c1e]">
                                For Previous Year Questions, please add the tag <strong>"pyq"</strong>.
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </main>
        </AuthOnly>
    );
}

export default Page;
