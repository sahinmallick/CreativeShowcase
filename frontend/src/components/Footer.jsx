import React from 'react';

const Footer = () => {
  return (
    <footer className="footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-10 w-screen">
      <nav>
        <div className="grid grid-flow-col gap-6">
          <a
            href="https://github.com/sahinmallick"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-neutral-900 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.11 3.29 9.45 7.86 10.98.58.11.79-.25.79-.56v-2.17c-3.2.7-3.88-1.54-3.88-1.54-.53-1.35-1.3-1.71-1.3-1.71-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.45.11-3.02 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.57.23 2.73.11 3.02.74.81 1.19 1.84 1.19 3.1 0 4.43-2.71 5.41-5.29 5.69.42.36.79 1.08.79 2.18v3.23c0 .31.21.68.8.56A11.52 11.52 0 0 0 23.5 12C23.5 5.74 18.27.5 12 .5z" />
            </svg>
          </a>

          <a
            href="https://www.linkedin.com/in/sahinmallick"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-neutral-900 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.99h3.97V24H.5V8.99zM8.98 8.99h3.8v2.05h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.09V24h-3.97v-7.88c0-1.88-.03-4.29-2.62-4.29-2.62 0-3.02 2.04-3.02 4.15V24H8.98V8.99z" />
            </svg>
          </a>

          <a
            href="https://twitter.com/iamsahin03"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-neutral-900 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
          </a>
        </div>
      </nav>

      <aside>
        <p className="text-sm opacity-70">
          © {new Date().getFullYear()} Creative Showcase — Built by Sahin
          Mallick
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
