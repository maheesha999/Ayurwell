export const getCart = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const addToCart = (product) => {
  if (!product || !product.productName) {
    console.error("Invalid product data:", product);
    return;
  }

  const cart = getCart();
  console.log("Before adding:", cart); // Debugging log

  const existingProductIndex = cart.findIndex(
    (item) => item.productName === product.productName
  );

  // Ensure quantity exists; set to 1 if missing
  const quantityToAdd = product.quantity || 1;

  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity += quantityToAdd;
  } else {
    cart.push({ ...product, quantity: quantityToAdd });
  }

  saveCart(cart);
  console.log("After adding:", cart); // Debugging log
};

export const removeFromCart = (productName) => {
  const cart = getCart();
  const updatedCart = cart.filter((item) => item.productName !== productName);
  saveCart(updatedCart);
  console.log("Cart after removal:", updatedCart); // Debugging log
};

export const clearCart = () => {
  localStorage.removeItem("cart");
  console.log("Cart cleared.");
};
