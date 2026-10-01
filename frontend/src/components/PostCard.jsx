import React, { useState } from 'react';
import { Heart, Maximize2, Trash2, Share2, Download, ExternalLink, Calendar, Check, MoreVertical } from 'lucide-react';

export default function PostCard({
  post,
  viewMode = 'grid',
  isLiked,
  likeCount,
  onToggleLike,
  onSelectPost,
  onRequestDelete,
  onCopyUrl,
  copiedId,
}) {
  if (!post) return null;

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const formattedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
      })
    : null;

  const handleDownload = async (e) => {
    e.stopPropagation();
    try {
      const response = await fetch(post.image);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `post-${post._id || 'image'}.jpg`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      window.open(post.image, '_blank');
    }
  };

  // GRID VIEW CARD
  if (viewMode === 'grid') {
    return (
      <div
        onClick={() => onSelectPost(post)}
        className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 cursor-pointer flex flex-col"
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] w-full bg-slate-950 overflow-hidden">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-slate-900 animate-pulse flex items-center justify-center text-slate-700" />
          )}

          {imageError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-slate-950 text-slate-500">
              <span className="text-xs">Failed to load image</span>
            </div>
          ) : (
            <img
              src={post.image}
              alt={post.caption || 'Post image'}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}

          {/* Floating Actions on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-xs font-medium text-slate-300 border border-slate-700/50">
                {formattedDate || 'ImageKit'}
              </span>

              <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCopyUrl(post.image);
                  }}
                  className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white backdrop-blur-md transition border border-slate-700/40"
                  title="Copy link"
                >
                  {copiedId === post.image ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRequestDelete(post);
                  }}
                  className="p-2 rounded-xl bg-slate-900/80 hover:bg-rose-600 text-slate-300 hover:text-white backdrop-blur-md transition border border-slate-700/40"
                  title="Delete post"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex items-end justify-between gap-3">
              <p className="text-xs text-white line-clamp-2 font-medium drop-shadow-md">
                {post.caption || 'No caption'}
              </p>
              <div className="flex items-center gap-1 text-xs text-slate-300 bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-700/50">
                <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
                <span>{likeCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="p-3.5 flex items-center justify-between border-t border-slate-800/80 bg-slate-900/70">
          <p className="text-xs text-slate-300 font-medium truncate max-w-[70%]">
            {post.caption || <span className="text-slate-500 italic">No caption</span>}
          </p>
          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={onToggleLike}
              className={`p-1.5 rounded-lg transition ${
                isLiked ? 'text-rose-500 hover:bg-rose-500/10' : 'text-slate-400 hover:text-rose-400 hover:bg-slate-800'
              }`}
              title="Like"
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500' : ''}`} />
            </button>
            <button
              onClick={() => onSelectPost(post)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="Enlarge"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // FEED VIEW CARD
  return (
    <div className="max-w-xl mx-auto rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl mb-8">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5">
            <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center font-bold text-xs text-white">
              PG
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">PixelGram User</h4>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              {formattedDate && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-500" />
                  {formattedDate}
                </span>
              )}
              <span>&bull;</span>
              <span className="text-indigo-400 font-mono text-[11px]">ImageKit CDN</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-slate-800 border border-slate-700 shadow-2xl py-1.5 z-20">
              <button
                onClick={() => {
                  setShowMenu(false);
                  onCopyUrl(post.image);
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-200 hover:bg-slate-700 transition"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Copy Image URL</span>
              </button>
              <button
                onClick={(e) => {
                  setShowMenu(false);
                  handleDownload(e);
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-200 hover:bg-slate-700 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Image</span>
              </button>
              <a
                href={post.image}
                target="_blank"
                rel="noreferrer"
                onClick={() => setShowMenu(false)}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-200 hover:bg-slate-700 transition"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in Tab</span>
              </a>
              <div className="h-px bg-slate-700 my-1" />
              <button
                onClick={() => {
                  setShowMenu(false);
                  onRequestDelete(post);
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-400 hover:bg-rose-500/10 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Post</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Image */}
      <div
        className="w-full bg-black/40 relative cursor-pointer group flex items-center justify-center overflow-hidden"
        onClick={() => onSelectPost(post)}
      >
        <img
          src={post.image}
          alt={post.caption || 'Post image'}
          className="w-full max-h-[550px] object-cover transition duration-300 group-hover:scale-[1.01]"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="p-3 rounded-full bg-slate-900/80 backdrop-blur-md text-white border border-slate-700/50 shadow-xl">
            <Maximize2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Feed Card Actions & Caption */}
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleLike}
              className={`flex items-center gap-1.5 text-sm font-semibold transition ${
                isLiked ? 'text-rose-500' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-rose-500' : ''}`} />
              <span>{likeCount}</span>
            </button>
            <button
              onClick={() => onCopyUrl(post.image)}
              className="text-slate-400 hover:text-white transition p-1"
              title="Copy URL"
            >
              {copiedId === post.image ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5" />}
            </button>
            <button
              onClick={handleDownload}
              className="text-slate-400 hover:text-white transition p-1"
              title="Download image"
            >
              <Download className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={() => onRequestDelete(post)}
            className="text-slate-500 hover:text-rose-400 transition p-1"
            title="Delete post"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {post.caption && (
          <p className="text-sm text-slate-200 leading-relaxed">
            <span className="font-semibold text-white mr-2">PixelGram:</span>
            {post.caption}
          </p>
        )}
      </div>
    </div>
  );
}
