import { useCart } from "../context/Context"; // Import custom hook to access cart context
import { FaPlus, FaTrash, FaMinus, FaAmazonPay, FaGoogle } from "react-icons/fa"; // Import icons from react-icons library
import PaymentForm from "./PaymentForm"; // Import the PaymentForm component
import { Link } from "react-router-dom"; // Import Link component from React Router for navigation
import { useState } from "react";
// CheckOut component to handle the checkout page functionality
const CheckOut = () => {
  // Destructure cart-related functions from useCart hook
  const { cart, deleteFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  // Function to calculate the total price of items in the cart
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => {
      const sellingPrice = parseFloat(item.sellingPrice); // Convert sellingPrice to a number
      const quantity = parseInt(item.quantity, 10); // Convert quantity to a whole number

      // Check if sellingPrice and quantity are valid numbers
      if (!isNaN(sellingPrice) && !isNaN(quantity)) {
        return total + sellingPrice * quantity; // Add the item's total price to the overall total
      } else {
        // Handle invalid values by logging an error message
        console.error(
          `Invalid sellingPrice or quantity for item: ${JSON.stringify(item)}`
        );
        return total; // Return the current total without adding the invalid item's price
      }
    }, 0); // Initial total is set to 0
  };

  return (
    <div className="checkout__page">
      {/* Main container with flex layout, adjusts to vertical on smaller screens */}
      <div className="checkout__page flex flex-col md:flex-row p-6 space-y-6 md:space-y-0">
        {/* Left section: Customer and Payment Information */}
        <div className="checkout__payment w-full md:w-1/2 p-4 border border-gray-300 rounded-lg">
          <h1 className="text-2xl font-semibold mb-4">Customer</h1>
          <div className="field mb-4">
            {/* Discount Offers Section */}
            <div className="discount-offers mt-4 p-4 border border-gray-300 rounded-lg mb-2">
              <h2 className="text-xl text-red-500 font-semibold mb-2">Exclusive Offers</h2>
              <ul className="space-y-2">
                <li className="grid">
                  <span className="text-sm font-medium">5% cashback on Union Bank Credit Card.</span>
                  <span className="text-sm font-medium">5% cashback on ICIC Bank Credit Card.</span>
                </li>
                <li className="flex items-start">
                  <span>Get a Voucher of $100 on shopping off <strong className="text-green-400">$3000.</strong></span>
                </li>
              </ul>
            </div>
            <fieldset>
              <legend className="text-lg font-medium mb-2">Express Checkout With</legend>
              <div className="pay flex flex-col space-y-2">
                <div className="pay__button">
                  <button className="paypal__button bg-blue-500 text-white py-2 px-4 rounded-md flex items-center justify-center">
                    Pay<span className="font-bold">Pal</span><span> checkout</span>
                  </button>
                </div>
                <div className="pay__button">
                  <button className="paypal__button1 bg-yellow-500 text-white py-2 px-4 rounded-md flex items-center justify-center">
                    <span className="mr-2">Amazon</span>
                    <span className="text-xl"><FaAmazonPay /></span>
                  </button>
                </div>
                <div className="pay__button">
                  <button className="paypal__button2 bg-red-500 text-white py-2 px-4 rounded-md flex items-center justify-center">
                    <span className="mr-2 text-xl"><FaGoogle /></span>
                    Pay
                  </button>
                </div>
              </div>
            </fieldset>
          </div>
          <div className="Email__checkout mb-4">
            <form>
              <input type="email" placeholder="Email Address" className="border border-gray-300 rounded-md p-2 w-full mb-2" />
              <label htmlFor="email" className="block">
                <button className="bg-blue-500 text-white py-2 px-4 rounded-md w-full">Continue</button>
              </label>
            </form>
          </div>
          <div className="newspaper mb-4">
            <form className="flex items-center">
              <input className="mr-2" type="checkbox" />
              <label>Subscribe to our Newsletter</label>
            </form>
          </div>
          <div className="have__account mb-4">
            <p>Already have an account? </p>
            <Link to="/signin">
              <p className="text-blue-500">Sign in now</p>
            </Link>
          </div>
          {/* Sections for Shipping, Billing, and Payment information */}
          <hr className="my-4" />
          <div className="Shipping mb-4">
            <h1 className="text-xl font-semibold">Shipping</h1>
          </div>
          <hr className="my-4" />
          <div className="Billing mb-4">
            <h1 className="text-xl font-semibold">Billing</h1>
          </div>
          <hr className="my-4" />
          <div className="Payment mb-4">
            <h1 className="text-xl font-semibold">Payment</h1>
          </div>
        </div>

        {/* Right section: Order Summary */}
        <div className="checkout w-full md:w-1/2 p-4 border border-gray-300 rounded-lg">
          <div className="Checkout__page mb-4">
            <h1 className="text-2xl font-semibold mb-2">Order Summary</h1>
            <hr className="my-2" />
          </div>
          {/* List of items in the cart */}
          <ul className="checkout_ul space-y-4">
            {cart.map((item, index) => (
              <li key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="first__checkout-content flex items-center space-x-4">
                  <div className="product__Checkout-image">
                    <img src={item.image} alt={`item ${index}`} className="w-16 h-16 object-cover rounded-md" />
                  </div>
                  <div className="Bottle__checkout-name flex flex-col">
                    <div className="bottle_checkout_heading font-medium text-lg">{item.heading}</div>
                    <div className="Oz_size text-sm text-gray-600">{item.Insulated} {item.textName} {item.title}</div>
                    <div className="cart_checkout_quantity flex items-center space-x-2">
                      <button onClick={() => decreaseQuantity(index)} className="text-gray-600 text-xs">
                        <FaMinus />
                      </button>
                      <span>|</span>
                      <div className="quantity text-sm">{item.quantity} <span>|</span></div>
                      <button onClick={() => increaseQuantity(index)} className="text-xs">
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                  <div className="second__checkout-content flex flex-col items-end">
                    <div className="cart__item-detail">
                      <div className="cart_delete-cost-price flex items-center space-x-4">
                        <button onClick={() => deleteFromCart(index)} className="text-gray-400 hover:text-red-500">
                          <FaTrash />
                        </button>
                        <div className="sp_cp text-sm text-gray-700">
                          {item.costPrice ? (
                            <>
                              <span className="line-through">${item.costPrice}</span>
                              ${item.sellingPrice || 0}
                            </>
                          ) : (
                            <>
                              ${item.sellingPrice || 0}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="my-2" />
              </li>
            ))}
          </ul>

          {/* Display total price and other cost breakdown */}
          <div className="total mt-4">
            <div className="For__total flex justify-between text-lg font-semibold mb-2">
              <span>Sub Total</span>
              <b>${calculateTotalPrice().toFixed(2)}</b>
            </div>
            <div className="For__savings flex justify-between text-sm mb-2">
              <p>Shipping</p>
              <b>--</b>
            </div>
            <div className="For__savings flex justify-between text-sm mb-2">
              <span>Tax</span>
              <b>$0</b>
            </div>
            <div className="promo mb-4">
              <a href="#" className="text-blue-500">Promo/Gift Certificate?</a>
            </div>
            <hr className="my-2" />
            <div className="Grand__total flex justify-between text-xl font-bold">
              <span>Total (USD)</span>
              <b>${calculateTotalPrice().toFixed(2)}</b>
            </div>
            <button
              className="pt-2 checkout__button bg-blue-500 text-white py-2 px-4 rounded-md w-full"
              onClick={() => setShowPaymentForm(true)}
            >
              Final Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Show payment form if state is true */}
      {showPaymentForm && (
        <PaymentForm onClose={() => setShowPaymentForm(false)} />
      )}

    </div >
  );
};

export default CheckOut;



