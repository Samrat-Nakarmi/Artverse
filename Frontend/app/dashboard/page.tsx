// import Navbar from '@/components/Navbar/Navbar';
'use client';
import UseAuth from '@/api/UseAuth';
import Navbar from '@/components/Navbar/Navbar';
import PostItem from '@/components/PostItem/PostItem';
import Recommended from '@/components/Recommended/Recommended';
import Ranking from '@/components/TopRanking/Ranking';
import Upload from '@/components/Upload/Upload';
import { Button } from '@mantine/core';
import Link from 'next/link';

// import Carousel from '@/components/Carousel/CarouselImage';
import React from 'react';

function Page() {
  UseAuth();
  return (
    <>
      <Navbar />
      <div
        style={{
          width: '90%',
          margin: '0 auto',
          paddingTop: '100px',
        }}
      >
        <Recommended />
        {/* <Ranking /> */}
        <div
          style={{
            width: '100%',
            margin: '0 auto',
            textAlign: 'right',
            paddingBottom: '100px',
          }}
        >
          <Link href={'/dashboard/upload'}>
            <Button>Upload</Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Page;
