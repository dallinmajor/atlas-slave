const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-24 py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-8 text-center">About Us</h1>
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-lg p-8 mb-8">
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Welcome to Atlas Slave. We are a band passionate about creating music that resonates 
              with our audience and tells our story through sound.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Formed with a shared vision and love for music, we've been crafting our unique sound 
              and connecting with fans around the world. Our journey is just beginning, and we're 
              excited to share it with you.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Stay connected with us through our music, live shows, and social media. Thank you for 
              being part of our musical journey.
            </p>
          </div>
          
          {/* Band Members Section */}
          <h2 className="text-3xl font-semibold mb-6 text-center">Band Members</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {membersList.map((member) => (
              <div key={member.name} className="bg-gray-800 rounded-lg p-6 text-center">
                <div className="w-32 h-32 bg-gray-700 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">Member {member.name}</h3>
                <p className="text-gray-400">{member.instrument}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const membersList = [
  {
    name: 'Dallin Major',
    instrument: 'Vocals + Guitar',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Chris Burt',
    instrument: 'Drums',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Matt Gonzalez',
    instrument: 'Guitar',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Levi Wunderlich',
    instrument: 'Bass',
    image: 'https://via.placeholder.com/150',
  },
]

export default About;

