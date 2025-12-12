// assets/js/products.js

// ---------- Product data ----------
const allProducts = [
  {
    id: "jk-pashmina",
    state: "Jammu-Kashmir",
    name: "Pashmina Shawl",
    category: "textile",
    price: 3200,
    image: "assets/img/pashmina.jpg",
    meta: "Handwoven, natural dyes"
  },
  {
    id: "jk-walnut-box",
    state: "Jammu-Kashmir",
    name: "Walnut Wood Box",
    category: "handicraft",
    price: 1800,
    image: "assets/img/walnut-box.jpg",
    meta: "Intricate carving"
  },
  {
    id: "hp-kullu-shawl",
    state: "Himachal-Pradesh",
    name: "Kullu Shawl",
    category: "textile",
    price: 2100,
    image: "assets/img/kullu-shawl.jpg",
    meta: "Traditional border motifs"
  },
  {
    id: "rj-lehenga-choli",
    state: "Rajasthan",
    name: "Lehenga Choli",
    category: "textile",
    price: 5200,
    image: "assets/img/lehenga-choli.jpg",
    meta: "Hand-embroidered, mirror work"
  }
  // add more products here...
];

window.ALL_PRODUCTS = allProducts;

// ---------- URL params ----------
const params = new URLSearchParams(window.location.search);
const stateParam = params.get("state") || "Selected State";
const queryParam = (params.get("q") || "").toLowerCase().trim();

// ---------- DOM references (only exist on products.html) ----------
const productsTitle = document.getElementById("productsTitle");
const productsSubtitle = document.getElementById("productsSubtitle");
const grid = document.getElementById("productsGrid");
const searchInput = document.getElementById("productsSearch");
const categorySelect = document.getElementById("productsCategory");
const sortSelect = document.getElementById("productsSort");

// If these elements are missing, bail (so this file can be loaded on other pages safely)
if (productsTitle && productsSubtitle && grid && searchInput && categorySelect && sortSelect) {
  // Set heading
  productsTitle.textContent = stateParam;
  productsSubtitle.textContent =
    "Showing products curated from " + stateParam + ".";

  // Base list for this state
  let currentProducts = allProducts.filter((p) => p.state === stateParam);

  // Apply initial query from ?q=... (global header search)
  if (queryParam) {
    currentProducts = currentProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(queryParam) ||
        (p.meta || "").toLowerCase().includes(queryParam)
    );
    // also pre-fill the local search box
    searchInput.value = params.get("q") || "";
  }

  // ---------- Rendering ----------
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

  // ---------- Filters & sorting ----------
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

  // ---------- Events ----------
  searchInput.addEventListener("input", () => {
    clearTimeout(searchInput._debounce);
    searchInput._debounce = setTimeout(applyProductFilters, 120);
  });

  categorySelect.addEventListener("change", applyProductFilters);
  sortSelect.addEventListener("change", applyProductFilters);

  // ---------- Initial render ----------
  renderProducts(currentProducts);
}
