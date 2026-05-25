import useShowToast from '@/hooks/useShowToast';
import React from 'react'
import { MdDelete } from "react-icons/md";
import { apiUrl } from '@/app/lib/api';

const DeleteComponent = ({ id }) => {

  const showToast = useShowToast();

  const handledelete = async (e) => {
    try {
      e.preventDefault();
      if (!window.confirm('Are you sure want to delete this file?')) return;

      const res = await fetch(apiUrl(`/api/notes/delete/${id}`), {
        method: 'DELETE',
      })
      const data = await res.json();
      if (data.error) {
        showToast('Error', data.error, 'error')
        return;
      }
      showToast('Success', 'Delete Successfully, please refresh the page', 'success');
    }
    catch (error) {
      showToast('Error', error.message, 'error');
    }
  }
  return (
    <div className='cursor-pointer p-2'onClick={handledelete}>
      <MdDelete />
    </div>
  )
}

export default DeleteComponent
