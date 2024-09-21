import React from 'react';
import { useRouter } from 'next/navigation';
import { IoArrowBackCircleOutline } from 'react-icons/io5';

function GoBackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      style={{ border: 'none', background: 'none', padding: '10px' }}
    >
      <div style={{ fontSize: '40px' }}>
        <IoArrowBackCircleOutline />
      </div>
    </button>
  );
}

export default GoBackButton;
