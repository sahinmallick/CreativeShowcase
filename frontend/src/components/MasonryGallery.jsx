import { useEffect, useRef, useState } from 'react';
import { useImageStore } from '../store/useImageStore';
import { ImageCard } from './ImageCard';
import ImagePreviewModal from './ImagePreviewModal';

const CHUNK_SIZE = 9;

const MasonryGallery = () => {
  const { images, fetchImages, isFetched } = useImageStore();

  const [visibleCount, setVisibleCount] = useState(CHUNK_SIZE);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!isFetched) fetchImages();
  }, [isFetched, fetchImages]);

  useEffect(() => {
    if (selectedImage) {
      document.getElementById('image_preview_modal')?.showModal();
    }
  }, [selectedImage]);

  const openModal = (item) => {
    setSelectedImage(item);
  };

  return (
    <>
      <div className="p-2 lg:p-24">
        <div className="columns-2 lg:columns-5 column-gap-6 gap-4">
          {images.slice(0, visibleCount).map((item) => (
            <div key={item._id} className="mb-6 break-inside-avoid">
              <ImageCard key={item._id} item={item} onOpen={openModal} />
            </div>
          ))}
        </div>
      </div>

      <ImagePreviewModal item={selectedImage} />
    </>
  );
};

export default MasonryGallery;
