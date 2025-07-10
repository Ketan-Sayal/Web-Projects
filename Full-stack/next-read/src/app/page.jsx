'use client';

import React, { useActionState, useEffect, useState } from 'react';
import Link from 'next/link';
import { Book, Eye,PenOff, EyeOff, Mail, Lock } from 'lucide-react';
import { login } from '@/actions/auth';

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
      const [isMounted, setIsMounted] = useState(false);
      const [state, action, isPending] = useActionState(login, {
        email:"",
        password:""
    })

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Book className="h-12 w-12 text-black" />
            <span className="text-4xl font-bold text-black">BookLib</span>
          </div>
          <h2 className="text-3xl font-bold text-black">Welcome back</h2>
          <p className="mt-2 text-gray-600">Sign up to your personal library</p>
        </div>

        <div className="bg-white border-2 border-black rounded-lg p-8 shadow-lg">
          <form action={action} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-black" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
                  placeholder="Enter your email"
                />
              </div>
              {state?.errors?.email && <p className="mt-1 text-sm text-red-600">{state?.errors?.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-black mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-black" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  className="w-full pl-10 pr-12 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-black hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {state?.errors?.password && <p className="mt-1 text-sm text-red-600">{state?.errors?.password}</p>}
            </div>

            <button
              disabled={isPending}
              className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/signup" className="font-medium text-black hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;