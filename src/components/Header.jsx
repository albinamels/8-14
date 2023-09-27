import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import { BsCart } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
// import "./Header.css";

export const Header = ({
  cart,
  categories,
  setActiveCategory,
  activeCategory,
  setShowCart,
  favList,
  setShowFav,
}) => {
  return (
    <Navbar
      color="dark"
      dark
      style={{
        padding: "30px 120px 20px",
        display: "flex",
        position: "fixed",
        zIndex: "1",
        width: "100vw",
      }}
    >
      <NavbarBrand style={{ fontSize: "28px" }}>FakeStore</NavbarBrand>

      <Nav tabs>
        {categories.map((category) => {
          const key = category.split(" ").join("");
          return (
            <NavItem className="nav-item" key={key}>
              <NavLink
                // set state directly here
                onClick={() => {
                  setActiveCategory(category);
                }}
                // className={activeCategory === category && "active"}
                active={activeCategory === category}
              >
                {category}
              </NavLink>
            </NavItem>
          );
        })}
      </Nav>
      {/* SHOW FAV */}
      <div className="fav-wrapper">
        <BsCart
          className="cart-icon"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setShowFav(true);
            setShowCart(false);
          }}
        />
        <FcLike className="like-icon" />
        <span className="fav-items">{favList.length}</span>
      </div>

      {/* SHOW CART */}
      <div className="d-flex">
        <div className="cart-wrapper">
          <BsCart
            className="cart-icon"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setShowCart(true);
              setShowFav(false);
            }}
          />
          <span className="cart-items">
            {cart.reduce((acc, cartItem) => {
              return (acc += cartItem.quantity);
            }, 0)}
          </span>
        </div>

        <div className="cart-total">
          {cart.length > 0 && <span>Total: $</span>}
          {cart.length > 0 &&
            cart
              .reduce((acc, cartItem) => {
                return (acc += cartItem.price * cartItem.quantity);
              }, 0)
              .toFixed(2)}
        </div>
      </div>
    </Navbar>
  );
};
