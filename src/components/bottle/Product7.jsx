import { useEffect, useState } from "react";

// Importing icons from react-icons library
import {
  FaAngleDown,
  FaArrowAltCircleLeft,
  FaCheckCircle,
  FaShieldAlt,
  FaStar,
  FaStarHalf,
} from "react-icons/fa";

// Importing useCart hook for managing cart operations
import { useCart } from "../context/Context";
// Importing product data from external files
import { productData7 } from "../data/Data";
import { subProductData7 } from "../data/Data";
// Importing OpenInfo component for handling pop-up modals
import OpenInfo from "./OpenInfo";

const Product7 = () => {
  // Hook to access the addToCart function from the cart context
  const { addToCart } = useCart();

  // State to store the current product's data
  const [currentProduct, setCurrentProduct] = useState(productData7[0]);
  // State to track the selected size (25oz or 34oz)
  const [selectedSize, setSelectedSize] = useState(0);
  // State to manage the visibility of the info modal
  const [openInfoModal, setOpenInfoModal] = useState(false);
  // State to store the selected currency (default is USD)
  const [currency, setCurrency] = useState('USD');
  // State to track the selected radio button for product variation
  const [selectedRadio, setSelectedRadio] = useState(0);

  // Currency conversion rates
  const conversionRates = {
    USD: 1,
    INR: 82,
    EUR: 0.93
  };

  // Symbols associated with each currency
  const currencySymbols = {
    USD: '$',
    INR: '₹',
    EUR: '€',
  };

  // Function to convert price based on selected currency
  const convertPrice = (price) => {
    return (price * conversionRates[currency]).toFixed(2);
  };

  /* Alternative approach commented out:
     This uses Intl.NumberFormat for better formatting and precision
  */
  // const convertPrice = (price) => {
  //   return new Intl.NumberFormat('en-US', {
  //     style: 'currency',
  //     currency: currency,
  //     minimumFractionDigits: 2,
  //     maximumFractionDigits: 2,
  //   }).format(price * conversionRates[currency]);
  // };

  // Function to handle selection of a different product variation (via radio buttons)
  const handleButtonClick9 = (x) => {
    setOpenInfoModal(false); // Close the info modal if open
    setSelectedRadio(x); // Update selected radio button index
    const selectedProduct = productData7[x];
    setCurrentProduct((prevProduct) => ({
      ...prevProduct,
      textName: selectedProduct.textName,
      image: selectedProduct.image,
      heading: selectedProduct.heading,
    }));
  };

  // Function to handle size selection (25oz or 34oz)
  const handleSubProductClick = (x) => {
    const subSelectedProduct = subProductData7[x];
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
    // Apply image scaling if the selected size is 34oz
    if (x === 1) {
      setSelectedSize(1); // Update state to reflect 34oz selection
    } else {
      setSelectedSize(0); // Update state to reflect 25oz selection
    }
  };

  // Function to handle "Add to Cart" button click
  const handleAddToCartClick = () => {
    addToCart({
      ...currentProduct,
      price: `${currencySymbols[currency]}${convertPrice(currentProduct.sellingPrice)}`
    });
  };

  // Update the displayed product whenever the selected radio button changes
  useEffect(() => {
    setCurrentProduct(productData7[selectedRadio]);
  }, [selectedRadio]);



  return (
    <section className="p-6" id="bottle7">
      <div className="buy-page_content grid grid-cols-1 md:grid-cols-2 items-center gap-6 p-4">
        <div className={`image_cont flex justify-center items-center ${selectedSize === 1 ? "scaled" : "bg-gray-50 p-8 "}`}>
          <img
            src={currentProduct.image}
            alt={`image ${currentProduct.image}`}
            className="w-full max-w-2xl bg-gray-50 "
          />

        </div>
        <div className="p-4 text-cyan-800 font-semi-bold">
          <h1>{currentProduct.heading}</h1>
          <div className="money_text">
            <p id="cp" className="flex text-xl">
              <span className="line-through text-gray-500 flex ">
                <span className="">{currencySymbols[currency]}</span>{convertPrice(currentProduct.costPrice)}
              </span>
              <span className="text-red-500" >
                {currencySymbols[currency]}{convertPrice(currentProduct.sellingPrice)}
              </span>

            </p>
            <p className="SavePrice text-sm">
              <span className="bg-cyan-500 rounded-full">{currencySymbols[currency]}{currentProduct.save}</span>
            </p>
          </div>
          <p className="text-sm text-green-600 gap-1">{currencySymbols[currency]}{currentProduct.discount}<span>% off</span></p>
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
            <p className="ml-2 text-neutral-500">2230 reviews</p>
          </div>

          <p id="size">size</p>
          <div className="buy_page_butt w-full mb-4 flex gap-2">
            <button
              onClick={() => handleSubProductClick(0)}
              className={`w-full text-white px-4 py-2 rounded ${selectedSize === 0 ? 'border-2 border-yellow-600 bg-cyan-950' : 'bg-cyan-950'}`}
            >
              25oz
            </button>
            <button
              onClick={() => handleSubProductClick(1)}
              className={`w-full text-white px-4 py-2 rounded ${selectedSize === 1 ? 'border-2 border-yellow-600 bg-cyan-950' : 'bg-cyan-950'}`}
            >
              34oz
            </button>
          </div>
          <div className="bottle_color_change7">
            <fieldset>
              <legend>{currentProduct.textName}</legend>

              <div className="radioo1">
                <input style={{ backgroundColor: "#0c0c0c", borderWidth: "rgb(156, 196, 206)", borderColor: "#e6e6e6" }}
                  checked={selectedRadio === 0}
                  onChange={() => {
                    handleButtonClick9(0);
                  }}
                  type="radio"
                  id="bottt1"
                  name="flavor"
                  value="vanilla"
                />
              </div>

              <div className="radioo2">
                <input style={{ backgroundColor: "rgb(7,68 ,11)", borderWidth: "rgb(156, 196, 206)", borderColor: "#e6e6e6" }}
                  checked={selectedRadio === 1}
                  onChange={() => {
                    handleButtonClick9(1);
                  }}
                  type="radio"
                  id="bottt2"
                  name="flavor"
                  value="chocolate"
                />
              </div>

              <div className="radioo4">
                <input
                  checked={selectedRadio === 2}
                  onChange={() => {
                    handleButtonClick9(2);
                  }}
                  type="radio"
                  id="bottt3"
                  name="flavor"
                  value="strawberry"
                />
              </div>
              <div className="radioo3">
                <input
                  checked={selectedRadio === 3}
                  onChange={() => {
                    handleButtonClick9(3);
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
            <button onClick={handleAddToCartClick}>
              {currentProduct.toCart}
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
    </section>
  );
};

export default Product7;
