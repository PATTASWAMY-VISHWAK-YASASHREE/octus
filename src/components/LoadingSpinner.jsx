const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark-950">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-dark-700 border-t-primary-500"></div>
        <div className="absolute inset-0 rounded-full bg-primary-500/10 blur-xl"></div>
      </div>
      <p className="mt-6 text-dark-300 font-medium">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
