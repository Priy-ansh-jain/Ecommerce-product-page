import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart).cart : [];
  });

  const [totalItems, setTotalItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart).totalItems : 0;
  });

  const [currency, setCurrency] = useState("USD");
  const [conversionRates, setConversionRates] = useState({});
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify({ cart, totalItems }));
  }, [cart, totalItems]);

  useEffect(() => {
    const fetchConversionRates = async () => {
      try {
        const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
        if (!response.ok) {
          throw new Error("Failed to fetch conversion rates");
        }
        const data = await response.json();
        setConversionRates(data.rates);
      } catch (error) {
        console.error("Failed to fetch conversion rates:", error);
      }
    };

    fetchConversionRates();
  }, []);

  const convertPrice = (price, currency) => {
    if (isNaN(price) || !conversionRates[currency]) {
      console.warn(`Invalid price or unsupported currency: ${currency}`);
      return price;
    }
    const rate = conversionRates[currency];
    return (price * rate).toFixed(2);
  };

  const addToCart = (product) => {
    // Logging cart and totalItems before and after update
    console.log('Before adding:', cart, totalItems);

    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item =>
        item.image === product.image &&
        item.sellingPrice === product.sellingPrice
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        console.log('Updated cart item quantity:', updatedCart);
        return updatedCart;
      } else {
        const newItem = { ...product, quantity: 1 };
        setTotalItems(prevTotalItems => {
          const newTotalItems = prevTotalItems + 1;
          console.log('Updated totalItems:', newTotalItems);
          return newTotalItems;
        });
        return [...prevCart, newItem];
      }
    });
  };

  const deleteFromCart = (index) => {
    // Logging cart and totalItems before and after update
    console.log('Before deleting:', cart, totalItems);

    setCart(prevCart => {
      const newCart = [...prevCart];
      newCart.splice(index, 1);
      console.log('Updated cart after deletion:', newCart);
      return newCart;
    });
    setTotalItems(prevTotalItems => {
      const newTotalItems = Math.max(0, prevTotalItems - 1);
      console.log('Updated totalItems:', newTotalItems);
      return newTotalItems;
    });
  };

  const increaseQuantity = (index) => {
    if (index < 0 || index >= cart.length) {
      console.warn("Invalid index for increasing quantity:", index);
      return;
    }
    setCart(prevCart => {
      const updatedCart = [...prevCart];
      updatedCart[index].quantity += 1;
      return updatedCart;
    });
    setTotalItems(prevTotalItems => prevTotalItems + 1);
  };

  const decreaseQuantity = (index) => {
    if (index < 0 || index >= cart.length) {
      console.warn("Invalid index for decreasing quantity:", index);
      return;
    }
    setCart(prevCart => {
      const updatedCart = [...prevCart];
      if (updatedCart[index].quantity > 1) {
        updatedCart[index].quantity -= 1;
      }
      return updatedCart;
    });
    setTotalItems(prevTotalItems => Math.max(0, prevTotalItems - 1));
  };

  const clearCartData = () => {
    setCart([]);
    setTotalItems(0);
    localStorage.removeItem("cart");
  };

  const changeCurrency = (newCurrency) => {
    if (conversionRates[newCurrency]) {
      setCurrency(newCurrency);
    } else {
      console.warn("Unsupported currency:", newCurrency);
    }
  };

  const calculateDiscountPercentage = (costPrice, sellingPrice) => {
    const cost = parseFloat(costPrice);
    const selling = parseFloat(sellingPrice);
    if (isNaN(cost) || isNaN(selling) || cost <= 0) return 0;
    return (((cost - selling) / cost) * 100).toFixed(2);
  };

  const applyDiscount = (code) => {
    let discountValue = 0;
    if (code === 'DISCOUNT10') {
      discountValue = 10;
    }
    setDiscount(discountValue);

    setCart(prevCart => prevCart.map(item => {
      const discountPercentage = calculateDiscountPercentage(item.costPrice, item.sellingPrice);
      return {
        ...item,
        discountPercentage,
        finalPrice: item.sellingPrice - (item.sellingPrice * discountValue / 100),
      };
    }));
  };

  const calculateTotalPrice = () => {
    const total = cart.reduce((total, item) => {
      const sellingPrice = parseFloat(item.sellingPrice);
      const quantity = parseInt(item.quantity, 10) || 0;
      if (!isNaN(sellingPrice) && !isNaN(quantity)) {
        return total + sellingPrice * quantity;
      }
      return total;
    }, 0);
    return total - (total * discount / 100);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalItems,
        currency,
        conversionRates,
        addToCart,
        deleteFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCartData,
        changeCurrency,
        convertPrice,
        applyDiscount,
        calculateTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
