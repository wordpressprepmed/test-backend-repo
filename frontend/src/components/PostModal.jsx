import React, { useEffect } from 'react';
import { X, Heart, Share2, Download, Trash2, ExternalLink, Calendar, Copy, Check } from 'lucide-react';

export default function PostModal({
  post,
  onClose,
  isLiked,
  likeCount,
  onToggleLike,
  onRequestDelete,
  onCopyUrl,
  copiedId,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!post) return null;

  const formattedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  const handleDownload = async () => {
    try {
      const response = await fetch(post.image);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `pixelgram-${post._id || 'post'}.jpg`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      window.open(post.image, '_blank');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 rounded-full border border-slate-700/50 backdrop-blur-md transition shadow-lg"
          title="Close (Esc)"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Preview Left / Top */}
        <div className="flex-1 bg-black/60 flex items-center justify-center min-h-[300px] md:min-h-[500px] max-h-[60vh] md:max-h-[85vh] p-2 relative group overflow-hidden">
          <img
            src={post.image}
            alt={post.caption || 'Post image'}
            className="max-h-full max-w-full object-contain rounded-xl select-none"
          />
        </div>

        {/* Post Details Right / Bottom */}
        <div className="w-full md:w-96 p-6 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-800 bg-slate-900/90 overflow-y-auto">
          <div className="space-y-5">
            {/* Header info */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 p-0.5">
                <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center font-bold text-xs text-white">
                  PG
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white">PixelGram Creator</p>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Stored on ImageKit</span>
                </div>
              </div>
            </div>

            {/* Caption */}
            <div className="bg-slate-950/60 rounded-2xl p-4 border border-slate-800/80">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Caption</h4>
              {post.caption ? (
                <p className="text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
                  {post.caption}
                </p>
              ) : (
                <p className="text-xs italic text-slate-500">No caption provided for this post.</p>
              )}
            </div>

            {/* Metadata Info */}
            <div className="space-y-2 text-xs text-slate-400 bg-slate-950/30 rounded-xl p-3 border border-slate-800/50">
              {formattedDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>{formattedDate}</span>
                </div>
              )}
              {post._id && (
                <div className="flex items-center justify-between text-slate-500 font-mono">
                  <span>ID: {post._id.slice(-8)}</span>
                  <button
                    onClick={() => onCopyUrl(post._id)}
                    className="hover:text-slate-300 transition"
                    title="Copy Mongo ID"
                  >
                    {copiedId === post._id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-6 mt-6 border-t border-slate-800/80 space-y-3">
            <div className="flex items-center gap-2">
              <button
                onClick={onToggleLike}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-sm font-medium transition-all ${
                  isLiked
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 shadow-sm shadow-rose-500/20'
                    : 'bg-slate-800/80 border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>{likeCount} {likeCount === 1 ? 'Like' : 'Likes'}</span>
              </button>

              <button
                onClick={() => onCopyUrl(post.image)}
                className="p-2.5 rounded-xl border border-slate-700/60 bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white transition"
                title="Copy Image URL"
              >
                {copiedId === post.image ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              </button>

              <button
                onClick={handleDownload}
                className="p-2.5 rounded-xl border border-slate-700/60 bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white transition"
                title="Download Image"
              >
                <Download className="w-4 h-4" />
              </button>

              <a
                href={post.image}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl border border-slate-700/60 bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white transition"
                title="Open CDN Image in New Tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={() => {
                onClose();
                onRequestDelete(post);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-rose-500/20 text-rose-400 hover:bg-rose-500/10 text-xs font-semibold transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Post</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
