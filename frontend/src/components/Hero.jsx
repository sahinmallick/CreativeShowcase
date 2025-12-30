import React from 'react';

const Hero = () => {
  return (
    <div className="hero pt-10">
      <div className="hero-content text-center px-4">
        <div className="max-w-xl">
          <p className="mb-4 text-sm font-medium text-base-content/60">
            Discover • Create • Inspire
          </p>

          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-base-content">
            A Creative Showcase for Visual Stories
          </h1>

          <p className="mt-6 text-base sm:text-lg leading-relaxed text-base-content/70">
            Explore a curated collection of creative works shared by artists,
            designers, and storytellers from around the world. Creative Showcase
            is a platform to upload, discover, and celebrate visual memories,
            artwork, and ideas — all in one beautifully organized space.
          </p>

          <div className="mt-8 flex justify-center"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
