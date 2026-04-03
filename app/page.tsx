'use client';
import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import ImageUpload from '@/components/ImageUpload';
import ImageResult from '@/components/ImageResult';
import LoadingSpinner from '@/components/LoadingSpinner';
export default function Home() {
const { data: session, status } = useSession();
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
{/* 顶部登录状态栏 */}
<div className="flex justify-end mb-6">
{status === 'loading' ? (
<div className="text-gray-400 text-sm">加载中...</div>
) : session ? (
<div className="flex items-center gap-3">
{session.user?.image && (
<img src={session.user.image} alt="avatar" className="w-8 h-8 rounded-full" />
)}
<span className="text-sm text-gray-700">{session.user?.name}</span>
<button
onClick={() => signOut()}
className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 text-sm"
>
退出登录
</button>
</div>
) : (
<button
onClick={() => signIn('google')}
className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm flex items-center gap-2"
>
<svg className="w-4 h-4" viewBox="0 0 24 24">
<path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
<path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
<path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
<path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
</svg>
用 Google 登录
</button>
)}
</div>
<h1 className="text-4xl font-bold text-center text-gray-800 mb-3">
🎨 AI背景移除
</h1>
<p className="text-center text-gray-600 mb-8">
一键去除图片背景，快速生成透明图
</p>
{/* 未登录提示 */}
{!session && status !== 'loading' && (
<div className="text-center text-gray-500 py-12">
<p className="mb-4">请先登录以使用背景移除功能</p>
<button
onClick={() => signIn('google')}
className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 font-medium"
>
用 Google 登录
</button>
</div>
)}
{/* 已登录内容 */}
{session && (
<>
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
</>
)}
</div>
</div>
</main>
);
}
