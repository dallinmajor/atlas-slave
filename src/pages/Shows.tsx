const Shows = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-24 py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-8 text-center">Upcoming Shows</h1>
        <div className="max-w-4xl mx-auto">
          <p className="text-xl text-gray-300 text-center mb-12">
            Catch us live at these upcoming events
          </p>
          
          {/* Placeholder for shows */}
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">Venue Name</h2>
                  <p className="text-gray-400">City, State</p>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                  <p className="text-xl font-semibold">Date TBD</p>
                  <p className="text-gray-400">Time TBD</p>
                </div>
              </div>
            </div>
            <p className="text-center text-gray-400 mt-8">
              More shows coming soon. Stay tuned!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shows;

