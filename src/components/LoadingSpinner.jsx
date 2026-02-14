const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900">
      <div className="relative">
        {/* Outer rotating ring */}
        <div className="absolute inset-0 rounded-full animate-spin">
          <div className="h-20 w-20 rounded-full border-4 border-transparent border-t-slate-500 border-r-slate-600"></div>
        </div>
        
        {/* Inner rotating ring (opposite direction) */}
        <div className="absolute inset-2 rounded-full animate-spin-reverse">
          <div className="h-16 w-16 rounded-full border-4 border-transparent border-b-gray-500 border-l-gray-600"></div>
        </div>
        
        {/* Center glow */}
        <div className="h-20 w-20 rounded-full bg-gradient-to-br from-slate-600/20 to-gray-700/20 backdrop-blur-sm flex items-center justify-center">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-slate-500/30 to-gray-600/30 animate-pulse"></div>
        </div>
        
        {/* Outer glow effect */}
        <div className="absolute inset-0 rounded-full bg-slate-500/5 blur-2xl animate-pulse"></div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-slate-300 font-medium text-lg">{message}</p>
        <div className="flex items-center justify-center space-x-1 mt-3">
          <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
