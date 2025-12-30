import React from 'react';

const UserProfileCard = ({ user }) => {
  return (
    <div className="hero min-h-[65vh] px-4">
      <div className="hero-content flex-col lg:flex-row gap-14 w-full max-w-6xl rounded-2xl border border-base-300 bg-base-200/80 backdrop-blur-xl shadow-xl px-10 py-14">
        <div className="flex flex-col items-center text-center lg:text-left">
          <div className="relative">
            <div className="h-44 w-44 rounded-full bg-gradient-to-tr from-primary via-secondary to-accent p-[3px] shadow-lg">
              <div className="h-full w-full rounded-full bg-base-100 flex items-center justify-center overflow-hidden">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="h-full w-full object-cover rounded-full"
                  />
                ) : (
                  <div className="h-20 w-20 rounded-full bg-base-200" />
                )}
              </div>
            </div>
          </div>

          <p className="mt-5 text-sm tracking-wide text-base-content/70">
            @{user.username}
          </p>

          <span className="mt-2 inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold tracking-widest text-primary">
            ARTIST
          </span>
        </div>

        <div className="w-full max-w-xl space-y-6">
          <h1 className="text-4xl font-bold tracking-tight text-base-content">
            {user.name}
          </h1>

          <div className="space-y-3 text-base-content/70">
            <p className="break-all sm:break-normal">
              <span className="font-medium text-base-content">Email:</span>{' '}
              {user.email}
            </p>

            <p>
              <span className="font-medium text-base-content">Phone:</span>{' '}
              {user.phone}
            </p>

            <p className="leading-relaxed">
              <span className="font-medium text-base-content">Bio:</span>{' '}
              {user.bio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
