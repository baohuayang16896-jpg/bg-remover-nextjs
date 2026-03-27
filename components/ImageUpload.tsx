'use client';

import { useCallback } from 'react';

interface ImageUploadProps {
  onUpload: (file: File) => void;
}

export default function ImageUpload({ onUpload }: ImageUploadProps) {
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onUpload(file);
    }
  }, [onUpload]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onUpload(file);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-4 border-dashed border-purple-300 rounded-2xl p-16 text-center hover:border-purple-500 hover:bg-purple-50 transition-all cursor-pointer"
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
        id="fileInput"
      />
      <label htmlFor="fileInput" className="cursor-pointer">
        <svg className="w-16 h-16 mx-auto mb-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p className="text-xl text-gray-700 mb-2">点击或拖拽图片到此处</p>
        <p className="text-sm text-gray-500">支持 JPG、PNG 格式</p>
      </label>
    </div>
  );
}
