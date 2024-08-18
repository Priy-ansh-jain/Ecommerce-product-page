// Import React hooks and components
import { useEffect, useState, useCallback } from "react";

// Import icons from react-icons
import {
  FaAngleDown,
  FaArrowAltCircleLeft,
  FaCheckCircle,
  FaShieldAlt,
  FaStar,
  FaStarHalf,
} from "react-icons/fa";

// Import custom hooks and data
import { useCart } from "../context/Context"; // Custom hook to access cart context
import { productData1 } from "../data/Data"; // Data for the products
import OpenInfo from "./OpenInfo"; // Import the OpenInfo component

const Product1 = () => {
  // Destructure addToCart function from the cart context
  const { addToCart } = useCart();

  // State to manage the current product displayed
  const [currentProduct, setCurrentProduct] = useState(productData1[0]);

  // State to manage the active size selection
  const [activeSize, setActiveSize] = useState(0);

  // State to manage the visibility of the information modal
  const [openInfoModal, setOpenInfoModal] = useState(false);

  // State to manage the current currency for pricing
  const [currency, setCurrency] = useState('USD');

  // State to manage the price converted to the current currency
  const [convertedPrice, setConvertedPrice] = useState(currentProduct.sellingPrice);

  // Conversion rates for different currencies
  const conversionRates = {
    USD: 1,
    INR: 82,
    EUR: 0.93
  };

  // Currency symbols for display
  const currencySymbols = {
    USD: '$',
    INR: '₹',
    EUR: '€',
  };

  // Function to convert price based on the selected currency
  const convertPrice = useCallback((price) => {
    return (price * conversionRates[currency]).toFixed(2);
  }, [currency]);

  // Update current product and converted price when active size or currency changes
  useEffect(() => {
    setCurrentProduct(productData1[activeSize]);
    setConvertedPrice(convertPrice(productData1[activeSize].sellingPrice));
  }, [activeSize, currency, convertPrice]);

  // Handle size button click to update the current product and active size
  const handleButtonClick8 = (x) => {
    const selectedProduct = productData1[x];
    setCurrentProduct(selectedProduct);
    setActiveSize(x);
  };

  // Handle "Add to Cart" button click to add the current product to the cart
  const handleAddToCartClick = () => {
    const productToAdd = {
      ...currentProduct,
      price: convertedPrice,
      currency: currencySymbols[currency],
    };
    addToCart(productToAdd);
  };

  return (
    <section className=" p-6" id="bottle1">
      <div className="buy-page_content grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="image_cont flex justify-center items-center p-4 bg-gray-50">
          {/* Display the current product image */}
          <img
            src={currentProduct.image}
            alt={`image ${currentProduct.image}`}
            className="w-full max-w-2xl"
          />
        </div>
        <div className="buy_content p-4">
          {/* Display product heading */}
          <h1 className="text-lg font-bold text-cyan-800">{currentProduct.heading}</h1>
          {/* Display dynamic price section */}
          <div className="money_text">
            <p id="cp" className="text-xl flex gap-1">
              <span className="line-through  flex text-gray-500">
                <span className="">{currencySymbols[currency]}</span>{convertPrice(currentProduct.costPrice)}
              </span>
              <span className="text-red-500">
                {currencySymbols[currency]}{convertPrice(currentProduct.sellingPrice)}
              </span>
            </p>
            <p className="SavePrice text-sm">
              <span className="bg-cyan-500 rounded-full  p-[2px]">{currencySymbols[currency]}{currentProduct.save}</span>
            </p>
          </div>
          {/* Display discount */}
          <p className="text-sm text-green-600 gap-1">{currencySymbols[currency]}{currentProduct.discount} <span>off</span></p>

          {/* Currency selector */}
          <div className="currency-selector mb-4">
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="border p-1 border-cyan-800 text-cyan-800 rounded mt-2"
            >
              <option value="USD">USD</option>
              <option value="INR">INR</option>
              <option value="EUR">EUR</option>
            </select>
          </div>

          {/* Size selection buttons */}
          <div className=" flex items-center mb-4">
            <p className="flex  text-yellow-500"><FaStar /> <FaStar /><FaStar /><FaStar /><FaStarHalf /></p>
            <p className="ml-2 text-emerald-500">63 reviews</p>
          </div>
          <p id="size" className="font-semibold mb-2">Size</p>
          <div className="buy_page_butt w-full mb-4 flex gap-2">
            <button
              onClick={() => handleButtonClick8(0)}
              className={`w-full text-white px-4 py-2 rounded ${activeSize === 0 ? 'border-2 border-yellow-600 bg-cyan-950' : 'bg-cyan-950'}`}
            >
              25oz
            </button>
            <button
              onClick={() => handleButtonClick8(1)}
              className={`w-full text-white px-4 py-2 rounded ${activeSize === 1 ? 'border-2 border-yellow-600 bg-cyan-950' : 'bg-cyan-950'}`}
            >
              34oz
            </button>
          </div>
          {/* Add to Cart button */}
          <div className="add-to__cart mb-4">
            <button onClick={handleAddToCartClick} className="bg-green-500 text-white px-4 py-2 rounded">
              Add to Cart $ - {currencySymbols[currency]}{convertPrice(currentProduct.sellingPrice)}
            </button>
          </div>
          <div className="flex items-center justify-center pb-3">
            <p>Or 4 interest-free installments of
              $27.75</p>
            <OpenInfo
              openInfoModal={openInfoModal}
              setOpenInfoModal={setOpenInfoModal}
              currencySymbols={currencySymbols}
              currency={currency}
            />
          </div>
          <p className="flex items-center justify-center">Free shipping within the contiguous U.S. on orders over $80.</p>
          <div className="warranty-icon mb-4 flex flex-wrap">
            <p className="warranty flex items-center mr-4">
              <span className="text-green-500 mr-2">
                <FaCheckCircle />
              </span>
              1 year warranty
            </p>
            <p className="warranty flex items-center mr-4">
              <span className="text-blue-500 mr-2">
                <FaArrowAltCircleLeft />
              </span>
              Free Returns
            </p>
            <p className="warranty flex items-center">
              <span className="text-gray-600 mr-2">
                <FaShieldAlt />
              </span>
              Secure checkout
            </p>
          </div>
          <hr className="my-4" />
          <div className="mb-4">
            <p>
              Be a hydro homie and gift these to your friends (or keep them to
              yourself). LARQ Bottle Swig Top is perfect for large capacity
              drinking on the go. Its wide-mouth design is an ice lovers dream.
            </p>
          </div>
          <hr className="my-4" />
          <div className="country flex justify-between items-center">
            <p>
              Warranty
            </p>
            <p><FaAngleDown /></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product1;
