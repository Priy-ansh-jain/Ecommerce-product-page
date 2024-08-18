import { useState, useEffect } from "react";

import {
  FaAngleLeft,
  FaArrowAltCircleLeft,
  FaCheckCircle,
  FaShieldAlt,
  FaStar,
  FaStarHalf,
} from "react-icons/fa";
// Import custom hooks and data
import { useCart } from "../context/Context"; // Custom hook for cart functionality
import { productData4, subProductData4 } from "../data/Data"; // Product and sub-product data
import Dropdown from "./dropdown/Dropdown"; // Custom dropdown component
import OpenInfo from "./OpenInfo"; // Component to open additional information

// Define the main functional component
const Product4 = () => {
  // Define state variables and their updater functions
  const { addToCart } = useCart(); // Hook to access the addToCart function from context
  const [currentProduct, setCurrentProduct] = useState(productData4[0]); // State to store the current product
  const [subCurrentProduct, setSubCurrentProduct] = useState(subProductData4[0]); // State to store the current sub-product
  const [openInfoModal, setOpenInfoModal] = useState(false); // State to toggle the information modal
  const [currency, setCurrency] = useState('USD'); // State to store the selected currency
  const [selectedRadio, setSelectedRadio] = useState(0); // State to store the selected radio button option (default to 0)

  const conversionRates = {
    USD: 1,
    INR: 82,
    EUR: 0.93
  };

  const currencySymbols = {
    USD: '$',
    INR: '₹',
    EUR: '€',
  };

  const convertPrice = (price) => (price * conversionRates[currency]).toFixed(2);

  // Function to handle button clicks and update selected product and image scale
  const handleButtonClick9 = (x) => {
    setSelectedRadio(x); // Update selected radio button
    setOpenInfoModal(false); // Close the information modal
    setCurrentProduct(productData4[x]); // Update the current product based on selection
    // Apply image scale for 25oz
    if (x === 1) {
      setImageScale(1.1);
    } else {
      setImageScale(1);
    }
  };

  const [imageScale, setImageScale] = useState(1); // State to store the image scale

  // Function to handle sub-product selection and update the current product
  const handleSubProductClick = (x) => {
    const subSelectedProduct = subProductData4[x]; // Get selected sub-product
    setSubCurrentProduct(subSelectedProduct); // Update the sub-product state
    const updatedProduct = {
      ...currentProduct,
      ...subCurrentProduct,
      textPrice: subSelectedProduct.textPrice, // Update textPrice with sub-product value
    };
    setCurrentProduct(updatedProduct); // Update the current product with new values
  };

  // Function to handle adding the product to the cart
  const handleAddToCartClick = () => {
    addToCart({ ...currentProduct, price: `${currencySymbols[currency]}${convertPrice(currentProduct.sellingPrice)}` });
    // Add current product to cart with converted price
  };

  // useEffect hook to update the current product when the selectedRadio changes
  useEffect(() => {
    setCurrentProduct(productData4[selectedRadio]); // Update current product based on selected radio option
  }, [selectedRadio]);

  return (
    <section className="p-6 " id="bottle4">
      <div className="buy-page_content grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="image_cont flex justify-center items-center p-4 bg-gray-50">
          <div className="flex justify-center items-center p-4 bg-gray-50">
            <img className="w-full max-w-2xl bg-gray-50 "
              src={currentProduct.image}
              alt={`image ${currentProduct.image}`}
              style={{ transform: `scale(${imageScale})` }}
            />
          </div>
        </div>
        <div>
          <div className="flex items-center text-cyan-800">
            <a href="">shop</a>
            <FaAngleLeft />
            <a href="">Home</a>
          </div>
          <div >
            <h1 className="text-cyan-800 font-semibold mb-2">{currentProduct.heading}</h1>
            <p className="text-black">With Advance filter</p>
          </div>
          <div className="money_text">
            <p id="cp" className="text-xl flex gap-1">
              <span className="text-red-500 flex">
                <span className="">{currencySymbols[currency]}</span>{convertPrice(currentProduct.sellingPrice)}
              </span>

            </p>

          </div>
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
          <div className=" flex items-center mb-4">
            <p className="flex  text-yellow-500"><FaStar /> <FaStar /><FaStar /><FaStar /><FaStarHalf /></p>
            <p className="ml-2 text-neutral-500">1620 reviews</p>
          </div>

          <div className="bottle_color_change2">
            <fieldset>
              <legend>{currentProduct.textName}</legend>

              <div className="radio__one">
                <input
                  style={{
                    backgroundColor: " #123364",
                    borderWidth: "rgb(156, 196, 206)",
                    borderColor: "#e6e6e6",
                  }}
                  checked={selectedRadio === 0}
                  onChange={() => handleButtonClick9(0)}
                  type="radio"
                  id="bot4"
                  name="flavor"
                  value="vanilla"
                />
              </div>

              <div className="radio__two">
                <input
                  style={{
                    backgroundColor: "ffffff",
                    borderWidth: "rgb(156, 196, 206)",
                    borderColor: "#f0f0f0",
                  }}
                  checked={selectedRadio === 1}
                  onChange={() => handleButtonClick9(1)}
                  type="radio"
                  id="bottt5"
                  name="flavor"
                  value="chocolate"
                />
              </div>
            </fieldset>
          </div>
          <Dropdown />
          <div className="flex items-center gap-2">
            <div className="flex items-center w-full border border-cyan-800 justify-between px-4">
              <button onClick={() => handleSubProductClick(0)}>

                <div className="flex justify-between">
                  <img className="h-12 w-12"
                    src={"https://res.cloudinary.com/larq/images/f_auto,q_auto/v1629224135/LARQ_Pitcher_Filter_Advanced/LARQ_Pitcher_Filter_Advanced.jpg?_i=AA"}
                    alt=""
                  />
                  <div className="gap-1">
                    <p>Ix Advanced</p>
                    <p >
                      <span className=""><span className="line-through">$32.50 </span></span>
                      <span className="text-red-500">$26</span>
                    </p>
                  </div>
                </div>
              </button>
            </div>
            <div className="flex items-center w-full border border-cyan-800 justify-between px-4 ">
              <button onClick={() => handleSubProductClick(1)}>

                <div className="inner__button flex w-full">
                  <img className="h-12 w-12"
                    src={"https://res.cloudinary.com/larq/images/f_auto,q_auto/v1629224141/LARQ_Pitcher_Filter_Essential/LARQ_Pitcher_Filter_Essential.jpg?_i=AA"}
                    alt=""
                  />
                  <div className="gap-1 ">
                    <p>Ix Essential</p>
                    <strong className="line-through">$24.95 </strong>
                    <span className="text-red-500">$19.95</span>
                  </div>
                </div>

              </button>
            </div>
          </div>

          <div className="add-to__cart">
            <button onClick={handleAddToCartClick} className="bg-green-500 text-white px-4 py-2 rounded">
              Add to Cart - {currencySymbols[currency]}{convertPrice(currentProduct.sellingPrice)}
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
        </div>

      </div>


    </section >
  );
};

export default Product4;

