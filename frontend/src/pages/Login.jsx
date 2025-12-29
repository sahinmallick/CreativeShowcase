import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { Code, Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react';
import { z } from 'zod';
import { useAuthStore } from '../store/useAuthStore';
import logo from '../assets/logo.png';

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
    <div className="grid place-items-center py-12">
      <div className="w-[420px] max-w-full rounded-xl border border-neutral-200 bg-white">
        <div className="px-6 pt-5 pb-3 text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-md border border-neutral-300 text-xs font-semibold">
            <img src={logo} alt="" className="h-9 w-9" />
          </div>

          <h1 className="text-base font-semibold text-neutral-900">Log in</h1>
          <p className="text-xs text-neutral-500">Creative Showcase</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-6 pb-5 space-y-4 text-sm"
        >
          {/* Email */}
          <div>
            <label className="text-xs text-neutral-600">Email</label>
            <div className="relative mt-1">
              <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="email"
                {...register('email')}
                placeholder="you@example.com"
                className="w-full rounded-md border border-neutral-300 pl-8 pr-2 py-2 text-sm outline-none focus:border-neutral-900"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-[11px] text-neutral-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-xs text-neutral-600">Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                placeholder="••••••••"
                className="w-full rounded-md border border-neutral-300 pl-8 pr-8 py-2 text-sm outline-none focus:border-neutral-900"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900 transition"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-[11px] text-neutral-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLogginIn}
            className="mt-2 w-full rounded-md border border-neutral-900 bg-neutral-900 py-2 text-sm font-medium text-white transition
                                  hover:bg-black active:scale-[0.99]
                                    disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLogginIn ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Logging in…
              </span>
            ) : (
              'Log in'
            )}
          </button>
        </form>
        <div className="border-t border-neutral-200 px-6 py-4 text-center text-xs text-neutral-500">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-neutral-900 underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
