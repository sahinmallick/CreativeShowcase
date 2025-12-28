import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { Code, Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react';
// import logo from '../assets/logo.png'
import { z } from 'zod';
// import { useAuthStore } from '../store/useAuthStore';

const LogInSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be atleast of 6 characters'),
});

const LogInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { isLogginIn, login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LogInSchema),
  });

  const onSubmit = async (data) => {
    try {
      await login(data);
      console.log('Log in data:', data);
    } catch (error) {
      console.error('Log in failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md px-12 py-10 border border-gray-200 rounded-xl shadow-sm">
        <div className="text-center mb-8">
          {/* Logo */}
          <div className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center transition-all duration-300 group-hover:scale-105">
              <img src={logo} alt="logo" />
            </div>
            <h1 className="text-2xl font-semibold mt-2 text-black">
              CodeKaroo
            </h1>
            <p className="text-sm text-gray-500">Log In to your account</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="text-sm text-gray-600">Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                {...register('email')}
                className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-black transition"
                placeholder="you@example.com"
              />
            </div>
            {errors.email && (
              <p className="text-gray-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="text-sm text-gray-600">Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                className="w-full pl-10 pr-10 py-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-black transition"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-black transition"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-gray-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            // disabled={isLogginIn}
            className="w-full py-3 rounded-lg bg-black text-white text-sm font-medium
             transition-all duration-200 border cursor-pointer
             hover:bg-white hover:text-gray-900
             active:scale-[0.98]
             disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLogginIn ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Logging in...</span>
              </span>
            ) : (
              'Log In'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Doesn't have an account?{' '}
            <Link
              to="/signup"
              className="text-black font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
