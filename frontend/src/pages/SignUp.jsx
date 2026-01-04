import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import {
    Code,
    Eye,
    EyeOff,
    Info,
    Loader2,
    Lock,
    Mail,
    Phone,
    User,
} from 'lucide-react';
import { z } from 'zod';
import { useAuthStore } from '../store/useAuthStore';
import logo from '../assets/logo.png';

const SignUpSchema = z.object({
    fullname: z.string().min(3),
    username: z.string().min(3),
    email: z.string().email(),
    phone: z.string().min(10),
    password: z.string().min(6),
    bio: z.string().optional(),
    avatar: z.any().optional(),
});

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { isSigninUp, signup } = useAuthStore();
    const [avatarPreview, setAvatarPreview] = useState(null);
    const { register, handleSubmit, setValue } = useForm({
        resolver: zodResolver(SignUpSchema),
    });

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();

            formData.append('fullname', data.fullname);
            formData.append('username', data.username);
            formData.append('email', data.email);
            formData.append('phone', data.phone);
            formData.append('password', data.password);

            if (data.bio) {
                formData.append('bio', data.bio);
            }

            if (data.avatar) {
                formData.append('avatar', data.avatar);
            }

            const result = await signup(formData);

            if (result?.success) {
                navigate("/login");
            }
        } catch (error) {
            console.error('SignUp failed:', error);
        }
    };

    return (
        <div className=" grid place-items-center pb-10">
            <div className="w-[420px] py-5 max-w-full rounded-xl border border-neutral-200 bg-white">
                {/* Header */}
                <div className="px-6 pt-5 pb-3 text-center">
                    <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-md border border-neutral-300 text-xs font-semibold">
                        <img src={logo} alt="" className="h-9 w-9" />
                    </div>

                    <h1 className="text-base font-semibold text-neutral-900">
                        Create account
                    </h1>
                    <p className="text-xs text-neutral-500">Creative Showcase</p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="px-6 pb-5 space-y-3 text-sm"
                >
                    <div className="flex items-center gap-3">
                        <label className="relative group h-10 w-10 cursor-pointer">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;

                                    if (!file.type.startsWith('image/')) {
                                        alert('Only images are allowed');
                                        return;
                                    }

                                    setValue('avatar', file, { shouldValidate: true });

                                    if (avatarPreview) {
                                        URL.revokeObjectURL(avatarPreview);
                                    }

                                    setAvatarPreview(URL.createObjectURL(file));
                                }}
                                className="hidden"
                            />

                            {/* Avatar */}
                            <div
                                className={`h-10 w-10 rounded-full overflow-hidden flex items-center justify-center transition
                                          ${avatarPreview
                                        ? 'border-2 border-green-500'
                                        : 'border border-neutral-300 bg-neutral-100 group-hover:border-neutral-900'
                                    }
                                        `}
                            >
                                {avatarPreview ? (
                                    <img
                                        src={avatarPreview}
                                        alt="Avatar preview"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <User className="h-4 w-4 text-neutral-400" />
                                )}
                            </div>

                            {/* Status*/}
                            <span
                                className={`absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] transition
        ${avatarPreview
                                        ? 'bg-green-500 text-white'
                                        : 'bg-neutral-900 text-white opacity-0 group-hover:opacity-100'
                                    }
      `}
                            >
                                {avatarPreview ? '✓' : '+'}
                            </span>
                        </label>

                        <div className="text-xs">
                            {avatarPreview ? (
                                <span className="text-green-600 font-medium">
                                    Avatar uploaded
                                </span>
                            ) : (
                                <span className="text-neutral-500">Upload avatar</span>
                            )}
                        </div>
                    </div>

                    {/* Full name */}
                    <div>
                        <label className="text-xs text-neutral-600">Full Name</label>
                        <div className="relative mt-1">
                            <Code className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                            <input
                                {...register('fullname')}
                                placeholder="Sahin Mallick"
                                className="w-full rounded-md border border-neutral-300 pl-8 pr-2 py-2 text-sm outline-none focus:border-neutral-900"
                            />
                        </div>
                    </div>

                    {/* Username and Email */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs text-neutral-600">Username</label>
                            <div className="relative mt-1">
                                <User className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                                <input
                                    {...register('username')}
                                    placeholder="sahin"
                                    className="w-full rounded-md border border-neutral-300 pl-8 pr-2 py-2 text-sm outline-none focus:border-neutral-900"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs text-neutral-600">Email</label>
                            <div className="relative mt-1">
                                <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                                <input
                                    type="email"
                                    {...register('email')}
                                    placeholder="you@ex.com"
                                    className="w-full rounded-md border border-neutral-300 pl-8 pr-2 py-2 text-sm outline-none focus:border-neutral-900"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Phone number + Password */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs text-neutral-600">Phone</label>
                            <div className="relative mt-1">
                                <Phone className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                                <input
                                    type="tel"
                                    {...register('phone')}
                                    placeholder="+91 6296795257"
                                    className="w-full rounded-md border border-neutral-300 pl-8 pr-2 py-2 text-sm outline-none focus:border-neutral-900"
                                />
                            </div>
                        </div>

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
                        </div>
                    </div>

                    {/* Bio */}
                    <div>
                        <label className="text-xs text-neutral-600">Bio</label>
                        <div className="relative mt-1">
                            <Info className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-400" />
                            <textarea
                                {...register('bio')}
                                rows={2}
                                placeholder="Frontend developer building Creative Showcase"
                                className="w-full resize-none rounded-md border border-neutral-300 pl-8 pr-2 py-2 text-sm outline-none focus:border-neutral-900"
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isSigninUp}
                        className="mt-2 w-full rounded-md border border-neutral-900 bg-neutral-900 py-2 text-sm font-medium text-white transition hover:bg-black disabled:opacity-60"
                    >
                        {isSigninUp ? 'Creating…' : 'Create account'}
                    </button>
                </form>
                <div className="border-t border-neutral-200 px-6 py-4 text-center text-xs text-neutral-500">
                    Already have an account?{' '}
                    <Link to="/login" className="text-neutral-900 underline">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
