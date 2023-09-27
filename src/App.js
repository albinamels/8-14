import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Product } from "./components/Product";
import { Header } from "./components/Header";
import { CartComponent } from "./components/CartComponent";
import { FavListComponent } from "./components/FavList";
import { Button } from "reactstrap";

export const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all"); // 'all' for initial load
  const [showCart, setShowCart] = useState(false);
  const [favList, setFavList] = useState([]);
  const [showFav, setShowFav] = useState(false);

  // behaves like componentDidMount, runs once on initial load
  useEffect(() => {
    fetchData();
    const localStorageCartItems = JSON.parse(localStorage.getItem("cartList"));
    localStorageCartItems && setCart(localStorageCartItems);

    const localStorageFavItems = JSON.parse(localStorage.getItem("favList"));
    localStorageFavItems && setFavList(localStorageFavItems);
  }, []);

  const fetchData = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    setProducts(data); // update state

    // new Set() eliminates repeating elements, returns {item, item, item}
    // [...new Set()] returns array with extracted values of obj [item, item, item]
    const uniqueCategories = [
      "all",
      ...new Set(data.map((item) => item.category)),
    ];
    // All category created, the rest is mapped from data
    setCategories(uniqueCategories);
  };

  // display on tab title
  useEffect(() => {
    document.title = `FakeStore(${cart.reduce((acc, cartItem) => {
      return (acc += cartItem.quantity);
    }, 0)})`;
  }, [cart]);

  // filter by category, which was set in the child Header onClick
  const filteredProducts = products.filter((prod) => {
    return prod.category === activeCategory;

    // if (activeCategory === "all") {
    //   return prod; // don't filter, return all products
    // } else {
    //   return prod.category === activeCategory;
    // }
  });

  const addToCart = (id) => {
    // filter returns array of obj -> [{...}]
    // find returns a specific obj -> {...}
    const productToAdd = products.find((product) => product.id === id);
    // setCart([...cart, productToAdd]); // increase obj in cart array

    // check if exist in cart
    const isExist = cart.some((cartItem) => cartItem.id === id);

    if (isExist) {
      // find this item in cart, increment quantity
      const updatedCart = cart.map((item) => {
        if (item.id === id) {
          // product will be mutated by increasing quantity
          item.quantity++;
        }
        return item; // return that existing and updated product
      });
      setCart(updatedCart); // update state
    } else {
      // [copy ...cart, {copy ...product, modify by adding new property quantity: 1}]
      setCart([...cart, { ...productToAdd, quantity: 1 }]);
    }

    localStorage.setItem("cartList", JSON.stringify([...cart]));
  };

  const addToFav = (id) => {
    // find that product in main products data
    const favProduct = products.find((product) => product.id === id);

    // check if exists in favList
    const ifExist = favList.some((favItem) => favItem.id === id);

    if (ifExist) {
      alert("This Product Already Added to Favorite List");
    } else {
      setFavList([...favList, favProduct]);
    }

    localStorage.setItem("favList", JSON.stringify([...favList]));
  };

  const checkFav = (id) => {
    return favList.some((favItem) => favItem.id === id);
  };

  const checkCart = (id) => {
    return cart.some((favItem) => favItem.id === id);
  };

  const handleDeleteFromFav = (id) => {
    const updatedfavList = favList.filter((favItem) => favItem.id !== id);
    console.log(updatedfavList);
    setFavList([...updatedfavList]);
  };

  const handleDeleteFromCart = (id) => {
    const updatedCartList = cart.filter((cartItem) => cartItem.id !== id);
    console.log(updatedCartList);
    setCart([...updatedCartList]);
  };

  const updateQuantity = (id, number) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        item.quantity = number;
      }
      return item;
    });
    setCart([...updatedCart]);
  };

  return (
    <div className="App">
      <div className="main-container bg-light">
        <Header
          cart={cart}
          categories={categories}
          setActiveCategory={setActiveCategory}
          activeCategory={activeCategory}
          setShowCart={setShowCart}
          favList={favList}
          setShowFav={setShowFav}
        />
        <div className="product-container">
          {/* MAIN PAGE */}
          {!!products.length &&
            !showCart &&
            !showFav &&
            // products.map((product) => {
            // (filteredProducts.length ? filteredProducts : products).map((product) => {
            (filteredProducts.length ? filteredProducts : products).map(
              (product) => {
                // filteredProducts.map((product) => {
                return (
                  <Product
                    {...product}
                    addToCart={addToCart}
                    addToFav={addToFav}
                    key={product.id}
                    favList={favList}
                    checkFav={checkFav}
                    checkCart={checkCart}
                  />
                );
              }
            )}
        </div>
        {/* CART PAGE */}
        {showCart && !!cart.length && (
          <>
            <div className="back-btn">
              <Button onClick={() => setShowCart(false)}>Back to Store</Button>
              <h2>Items in Your Cart</h2>
            </div>
            <div className="cart-container">
              <CartComponent
                cart={cart}
                updateQuantity={updateQuantity}
                handleDeleteFromCart={handleDeleteFromCart}
              />
              {/* {cart.map((cartItem) => {
              return <CartComponent {...cartItem} key={cartItem.id} />;
            })} */}
            </div>
          </>
        )}

        {showCart && cart.length === 0 && (
          <div className="back-btn">
            <Button onClick={() => setShowCart(false)}>Back to Store</Button>
            <h2>No Items in Your Cart</h2>
          </div>
        )}

        {/* FAVORITES PAGE */}
        {showFav && !!favList.length && (
          <>
            <div className="back-btn">
              <Button onClick={() => setShowFav(false)}>Back to Store</Button>
              <h2>Your Favorite Items</h2>
            </div>
            <div className="product-container fav-page">
              {favList.map((favItem) => {
                return (
                  <FavListComponent
                    {...favItem}
                    key={favItem.id}
                    addToCart={addToCart}
                    checkCart={checkCart}
                    handleDeleteFromFav={handleDeleteFromFav}
                  />
                );
              })}
            </div>
          </>
        )}

        {showFav && favList.length === 0 && (
          <div className="back-btn">
            <Button onClick={() => setShowFav(false)}>Back to Store</Button>
            <h2>No Favorite Items Yet</h2>
          </div>
        )}
      </div>
    </div>
  );
};

// render products by category => fetch by category in useEffect
// cart icon onclick -> render cart component with items
// modal on product card -> whole description
// add to fav on product card
// fav icon on navbar -> show favorites
