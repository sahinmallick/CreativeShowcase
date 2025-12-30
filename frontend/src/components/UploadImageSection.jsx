import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImagePlus } from 'lucide-react';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { useImageStore } from '../store/useImageStore';

const UploadImageSchema = z.object({
  image: z
    .instanceof(File, { message: 'Image is required' })
    .refine((file) => file.size > 0, 'Image is required'),
  title: z.string().min(3, 'Title is too short'),
  description: z.string().min(10, 'Description is too short'),
});

const UploadImageSection = () => {
  const [preview, setPreview] = useState(null);
  const { uploadImage, isLoading } = useImageStore();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(UploadImageSchema),
  });

  useEffect(() => {
    register('image');
  }, [register]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('image', data.image);
      formData.append('title', data.title);
      formData.append('description', data.description);

      await uploadImage(formData);

      reset();
      setPreview(null);
    } catch (err) {
      toast.error('Upload failed');
    }
  };

  return (
    <section className="mx-auto max-w-5xl pt-12 px-4 lg:pb-6 lg:pt-0">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-xl border border-neutral-200 bg-white px-4 py-3 shadow-sm"
      >
        <div className="mb-3">
          <h3 className="text-sm font-medium">Add a new memory</h3>
          <p className="text-xs text-neutral-500">
            Upload an image and add a short context
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg border border-dashed">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                setValue('image', file, { shouldValidate: true });
                setPreview(URL.createObjectURL(file));
              }}
            />

            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="h-full w-full rounded-lg object-cover"
              />
            ) : (
              <ImagePlus className="h-4 w-4 text-neutral-500" />
            )}
          </label>

          <input
            {...register('title')}
            placeholder="Title"
            className="input input-sm input-bordered w-40"
          />

          <input
            {...register('description')}
            placeholder="Description"
            className="input input-sm input-bordered w-full sm:flex-1 sm:min-w-[200px]"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-sm btn-neutral px-5"
          >
            {isLoading ? 'Posting…' : 'Post'}
          </button>
        </div>

        <div className="mt-2 space-y-1 text-xs text-red-500">
          {errors.image && <p>{errors.image.message}</p>}
          {errors.title && <p>{errors.title.message}</p>}
          {errors.description && <p>{errors.description.message}</p>}
        </div>
      </form>
    </section>
  );
};

export default UploadImageSection;
