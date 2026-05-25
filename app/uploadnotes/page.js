"use client"
import React, { useState } from 'react'
import Sub from './subject.json'
import Branch from './branch.json'
import axios from 'axios'
import useShowToast from '@/hooks/useShowToast'
import { Button, Stack } from '@chakra-ui/react'
import { apiUrl } from '@/app/lib/api';
import { useAuth } from '@/app/lib/useAuth';

const Page = () => {
    const fileSizeLimitMb = 500;
    const [subject, setSubject] = useState('')
    const [branch, setBranch] = useState('')
    const [sem, setSem] = useState('1')
    const [file, setFile] = useState('')
    const fileSizeLimit = fileSizeLimitMb * 1024 * 1024;

    const { user, isLoading } = useAuth();
    const postedBy = user?.email;

    const showToast = useShowToast();
    const [loading, setloading] = useState(false);

    const fileExtensionFunctionCheck = (pdf, e, showToast) => {
        const fileName = pdf.name
        // console.log(fileName)
        const fileExtension = fileName.split('.').pop().toLowerCase()
        const allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png'];
        // console.log(allowedExtensions)
        if (!allowedExtensions.includes(fileExtension)) {
            // console.log("no allowed")
            showToast('Error', "file must be .pdf, .jpg, .jpeg, or .png", 'error')
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
                showToast("Error", "All field must be filled", 'error')
                return;
            }
            if (isLoading || !postedBy) {
                showToast("Error", "Please wait for login session to load", 'error')
                return;
            }
            const formdata = new FormData();
            formdata.append("postedBy", postedBy)
            formdata.append("branch", branch)
            formdata.append("semester", sem)
            formdata.append("subject", subject)
            formdata.append("file", file)

            const res = await axios.post(apiUrl('/api/notes/upload'), formdata, {
                headers: { "Content-Type": "multipart/form-data" }
            })

            // console.log(res.data);
            if (res.data?.error) {
                showToast('Error', res.data.error, 'error')
                return
            }

            showToast('Success', 'Upload Successfully', 'success')

            setBranch('')
            // setSem('')
            setSubject('')
            // setFile('')
        }
        catch (error) {
            showToast('Error', error.response?.data?.message || error.message, 'error')
        }
        finally {
            setloading(false)
        }
    }
    // console.log(branch)
    // console.log(sem)
    // console.log(subject)
    // console.log(file)
    return (
        <div className='flex flex-col-reverse lg:min-h-[90vh] justify-center lg:flex-row items-center mt-10 lg:mt-20 lg:gap-10 px-5'>
            <form className='rounded-2xl p-5 mb-10 lg:w-2/5' onSubmit={handleSubmit} style={{ boxShadow: '0 0 8px rgb(223, 223, 223)' }}>
                <div className="">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="branch">
                        Branch
                    </label>
                    <input
                        className="shadow appearance-none border border-slate-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="branch"
                        type="text"
                        placeholder="ex:- EE ECE"
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                    />
                    <div className="px-3">
                        {
                            Branch.filter((item) => {
                                const searchItem = branch.toLowerCase();
                                const stream = item.stream.toLowerCase();

                                return searchItem && stream.startsWith(searchItem) && stream !== searchItem;
                            })
                                .map((item, i) => (
                                    <div key={i} onClick={() => setBranch(item.stream)} className='cursor-pointer'>
                                        {item.stream}
                                    </div>
                                ))
                        }
                    </div>
                </div>
                <div className="">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="branch">
                        Semester
                    </label>
                    <select className="shadow  border border-slate-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={(e) => setSem(e.target.value)}
                    >
                        <option value={'1'}>1</option>
                        <option value={'2'}>2</option>
                        <option value={'3'}>3</option>
                        <option value={'4'}>4</option>
                        <option value={'5'}>5</option>
                        <option value={'6'}>6</option>
                        <option value={'7'}>7</option>
                        <option value={'8'}>8</option>
                    </select>
                </div>
                <div className="">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="branch">
                        Subject
                    </label>
                    <input
                        className="shadow appearance-none border border-slate-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="branch"
                        type="text"
                        placeholder="Subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                    <div className="px-3">
                        {
                            Sub.filter((item) => {
                                const searchItem = subject.toLowerCase();
                                const sub = item.sub.toLowerCase();

                                return searchItem && sub.startsWith(searchItem) && sub !== searchItem;
                            })
                                .map((item, i) => (
                                    <div key={i} onClick={() => setSubject(item.sub)} className='cursor-pointer'>
                                        {item.sub}
                                    </div>
                                ))
                        }
                    </div>
                </div>
                <div className="">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="branch">
                        Upload file
                    </label>
                    <input
                        className="shadow appearance-none border border-slate-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="branch"
                        type="file"
                        placeholder="Subject"
                        onChange={handleFile}
                    />
                </div>

                <Stack spacing={10} pt={2} flex justifyContent={'center'} alignItems={'center'}>
                    <Button
                        type='submit'
                        loadingText="file submitting"
                        size="md"
                        width={'44'}
                        isLoading={loading} style={{ background: 'rgb(34, 170, 225)', color: "white", padding: '3px', borderRadius: '10px' }}>
                        Submit
                    </Button>
                </Stack>
            </form>
            <div className='lg:w-2/5 h-1/2 mt-16 lg:mt-0'>
                <h2 className='text-2xl font-semibold text-center'>Instruction To Upload File</h2>
                <ul className='flex flex-col px-5 text-gray-900 justify-center list-disc gap-y-5 pl-10 my-10 w-full'>
                    <li className=' text-gray-900 '>
                        Please choose the branch and subject which is suggested below while typing.
                    </li>
                    <li className=' text-gray-900 '>
                        The maximum file size is {fileSizeLimitMb} MB.
                    </li>
                    <li className=' text-gray-900 '>
                        Please compress the long size pdf file before uploading.
                    </li>
                    <li className=' text-gray-900 '>
                        For long size pdf file it may take 5 to 10 minutes.
                    </li>
                    <li className=' text-gray-900 '>
                        Please give proper name to the pdf file which will uploaded.
                    </li>
                    <li className=' text-gray-900 '>
                        Please upload the file in proper branch, semester and Subject wise.
                    </li>
                    <li className=' text-gray-900 '>
                        For Previous Year Question please rename the file to pyq.
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Page
