import { Grid, GridCol, Text } from '@mantine/core';
import React from 'react';
import PostItem from '../PostItem/PostItem';

export default function Ranking() {
  return (
    <div>
      <Text mt={24}>Daily Ranking</Text>
      <Text style={{ fontWeight: 'bold', fontSize: '20px' }}>Nov 9th Ranking</Text>
      <Grid>
        <GridCol span={4}>
          <PostItem height="400px" />
        </GridCol>
        <GridCol span={4}>
          <PostItem height="400px" />
        </GridCol>
        <GridCol span={4}>
          <PostItem height="400px" />
        </GridCol>
      </Grid>
    </div>
  );
}
