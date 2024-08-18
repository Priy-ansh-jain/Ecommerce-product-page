import { FaCartPlus } from "react-icons/fa";

const CartIcon = ({ cartCount }) => {
  return (
    <div className="cart-icon">
      <FaCartPlus
        style={{ color: "grey", fontSize: "25px" }}
        className="faCart"
      />
      {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
    </div>
  );
};

export default CartIcon;
