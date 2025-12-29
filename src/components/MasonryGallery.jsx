import { useEffect } from 'react';
import { useImageStore } from '../store/useImageStore';
import { ImageCard } from './ImageCard';
import { useRef } from 'react';
import { useState } from 'react';

const CHUNK_SIZE = 9;

const MasonryGallery = () => {
  const { images, fetchImages, isLoading, isFetched } = useImageStore();

  const [visibleCount, setVisibleCount] = useState(CHUNK_SIZE);
  const loaderRef = useRef(null);

  useEffect(() => {
    if (!isFetched) fetchImages();
  }, []);

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
      <div className="p-4 lg:p-24">
        <div className="columns-2 sm:columns-2 lg:columns-5 gap-4 md:gap-6">
          {images.map((item) => (
            <div key={item._id} className="mb-4 md:mb-6 break-inside-avoid">
              <ImageCard item={item} />
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

export default MasonryGallery;
