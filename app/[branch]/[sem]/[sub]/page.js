"use client"
import useShowToast from '@/hooks/useShowToast';
import { ThreeDots } from "react-loader-spinner"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { apiUrl } from '@/app/lib/api';
import { getNoteIcon } from '@/app/lib/noteFile';

const Page = () => {
    const param = useParams();
    const branch = param.branch;
    const sem = param.sem;
    const sub = param.sub;

    const [notes, setNotes] = useState([]);
    const showToast = useShowToast();

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const cleanBranch = decodeURIComponent(branch);
                const cleanSem = decodeURIComponent(sem);
                const cleanSub = decodeURIComponent(sub);

                const res = await fetch(apiUrl(`/api/notes/${encodeURIComponent(cleanBranch)}/${encodeURIComponent(cleanSem)}/${encodeURIComponent(cleanSub)}`))

                const data = await res.json();

                // console.log(data)
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
                setLoading(false)
            }
        }
        fetchData();
    }, [branch, sem, showToast, sub])
    return (
        <div className='flex flex-wrap justify-center items-center gap-x-7 gap-y-12 mt-24 mb-8 min-h-[80vh]'>
            {
                Array.isArray(notes) && notes.map((item) => (
                    <div className='flex flex-col items-center justify-center w-40 text-center px-3' key={item._id}>
                        <a href={item.file} target='_blank' rel='noreferrer'>
                            <img src={getNoteIcon(item)} alt="" className='w-24' />
                        </a>
                        <p>{item.fileName}</p>
                    </div>
                ))
            }
            {
                !loading && notes.length === 0 && (
                    <div className='text-xl my-10'>
                        Notes are not uploaded yet
                    </div>
                )
            }
            {
                loading && (
                    <ThreeDots
                        visible={true}
                        height="80"
                        width="80"
                        color="#29b5f6"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                )
            }
        </div>
    )
}

export default Page
