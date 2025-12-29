import React from 'react';
import UserProfileCard from '../components/UserProfileCard';
import UserImageList from '../components/UserImageList';
import { useEffect } from 'react';
import { useImageStore } from '../store/useImageStore';
import { useAuthStore } from '../store/useAuthStore';

const PrivateDashboard = () => {
  const { authUser, logout, isAuthenticated } = useAuthStore();
  const { userImagesFetch, userImages, isLoading, isFetched } = useImageStore();

  useEffect(() => {
    userImagesFetch();
  }, [isFetched, userImagesFetch]);

  return (
    <div>
      <UserProfileCard
        user={{
          name: authUser.fullname,
          username: authUser.username,
          email: authUser.email,
          phone: authUser.phone,
          bio: authUser?.bio,
          role: authUser?.role,
          avatar: authUser?.avatar.url,
        }}
      />
      <div>
        <UserImageList
          userImages={userImages}
          isLoading={isLoading}
          isFetched={isFetched}
        />
      </div>
    </div>
  );
};

export default PrivateDashboard;
