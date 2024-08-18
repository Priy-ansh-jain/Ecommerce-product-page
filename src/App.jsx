// Import necessary components and hooks from react-router-dom for routing
import { Route, Routes } from "react-router-dom";

// Import components that will be used in the application
import Header from "./components/header/Header";
import Trending from "./components/trending/Trending";
import ScrollButton from "./components/scrollButton/ScrollButton";
import CheckOut from "./components/checkout/CheckOut";
import Product1 from "./components/bottle/Product1";
import Product2 from "./components/bottle/Product2";
import Product3 from "./components/bottle/Product3";
import Product4 from "./components/bottle/Product4";
import Product5 from "./components/bottle/Product5";
import Product6 from "./components/bottle/Product6";
import Product7 from "./components/bottle/Product7";
import { Footer, SubFooter } from "./components";

// Define an array of page routes and their associated components
const pages = [
  { path: "/bottle1", component: Product1 },
  { path: "/bottle2", component: Product2 },
  { path: "/bottle3", component: Product3 },
  { path: "/bottle4", component: Product4 },
  { path: "/bottle5", component: Product5 },
  { path: "/bottle6", component: Product6 },
  { path: "/bottle7", component: Product7 },
  { path: "/checkout", component: CheckOut },
];

// Define the main App component
const App = () => {
  return (
    <div>
      {/* Define the routing structure for the application */}
      <Routes>
        {/* Route for the home page */}
        <Route
          path="/"
          element={
            <>
              {/* Header component displayed on the home page */}
              <Header />
              {/* Trending component displayed on the home page */}
              <Trending />
              {/* Optional Footer component commented out */}
              <Footer />
            </>
          }
        />
        {/* Map over the pages array to dynamically create routes */}
        {pages.map(({ path, component: Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <>
                {/* Header component displayed on all pages */}
                <Header />
                {/* Dynamic component based on the route path */}
                <Component />
                <SubFooter />
              </>
            }
          />
        ))}
      </Routes>
      {/* ScrollButton component displayed at the bottom of the page */}
      <ScrollButton />
    </div>
  );
};

// Export the App component as the default export of this module
export default App;
