"use client"
import useShowToast from '@/hooks/useShowToast'
import Link from 'next/link'
import { ThreeDots } from "react-loader-spinner"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { apiUrl } from '@/app/lib/api';

const Page = () => {
  const sem = useParams();
  const branch = sem.branch;
  const semester = sem.sem;
  // console.log(branch)
  // console.log(semester)

  const showToast = useShowToast();

  const [notes, setNotes] = useState([]);

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(apiUrl(`/api/notes/${encodeURIComponent(branch)}/${encodeURIComponent(semester)}`))

        const data = await res.json();

        // console.log(data)
        if (!res.ok || data.error || !Array.isArray(data)) {
          showToast('Error', data.error, 'error')
          setNotes([]);
          return;
        }

        const uniqueArray = Array.from(new Set(data.map((item) => item.subject).filter(Boolean)));
        setNotes(uniqueArray);

      }
      catch (error) {
        showToast('Error', error.message, 'error')
      }
      finally{
        setLoading(false);
      }
    }

    fetchData();
  }, [branch, semester, showToast])

  return (
    <div className="flex flex-wrap justify-center items-center lg:mt-20 mt-24 mb-10 gap-10 min-h-[80vh]">
      {
        notes && notes.length > 0 && notes?.map((item,i) => (
          <div key={i} className="flex flex-col justify-center items-center">
            <Link href={`/${branch}/${semester}/${item}`}><img src="/fileicon.png" alt="" className="lg:w-40 w-32" /></Link>
            <p>{item}</p>
          </div>
        ))
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
      {
        !loading && notes.length == 0 && (
          <div className='text-xl my-10'>
            Notes are not uploaded yet
          </div>
        )
      }
      {/* <div className="flex flex-col justify-center items-center">
        <Link href={`/${branch}/${semester}/Control System`}><img src="/fileicon.png" alt="" className="lg:w-40 w-32" /></Link>
        <p>Control System</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <Link href={`/${branch}/${semester}/Electrical machine`}><img src="/fileicon.png" alt="" className="lg:w-40 w-32" /></Link>
        <p>Electrical Machine</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <Link href={`/${branch}/${semester}/Power System`}><img src="/fileicon.png" alt="" className="lg:w-40 w-32" /></Link>
        <p>Power System</p>
      </div> */}
    </div>
  )
}

export default Page
