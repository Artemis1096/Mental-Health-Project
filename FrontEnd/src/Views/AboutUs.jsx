import about from "../Assets/about.png";

//Please add comment when adding or fixing anything in the code.

const AboutUs = () => {
  return (
    <>
      <div className="h-screen overflow-y-auto bg-white p-6" id="aboutus">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-6">
            About Us
          </h1>
          <p className="text-lg text-center text-gray-700 mb-10">
            We are a passionate group of developers committed to improving
            mental health through technology. Our app is designed to provide
            support, guidance, and a safe space for individuals seeking mental
            well-being.
          </p>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-blue-500">Our Mission</h2>
              <p className="text-gray-600">
                Our mission is to leverage technology to create a supportive
                environment where people can access mental health resources,
                track their well-being, and connect with a like-minded
                community.
              </p>

              <h2 className="text-2xl font-bold text-blue-500">
                Why Choose Us?
              </h2>
              <ul className="list-disc pl-5 text-gray-600">
                <li>A safe and inclusive community</li>
                <li>Personalized wellness tracking tools</li>
              </ul>
            </div>

            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src={about}
                alt="Teamwork"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-blue-500 mb-4">Join Us</h2>
            <p className="text-gray-700">
              Become a part of our mission to revolutionize mental health care.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
