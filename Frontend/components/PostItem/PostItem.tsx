'use client';
import { Avatar, Flex, SimpleGrid, Text } from '@mantine/core';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from '@/api/axios';
import { FaHeart } from 'react-icons/fa6';
import { FaRegHeart } from 'react-icons/fa6';

type Art = {
  _id: string;
  photo: string;
  title: string;
  hashtags: string;
  likes: string[] | null;
  user: {
    username: string;
  };
};

export default function PostItem({ ...props }: any) {
  const [art, setArt] = useState<Art[]>([]);
  const userId = localStorage.getItem('user');
  const token = localStorage.getItem('私は猫が大好き');
  const fetchPosts = async () => {
    try {
      const response: any = await axios.get('/dashboard/', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      console.log(response.data.user);
      // console.log(response.data.map((el: any) => el._id));
      setArt(response.data.allPhotos);
      localStorage.setItem('user', response.data.user._id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (id: any) => {
    try {
      const response = await axios.post(
        '/dashboard/like',
        { id },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      window.location.reload();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  console.log(art);
  return (
    <>
      {art.map((el) => {
        const image_url = 'http://localhost:8080/public/uploads/' + el.photo;
        return (
          <div style={{ textDecoration: 'none', color: '#dee2e6' }}>
            <Link
              href={`/dashboard/arts/${el._id}`}
              style={{ textDecoration: 'none', color: '#dee2e6' }}
            >
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
            </Link>

            <div style={{ width: '90%', margin: '0 auto' }}>
              <SimpleGrid cols={2}>
                <Link
                  href={`/dashboard/${el._id}`}
                  style={{ textDecoration: 'none', color: '#dee2e6' }}
                >
                  <Text>{el.title}</Text>
                </Link>
                <div style={{ textAlign: 'right' }}>
                  <Flex align={'center'} direction={'row'} justify={'flex-end'} gap={'sm'}>
                    <button
                      onClick={() => handleLike(el._id)}
                      style={{ background: 'none', border: 'none' }}
                    >
                      {userId && el.likes?.includes(userId) ? (
                        <div style={{ color: 'red' }}>
                          <FaHeart />
                        </div>
                      ) : (
                        <div>
                          <FaRegHeart />
                        </div>
                      )}
                    </button>
                    <Text>{el.likes?.length} likes</Text>
                  </Flex>
                </div>
              </SimpleGrid>
              <div>
                <Flex gap={'sm'} mt={'2'}>
                  <Avatar
                    src="https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg"
                    alt="it's me"
                    size={'sm'}
                  />
                  <Text>{el.user.username}</Text>
                </Flex>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
