// assets/js/products.js

const allProducts = [
  {
    id: "jk-pashmina",
    state: "Jammu and Kashmir",
    name: "Pashmina Shawl",
    category: "textile",
    price: 3200,
    image: "assets/img/pashmina.jpg",
    meta: "Handwoven, natural dyes"
  },
  {
    id: "jk-walnut-box",
    state: "Jammu and Kashmir",
    name: "Walnut Wood Box",
    category: "handicraft",
    price: 1800,
    image: "assets/img/walnut-box.jpg",
    meta: "Intricate carving"
  }
  // more products...
];

const params = new URLSearchParams(window.location.search);
const stateParam = params.get("state") || "Selected State";

const productsTitle = document.getElementById("productsTitle");
const productsSubtitle = document.getElementById("productsSubtitle");
const grid = document.getElementById("productsGrid");
const searchInput = document.getElementById("productsSearch");
const categorySelect = document.getElementById("productsCategory");
const sortSelect = document.getElementById("productsSort");

productsTitle.textContent = stateParam;
productsSubtitle.textContent =
  "Showing products curated from " + stateParam + ".";

let currentProducts = allProducts.filter((p) => p.state === stateParam);

function renderProducts(list) {
  grid.innerHTML = "";
  if (!list.length) {
    grid.innerHTML =
      '<p style="color:#856a5f; font-size:0.9rem;">No products found for this combination.</p>';
    return;
  }
  list.forEach((p) => {
    const card = document.createElement("article");
    card.className = "product-card";

    if (p.image) {
      const img = document.createElement("img");
      img.className = "product-card__image";
      img.src = p.image;
      img.alt = p.name;
      card.appendChild(img);
    }

    const name = document.createElement("div");
    name.className = "product-card__name";
    name.textContent = p.name;
    card.appendChild(name);

    const meta = document.createElement("div");
    meta.className = "product-card__meta";
    meta.textContent = p.meta || "";
    card.appendChild(meta);

    const bottom = document.createElement("div");
    bottom.className = "product-card__bottom";

    const price = document.createElement("div");
    price.className = "product-card__price";
    price.textContent = "₹ " + p.price.toLocaleString("en-IN");

    const btn = document.createElement("button");
    btn.className = "product-card__btn";
    btn.type = "button";
    btn.textContent = "Add to cart";
    btn.addEventListener("click", () => {
      addToCart({
        id: p.id,
        name: p.name,
        price: p.price
      });
    });

    bottom.appendChild(price);
    bottom.appendChild(btn);
    card.appendChild(bottom);

    grid.appendChild(card);
  });
}

function applyProductFilters() {
  const term = (searchInput.value || "").toLowerCase().trim();
  const cat = categorySelect.value;
  const sort = sortSelect.value;

  let list = currentProducts.filter((p) => {
    const matchesText =
      !term ||
      p.name.toLowerCase().includes(term) ||
      (p.meta || "").toLowerCase().includes(term);
    const matchesCat = !cat || p.category === cat;
    return matchesText && matchesCat;
  });

  if (sort === "price-asc") {
    list = list.slice().sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    list = list.slice().sort((a, b) => b.price - a.price);
  }

  renderProducts(list);
}

searchInput.addEventListener("input", () => {
  clearTimeout(searchInput._debounce);
  searchInput._debounce = setTimeout(applyProductFilters, 120);
});
categorySelect.addEventListener("change", applyProductFilters);
sortSelect.addEventListener("change", applyProductFilters);

renderProducts(currentProducts);
