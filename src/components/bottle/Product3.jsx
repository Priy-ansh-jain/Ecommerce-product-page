import { useEffect, useState } from "react"; // Importing hooks for managing state and side effects.
import {
  FaAngleDown,
  FaArrowAltCircleLeft,
  FaCheckCircle,
  FaInfoCircle,
  FaShieldAlt,
  FaStar,
  FaStarHalf,
} from "react-icons/fa"; // Importing specific icons from react-icons/fa.
import { useCart } from "../context/Context"; // Importing custom hook to manage cart context.
import { productData3, subProductData3, replaceProductData3, subSecondProductData3 } from "../data/Data"; // Importing data sets for products.
import OpenInfo from "./OpenInfo"; // Importing a component to display additional info in a modal.

const Product3 = () => {
  // Using context hook to get the addToCart function from context.
  const { addToCart } = useCart();
  // State for managing the currently displayed product.
  const [currentProduct, setCurrentProduct] = useState(productData3[0]);
  // State for managing the selected size.
  const [selectedSize, setSelectedSize] = useState(0);
  // State for managing the currently displayed sub-product.
  const [subCurrentProduct, setSubCurrentProduct] = useState(subProductData3[0]);
  // State for managing the visibility of the info modal.
  const [openInfoModal, setOpenInfoModal] = useState(false);
  // State for managing the selected currency.
  const [currency, setCurrency] = useState('USD');
  // State for managing the selected radio button (color/flavor).
  const [selectedRadio, setSelectedRadio] = useState(0);
  // State for managing the insulation type (Insulated/Not Insulated).
  const [insulationType, setInsulationType] = useState(0);
  // State for managing the currently active size button.
  const [activeSize, setActiveSize] = useState(0);

  // Conversion rates for different currencies.
  const conversionRates = {
    USD: 1,
    INR: 82,
    EUR: 0.93,
  };

  // Currency symbols for different currencies.
  const currencySymbols = {
    USD: "$",
    INR: "₹",
    EUR: "€",
  };

  // Function to convert price based on selected currency.
  const convertPrice = (price) => (price * conversionRates[currency]).toFixed(2);

  // Function to handle button clicks for selecting a product.
  const handleButtonClick9 = (x) => {
    setSelectedRadio(x); // Set the selected radio button index.
    setOpenInfoModal(false); // Close the info modal.
    // Determine which product to select based on insulation type.
    const selectedProduct = insulationType === 0 ? productData3[x] : replaceProductData3[x];
    setCurrentProduct(selectedProduct); // Update current product state.
    setSubCurrentProduct(selectedProduct); // Update sub-current product state.
  };

  // Function to handle clicks for selecting a sub-product.
  const handleSubProductClick = (x) => {
    // Determine which data set to use based on insulation type.
    const dataSet = insulationType === 0 ? subProductData3 : subSecondProductData3;
    const selectedProduct = dataSet[x]; // Select the sub-product.

    // Update current product with sub-product data.
    setCurrentProduct(prevProduct => ({
      ...prevProduct,
      ...selectedProduct,
      costPrice: selectedProduct.costPrice,
    }));

    setSelectedSize(x); // Update selected size.
    setActiveSize(x); // Update active size.
  };

  // Function to handle clicks for changing insulation type.
  const handleInsulateClick = (type) => {
    setInsulationType(type); // Set insulation type.

    // Determine which data set to use based on insulation type.
    const dataSet = type === 0 ? productData3 : replaceProductData3;
    const subDataSet = type === 0 ? subProductData3 : subSecondProductData3;

    // Fetch the correct product and sub-product based on selected radio and size.
    const selectedProduct = dataSet[selectedRadio];
    const subSelectedProduct = subDataSet[selectedSize];

    // Update current and sub-current product.
    setCurrentProduct({
      ...selectedProduct,
      ...subSelectedProduct,
      costPrice: subSelectedProduct.costPrice,
    });
    setSubCurrentProduct(subSelectedProduct);
  };

  // Function to handle adding the product to the cart.
  const handleAddToCartClick = () => {
    const selectedProduct = insulationType === 0 ? subProductData3[selectedSize] : subSecondProductData3[selectedSize];
    addToCart({
      ...currentProduct,
      ...selectedProduct,
      price: `${currencySymbols[currency]}${convertPrice(currentProduct.sellingPrice)}`, // Convert and format the price.
      size: selectedSize === 0 ? "25 Oz" : "34 Oz",
      insulationType: insulationType === 0 ? "Insulated" : "Not Insulated",
      currency,
    });
  };

  // useEffect hook to update current product when dependencies change.
  useEffect(() => {
    // Determine which product and sub-product to use based on selected radio, insulation type, and size.
    const initialProduct = insulationType === 0 ? productData3[selectedRadio] : replaceProductData3[selectedRadio];
    const initialSubProduct = insulationType === 0 ? subProductData3[selectedSize] : subSecondProductData3[selectedSize];

    // Update current product state.
    setCurrentProduct({
      ...initialProduct,
      ...initialSubProduct,
      sellingPrice: initialSubProduct.sellingPrice,
    });
  }, [selectedRadio, insulationType, selectedSize]); // Dependencies for updating current product.

  return (
    <section className="p-6" id="bottle3">
      <div className="buy-page_content grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        <div className={`image_cont flex justify-center items-center ${selectedSize === 1 ? "scaled" : "bg-gray-50 p-4"}`}>
          <img
            src={currentProduct.image}
            alt={`image ${currentProduct.image}`}
            className="w-full max-w-xl"
          />

        </div>
        <div className="p-4 text-cyan-800 text-lg">
          <h1>{currentProduct.heading}</h1>
          <div className="text-sm">
            <p id="cp" className="flex gap-1 text-red-500 py-2 text-xl">
              {currencySymbols[currency]}{convertPrice(currentProduct.sellingPrice)}
            </p>
          </div>
          <div className="currency-selector ">
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="border p-1 border-cyan-800 text-cyan-800 rounded"
            >
              <option value="USD">USD</option>
              <option value="INR">INR</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
          <div className=" flex items-center mb-4">
            <p className="flex  text-yellow-500"><FaStar /> <FaStar /><FaStar /><FaStar /><FaStarHalf /></p>
            <p className="ml-2 text-neutral-500">1630 reviews</p>
          </div>

          <div className="Insulated_bottle flex gap-1 pt-2">
            <input
              checked={insulationType === 0}
              onChange={() => handleInsulateClick(0)}
              type="radio"
              id="insulated"
              className="insulated_one"
              name="insulation"

            />
            <label htmlFor="insulated" className="insulated_label px-2 p-8 xl:p-6 gap-1">
              <div className="insulated_image">
                <svg
                  height="100%"
                  width="100%"
                  className="css-82n8sf expsv8r0"
                  focusable="false"
                  viewBox="0 0 12 37"
                  color="text.default"
                  aria-hidden="true"
                >
                  <path
                    stroke="#153A5B"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 6V1H2v5m8 0H2m8 0c0 2 1 2 1 4v4M2 6c0 2-1 2-1 4v4m0 0v20.172a2 2 0 0 0 .586 1.414l.121.121a1 1 0 0 0 .707.293h7.172a1 1 0 0 0 .707-.293l.121-.121A2 2 0 0 0 11 34.172V14M1 14h10"
                  ></path>
                </svg>
              </div>
              <div className="text-sm font-normal">
                <p>Insulated <br /></p>
                <p> or 12 hours hot  24 hours cold</p>
              </div>
              <div>
                <span>
                  <FaInfoCircle />
                </span>
              </div>
            </label>

            <input
              checked={insulationType === 1}
              onClick={() => handleInsulateClick(1)}
              type="radio"
              id="notInsulated"
              className="insulated_two"
              name="insulation"

            />

            <label htmlFor="notInsulated" className="insulated_label px-2 p-8 xl:p-6">
              <div className="insulated_image">
                <svg
                  height="100%"
                  width="100%"
                  className="css-82n8sf expsv8r0"
                  focusable="false"
                  viewBox="0 0 12 37"
                  color="text.default"
                  aria-hidden="true"
                >
                  <path
                    stroke="#153A5B"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 6V1H2v5m8 0H2m8 0c0 2 1 6 1 9v2M2 6c0 2-1 6-1 9v7m0 0v12.172a2 2 0 0 0 .586 1.414l.121.121a1 1 0 0 0 .707.293h7.172a1 1 0 0 0 .707-.293l.121-.121A2 2 0 0 0 11 34.172V17M1 22l10-5"
                  ></path>
                </svg>
              </div>
              <div className="insulated_text">
                <p>Not insulated</p>
                <p>Light as Air</p>
              </div>
              <div>
                <span>
                  <FaInfoCircle />
                </span>
              </div>
            </label>
          </div>

          <p id="size">size</p>
          {insulationType === 0 || subCurrentProduct === 0 ? (
            <>
              <div className="flex gap-1">
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
            </>
          ) : (
            <>
              <div className="flex gap-1">
                <button
                  onClick={() => handleSubProductClick(0)}
                  className={`w-full text-white px-4 py-2 rounded ${activeSize === 0 ? 'border-2 border-yellow-600 bg-cyan-950' : 'bg-cyan-950'}`}
                >
                  24oz
                </button>
                <button
                  onClick={() => handleSubProductClick(1)}
                  className={`w-full text-white px-4 py-2 rounded ${activeSize === 1 ? 'border-2 border-yellow-600 bg-cyan-950' : 'bg-cyan-950'}`}
                >
                  32oz
                </button>
              </div>
            </>
          )}

          <div className="bottle_color_change">
            <fieldset>
              <legend>{currentProduct.textName}</legend>

              {insulationType === 0 ? (
                <>
                  <div className="radioo1">
                    <input
                      checked={selectedRadio === 0}
                      onChange={() => {
                        handleButtonClick9(0);
                      }}
                      type="radio"
                      id="bott1"
                      name="flavor"
                      value="vanilla"
                      className={` ${activeSize === 0}`}
                    />
                  </div>
                  <div className="radioo2">
                    <input
                      checked={selectedRadio === 1}
                      onChange={() => {
                        handleButtonClick9(1);
                      }}
                      type="radio"
                      id="bott2"
                      name="flavor"
                      value="chocolate"
                      className={` ${activeSize === 1}`}
                    />
                  </div>
                  <div className="radioo3">
                    <input
                      checked={selectedRadio === 2}
                      onChange={() => {
                        handleButtonClick9(2);
                      }}
                      type="radio"
                      id="bott3"
                      name="flavor"
                      value="strawberry"
                      className={` ${activeSize === 2}`}
                    />
                  </div>
                  <div className="radioo4">
                    <input
                      checked={selectedRadio === 3}
                      onChange={() => {
                        handleButtonClick9(3);
                      }}
                      type="radio"
                      id="bott4"
                      name="flavor"
                      value="strawberry"
                      className={` ${activeSize === 3}`}
                    />
                  </div>
                  <div className="radioo5">
                    <input
                      checked={selectedRadio === 4}
                      onChange={() => {
                        handleButtonClick9(4);
                      }}
                      type="radio"
                      id="bott5"
                      name="flavor"
                      value="strawberry"
                      className={` ${activeSize === 4}`}
                    />
                  </div>
                </>
              ) : (
                // Render the second set of bottle color input buttons
                <>
                  <div className="radiooa1 rounded-full p-2 bg-gradient-to-r  border-black items-center">
                    <input
                      onClick={() => handleButtonClick9(0)}
                      type="radio"
                      id="bott1"
                      name="flavor"
                      value="vanilla"
                      className="appearance-none w-full h-full cursor-pointer"
                    />
                  </div>
                  <div className="radiooa2 p-2 rounded-full bg-gradient-to-r ">
                    <input
                      onClick={() => handleButtonClick9(1)}
                      type="radio"
                      id="bott2"
                      name="flavor"
                      value="chocolate"
                      className="appearance-none w-full h-full cursor-pointer"
                    />
                  </div>
                  <div className="radiooa3 p-2 rounded-full bg-gradient-to-r ">
                    <input
                      onClick={() => handleButtonClick9(2)}
                      type="radio"
                      id="bott3"
                      name="flavor"
                      value="strawberry"
                      className="appearance-none w-full h-full cursor-pointer"
                    />
                  </div>
                  <div className="radiooa4 p-2 rounded-full bg-gradient-to-r ">
                    <input
                      onClick={() => handleButtonClick9(3)}
                      type="radio"
                      id="bott4"
                      name="flavor"
                      value="strawberry"
                      className="appearance-none w-full h-full cursor-pointer"
                    />
                  </div>
                  <div className="radiooa5 p-2 rounded-full bg-gradient-to-r ">
                    <input
                      onClick={() => handleButtonClick9(4)}
                      type="radio"
                      id="bott5"
                      name="flavor"
                      value="strawberry"
                      className="appearance-none w-full h-full cursor-pointer"
                    />
                  </div>
                </>
              )}
            </fieldset>
          </div>
          <div className="add-to__cart ">
            <button onClick={handleAddToCartClick}>
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
    </section>
  );
};

export default Product3;
