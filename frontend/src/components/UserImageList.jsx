import { Delete, DeleteIcon, LucideDelete, Trash2Icon } from 'lucide-react';
import React from 'react';

const UserImageList = ({ userImages, isLoading, isFetched }) => {
  return (
    <>
      <ul className="list w-full bg-base-100 rounded-xl shadow-sm p-12 lg:24">
        <li className="px-4 py-3 text-lg font-semibold tracking-wide text-neutral-500">
          Your Uploaded Images
        </li>

        {userImages.length === 0 ? (
          <div className="py-10 text-center text-sm opacity-60">
            Your gallery is empty!
          </div>
        ) : (
          userImages.map((img, index) => (
            <li key={img._id} className="list-row group items-center">
              <div className="hidden sm:block text-sm font-mono opacity-40">
                {String(index + 1).padStart(2, '0')}
              </div>

              <div>
                <img
                  src={img.image.url}
                  alt={img.title}
                  className="size-12 rounded-lg object-cover"
                />
              </div>

              <div className="list-col-grow min-w-0">
                <p className="truncate text-sm font-medium">{img.title}</p>
                <p className="truncate text-xs text-neutral-500">
                  {img.description}
                </p>
              </div>

              <button className="btn btn-sm" title="Delete">
                <Trash2Icon className="h-4 w-4 text-error" />
              </button>
            </li>
          ))
        )}
      </ul>

      {isLoading && (
        <div className="flex justify-center py-12">
          <span className="loading loading-dots loading-md opacity-60" />
        </div>
      )}
    </>
  );
};

export default UserImageList;
