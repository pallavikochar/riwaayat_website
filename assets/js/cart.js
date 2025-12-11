// assets/js/cart.js
const CART_KEY = "riwaayat_cart";

function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + (item.quantity || 1), 0);
}

// Exposed helper to add item
function addToCart(product) {
  console.log("Adding to cart", product);  // TEMP debug

  const cart = getCart();
  const existing = cart.find((p) => p.id === product.id);

  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
  updateCartBadge();
}


// Update badge in header if present
function updateCartBadge() {
  const badge = document.querySelector(".icon-button__badge");
  if (badge) {
    badge.textContent = getCartCount();
  }
}

// On every page load, sync badge
document.addEventListener("DOMContentLoaded", updateCartBadge);

// ---------- Wishlist ----------

const WISHLIST_KEY = "riwaayat_wishlist";

function getWishlist() {
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveWishlist(list) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
}

function getWishlistCount() {
  return getWishlist().length;
}

function addToWishlist(product) {
  const list = getWishlist();
  const exists = list.some((p) => p.id === product.id);
  if (!exists) {
    list.push(product);
    saveWishlist(list);
  }
  updateWishlistBadge();
}

// update wishlist badge in header if present
function updateWishlistBadge() {
  const badge = document.querySelector(".wishlist-badge");
  if (badge) {
    badge.textContent = getWishlistCount();
  }
}

// update both badges on load
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  updateWishlistBadge();
});

