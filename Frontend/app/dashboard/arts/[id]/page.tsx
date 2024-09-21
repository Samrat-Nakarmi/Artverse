'use client';
import Description from '@/components/Description/Description';
import Navbar from '@/components/Navbar/Navbar';
import PostItem from '@/components/PostItem/PostItem';
import { Avatar, Button, Flex, Grid, GridCol, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import axios from '@/api/axios';
import GoBackButton from '@/components/GoBackButton/GoBackButton';

type Art = {
  _id: string;
  photo: string;
  title: string;
  hashtags: string;
  user: {
    username: string;
  };
};

export default function Page({ params }: any) {
  const { id } = params;
  const [art, setArt] = useState<Art>();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response: any = await axios.get(`/dashboard/${id}`);
        console.log(response.data);
        setArt(response.data);
      } catch (error) {}
    };
    fetchPosts();
  }, []);

  console.log(art);
  return (
    <div>
      <Navbar />
      <div
        style={{
          width: '80%',
          margin: '0 auto',
          paddingTop: '20px',
        }}
      >
        <GoBackButton />
        <Grid>
          <GridCol span={8}>
            <div>
              <img
                src={'http://localhost:8080/public/uploads/' + art?.photo}
                style={{
                  width: '100%',
                  height: '700',
                  objectFit: 'cover',
                  borderRadius: '12px',
                }}
                alt=""
              />
            </div>
          </GridCol>
          <GridCol span={4}>
            <Flex gap={'sm'} mt={'2'}>
              <Avatar
                src="https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg"
                alt="it's me"
                size={'md'}
              />
              <Text>{art?.user.username}</Text>
            </Flex>
            <Text>{art?.hashtags}</Text>
            <Button w={'70%'} radius={'24px'} mt={'1.75rem'}>
              Follow
            </Button>
          </GridCol>
        </Grid>
      </div>
    </div>
  );
}
