import { Avatar, Flex, Text } from '@mantine/core';
import React from 'react';

export default function PostName({ ...props }: any) {
  return (
    <>
      <Text h={props.size}>An Amazing Journey</Text>
      <Flex gap={'sm'} mt={'2'}>
        <Avatar
          src="https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg"
          alt="it's me"
          size={'sm'}
        />
        <Text>Ash</Text>
      </Flex>
    </>
  );
}
