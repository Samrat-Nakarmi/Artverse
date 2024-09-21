'use client';

import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';
import classes from './register.module.css';
import { FormEvent, useState } from 'react';
import axios from '@/api/axios';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import UseAuth from '@/api/UseAuth';

type formData = {
  username: string;
  email: string;
  password: string;
};

function Register() {
  // UseAuth();
  const [register, setregister] = useState<formData>({
    username: '',
    email: '',
    password: '',
  });
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setregister((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    let registerData = new FormData();
    registerData.append('username', register.username);
    registerData.append('password', register.password);
    registerData.append('email', register.email);

    try {
      const response = await axios.post('/register', registerData, config);
      router.push('/');
    } catch (error) {
      alert('Could not submit');
      console.log(error);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome to Artverse!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{' '}
        <Link href={'/'}>
          <Anchor size="sm" component="button">
            Sign in
          </Anchor>
        </Link>
      </Text>

      <form action="" onSubmit={handleSubmit}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Username"
            placeholder="you123"
            name="username"
            onChange={handleChange}
            required
          />
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            name="email"
            onChange={handleChange}
            required
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            name="password"
            onChange={handleChange}
            required
            mt="md"
          />
          <Button fullWidth mt="xl" type="submit">
            Sign up
          </Button>
        </Paper>
      </form>
    </Container>
  );
}

export default Register;
