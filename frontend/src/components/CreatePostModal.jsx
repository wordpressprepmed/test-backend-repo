import React, { useState, useRef, useEffect } from 'react';
import { UploadCloud, Image as ImageIcon, X, Sparkles, AlertCircle, Check } from 'lucide-react';
import api from '../services/api';

const EMOJI_PRESETS = ['✨', '🔥', '📸', '🚀', '❤️', '🌟', '🎨', '🌴', '💡', '🎉'];

export default function CreatePostModal({ isOpen, onClose, onPostCreated, onShowToast }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');

  const fileInputRef = useRef(null);
  const captionInputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      // Reset state
      setFile(null);
      setPreview(null);
      setCaption('');
      setIsUploading(false);
      setUploadProgress(0);
      setError('');
    } else {
      setTimeout(() => {
        captionInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !isUploading) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isUploading, onClose]);

  if (!isOpen) return null;

  const handleFileChange = (selectedFile) => {
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith('image/')) {
      setError('Please select a valid image file (JPEG, PNG, WebP, GIF).');
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File is too large. Maximum size is 10 MB.');
      return;
    }

    setError('');
    setFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleInsertEmoji = (emoji) => {
    setCaption((prev) => prev + emoji);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please choose an image to upload.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(5);
    setError('');

    try {
      const newPost = await api.createPost(
        { imageFile: file, caption },
        (progress) => {
          setUploadProgress(progress);
        }
      );

      onShowToast({
        type: 'success',
        title: 'Post Published!',
        message: 'Your image has been uploaded to ImageKit and saved.',
      });

      onPostCreated(newPost);
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to upload post. Please try again.');
      setIsUploading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-xl animate-fade-in"
      onClick={!isUploading ? onClose : undefined}
    >
      <div
        className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white tracking-tight">Create New Post</h3>
          </div>
          <button
            onClick={onClose}
            disabled={isUploading}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition disabled:opacity-30"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs animate-shake">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Image Upload Area */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Image <span className="text-rose-400">*</span>
            </label>

            {!preview ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all duration-200 group flex flex-col items-center justify-center ${
                  isDragging
                    ? 'border-indigo-500 bg-indigo-500/10 scale-[1.01]'
                    : 'border-slate-800 hover:border-slate-700 bg-slate-950/50 hover:bg-slate-950/80'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files && handleFileChange(e.target.files[0])}
                  className="hidden"
                />
                <div className="w-14 h-14 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-400 group-hover:text-indigo-400 group-hover:scale-110 transition-all mb-3 shadow-lg">
                  <UploadCloud className="w-7 h-7" />
                </div>
                <p className="text-sm font-semibold text-slate-200 mb-1">
                  Drag and drop your image here, or <span className="text-indigo-400 underline">browse</span>
                </p>
                <p className="text-xs text-slate-500">Supports PNG, JPG, WebP up to 10MB</p>
              </div>
            ) : (
              <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 group">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full max-h-64 object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 opacity-90 transition-opacity" />

                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    disabled={isUploading}
                    className="p-2 rounded-xl bg-slate-900/80 text-rose-400 hover:text-white hover:bg-rose-600 transition shadow-lg backdrop-blur-md"
                    title="Remove image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center gap-2 truncate">
                    <ImageIcon className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                    <span className="truncate">{file?.name}</span>
                  </div>
                  <span className="font-mono text-slate-400">
                    {(file?.size / (1024 * 1024)).toFixed(2)} MB
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Caption Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Caption
              </label>
              <span className="text-xs text-slate-500">{caption.length}/500</span>
            </div>
            <textarea
              ref={captionInputRef}
              rows={3}
              maxLength={500}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write an inspiring caption, describe the moment, or add #hashtags..."
              disabled={isUploading}
              className="w-full bg-slate-950/70 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition resize-none"
            />

            {/* Quick Emoji Bar */}
            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
              <span className="text-xs text-slate-500 mr-1">Quick emoji:</span>
              {EMOJI_PRESETS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => handleInsertEmoji(emoji)}
                  disabled={isUploading}
                  className="px-2 py-0.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-xs text-slate-300 hover:scale-110 active:scale-95 transition"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Progress Bar during upload */}
          {isUploading && (
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Uploading to ImageKit...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800/80">
            <button
              type="button"
              onClick={onClose}
              disabled={isUploading}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading || !file}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-sm font-semibold shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-4 h-4" />
                  <span>Share Post</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
