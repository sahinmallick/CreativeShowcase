import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-base-200 px-4">
      <div className="max-w-md text-center">
        <h1 className="text-[120px] font-extrabold leading-none text-error opacity-80">
          404
        </h1>
        <h2 className="mt-2 text-2xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-neutral-500">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link to="/" className="btn btn-primary btn-sm gap-2">
            <Home size={16} />
            Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn btn-ghost btn-sm gap-2"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>
        <div className="divider mt-8 text-xs text-neutral-400">
          Creative Showcase
        </div>
      </div>
    </div>
  );
};

export default NotFound;
