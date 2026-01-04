import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export const ImageCard = ({ item, onOpen }) => {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();

  const publicProfile = `/profile/${item.uploadedBy.username}`;

  const handleUsernameClick = (e) => {
    e.stopPropagation();
    if (authUser?.username === item.uploadedBy.username) {
      navigate('/profile');
    } else {
      navigate(publicProfile);
    }
  };

  return (
    <article className="group relative overflow-hidden rounded-xl border border-base-300/40 bg-base-100 transition hover:shadow-xl">
      <div
        className="relative overflow-hidden cursor-pointer"
        onClick={() => onOpen(item)}
      >
        <img
          src={item.image.url}
          alt={item.title}
          loading="lazy"
          className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />

        <div className="absolute inset-x-0 bottom-0 p-4 text-white space-y-2">
          <div className="flex items-center gap-2">
            <img
              src={item.uploadedBy.avatar.url}
              alt={item.uploadedBy.username}
              className="h-7 w-7 rounded-full object-cover border border-white/40"
            />

            <button
              type="button"
              onClick={handleUsernameClick}
              className="text-xs font-medium opacity-90 hover:underline"
            >
              @{item.uploadedBy.username}
            </button>
          </div>

          <h3 className="text-sm font-semibold leading-snug">{item.title}</h3>

          <p className="text-xs text-white/80 line-clamp-2">
            {item.description}
          </p>
        </div>
      </div>
    </article>
  );
};
