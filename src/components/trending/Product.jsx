import { useState } from "react";
import { Link } from "react-router-dom";

// Define the Product component which receives a 'product' object as a prop
const Product = ({ product }) => {
  // Initialize state to track the index of the currently selected image
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to handle button clicks for changing the displayed image
  const handleButtonClick = (index) => {
    // Update the state with the index of the clicked button/image
    setCurrentImageIndex(index);
  };

  return (
    <div className="bg-stone-100 shadow-xl rounded-lg">
      {/* Link to the product's details page using the provided link */}
      <Link to={product.link}>
        {/* Display the current image based on the selected index */}
        <img
          src={product.images[currentImageIndex]}
          alt={product.text[currentImageIndex]}
          className="w-full h-auto object-cover rounded-t-lg bg-stone-50"
        />
      </Link>
      <div className="p-4 flex flex-col justify-center items-center">
        {/* Display the product's name */}
        <h6 className="text-lg font-semibold mb-2">{product.name}</h6>
        {/* Display the descriptive text associated with the current image */}
        <p className="text-gray-600 mb-4">{product.text[currentImageIndex]}</p>

        {/* Container for image selection buttons */}
        <div className="flex space-x-2 mb-4 bg-gray-100">
          {/* Loop through all product images to create a button for each */}
          {product.images.map((image, index) => (
            <button
              key={index}
              className={`w-12 h-12 p-1 border ${currentImageIndex === index ? "border-black" : "border-gray-300"
                } rounded-lg`}
              onClick={() => handleButtonClick(index)} // Change the displayed image when clicked
            >
              {/* Display thumbnail of each image inside the button */}
              <img
                src={image}
                alt={product.text[index]}
                className="w-full h-full object-cover rounded-md"
              />
            </button>
          ))}
        </div>

        {/* Display the product's price */}
        <p className="text-gray-800 flex items-center gap-1">
          {/* Check if there's a sale price for the current image */}
          {product.salePrice && product.salePrice[currentImageIndex] ? (
            <>
              {/* Display original price with a line-through */}
              <span className="font-bold line-through">
                ${product.price[currentImageIndex]}
              </span>{" "}
              {/* Display sale price in red */}
              <span className="text-red-500">
                ${product.salePrice[currentImageIndex]}
              </span>
              {/* If available, display the discount percentage */}
              <span>
                {product.discount && product.discount[currentImageIndex] && (
                  <span className="text-green-500 font-bold text-[.7rem] px-2">
                    {product.discount[currentImageIndex]} off
                  </span>
                )}
              </span>
            </>
          ) : (
            // If no sale price, just display the regular price
            <span className="font-bold">
              ${product.price[currentImageIndex]}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default Product;
