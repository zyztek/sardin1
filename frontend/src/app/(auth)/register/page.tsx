'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { api } from '@/lib/api';

// Simple UI components
const Button = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }) => <button {...props}>{children}</button>;
const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} />;
const Label = ({ children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement> & { children: React.ReactNode }) => <label {...props}>{children}</label>;

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const register = useAuthStore((state) => state.register);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await api.post('/auth/register', { username, password, email });
      const { access_token } = response.data;
      register(access_token);
      router.push('/dashboard');
    } catch (err: any) {
      const errorMsg = err.response?.data?.msg || 'Registration failed.';
      setError(errorMsg);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '2rem', background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>SARDIN-AI Register</h2>
        {error && (
          <div style={{ color: 'red', background: '#fee2e2', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem' }}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
              required
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
          <Button type="submit" style={{ padding: '0.75rem', background: '#3b82f6', color: 'white', borderRadius: '4px', cursor: 'pointer' }}>
            Register
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
