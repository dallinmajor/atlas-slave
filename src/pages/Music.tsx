const Music = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-24 py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-8 text-center">Music</h1>
        <div className="max-w-4xl mx-auto">
          <p className="text-xl text-gray-300 text-center mb-12">
            Check out our latest releases and streaming links
          </p>
          
          {/* Placeholder for music content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Latest Album</h2>
              <p className="text-gray-400">Album artwork and details will go here</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Latest Single</h2>
              <p className="text-gray-400">Single artwork and details will go here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Music;

