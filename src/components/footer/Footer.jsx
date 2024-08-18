import {
  FaArrowRight,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white py-10 px-10 items-center">
      <div className="container mx-auto lg:grid grid-cols-2 xl:grid-cols-3 gap-10">
        {/* Left Section */}
        <div className="lg:col-span-1">
          <h1 className="text-3xl font-bold mb-4">Become an Insider</h1>
          <h3 className="text-lg mb-6">
            Receive exclusive offers, hydration news, and more when you
            subscribe.
          </h3>
          <div className="flex items-center mb-6">
            <input
              type="email"
              placeholder="Email address"
              className="p-3 rounded-l-lg bg-gray-800 text-white focus:outline-none w-full"
            />
            <button className="bg-blue-500 p-3 rounded-r-lg text-white">
              <FaArrowRight />
            </button>
          </div>

          <div className="flex space-x-4 mb-6">
            <a href="#" className="text-xl hover:text-blue-500">
              <FaFacebook />
            </a>
            <a href="#" className="text-xl hover:text-pink-500">
              <FaInstagram />
            </a>
            <a href="#" className="text-xl hover:text-red-500">
              <FaYoutube />
            </a>
            <a href="#" className="text-xl hover:text-blue-400">
              <FaTwitter />
            </a>
          </div>
          <div className="flex space-x-6 text-sm bg-white p-3 items-center">
            <button id="us" className="bg-gray-800 px-3 py-2 rounded-md">
              US
            </button>
            <div className="text-black font-semi-bold  gap-2 flex ">
              <a href="#" className="hover:underline">Term & Services</a>
              <a href="#" className="hover:underline">Accessibility</a>
            </div>
          </div>
          <div className="flex items-center gap-2 pt-4">
            <a href="#" className="text-sm hover:underline ">
              <FaRegCopyright />
            </a>
            <span className="">2024</span>
          </div>
        </div>

        <div className="grid grid-cols-2 ">
          <div>
            <ul className="space-y-3">
              <li><a href="#" className="hover:underline">FAQ</a></li>
              <li><a href="#" className="hover:underline">Reviews</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
              <li><a href="#" className="hover:underline">Find a retailer</a></li>
              <li><a href="#" className="hover:underline">Corporate gifting</a></li>
            </ul>
          </div>
          <div>
            <ul className="space-y-3">
              <li><a href="#" className="hover:underline">basq magazine</a></li>
              <li><a href="#" className="hover:underline">Press</a></li>
              <li><a href="#" className="hover:underline">Our story</a></li>
              <li><a href="#" className="hover:underline">Affiliate program</a></li>
              <li><a href="#" className="hover:underline">Ambassador program</a></li>
            </ul>
          </div>
        </div>


        {/* Image Section */}
        <div className="flex justify-center lg:justify-end md:justify-start items-center mt-4">
          <img
            src={
              "https://res.cloudinary.com/larq/image/upload/e_replace_color:f5f9fc:100:white/v1682247434/v3-images/footer/bicycle-animation.gif"
            }
            alt="Bicycle Animation"
            className="h-auto w-auto"
          />

        </div>
      </div>

    </footer>
  );
};

export default Footer;
