const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div
        role="status"
        className="animate-spin rounded-full border-t-4 border-blue-500 
            h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24"
      ></div>
    </div>
  );
};

export default Loading;
