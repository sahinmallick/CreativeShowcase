import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import GalleryImageCard from './GalleryImageCard';

const CHUNK_SIZE = 9;

const MasonryProfile = ({ images, isLoading }) => {
  console.log(images);
  const [visibleCount, setVisibleCount] = useState(CHUNK_SIZE);
  const loaderRef = useRef(null);
  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + CHUNK_SIZE, images.length));
        }
      },
      { threshold: 1 }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [images.length]);

  return (
    <>
      <div className="p-4 lg:p-12">
        <div className="columns-2 sm:columns-2 lg:columns-4 gap-4 md:gap-6">
          {images.map((item) => (
            <div key={item._id} className="mb-4 md:mb-6 break-inside-avoid">
              <GalleryImageCard item={item} />
            </div>
          ))}
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center py-12">
          <span className="loading loading-dots loading-md opacity-60" />
        </div>
      )}
    </>
  );
};

export default MasonryProfile;
