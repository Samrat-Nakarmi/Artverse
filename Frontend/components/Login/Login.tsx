// Login.jsx
'use client';
import React, { FormEvent, useState } from 'react';
import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import classes from './login.module.css';
import axios from '@/api/axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type formData = {
  email: string;
  password: string;
};

export default function Login() {
  const [loginData, setLoginData] = useState<formData>({
    email: '',
    password: '',
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/', loginData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      const accessToken = response?.data?.token;
      localStorage.setItem('私は猫が大好き', accessToken);
      router.push('/dashboard');
      console.log('Success');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          Welcome back!
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do not have an account yet?{' '}
          <Link href={'/register'}>
            <Anchor size="sm" component="button" underline="never">
              Create account
            </Anchor>
          </Link>
        </Text>

        <form action="" onSubmit={handleSubmit}>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput
              label="Email"
              placeholder="you@mantine.dev"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              required
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              required
              mt="md"
            />
            <Group justify="space-between" mt="lg">
              <Checkbox label="Remember me" />
              <Anchor component="button" size="sm">
                Forgot password?
              </Anchor>
            </Group>
            <Button fullWidth mt="xl" type="submit">
              Sign in
            </Button>
          </Paper>
        </form>
      </Container>
    </div>
  );
}
