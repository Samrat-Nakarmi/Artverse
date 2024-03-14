'use client';
import { Avatar, Flex, Text } from '@mantine/core';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import PostName from '../PostName/PostName';
import axios from '@/api/axios';

type Art = {
  _id: string;
  photo: string;
};

export default function PostItem({ ...props }: any) {
  const [art, setArt] = useState<Art[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response: any = await axios.get('/dashboard/');
        console.log(response.data);
        setArt(response.data);
      } catch (error) {}
    };
    fetchPosts();
  }, []);

  console.log(art);
  return (
    <>
      {art.map((el) => {
        const image_url = 'http://localhost:8080/public/uploads/' + el.photo;
        return (
          <div>
            <img
              src={image_url}
              style={{
                width: '100%',
                height: props.height,
                objectFit: 'cover',
                borderRadius: '12px',
              }}
              alt=""
            />
            <PostName />
          </div>
        );
      })}
    </>
  );
}
