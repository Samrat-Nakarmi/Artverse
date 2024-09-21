'use client';
import axios from '@/api/axios';
import { Button } from '@mantine/core';
import React, { useState } from 'react';
import swal from 'sweetalert';

export default function Upload() {
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');

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

      imageData.append('name', name);
      imageData.append('price', price);
      imageData.append('photo', image);
      imageData.append('quantity', quantity);

      console.log(imageData);
      try {
        const response = await axios.post('/market/upload', imageData, options);
        console.log(response);
        console.log('Uploaded');
        swal({ icon: 'success', title: 'Uploaded' });
      } catch (error) {}
    } else {
      alert('Please select an image to upload.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="photo">Photo</label>
        <input type="file" name="photo" onChange={handleUpload} required />

        <label htmlFor="name">Name</label>
        <input type="text" name="name" onChange={(e) => setName(e.target.value)} />

        <label htmlFor="price">Price</label>
        <input type="text" name="price" onChange={(e) => setPrice(e.target.value)} />

        <Button type="submit">Upload</Button>
      </form>
    </div>
  );
}
