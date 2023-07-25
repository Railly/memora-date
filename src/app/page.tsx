export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen p-5 bg-gray-100 min-w-screen">
      <div className="flex space-x-2 animate-pulse">
        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
        <div className="w-3 h-3 rounded-full bg-emerald-600"></div>
        <div className="w-3 h-3 rounded-full bg-emerald-700"></div>
      </div>
    </div>
  );
}
