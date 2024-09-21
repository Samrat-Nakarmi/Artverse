'use client';
import axios from '@/api/axios';
import { Button } from '@mantine/core';
import React, { useState } from 'react';
import swal from 'sweetalert';
import { useRouter } from 'next/navigation';

export default function Upload() {
  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState<string>('');
  const [hastag, setHashtag] = useState<string>('');

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      const acceptedTypes = ['image/png', 'image/svg+xml', 'image/jpeg', 'image/gif', 'image/tiff'];
      if (acceptedTypes.includes(selectedFile.type)) {
        setImage(selectedFile);
        console.log(selectedFile);
      } else {
        alert('Unable to upload. Please select a valid image file.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('私は猫が大好き');
    const options = {
      headers: { Authorization: 'Bearer ' + token },
    };
    console.log(image);
    if (image) {
      console.log(image);
      let imageData = new FormData();
      console.log(imageData);

      imageData.append('title', title);
      imageData.append('hashtag', hastag);
      imageData.append('photo', image);
      console.log(imageData);
      try {
        const response = await axios.post('/dashboard/upload', imageData, options);
        console.log(response);
        console.log('Uploaded');
        swal({ icon: 'success', title: 'Uploaded' });
        router.push('/dashboard');
      } catch (error) {}
    } else {
      alert('Please select an image to upload.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Photo</label>
        <input type="file" name="photo" onChange={handleUpload} required />

        <label htmlFor="">Title</label>
        <input type="text" name="title" onChange={(e) => setTitle(e.target.value)} />

        <label htmlFor="">Categories</label>
        <input type="text" name="hashtag" onChange={(e) => setHashtag(e.target.value)} />
        <Button type="submit">Upload</Button>
      </form>
    </div>
  );
}
