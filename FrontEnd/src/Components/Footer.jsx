function Footer() {
  return (
    <div className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Footer Section 1: Text/Description */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h1 className="text-2xl font-semibold">This is the footer</h1>
            <p className="mt-2 text-sm">
              Your go-to platform for all things related to mental health.
            </p>
          </div>

          {/* Footer Section 2: Links */}
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-center">
            <a href="/about" className="text-sm text-gray-400 hover:text-white">
              About Us
            </a>
            <a
              href="/contact"
              className="text-sm text-gray-400 hover:text-white"
            >
              Contact
            </a>
            <a
              href="/privacy"
              className="text-sm text-gray-400 hover:text-white"
            >
              Privacy Policy
            </a>
            <a href="/terms" className="text-sm text-gray-400 hover:text-white">
              Terms & Conditions
            </a>
          </div>

          {/* Footer Section 3: Social Media Icons */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://facebook.com"
              className="text-gray-400 hover:text-blue-600"
            >
              <i className="fab fa-facebook-square text-2xl"></i>
            </a>
            <a
              href="https://twitter.com"
              className="text-gray-400 hover:text-blue-400"
            >
              <i className="fab fa-twitter-square text-2xl"></i>
            </a>
            <a
              href="https://instagram.com"
              className="text-gray-400 hover:text-pink-500"
            >
              <i className="fab fa-instagram-square text-2xl"></i>
            </a>
            <a
              href="https://linkedin.com"
              className="text-gray-400 hover:text-blue-700"
            >
              <i className="fab fa-linkedin text-2xl"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
