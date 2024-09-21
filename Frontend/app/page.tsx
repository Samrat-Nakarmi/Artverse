'use client';
import UseAuth from '@/api/UseAuth';
import Login from '@/components/Login/Login';

export default function AuthenticationTitle() {
  UseAuth();
  return <Login />;
}
