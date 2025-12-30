import React from 'react';
import UserProfileCard from '../components/UserProfileCard';
import UserImageList from '../components/UserImageList';
import { useEffect } from 'react';
import { useImageStore } from '../store/useImageStore';
import { useAuthStore } from '../store/useAuthStore';
import UploadImageSection from '../components/UploadImageSection';

const PrivateDashboard = () => {
  const { authUser, logout, isAuthenticated } = useAuthStore();
  const {
    userImagesFetch,
    userImages,
    isLoading,
    isFetched,
    deleteImage,
    isDeleting,
  } = useImageStore();

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
        <UploadImageSection />
        <UserImageList
          userImages={userImages}
          isLoading={isLoading}
          isFetched={isFetched}
          deleteImage={deleteImage}
          isDeleting={isDeleting}
        />
      </div>
    </div>
  );
};

export default PrivateDashboard;
