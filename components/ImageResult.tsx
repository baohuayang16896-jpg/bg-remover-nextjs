'use client';

interface ImageResultProps {
  originalImage: string;
  processedImage: string;
  onReset: () => void;
}

export default function ImageResult({ originalImage, processedImage, onReset }: ImageResultProps) {
  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = processedImage;
    a.download = 'removed-bg.png';
    a.click();
  };

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-700">原图</h3>
          <img src={originalImage} alt="原图" className="w-full rounded-xl shadow-lg" />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-700">去背景后</h3>
          <img src={processedImage} alt="结果" className="w-full rounded-xl shadow-lg bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZjBmMGYwIi8+PHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmMGYwZjAiLz48L3N2Zz4=')]" />
        </div>
      </div>
      <div className="flex gap-4 justify-center">
        <button onClick={handleDownload} className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
          下载图片
        </button>
        <button onClick={onReset} className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
          重新上传
        </button>
      </div>
    </div>
  );
}
