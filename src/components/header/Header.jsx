// Import necessary hooks and components from external libraries
import { useEffect, useState } from 'react'; // Import useState hook from React for managing state within the component
import { Link, useLocation } from "react-router-dom"; // Import Link component from React Router for navigation
import CartIcon from "../cart/CartIcon.jsx"; // Import CartIcon component from a local file
import { useCart } from "../context/Context"; // Import useCart hook from a custom context for accessing cart data
import { FaTimes } from "react-icons/fa";
import Cart from "../cart/Cart"; // Import Cart component from a local file

// Define the Header component
const Header = () => {
  // Get cart data from the custom context
  const { cart } = useCart();
  const cartCount = cart.length; // Calculate the number of items in the cart
  const location = useLocation();


  // Define state variables for managing cart and sidebar visibility
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle cart visibility
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen); // Toggle cart visibility
  };

  // Function to close the cart
  const closeCart = () => {
    setIsCartOpen(false); // Set cart visibility to false
  };
  useEffect(() => {
    setIsCartOpen(false);
  }, [location]);

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle the state of the sidebar (open/close)
  };

  // Return the JSX for the Header component
  return (
    <header className="relative flex items-center justify-between p-8 text-cyan-800 font-bold font-sans">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between w-full">
        <Link to="/" aria-label="Homepage" className="text-md font-semi-bold">
          <svg
            width="85"
            height="20"
            viewBox="0 0 85 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M74.7998 16.9523C71.0144 16.9523 67.8164 13.6743 67.8164 9.79426C67.8164 5.91404 71.0144 2.63602 74.7998 2.63602C78.5852 2.63602 81.7831 5.91404 81.7831 9.79426C81.7831 11.2661 81.3218 12.6507 80.5439 13.8033L78.4165 11.642L76.6477 13.4391L78.7948 15.6206C77.654 16.4549 76.272 16.9523 74.7998 16.9523ZM84.7023 18.0283L82.5766 15.8685C83.9015 14.2143 84.6865 12.1116 84.6865 9.79426C84.6865 4.33536 80.3436 0.0597534 74.7998 0.0597534C69.2556 0.0597534 64.9127 4.33536 64.9127 9.79426C64.9127 15.2529 69.2556 19.5288 74.7998 19.5288C77.0548 19.5288 79.1111 18.8211 80.7572 17.6143L82.9335 19.8255L84.7023 18.0283Z"
              fill="#153A5B"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.669189 19.1244V0.462435H3.3895V16.5479H14.4834V19.1244H0.669189Z"
              fill="#153A5B"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M46.914 10.3998H52.6442C55.633 10.3998 56.6933 8.41762 56.6933 6.7196C56.6933 5.0218 55.633 3.0396 52.6442 3.0396H46.914V10.3998ZM55.8915 19.1244L51.8878 12.977H46.914V19.1244H44.1937V0.462457H52.9192C56.8037 0.462457 59.4137 2.97674 59.4137 6.7196C59.4137 9.23828 57.7643 11.3851 55.2114 12.188L54.6711 12.3583L59.339 19.1244H55.8915Z"
              fill="#153A5B"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M23.5083 19.1244L29.222 4.86485L34.8847 19.1244H37.9185L30.7063 1.82419C30.3621 0.998699 29.5655 0.462435 28.6831 0.462435H22.8782V0.945072C22.8782 1.99892 23.719 2.8532 24.7565 2.8532H27.4969L20.4986 19.1244H23.5083Z"
              fill="#153A5B"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.669189 19.1244V0.462435H3.3895V16.5479H14.4834V19.1244H0.669189Z"
              fill="#153A5B"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M46.914 10.3998H52.6442C55.633 10.3998 56.6933 8.41762 56.6933 6.7196C56.6933 5.0218 55.633 3.0396 52.6442 3.0396H46.914V10.3998ZM55.8915 19.1244L51.8878 12.977H46.914V19.1244H44.1937V0.462457H52.9192C56.8037 0.462457 59.4137 2.97674 59.4137 6.7196C59.4137 9.23828 57.7643 11.3851 55.2114 12.188L54.6711 12.3583L59.339 19.1244H55.8915Z"
              fill="#153A5B"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M23.5083 19.1244L29.222 4.86485L34.8847 19.1244H37.9185L30.7063 1.82419C30.3621 0.998699 29.5655 0.462435 28.6831 0.462435H22.8782V0.945072C22.8782 1.99892 23.719 2.8532 24.7565 2.8532H27.4969L20.4986 19.1244H23.5083Z"
              fill="#153A5B"
            ></path>
          </svg>
        </Link>
        <div className="flex items-center space-x-4">
          {/* Button for toggling the sidebar */}
          <button onClick={toggleSidebar} className="text-xl">
            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          <div className="relative cursor-pointer" onClick={toggleCart}>
            {/* On click event use to change state */}
            <CartIcon />
            <span className="absolute -top-2 -right-2 bg-cyan-800 text-white text-xs rounded-full px-2 py-1">
              {cartCount}
            </span>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:flex items-center w-full cursor-pointer">
        <button onClick={toggleSidebar} className="mr-4 text-xl md:hidden">
          <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        <Link to="/" aria-label="Homepage" className="text-md font-semi-bold">
          <svg
            width="85"
            height="20"
            viewBox="0 0 85 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M74.7998 16.9523C71.0144 16.9523 67.8164 13.6743 67.8164 9.79426C67.8164 5.91404 71.0144 2.63602 74.7998 2.63602C78.5852 2.63602 81.7831 5.91404 81.7831 9.79426C81.7831 11.2661 81.3218 12.6507 80.5439 13.8033L78.4165 11.642L76.6477 13.4391L78.7948 15.6206C77.654 16.4549 76.272 16.9523 74.7998 16.9523ZM84.7023 18.0283L82.5766 15.8685C83.9015 14.2143 84.6865 12.1116 84.6865 9.79426C84.6865 4.33536 80.3436 0.0597534 74.7998 0.0597534C69.2556 0.0597534 64.9127 4.33536 64.9127 9.79426C64.9127 15.2529 69.2556 19.5288 74.7998 19.5288C77.0548 19.5288 79.1111 18.8211 80.7572 17.6143L82.9335 19.8255L84.7023 18.0283Z"
              fill="#153A5B"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.669189 19.1244V0.462435H3.3895V16.5479H14.4834V19.1244H0.669189Z"
              fill="#153A5B"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M46.914 10.3998H52.6442C55.633 10.3998 56.6933 8.41762 56.6933 6.7196C56.6933 5.0218 55.633 3.0396 52.6442 3.0396H46.914V10.3998ZM55.8915 19.1244L51.8878 12.977H46.914V19.1244H44.1937V0.462457H52.9192C56.8037 0.462457 59.4137 2.97674 59.4137 6.7196C59.4137 9.23828 57.7643 11.3851 55.2114 12.188L54.6711 12.3583L59.339 19.1244H55.8915Z"
              fill="#153A5B"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M23.5083 19.1244L29.222 4.86485L34.8847 19.1244H37.9185L30.7063 1.82419C30.3621 0.998699 29.5655 0.462435 28.6831 0.462435H22.8782V0.945072C22.8782 1.99892 23.719 2.8532 24.7565 2.8532H27.4969L20.4986 19.1244H23.5083Z"
              fill="#153A5B"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.669189 19.1244V0.462435H3.3895V16.5479H14.4834V19.1244H0.669189Z"
              fill="#153A5B"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M46.914 10.3998H52.6442C55.633 10.3998 56.6933 8.41762 56.6933 6.7196C56.6933 5.0218 55.633 3.0396 52.6442 3.0396H46.914V10.3998ZM55.8915 19.1244L51.8878 12.977H46.914V19.1244H44.1937V0.462457H52.9192C56.8037 0.462457 59.4137 2.97674 59.4137 6.7196C59.4137 9.23828 57.7643 11.3851 55.2114 12.188L54.6711 12.3583L59.339 19.1244H55.8915Z"
              fill="#153A5B"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M23.5083 19.1244L29.222 4.86485L34.8847 19.1244H37.9185L30.7063 1.82419C30.3621 0.998699 29.5655 0.462435 28.6831 0.462435H22.8782V0.945072C22.8782 1.99892 23.719 2.8532 24.7565 2.8532H27.4969L20.4986 19.1244H23.5083Z"
              fill="#153A5B"
            ></path>
          </svg>
        </Link>
        <div className="flex items-center space-x-4 ml-auto">
          <Link to="/technology" className="hover:text-gray-400">TECHNOLOGY</Link>
          <Link to="/faq" className="hover:text-gray-400">FAQ</Link>
          <div className="relative" onClick={toggleCart}>
            <CartIcon />
            <span className="absolute -top-2 -right-2 bg-cyan-800 text-white text-xs rounded-full px-2 py-1">
              {cartCount}
            </span>
          </div>
        </div>
      </div>

      {/* Sidebar Menu */}
      <div className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-40 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
        <div className="w-3/4 bg-gray-100 h-full p-4">
          <button className="text-xl text-black" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <nav className="mt-4">
            <Link to="/shop" className="block py-2 px-4 text-lg hover:bg-gray-200">SHOP ALL</Link>
            <Link to="/purification" className="block py-2 px-4 text-lg hover:bg-gray-200">PURIFICATION</Link>
            <Link to="/home" className="block py-2 px-4 text-lg hover:bg-gray-200">HOME</Link>
            <Link to="/drinkware" className="block py-2 px-4 text-lg hover:bg-gray-200">DRINKWARE</Link>
            <Link to="/technology" className="block py-2 px-4 text-lg hover:bg-gray-200">TECHNOLOGY</Link>
            <Link to="/faq" className="block py-2 px-4 text-lg hover:bg-gray-200">FAQ</Link>
          </nav>
        </div>
      </div>

      {/* Cart Drawer */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-[998] ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}></div>

      <div className={`fixed right-0 top-0 h-full lg:w-[45vw] xl:w-[30vw] bg-gray-100 transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 z-[999] md:w-[55vw] w-full`}>
        <div className="cart_content p-4">
          <button className="text-xl text-black" onClick={closeCart}>
            <FaTimes />
          </button>
          <h6 className="text-lg font-bold">Your Cart</h6>
          <div>
            <Cart />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
