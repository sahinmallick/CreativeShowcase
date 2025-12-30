import { useEffect, useRef, useState } from 'react';
import { useImageStore } from '../store/useImageStore';
import { ImageCard } from './ImageCard';

const CHUNK_SIZE = 9;

const MasonryGallery = () => {
  const { images, fetchImages, isLoading, isFetched } = useImageStore();

  const [visibleCount, setVisibleCount] = useState(CHUNK_SIZE);
  const [search, setSearch] = useState('');
  const loaderRef = useRef(null);

  useEffect(() => {
    if (!isFetched) fetchImages();
  }, []);

  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) =>
            Math.min(prev + CHUNK_SIZE, filteredImages.length)
          );
        }
      },
      { threshold: 1 }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [images.length, search]);

  const filteredImages = images.filter((img) => {
    const query = search.toLowerCase();

    const titleMatch = img.title?.toLowerCase().includes(query);
    const usernameMatch = img.uploadedBy?.username
      ?.toLowerCase()
      .includes(query);

    return titleMatch || usernameMatch;
  });

  return (
    <>
      <div className="flex justify-center px-4 pb-6 lg:pb-0">
        <label className="input input-bordered flex items-center gap-2 w-full max-w-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 opacity-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
            />
          </svg>

          <input
            type="search"
            className="grow"
            placeholder="Search by title or username"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setVisibleCount(CHUNK_SIZE);
            }}
          />
        </label>
      </div>

      <div className="p-2 lg:p-24">
        <div className="columns-2 sm:columns-2 lg:columns-5 gap-4 md:gap-6">
          {filteredImages.slice(0, visibleCount).map((item) => (
            <div key={item._id} className="mb-4 md:mb-6 break-inside-avoid">
              <ImageCard item={item} />
            </div>
          ))}
        </div>
      </div>

      <div ref={loaderRef} />

      {isLoading && (
        <div className="flex justify-center py-12">
          <span className="loading loading-dots loading-md opacity-60" />
        </div>
      )}
    </>
  );
};

export default MasonryGallery;
