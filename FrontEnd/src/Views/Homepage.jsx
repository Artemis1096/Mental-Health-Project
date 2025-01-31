import Footer from "../Components/Footer";
import HomeComponent from "../Components/HomeComponent";

function Homepage() {
  return (
    <div className="min-h-screen flex flex-col overflow-y-auto">
      {/* Section 1: Hero Section */}
      <section className="bg-blue-600 text-white py-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Homepage</h1>
          <p className="text-xl mb-6">
            Discover the best products and services we offer for you.
          </p>
          <button className="bg-white text-blue-600 py-2 px-6 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
            Get Started
          </button>
        </div>
      </section>

      {/* Section 2: About Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-6">About Us</h2>
          <p className="text-lg text-gray-700 text-center">
            We are committed to providing the best services to our customers
            with a focus on quality, innovation, and customer satisfaction.
          </p>
        </div>
      </section>

      {/* Section 3: Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Feature 1</h3>
              <p className="text-gray-700">
                Our first feature offers unparalleled performance and ease of
                use for all your needs.
              </p>
            </div>
            <div className="bg-blue-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Feature 2</h3>
              <p className="text-gray-700">
                Our second feature is designed to integrate seamlessly with your
                workflow, saving time and effort.
              </p>
            </div>
            <div className="bg-blue-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Feature 3</h3>
              <p className="text-gray-700">
                The third feature provides powerful tools to enhance
                productivity and efficiency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Testimonials Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">What Our Clients Say</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md w-80">
              <p className="text-lg text-gray-700 mb-4">
                "This product has transformed the way I do business. It's truly
                remarkable."
              </p>
              <h4 className="font-semibold">John Doe</h4>
              <p className="text-gray-500">CEO, Company</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md w-80">
              <p className="text-lg text-gray-700 mb-4">
                "Exceptional quality and customer service. Highly recommend!"
              </p>
              <h4 className="font-semibold">Jane Smith</h4>
              <p className="text-gray-500">Founder, Startup</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Contact Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
          <p className="text-lg mb-8">
            Have any questions? We're here to help. Reach out to us, and we'll
            get back to you as soon as possible.
          </p>
          <button className="bg-white text-blue-600 py-2 px-6 rounded-lg font-semibold hover:bg-gray-100 transition duration-300">
            Contact Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Homepage;
