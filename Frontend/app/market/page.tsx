'use client';
import MarketDashboard from '@/components/MarketDashboard/MarketDashboard';
import Navbar from '@/components/Navbar/Navbar';
import { Button } from '@mantine/core';
import Link from 'next/link';
import React from 'react';

function page() {
  return (
    <>
      <Navbar />
      <div style={{ width: '90%', margin: '0 auto', paddingTop: '80px' }}>
        <MarketDashboard />
      </div>
      <div
        style={{
          width: '100%',
          margin: '0 auto',
          textAlign: 'right',
          paddingBottom: '100px',
          paddingTop: '100px',
          paddingRight: '10%',
        }}
      >
        <Link href={'/market/upload'}>
          <Button>Upload</Button>
        </Link>
      </div>
    </>
  );
}

export default page;
