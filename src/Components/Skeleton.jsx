import React from 'react';

export const WorkSkeleton = () => {
  return (
    <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 md:p-6 backdrop-blur-xl animate-pulse space-y-4">
      {/* Image / Thumbnail Skeleton */}
      <div className="w-full h-48 sm:h-64 rounded-xl bg-white/10" />

      {/* Title & Tag Skeletons */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="h-6 w-1/3 rounded-lg bg-white/10" />
          <div className="h-5 w-16 rounded-full bg-white/10" />
        </div>

        {/* Description Lines */}
        <div className="h-4 w-full rounded bg-white/10" />
        <div className="h-4 w-4/5 rounded bg-white/10" />

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          <div className="h-6 w-16 rounded-full bg-white/10" />
          <div className="h-6 w-20 rounded-full bg-white/10" />
          <div className="h-6 w-14 rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  );
};