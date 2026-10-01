import React from 'react';
import { ImagePlus, SearchX, Sparkles } from 'lucide-react';

export default function EmptyState({ isSearching, searchQuery, onClearSearch, onOpenCreateModal }) {
  if (isSearching) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 mb-5 shadow-inner">
          <SearchX className="w-10 h-10 text-slate-500" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No matching posts found</h3>
        <p className="text-slate-400 max-w-md mb-6 text-sm">
          We couldn't find any posts matching &ldquo;<span className="text-indigo-400 font-medium">{searchQuery}</span>&rdquo;. Try searching with another keyword or tag.
        </p>
        <button
          onClick={onClearSearch}
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-all hover:scale-105 active:scale-95"
        >
          Clear search query
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-pink-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-2xl backdrop-blur-xl">
          <ImagePlus className="w-12 h-12 text-indigo-400 animate-pulse" />
        </div>
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-full p-1.5 shadow-lg">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
      </div>

      <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Your Gallery is Waiting</h3>
      <p className="text-slate-400 max-w-md mb-8 text-sm leading-relaxed">
        Upload your first image with a caption. Images are stored securely on ImageKit cloud and saved to your database.
      </p>

      <button
        onClick={onOpenCreateModal}
        className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold text-sm shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-105 active:scale-95 transition-all"
      >
        <ImagePlus className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        <span>Create First Post</span>
      </button>
    </div>
  );
}
