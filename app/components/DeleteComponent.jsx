import useShowToast from '@/hooks/useShowToast';
import React, { useState } from 'react'
import { MdDelete } from "react-icons/md";
import { apiUrl } from '@/app/lib/api';

const DeleteComponent = ({ id, onDelete }) => {

  const showToast = useShowToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const handledelete = async (e) => {
    e.preventDefault();
    if (isDeleting) return;
    if (!window.confirm('Are you sure want to delete this file?')) return;

    setIsDeleting(true);
    try {
      const res = await fetch(apiUrl(`/api/notes/delete/${id}`), {
        method: 'DELETE',
      })
      const data = await res.json();
      if (data.error) {
        showToast('Error', data.error, 'error')
        setIsDeleting(false);
        return;
      }
      showToast('Success', 'Note deleted successfully', 'success');
      if (onDelete) {
        onDelete(id);
      }
    }
    catch (error) {
      showToast('Error', error.message, 'error');
      setIsDeleting(false);
    }
  }

  return (
    <div 
        className={`p-2 transition-all flex items-center justify-center ${isDeleting ? 'cursor-wait opacity-60' : 'cursor-pointer'}`}
        onClick={handledelete}
    >
      {isDeleting ? (
        <span className="material-symbols-outlined animate-spin text-[16px]">progress_activity</span>
      ) : (
        <MdDelete />
      )}
    </div>
  )
}

export default DeleteComponent
