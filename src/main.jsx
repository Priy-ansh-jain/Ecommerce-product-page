// Import necessary libraries and components
import React from "react"; // Import React for creating components
import ReactDOM from "react-dom/client"; // Import ReactDOM for rendering components to the DOM
import "./index.css"; // Import global CSS styles
import App from "./App"; // Import the main App component
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter for routing
import { CartProvider } from "./components/context/Context"; // Import CartProvider to manage cart state
import ScrollToTop from "./components/scrollToTop"; // Import ScrollToTop to handle scrolling

// Create a root element to render the React application
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the application to the root element
root.render(
  <React.StrictMode>
    {/* React.StrictMode helps to identify potential problems in the application */}
    <BrowserRouter>
      {/* BrowserRouter provides routing functionality for the application */}
      <CartProvider>
        {/* CartProvider provides the cart context to the application */}
        <ScrollToTop>
          {/* ScrollToTop ensures the page scrolls to the top on route change */}
          <App />
          {/* Render the main App component */}
        </ScrollToTop>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
