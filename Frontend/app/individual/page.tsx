import Description from '@/components/Description/Description';
import Navbar from '@/components/Navbar/Navbar';
import PostItem from '@/components/PostItem/PostItem';
import { Avatar, Button, Flex, Grid, GridCol, Text } from '@mantine/core';
import React from 'react';

export default function Page() {
  return (
    <div>
      {/* <Navbar /> */}
      <div
        style={{
          width: '80%',
          margin: '0 auto',
        }}
      >
        <Grid>
          <GridCol span={8}>
            <PostItem height="800px" />
            <Text size="24px">Beautiful life</Text>
          </GridCol>
          <GridCol span={4}>
            <Flex gap={'sm'} mt={'2'}>
              <Avatar
                src="https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg"
                alt="it's me"
                size={'md'}
              />
              <Text>Ash</Text>
            </Flex>
            <Button w={'70%'} radius={'24px'} mt={'1.75rem'}>
              Follow
            </Button>
          </GridCol>
        </Grid>
      </div>
    </div>
  );
}
