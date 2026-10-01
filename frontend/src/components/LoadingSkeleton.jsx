import React from 'react';

export default function LoadingSkeleton({ viewMode = 'grid' }) {
  if (viewMode === 'feed') {
    return (
      <div className="max-w-xl mx-auto space-y-6">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="rounded-3xl bg-slate-900/60 border border-slate-800/80 p-5 overflow-hidden animate-pulse"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-slate-800" />
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-slate-800 rounded w-1/4" />
                <div className="h-3 bg-slate-800/60 rounded w-1/6" />
              </div>
            </div>
            <div className="aspect-video w-full bg-slate-800/70 rounded-2xl mb-4" />
            <div className="space-y-2">
              <div className="h-4 bg-slate-800/80 rounded w-3/4" />
              <div className="h-3 bg-slate-800/50 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
        <div
          key={n}
          className="rounded-3xl bg-slate-900/60 border border-slate-800/80 overflow-hidden animate-pulse flex flex-col"
        >
          <div className="aspect-[4/3] bg-slate-800/80 w-full" />
          <div className="p-4 space-y-2 flex-1">
            <div className="h-4 bg-slate-800 rounded w-4/5" />
            <div className="h-3 bg-slate-800/60 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
