import { useState } from "react";
import { FaCcVisa, FaCcMastercard, FaCcDiscover } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { SiGooglepay, SiPhonepe } from "react-icons/si"; // For Google Pay and PhonePe

const PaymentForm = ({ onClose }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Visa");
  const [upiId, setUpiId] = useState("");
  const [upiMethod, setUpiMethod] = useState("PhonePe");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment processing here
    console.log({ cardNumber, expiryDate, cvv, nameOnCard, paymentMethod, upiId, upiMethod });
    // Close the form after submission
    onClose();
  };

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case "Visa":
        return <FaCcVisa className="text-blue-500 text-xl" />;
      case "MasterCard":
        return <FaCcMastercard className="text-red-500 text-xl" />;
      case "Discover":
        return <FaCcDiscover className="text-orange-500 text-xl" />;
      case "UPI":
        return <MdPayment className="text-green-500 text-xl" />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="paymentMethod">Payment Method</label>
            <div className="relative">
              <select
                id="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full pl-12"
                required
              >
                <option value="Visa">Visa</option>
                <option value="MasterCard">MasterCard</option>
                <option value="Discover">Discover</option>
                <option value="UPI">UPI</option>
              </select>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                {getPaymentMethodIcon(paymentMethod)}
              </div>
            </div>
          </div>

          {paymentMethod === "UPI" ? (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="upiMethod">UPI Method</label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="upiMethod"
                      value="PhonePe"
                      checked={upiMethod === "PhonePe"}
                      onChange={(e) => setUpiMethod(e.target.value)}
                      className="hidden"
                    />
                    <div className={`flex items-center space-x-2 border border-gray-300 rounded-md p-2 cursor-pointer ${upiMethod === "PhonePe" ? 'bg-gray-200' : ''}`}>
                      <SiPhonepe className="text-blue-500 text-xl" />
                      <span>PhonePe</span>
                    </div>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="upiMethod"
                      value="Google Pay"
                      checked={upiMethod === "Google Pay"}
                      onChange={(e) => setUpiMethod(e.target.value)}
                      className="hidden"
                    />
                    <div className={`flex items-center space-x-2 border border-gray-300 rounded-md p-2 cursor-pointer ${upiMethod === "Google Pay" ? 'bg-gray-200' : ''}`}>
                      <SiGooglepay className="text-green-500 text-xl" />
                      <span>Google Pay</span>
                    </div>
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="upiId">UPI ID</label>
                <input
                  type="text"
                  id="upiId"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="example@upi"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="cardNumber">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="expiryDate">Expiry Date</label>
                <input
                  type="text"
                  id="expiryDate"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  placeholder="MM/YY"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="123"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="nameOnCard">Name on Card</label>
                <input
                  type="text"
                  id="nameOnCard"
                  value={nameOnCard}
                  onChange={(e) => setNameOnCard(e.target.value)}
                  placeholder="Priyansh"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  required
                />
              </div>
            </>
          )}

          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md w-full">
            Pay Now
          </button>
        </form>
        <button onClick={onClose} className="mt-4 text-blue-500">Cancel</button>
      </div>
    </div>
  );
};

export default PaymentForm;
