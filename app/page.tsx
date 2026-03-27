'use client';

import { useState } from 'react';
import ImageUpload from '@/components/ImageUpload';
import ImageResult from '@/components/ImageResult';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Home() {
  const [originalImage, setOriginalImage] = useState<string>('');
  const [processedImage, setProcessedImage] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleFileUpload = async (file: File) => {
    setError('');
    setOriginalImage(URL.createObjectURL(file));
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/remove-bg', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('处理失败，请重试');
      }

      const blob = await response.blob();
      setProcessedImage(URL.createObjectURL(blob));
    } catch (err) {
      setError(err instanceof Error ? err.message : '处理失败');
      setOriginalImage('');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setOriginalImage('');
    setProcessedImage('');
    setError('');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-3">
            🎨 AI背景移除
          </h1>
          <p className="text-center text-gray-600 mb-8">
            一键去除图片背景，快速生成透明图
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
              {error}
            </div>
          )}

          {!originalImage && !loading && (
            <ImageUpload onUpload={handleFileUpload} />
          )}

          {loading && <LoadingSpinner />}

          {processedImage && (
            <ImageResult
              originalImage={originalImage}
              processedImage={processedImage}
              onReset={handleReset}
            />
          )}
        </div>
      </div>
    </main>
  );
}
