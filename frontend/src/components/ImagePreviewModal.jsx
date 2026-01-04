import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const ImagePreviewModal = ({ item }) => {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();

  const handleUsernameClick = (e) => {
    e.stopPropagation();
    if (authUser?.username === item.uploadedBy.username) {
      navigate('/profile');
    } else {
      navigate(`/profile/${item.uploadedBy.username}`);
    }
  };

  return (
    <dialog id="image_preview_modal" className="modal modal-middle">
      <div className="modal-box max-w-3xl p-0">
        <form method="dialog">
          <button className="btn btn-sm btn-circle absolute right-2 top-2">
            ✕
          </button>
        </form>

        {item && (
          <>
            <img
              src={item.image.url}
              alt={item.title}
              className="w-full max-h-[60vh] object-contain"
            />

            <div className="p-6 space-y-3">
              <h2 className="text-xl font-semibold">{item.title}</h2>

              <div
                onClick={handleUsernameClick}
                className="flex items-center gap-3 cursor-pointer"
              >
                <img
                  src={item.uploadedBy.avatar.url}
                  className="w-10 h-10 rounded-full"
                />
                <button
                  className="flex flex-col items-start cursor-pointer"
                  onClick={handleUsernameClick}
                >
                  <p className="font-medium">{item.uploadedBy.fullname}</p>
                  <p className="text-sm text-neutral-500">
                    @{item.uploadedBy.username}
                  </p>
                </button>
              </div>

              <p className="text-sm text-neutral-600">{item.description}</p>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
};

export default ImagePreviewModal;
