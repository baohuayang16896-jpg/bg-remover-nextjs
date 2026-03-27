export default function LoadingSpinner() {
  return (
    <div className="text-center py-16">
      <div className="inline-block w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600">正在处理中...</p>
    </div>
  );
}
