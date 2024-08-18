import { useEffect, useState, useCallback } from "react";
import { FaAngleDown, FaArrowAltCircleLeft, FaCheckCircle, FaShieldAlt, FaStar, FaStarHalf } from "react-icons/fa";
import { useCart } from "../context/Context";
import { productData2, subProductData2 } from "../data/Data";
import OpenInfo from "./OpenInfo";

const Product2 = () => {
  // Context hook to access the cart functionality
  const { addToCart } = useCart();

  // State to manage the current product displayed
  const [currentProduct, setCurrentProduct] = useState(productData2[0]);
  // State to manage the selected size (25oz or 34oz)
  const [selectedSize, setSelectedSize] = useState(0);
  // State to control the visibility of the information modal
  const [openInfoModal, setOpenInfoModal] = useState(false);
  // State to manage the selected currency
  const [currency, setCurrency] = useState("USD");

  // State to manage the selected radio button
  const [selectedRadio, setSelectedRadio] = useState(0);

  // Conversion rates for different currencies
  const conversionRates = {
    USD: 1,
    INR: 82,
    EUR: 0.93,
  };

  // Symbols for different currencies
  const currencySymbols = {
    USD: "$",
    INR: "₹",
    EUR: "€",
  };

  // Function to convert price based on the selected currency
  const convertPrice = useCallback(
    (price) => {
      return (price * conversionRates[currency]).toFixed(2);
    },
    [currency] // Dependency array to re-calculate price when currency changes
  );

  // Handler for updating the current product based on radio button selection
  const handleButtonClick9 = (x) => {
    setSelectedRadio(x);
    const selectedProduct = productData2[x];
    setCurrentProduct((prevProduct) => ({
      ...prevProduct,
      textName: selectedProduct.textName,
      image: selectedProduct.image,
      heading: selectedProduct.heading,
    }));
  };

  // Handler for updating product details based on selected sub-product
  const handleSubProductClick = (x) => {
    const subSelectedProduct = subProductData2[x];
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

    // Set selected size based on sub-product
    setSelectedSize(x === 1 ? 1 : 0);
  };

  // Handler to add the current product to the cart with converted price
  const handleAddToCartClick = useCallback(() => {
    addToCart({
      ...currentProduct,
      price: `${currencySymbols[currency]}${convertPrice(currentProduct.sellingPrice)}`,
    });
  }, [addToCart, currentProduct, currencySymbols, currency, convertPrice]);

  // Update the current product when the selected radio button changes
  useEffect(() => {
    setCurrentProduct(productData2[selectedRadio]);
  }, [selectedRadio]);

  return (
    <section className="p-6" id="bottle2">
      <div className="buy-page_content grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        <div
          className={`image_cont flex justify-center items-center ${selectedSize === 1 ? "scaled" : "bg-gray-50 p-4 "
            }`}
        >
          <img
            src={currentProduct.image}
            alt={`image ${currentProduct.image}`}
            className="w-full max-w-2xl bg-gray-50 "
          />
        </div>
        <div className="p-4 text-cyan-800 text-lg">
          <h1>{currentProduct.heading}</h1>
          <div className="money_text">
            <p id="cp" className="flex text-xl">
              <span className="line-through text-gray-500 flex ">
                <span className="">{currencySymbols[currency]}</span>
                {convertPrice(currentProduct.costPrice)}
              </span>
              <span className="text-red-500">
                {currencySymbols[currency]}
                {convertPrice(currentProduct.sellingPrice)}
              </span>
            </p>
            <p className="SavePrice text-sm">
              <span className="bg-cyan-500 rounded-full p-[2px]">
                {currencySymbols[currency]}
                {currentProduct.save}
              </span>
            </p>
          </div>
          <p className="text-sm text-green-600 gap-1">
            {currencySymbols[currency]}
            {currentProduct.discount} <span>off</span>
          </p>
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
            <p className="flex text-yellow-500">
              <FaStar /> <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </p>
            <p className="ml-2 text-neutral-500">1630 reviews</p>
          </div>

          <p id="size">size</p>
          <div className="buy_page_butt w-full mb-4 flex gap-2 pb-2">
            <button
              onClick={() => handleSubProductClick(0)}
              className={`w-full text-white px-4 py-2 rounded ${selectedSize === 0
                ? "border-2 border-yellow-600 bg-cyan-950"
                : "bg-cyan-950"
                }`}
            >
              25oz
            </button>
            <button
              onClick={() => handleSubProductClick(1)}
              className={`w-full text-white px-4 py-2 rounded ${selectedSize === 1
                ? "border-2 border-yellow-600 bg-cyan-950"
                : "bg-cyan-950"
                }`}
            >
              34oz
            </button>
          </div>
          <div className="bottle_color_change2">
            <fieldset>
              <legend>{currentProduct.textName}</legend>

              <div className="radioo2">
                <input
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

              <div className="radioo3">
                <input
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
            </fieldset>
          </div>
          <div className="add-to__cart">
            <button
              onClick={handleAddToCartClick}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Add to Cart - {currencySymbols[currency]}
              {convertPrice(currentProduct.sellingPrice)}
            </button>
          </div>
          {/* pop window content */}
          <div className="flex items-center justify-center pb-3 pt-2">
            <p>
              Or 4 interest-free installments of $27.75
            </p>
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

export default Product2;
