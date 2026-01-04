import React from 'react';
import UserProfileCard from '../components/UserProfileCard';
import { Navigate, useParams } from 'react-router-dom';
import MasonryGallery from '../components/MasonryGallery';
import MasonryProfile from '../components/MasonryProfile';
import { useProfileStore } from '../store/useProfileStore';
import { useEffect } from 'react';

const PublicProfile = () => {
  const { username } = useParams();
  const {
    fetchUserProfile,
    profileImages,
    userProfile,
    isLoading,
    isFetched,
    isNotFound,
  } = useProfileStore();

  useEffect(() => {
    if (username) {
      fetchUserProfile(username);
    }
  }, [username, fetchUserProfile]);

  if (isNotFound) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="max-w-sm text-center">
          <h1 className="text-xl font-semibold text-base-content">
            User not found
          </h1>

          <p className="mt-2 text-sm text-neutral-500">
            The profile you’re looking for doesn’t exist or may have been
            removed.
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={() => window.history.back()}
              className="btn btn-sm btn-ghost"
            >
              Go back
            </button>

            <a href="/" className="btn btn-sm bg-black text-white">
              Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  console.log('DEBUG:', {
    isNotFound,
    isLoading,
    userProfile,
  });

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-neutral-500">
          <span className="loading loading-spinner loading-md"></span>
          <p className="text-sm">Loading profile…</p>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return null;
  }

  return (
    <div>
      <UserProfileCard
        user={{
          name: userProfile.fullname,
          username: userProfile.username,
          email: userProfile.email,
          bio: userProfile.bio,
          role: userProfile.role,
          avatar: userProfile.avatar.url,
        }}
      />

      <section className="text-center p-8">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Visual Showcase
        </h2>

        <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base text-neutral-500 leading-relaxed">
          A curated collection of moments, ideas, and creative expressions
          shared by{' '}
          <span className="font-medium text-neutral-700">
            @{userProfile.username}
          </span>
          . Each piece reflects a story — captured, preserved, and presented
          with intent.
        </p>
      </section>

      <section className="pb-20">
        <MasonryProfile images={profileImages} isLoading={isLoading} />
      </section>
    </div>
  );
};

export default PublicProfile;
