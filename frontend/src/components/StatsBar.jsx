import React from 'react';
import { Database, Cloud, Layers, Sparkles, Filter } from 'lucide-react';

export default function StatsBar({ totalPosts, filteredCount, searchQuery, onClearSearch }) {
  return (
    <div className="py-6 mb-8 border-b border-slate-800/60">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Title and Post Count */}
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-white tracking-tight">Explore Feed</h2>
            <span className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs font-semibold text-indigo-300">
              {totalPosts} {totalPosts === 1 ? 'post' : 'posts'}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Browse high-resolution imagery stored in MongoDB and hosted on ImageKit's global CDN.
          </p>
        </div>

        {/* Status badges */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span>MongoDB Database</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
            <Cloud className="w-3.5 h-3.5 text-sky-400" />
            <span>ImageKit Media CDN</span>
          </div>

          {searchQuery && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-xs text-indigo-300">
              <Filter className="w-3.5 h-3.5 text-indigo-400" />
              <span>Matching: &ldquo;{searchQuery}&rdquo; ({filteredCount})</span>
              <button
                onClick={onClearSearch}
                className="ml-1 text-indigo-400 hover:text-white font-bold"
              >
                &times;
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
