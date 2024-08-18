import { useState } from "react";
import { useCart } from "../context/Context";
import { FaPlus, FaTrash, FaMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, deleteFromCart, increaseQuantity, decreaseQuantity, applyDiscount } = useCart();
  const [discountCode, setDiscountCode] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const handleCheckout = () => {
    // Navigate to the checkout page
    navigate('/checkout');
  };
  const calculateTotalPriceBeforeCoupon = (cart) => {
    return cart.reduce((total, item) => {
      const sellingPrice = parseFloat(item.sellingPrice);
      const quantity = parseInt(item.quantity, 10) || 0;

      if (!isNaN(sellingPrice) && !isNaN(quantity)) {
        return total + sellingPrice * quantity;
      } else {
        console.error(`Invalid sellingPrice or quantity for item: ${JSON.stringify(item)}`);
        return total;
      }
    }, 0);
  };

  const calculateTotalPriceAfterCoupon = (cart, coupon) => {
    const totalBeforeCoupon = calculateTotalPriceBeforeCoupon(cart);
    const discount = parseFloat(coupon) / 100 || 0;
    return totalBeforeCoupon * (1 - discount);
  };

  const calculateTotalSavings = () => {
    return cart.reduce((totalSavings, item) => {
      const save = parseFloat(item.save) || 0;
      const quantity = parseInt(item.quantity, 10) || 0;

      if (!isNaN(save) && !isNaN(quantity) && save >= 0 && quantity >= 0) {
        return totalSavings + (save * quantity);
      } else {
        console.error(`Invalid save amount or quantity for item: ${JSON.stringify(item)}`);
        return totalSavings;
      }
    }, 0);
  };

  const handleApplyDiscount = () => {
    // Apply the discount code
    applyDiscount(discountCode);
  };

  // Calculate totals
  const totalBeforeCoupon = calculateTotalPriceBeforeCoupon(cart);
  const discountApplied = parseFloat(discountCode) || 0;
  const totalAfterCoupon = calculateTotalPriceAfterCoupon(cart, discountCode);


  const calculateTotalItems = (cart) => {
    return cart.reduce((total, item) => {
      const quantity = parseInt(item.quantity, 10) || 0;
      return total + quantity;
    }, 0);
  };
  const totalItems = calculateTotalItems(cart);

  return (
    <div className="flex flex-col h-full">
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 text-center">
          <p>Your cart is empty.</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
            viewBox="0 0 650 512"
            id="empty-cart"
          >
            <circle
              cx="337.969"
              cy="243.395"
              r="167.695"
              fill="#dbe8ec"
            ></circle>
            <path
              fill="#dbe8ec"
              d="M574.58343,223.75715V205.64747a13.02087,13.02087,0,0,0-13.02086-13.02087H505.60333a13.02086,13.02086,0,0,1-13.02086-13.02086V161.49606a13.02087,13.02087,0,0,1,13.02086-13.02087h21.45112a13.02087,13.02087,0,0,0,13.02086-13.02087V117.34464a13.02087,13.02087,0,0,0-13.02086-13.02087H143.13523a13.02087,13.02087,0,0,0-13.02087,13.02087v18.10968a13.02087,13.02087,0,0,0,13.02087,13.02087h0a13.02087,13.02087,0,0,1,13.02086,13.02087v18.10968a13.02086,13.02086,0,0,1-13.02086,13.02086H82.7824a13.02087,13.02087,0,0,0-13.02087,13.02087v18.10968A13.02087,13.02087,0,0,0,82.7824,236.778h59.75769A13.02087,13.02087,0,0,1,155.561,249.79889v18.10976c.31905,16.57135-35.82964,13.02087-43.02086,13.02087h-.04775a13.02087,13.02087,0,0,0-13.02087,13.02087V312.06a13.02087,13.02087,0,0,0,13.02087,13.02087h32.85852a13.02087,13.02087,0,0,1,13.02087,13.02087v18.10976a13.02087,13.02087,0,0,1-13.02087,13.02087H108.43743a13.02087,13.02087,0,0,0-13.02086,13.02087V400.3629a13.02086,13.02086,0,0,0,13.02086,13.02086H524.045a13.02087,13.02087,0,0,0,13.02087-13.02086V382.25322A13.02087,13.02087,0,0,0,524.045,369.23235H502.75526a13.02087,13.02087,0,0,1-13.02087-13.02087V338.10172a13.02087,13.02087,0,0,1,13.02087-13.02087h36.62008A13.02087,13.02087,0,0,0,552.39621,312.06V293.95039a13.02087,13.02087,0,0,0-13.02087-13.02087H521.30005a13.02087,13.02087,0,0,1-13.02087-13.02087V249.79889A13.02087,13.02087,0,0,1,521.30005,236.778h40.26252A13.02087,13.02087,0,0,0,574.58343,223.75715Z"
            ></path>
            <circle cx="340.677" cy="148.55" r="46.959" fill="#3086a3"></circle>
            <path
              fill="none"
              stroke="#f9ae2b"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
              d="M324.05253,138.77179q-.00092-.08715-.00092-.17432a16.62566,16.62566,0,1,1,16.86682,16.62391v15.09678"
            ></path>
            <line
              x1="419.668"
              x2="451.971"
              y1="116.939"
              y2="116.939"
              fill="none"
              stroke="#3086a3"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="3"
            ></line>
            <line
              x1="419.668"
              x2="451.971"
              y1="126.25"
              y2="126.25"
              fill="none"
              stroke="#3086a3"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="3"
            ></line>
            <line
              x1="419.668"
              x2="451.971"
              y1="135.56"
              y2="135.56"
              fill="none"
              stroke="#3086a3"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="3"
            ></line>
            <line
              x1="119.153"
              x2="151.456"
              y1="293.762"
              y2="293.762"
              fill="none"
              stroke="#3086a3"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="3"
            ></line>
            <line
              x1="119.153"
              x2="151.456"
              y1="303.072"
              y2="303.072"
              fill="none"
              stroke="#3086a3"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="3"
            ></line>
            <line
              x1="119.153"
              x2="151.456"
              y1="312.383"
              y2="312.383"
              fill="none"
              stroke="#3086a3"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="3"
            ></line>
            <line
              x1="481.64"
              x2="513.943"
              y1="360.156"
              y2="360.156"
              fill="none"
              stroke="#3086a3"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="3"
            ></line>
            <line
              x1="481.64"
              x2="513.943"
              y1="369.467"
              y2="369.467"
              fill="none"
              stroke="#3086a3"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="3"
            ></line>
            <line
              x1="481.64"
              x2="513.943"
              y1="378.777"
              y2="378.777"
              fill="none"
              stroke="#3086a3"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="3"
            ></line>
            <circle
              cx="520.577"
              cy="300.496"
              r="13.807"
              fill="#b9d4db"
            ></circle>
            <circle cx="484.141" cy="310.461" r="7.159" fill="#b9d4db"></circle>
            <circle cx="502.32" cy="266.711" r="10.228" fill="#b9d4db"></circle>
            <circle
              cx="206.393"
              cy="389.674"
              r="16.428"
              fill="#b9d4db"
            ></circle>
            <circle cx="175.001" cy="377.974" r="8.557" fill="#b9d4db"></circle>
            <circle cx="182.861" cy="348.886" r="4.936" fill="#b9d4db"></circle>
            <circle
              cx="210.185"
              cy="352.378"
              r="11.833"
              fill="#b9d4db"
            ></circle>
            <circle
              cx="218.423"
              cy="143.059"
              r="16.428"
              fill="#b9d4db"
            ></circle>
            <circle cx="219.09" cy="109.564" r="8.557" fill="#b9d4db"></circle>
            <circle cx="276.085" cy="114.564" r="7.406" fill="#b9d4db"></circle>
            <circle cx="249.141" cy="107.367" r="4.936" fill="#b9d4db"></circle>
            <circle cx="254.877" cy="134.31" r="11.833" fill="#b9d4db"></circle>
            <path
              fill="#409cb5"
              d="M480.85793,233.2431H202.6215L193.549,210.24282h287.309a2.72176,2.72176,0,0,1,2.72176,2.72176v17.55676A2.72176,2.72176,0,0,1,480.85793,233.2431Z"
            ></path>
            <path
              fill="#f9ae2b"
              d="M440.32266,354.08924H251.1267a4.53627,4.53627,0,0,1-4.24692-2.94208L202.6215,233.2431h268.547l-26.4204,117.30658A4.53627,4.53627,0,0,1,440.32266,354.08924Z"
            ></path>
            <path
              fill="#3086a3"
              d="M457.56233,293.66888c-19.355,1.24146-38.71,1.89087-58.065,2.33216-9.6775.27637-19.355.33777-29.03251.50036l-29.0325.16578q-29.0325.02636-58.065-.65723c-19.355-.43945-38.71-1.09216-58.065-2.34107,19.355-1.2489,38.71-1.90148,58.065-2.34106q29.03249-.65185,58.065-.6571l29.0325.16565c9.6775.16259,19.355.224,29.03251.50048C418.8523,291.778,438.20731,292.42755,457.56233,293.66888Z"
            ></path>
            <path
              fill="#3086a3"
              d="M419.70359 233.2431c-1.1026 10.54578-2.78772 20.96045-4.64789 31.33558q-2.82669 15.55462-6.30877 30.96154-3.46357 15.41108-7.56577 30.67835c-1.38006 5.08618-2.80926 10.16137-4.33484 15.21484-.78927 2.52075-1.54083 5.05-2.361 7.56384l-.632 1.90967a4.91879 4.91879 0 01-1.18194 1.85889 4.67456 4.67456 0 01-3.81363 1.32349 4.373 4.373 0 003.11981-1.90845 3.91413 3.91413 0 00.633-1.61035l.25211-1.93872c.3367-2.62269.742-5.22986 1.10959-7.84571.78815-5.21948 1.6727-10.41736 2.60638-15.60412q2.82738-15.55444 6.31671-30.95972 3.47562-15.40833 7.57367-30.67664C413.23631 253.37482 416.17866 243.24335 419.70359 233.2431zM311.58605 354.0893a4.68121 4.68121 0 01-3.92411-1.458 6.69642 6.69642 0 01-1.156-1.8822l-.89646-1.85706c-1.1946-2.47632-2.32068-4.97827-3.4844-7.46619-2.27786-4.9945-4.463-10.02368-6.60287-15.06994q-6.39166-15.14906-12.15434-30.53431-5.78044-15.37866-10.948-30.9873c-3.41577-10.41675-6.65956-20.89807-9.33894-31.59119 5.01886 9.815 9.47332 19.8418 13.75582 29.93323q6.391 15.14941 12.14673 30.53723 5.76888 15.38306 10.94045 30.99012c1.70927 5.20788 3.37323 10.43273 4.94449 15.69238.76086 2.63916 1.55934 5.26416 2.28932 7.91479l.54693 1.98828a5.88655 5.88655 0 00.66687 1.77539A4.37022 4.37022 0 00311.58605 354.0893z"
            ></path>
            <circle
              cx="298.105"
              cy="428.058"
              r="18.743"
              fill="#409cb5"
            ></circle>
            <circle cx="298.105" cy="428.058" r="8.651" fill="#dbe8ec"></circle>
            <circle
              cx="406.224"
              cy="428.058"
              r="18.743"
              fill="#409cb5"
            ></circle>
            <circle cx="406.224" cy="428.058" r="8.651" fill="#dbe8ec"></circle>
            <path
              fill="#3086a3"
              d="M343.09231,233.2431c1.83931,9.99671,3.08253,20.02881,4.14664,30.07178q1.55889,15.06646,2.44714,30.173.9072,15.1053,1.161,30.24952c.13792,10.098.0925,20.207-.55473,30.35193-1.84722-9.99622-3.09265-20.02833-4.15473-30.07129q-1.5582-15.06666-2.43905-30.17347-.89487-15.106-1.15285-30.25012C342.40978,253.49628,342.453,243.38739,343.09231,233.2431Z"
            ></path>
            <path
              fill="#409cb5"
              d="M437.93777,399.80133H268.38406a3.00011,3.00011,0,0,1-2.801-1.92578L167.38479,141.898H115.37112a3,3,0,0,1,0-6h54.07593a3.0001,3.0001,0,0,1,2.801,1.92578l98.19824,255.97754H437.93777a3,3,0,0,1,0,6Z"
            ></path>
            <rect
              width="39.6"
              height="18.36"
              x="103.858"
              y="130.248"
              fill="#409cb5"
              rx="2"
            ></rect>
            <circle cx="340.677" cy="179.6" r="2.7" fill="#f9ae2b"></circle>
          </svg>
        </div>
      ) : (
        <div className="cart-container h-[90vh] flex flex-col justify-between">
          <div className="cart-items overflow-y-auto custom-scrollbar">
            {cart.map((item, index) => (
              <div key={index} className="bg-white border rounded-lg shadow-md grid grid-cols-2 p-2 items-center gap-4">
                <div className="product__cart-image bg-gray-100">
                  <img src={item.image} alt={`item ${index}`} className="w-full h-40 object-cover" />
                </div>
                <div className="Bottle__cart-name mb-4 flex flex-col flex-grow px-1">
                  <div className="bottle_cart_heading text-sm font-semibold mb-1">{item.heading}</div>
                  <div className="text-sm mb-2">
                    {item.Insulated} {item.textName} {item.title}
                  </div>
                  <div className="items-center mb-4 xl:w-[80%] lg:w-[70%] md:w-[80%] sm:w-[50%] w-full text-white grid grid-cols-2 gap-4 justify-between">
                    <div className="bg-stone-800 w-full flex px-2 rounded-sm">
                      <button
                        className="rounded gap-4 items-center flex justify-center"
                        onClick={() => decreaseQuantity(index)}
                      >
                        <FaMinus className="" />
                      </button>
                      <span className="px-1">{item.quantity || 0}</span>
                      <button
                        className="rounded"
                        onClick={() => increaseQuantity(index)}
                      >
                        <FaPlus className="items-center" />
                      </button>
                    </div>
                    <div className="right-0">
                      <button
                        className="text-red-500 text-xl w-full -mt-4 hover:text-red-100 rounded"
                        onClick={() => deleteFromCart(index)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 items-center w-full">
                    <div className="product__cart-price text-md font-semibold mb-4">
                      {/* Conditionally render costPrice with $ sign */}
                      {item.costPrice ? (
                        <>
                          <span className="line-through">${item.costPrice}</span>
                          ${item.sellingPrice || 0}
                        </>
                      ) : (
                        <>
                          {item.sellingPrice || 0}
                        </>
                      )}
                      {/* Conditionally render discount if present */}
                      {item.discount ? (
                        <p className="text-sm text-green-600 gap-1">{item.discount}% off</p>
                      ) : null}
                    </div>

                  </div>
                  <div className="sp_cp">
                    <span className="discount">
                      <span className="text-green-500 text-sm">
                        5% extra off on paying online.
                      </span>
                      {discountApplied > 0 && (
                        <span className="text-red-500">
                          <br />
                          <span className="text-red-500">
                            {discountApplied.toFixed(2)}% additional off
                          </span>
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-100 p-2 border-t bottom-0 left-0 right-0">
            <div className="my-4 flex justify-between">
              <input
                type="text"
                id="discountCode"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                className={`p-2 border ${isInputFocused ? 'border-blue-500 w-full' : 'border-gray-300'} rounded-md`}
                placeholder="Enter discount code"
              />
              <button
                onClick={handleApplyDiscount}
                className="ml-2 p-2 bg-blue-500 text-white rounded-md"
              >
                Apply
              </button>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Total Savings:</span>
              <span>${calculateTotalSavings().toFixed(2)}</span>
            </div>
            <div className="">
              <p className="flex justify-between">
                <span className="font-semibold">Total Price:</span>
                <span>${totalBeforeCoupon.toFixed(2)}</span>
              </p>
              {discountCode || 10 > 0 ? (
                <p className="flex justify-between">
                  <span>Final Price:</span>
                  <span>
                    <span className="line-through text-gray-500">${totalBeforeCoupon.toFixed(2)}</span>
                    <span>${totalAfterCoupon.toFixed(2)}</span>
                  </span>
                </p>
              ) : null}
            </div>
            <div className="flex justify-between items-center">

              <button
                onClick={handleCheckout}
                className="bg-orange-400 hover:bg-red-600 text-white rounded-md p-1">Checkout</button>

              <p className="text-md mb-4">Total items: {totalItems}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
