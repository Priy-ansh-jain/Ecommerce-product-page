import { useState, useEffect } from "react";
import {
  FaAngleDown,
  FaArrowAltCircleLeft,
  FaCheckCircle,
  FaShieldAlt,
  FaStar,
  FaStarHalf,
} from "react-icons/fa";
import { useCart } from "../context/Context";
import { productData5 } from "../data/Data";
import { subProductData5 } from "../data/Data";
import OpenInfo from "./OpenInfo";

const Product5 = () => {
  // Hook for managing cart functionality
  const { addToCart } = useCart();

  // State to manage the currently selected product
  const [currentProduct, setCurrentProduct] = useState(productData5[0]);
  // State to manage the selected size (17oz or 24oz)
  const [selectedSize, setSelectedSize] = useState(0);
  // State to track the active size for styling
  const [activeSize, setActiveSize] = useState(0);
  // State to manage the visibility of the information modal
  const [openInfoModal, setOpenInfoModal] = useState(false);
  // State to manage the selected radio button (product variation)
  const [selectedRadio, setSelectedRadio] = useState(0);
  // State to manage the selected currency
  const [currency, setCurrency] = useState('USD');

  // Handle the selection of different product variations (e.g., flavor)
  const handleButtonClick10 = (x) => {
    setOpenInfoModal(false); // Close the info modal
    setSelectedRadio(x); // Update selected radio option
    const selectedProduct = productData5[x];
    // Update currentProduct state based on selected product variation
    setCurrentProduct((prevProduct) => ({
      ...prevProduct,
      textName: selectedProduct.textName,
      image: selectedProduct.image,
      heading: selectedProduct.heading,
    }));
  };

  // Handle the selection of different product sizes (e.g., 17oz, 24oz)
  const handleSubProductClick = (x) => {
    const subSelectedProduct = subProductData5[x];
    // Update currentProduct state based on selected size
    const updatedProduct = {
      ...currentProduct,
      costPrice: subSelectedProduct.costPrice,
      sellingPrice: subSelectedProduct.sellingPrice,
      toCart: subSelectedProduct.toCart,
      textPrice: subSelectedProduct.textPrice,
      save: subSelectedProduct.save,
      title: subSelectedProduct.title,
    };
    setCurrentProduct(updatedProduct);
    setActiveSize(x); // Update active size for styling
    // Apply image scale for 25oz
    if (x === 1) {
      setSelectedSize(1);
    } else {
      setSelectedSize(0);
    }
  };

  // Conversion rates for different currencies
  const conversionRates = {
    USD: 1,
    INR: 82,
    EUR: 0.93
  };
  // Symbols for different currencies
  const currencySymbols = {
    USD: '$',
    INR: '₹',
    EUR: '€',
  };

  // Function to convert the price based on the selected currency
  const convertPrice = (price) => {
    return (price * conversionRates[currency]).toFixed(2);
  };

  // Handle the addition of the current product to the cart
  const handleAddToCartClick = () => {
    addToCart({ ...currentProduct, price: `${currencySymbols[currency]}${convertPrice(currentProduct.sellingPrice)}` });
  };

  // Effect hook to update the current product when the selected radio option changes
  useEffect(() => {
    setCurrentProduct(productData5[selectedRadio]);
  }, [selectedRadio]);

  return (
    <section className="p-6" id="bottle5">
      <div className="buy-page_content grid grid-cols-1 md:grid-cols-2 gap-8 p-4 ">
        <div className={`image_cont flex justify-center items-center ${selectedSize === 1 ? "scaled" : "bg-gray-50 "}`}>
          <img
            src={currentProduct.image}
            alt={`image ${currentProduct.image}`}
            className="w-full max-w-xl"
          />

        </div>
        <div className="p-4 text-cyan-800  text-lg">
          <h1>{currentProduct.heading}</h1>
          <div className="money_text">
            <p id="cp">
              <span className="text-red-500">
                {currencySymbols[currency]}{convertPrice(currentProduct.sellingPrice)}
              </span>
            </p>
          </div>
          <div className="currency-selector mb-4">
            {/* <label htmlFor="currency" className="font-semibold">Currency</label> */}
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
            <p className="ml-2 text-neutral-500">2630 reviews</p>
          </div>

          <p className="bottom-2">size</p>
          <div className="buy_page_butt w-full mb-4 flex gap-2">
            <button
              onClick={() => handleSubProductClick(0)}
              className={`w-full text-white px-4 py-2 rounded ${activeSize === 0 ? 'border-2 border-yellow-600 bg-cyan-950' : 'bg-cyan-950'}`}
            >
              17oz
            </button>
            <button
              onClick={() => handleSubProductClick(1)}
              className={`w-full text-white px-4 py-2 rounded ${activeSize === 1 ? 'border-2 border-yellow-600 bg-cyan-950' : 'bg-cyan-950'}`}
            >
              24oz
            </button>
          </div>
          <div className="">
            <fieldset>
              <legend>{currentProduct.textName}</legend>

              <div className="radio__three">
                <input style={{ backgroundColor: "#0c0c0c", borderWidth: "rgb(156, 196, 206)", borderColor: "#D1D1D0" }}
                  checked={selectedRadio === 0}
                  onChange={() => {
                    handleButtonClick10(0);
                  }}
                  type="radio"
                  id="bottt1"
                  name="flavor"
                  value="vanilla"
                />
              </div>

              <div className="radio__four">
                <input style={{ backgroundColor: "#40826D", borderWidth: "rgb(156, 196, 206)", borderColor: "#e6e6e6" }}
                  checked={selectedRadio === 1}
                  onChange={() => {
                    handleButtonClick10(1);
                  }}
                  type="radio"
                  id="bottt2"
                  name="flavor"
                  value="chocolate"
                />
              </div>

              <div className="radio__five">
                <input style={{ backgroundColor: "rgb(253, 250, 236)", borderWidth: "rgb(156, 196, 206)", borderColor: "#e6e6e6" }}
                  checked={selectedRadio === 2}
                  onChange={() => {
                    handleButtonClick10(2);
                  }}
                  type="radio"
                  id="bottt3"
                  name="flavor"
                  value="strawberry"
                />
              </div>
            </fieldset>
          </div>
          <div className="add-to__cart">
            <button onClick={handleAddToCartClick} className="bg-green-500 text-white px-4 py-2 rounded">
              Add to Cart - {currencySymbols[currency]}{convertPrice(currentProduct.sellingPrice)}
            </button>
          </div>
          {/* pop window content */}
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
          {/* pop window content */}
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
            <p >
              Warranty
            </p>
            <p><FaAngleDown /></p>
          </div>
        </div>
      </div>
    </section >
  );
};

export default Product5;
