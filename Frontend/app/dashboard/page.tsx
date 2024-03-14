import Navbar from '@/components/Navbar/Navbar';
import PostItem from '@/components/PostItem/PostItem';
import Recommended from '@/components/Recommended/Recommended';
import Ranking from '@/components/TopRanking/Ranking';
import Upload from '@/components/Upload/Upload';
// import Carousel from '@/components/Carousel/CarouselImage';
import React from 'react';

function Page() {
  return (
    <>
      <Navbar />
      <div
        style={{
          width: '90%',
          margin: '0 auto',
        }}
      >
        <Recommended />
        <Ranking />
        <Upload />
      </div>
    </>
  );
}

export default Page;
