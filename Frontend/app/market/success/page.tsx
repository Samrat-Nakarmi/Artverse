'use client';
import { Button, Title } from '@mantine/core';
import Link from 'next/link';
import React from 'react';

function page() {
  return (
    <div>
      <Title>Your Payment was successful!</Title>
      <Link href={'/market'}>
        <Button>Go home</Button>
      </Link>
    </div>
  );
}

export default page;
