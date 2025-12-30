export const GalleryImageCard = ({ item }) => {
  return (
    <article className="group relative overflow-hidden rounded-xl border border-base-300/40 bg-base-100 transition hover:shadow-xl">
      <div className="relative overflow-hidden">
        <a href={item.image.url}>
          <img
            src={item.image.url}
            alt={item.title}
            loading="lazy"
            className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </a>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 transition" />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
      </div>
    </article>
  );
};

export default GalleryImageCard;
