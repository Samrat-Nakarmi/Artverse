// 'use client'

import { Avatar, Flex, Grid, GridCol, SimpleGrid, Text } from '@mantine/core';
import PostItem from '../PostItem/PostItem';

export default function Recommended() {
  return (
    <SimpleGrid cols={4}>
      <PostItem height="300px" />
    </SimpleGrid>
  );
}
