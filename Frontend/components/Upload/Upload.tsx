'use client';
import axios from '@/api/axios';
import { Button } from '@mantine/core';
import React, { useState } from 'react';

export default function Upload() {
  const [image, setImage] = useState<File | null>(null);

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
    console.log(image);
    if (image) {
      console.log(image);
      let imageData = new FormData();
      console.log(imageData);

      imageData.append('photo', image);
      console.log(imageData);
      try {
        const response = await axios.post('/dashboard', imageData);
        console.log(response);
        console.log('Uploaded');
      } catch (error) {}
    } else {
      alert('Please select an image to upload.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" name="photo" onChange={handleUpload} required />
        <Button type="submit">Upload</Button>
      </form>
    </div>
  );
}
