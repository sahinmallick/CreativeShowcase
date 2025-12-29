import React from 'react';
import UserProfileCard from '../components/UserProfileCard';
import { useParams } from 'react-router-dom';
import MasonryGallery from '../components/MasonryGallery';
import MasonryProfile from '../components/MasonryProfile';

const PublicProfile = () => {
  const { username } = useParams();

  return (
    <div>
      <UserProfileCard
        user={{
          name: 'Sahin Mallick',
          username: 'sahin',
          email: 'sahinmallick14@gmail.com',
          phone: '+91 6296795257',
          bio: 'Hello, my name is Sahin Mallick. I am the creator of this beautiful platform Creative Showcase!',
          role: 'artist',
          avatar:
            'https://res.cloudinary.com/dgxacl2k7/image/upload/v1766761809/creative-showcase/aqv1rdigqjspruevnf78.jpg', // or image URL
        }}
      />
      <MasonryProfile />
    </div>
  );
};

export default PublicProfile;
