import { Grid, GridCol, SimpleGrid, Text } from '@mantine/core';
import React from 'react';
import PostItem from '../PostItem/PostItem';

export default function Ranking() {
  return (
    <div>
      <Text mt={24}>Daily Ranking</Text>
      <Text style={{ fontWeight: 'bold', fontSize: '20px' }}>Nov 9th Ranking</Text>
      <SimpleGrid cols={3}>
        <PostItem />
      </SimpleGrid>
    </div>
  );
}
