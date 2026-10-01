import React from 'react';
import { Camera, Plus, Search, X, LayoutGrid, Rows, RefreshCw, Radio } from 'lucide-react';

export default function Navbar({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  isServerOnline,
  isRefreshing,
  onRefresh,
  onOpenCreateModal,
  postCount,
}) {
  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-[1.5px] shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Camera className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                {isServerOnline ? (
                  <>
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </>
                ) : (
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                )}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  PixelGram
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
                  ImageKit + Mongo
                </span>
              </div>
              <p className="hidden md:block text-[11px] text-slate-400">
                {isServerOnline ? (
                  <span className="text-emerald-400/90 font-medium">Backend Connected :3000</span>
                ) : (
                  <span className="text-rose-400 font-medium">Connecting to Backend...</span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-2 sm:mx-6">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search posts by caption..."
              className="w-full pl-10 pr-9 py-2 rounded-2xl bg-slate-900/90 border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 p-1 text-slate-400 hover:text-white rounded-lg transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* View Switcher, Refresh & Create Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* View Mode Toggle */}
          <div className="hidden sm:flex items-center bg-slate-900/90 border border-slate-800 p-1 rounded-2xl">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded-xl transition ${
                viewMode === 'grid'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('feed')}
              className={`p-1.5 rounded-xl transition ${
                viewMode === 'feed'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Feed View"
            >
              <Rows className="w-4 h-4" />
            </button>
          </div>

          {/* Sync Refresh Button */}
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-2 sm:px-3 sm:py-2 rounded-2xl bg-slate-900 border border-slate-800 hover:bg-slate-800/80 text-slate-300 hover:text-white text-xs font-medium transition flex items-center gap-1.5"
            title="Refresh Feed"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-indigo-400' : ''}`} />
            <span className="hidden md:inline">Sync</span>
          </button>

          {/* New Post Button */}
          <button
            onClick={onOpenCreateModal}
            className="group relative inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
            <span>New Post</span>
          </button>
        </div>
      </div>
    </header>
  );
}
