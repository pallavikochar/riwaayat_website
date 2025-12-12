// assets/js/main.js

// ---------- Inline data (edit this) ----------
// Add or change states here; no JSON file needed.
const states = [
  {
    name: "Jammu and Kashmir",
    region: "North",
    description: "Snow-clad valleys and traditional crafts.",
    image: "jammu-kashmir.jpg",    // lives in assets/img/
    silhouette: "jk-outline.png", // optional, lives in assets/img/
    url: "products.html?state=Jammu-Kashmir",
    hintText: "Pashmina, carpets, and papier-mâché art."
  },
  {
    name: "Himachal Pradesh",
    region: "North",
    description: "Mountain temples and traditional woolens.",
    image: "himachal-pradesh.jpg",
    silhouette: "hp-outline.png",
    url: "products.html?state=Himachal-Pradesh",
    hintText: "Shawls, metal crafts, and wooden art."
  },
  {
    name: "Uttarakhand",
    region: "North",
    description: "Hill shrines and local handicrafts.",
    image: "uttarakhand.jpg",
    silhouette: "uk-outline.png",
    url: "products.html?state=Uttarakhand",
    hintText: "Handwoven woolens, copperware, and more."
  },   
  {
    name: "Gujarat",
    region: "North",
    description: "",
    image: "gujarat.jpg",    // lives in assets/img/
    silhouette: "jk-outline.png", // optional, lives in assets/img/
    url: "products.html?state=Gujarat",
    hintText: ""
  },
  {
    name: "Assam",
    region: "East",
    description: "Desert forts and rich craft traditions.",
    image: "assam.jpg",
    url: "products.html?state=Assam",
    hintText: "Block prints, blue pottery, leather work, and more."
  },
  {
    name: "Rajasthan",
    region: "West",
    description: "Desert forts and rich craft traditions.",
    image: "rajasthan.jpg",
    url: "products.html?state=Rajasthan",
    hintText: "Block prints, blue pottery, leather work, and more."
  },
  {
    name: "Goa",
    region: "West",
    description: "Desert forts and rich craft traditions.",
    image: "goa.jpg",
    url: "products.html?state=Goa",
    hintText: "Block prints, blue pottery, leather work, and more."
  },
  {
    name: "Arunachal Pradesh",
    region: "East",
    description: "Desert forts and rich craft traditions.",
    image: "arunachal-pradesh.jpg",
    url: "products.html?state=Arunachal-Pradesh",
    hintText: "Block prints, blue pottery, leather work, and more."
  },
  {
    name: "Maharashtra",
    region: "West",
    description: "Desert forts and rich craft traditions.",
    image: "maharashtra.jpg",
    url: "products.html?state=Maharashtra",
    hintText: "Block prints, blue pottery, leather work, and more."
  },
  {
    name: "Madhya Pradesh",
    region: "West",
    description: "Desert forts and rich craft traditions.",
    image: "madhya-pradesh.jpg",
    url: "products.html?state=Madhya-Pradesh",
    hintText: "Block prints, blue pottery, leather work, and more."
  },
  {
    name: "Uttar Pradesh",
    region: "West",
    description: "Desert forts and rich craft traditions.",
    image: "uttar-pradesh.jpg",
    url: "products.html?state=Uttar-Pradesh",
    hintText: "Block prints, blue pottery, leather work, and more."
  },
  {
    name: "Mizoram",
    region: "West",
    description: "Desert forts and rich craft traditions.",
    image: "mizoram.jpg",
    url: "products.html?state=Mizoram",
    hintText: "Block prints, blue pottery, leather work, and more."
  },
  {
    name: "Kerala",
    region: "West",
    description: "Desert forts and rich craft traditions.",
    image: "kerala.jpg",
    url: "products.html?state=Kerala",
    hintText: "Block prints, blue pottery, leather work, and more."
  },
  {
    name: "Manipur",
    region: "West",
    description: "Desert forts and rich craft traditions.",
    image: "manipur.jpg",
    url: "products.html?state=Manipur",
    hintText: "Block prints, blue pottery, leather work, and more."
  },
  {
    name: "Karnataka",
    region: "South",
    description: "Desert forts and rich craft traditions.",
    image: "karnataka.jpg",
    url: "products.html?state=Karnataka",
    hintText: "Block prints, blue pottery, leather work, and more."
  },
  {
    name: "Telangana",
    region: "South",
    description: "Desert forts and rich craft traditions.",
    image: "telangana.jpg",
    url: "products.html?state=Telangana",
    hintText: "Block prints, blue pottery, leather work, and more."
  },
  {
    name: "Tamil Nadu",
    region: "South",
    description: "Desert forts and rich craft traditions.",
    image: "tamil-nadu.jpg",
    url: "products.html?state=Tamil-Nadu",
    hintText: "Block prints, blue pottery, leather work, and more."
  },
  {
    name: "Nagaland",
    region: "East",
    description: "Desert forts and rich craft traditions.",
    image: "nagaland.jpg",
    url: "products.html?state=Nagaland",
    hintText: "Block prints, blue pottery, leather work, and more."
  }
  // add more state objects as needed
];

// ---------- DOM references ----------
const gridEl = document.getElementById("stateGrid");
const searchInput = document.getElementById("searchInput");
const regionFilter = document.getElementById("regionFilter");

let allStates = states.slice(); // copy for filtering

// ---------- Rendering ----------
function renderStates(list) {
  gridEl.innerHTML = "";

  if (!list.length) {
    gridEl.innerHTML =
      '<p style="color:#8b1f24; font-size:0.9rem;">No states match the current filters.</p>';
    return;
  }

  list.forEach((state) => {
    const {
      name,
      region,
      description,
      image,
      silhouette,
      url,
      hintText
    } = state;

    // Outer clickable card
    const cardLink = document.createElement("a");
    cardLink.className = "state-card";
    cardLink.href = url || "#";
    cardLink.setAttribute("data-name", name || "");
    cardLink.setAttribute("data-region", region || "");
    cardLink.setAttribute("aria-label", `Browse products from ${name}`);
    if (url && url !== "#") {
      cardLink.target = "_blank";
      cardLink.rel = "noopener noreferrer";
    }

    // Background image
    const bg = document.createElement("div");
    bg.className = "state-card__bg";
    if (image) {
      bg.style.backgroundImage = `url("assets/img/${image}")`;
    }

    const overlay = document.createElement("div");
    overlay.className = "state-card__overlay";

    const content = document.createElement("div");
    content.className = "state-card__content";

    // Top row
    const topRow = document.createElement("div");
    topRow.className = "state-card__top";

    const nameEl = document.createElement("div");
    nameEl.className = "state-card__name";
    nameEl.textContent = name || "Unnamed state";

    const regionBadge = document.createElement("div");
    regionBadge.className = "state-card__region-badge";
    regionBadge.textContent = region || "Region";

    topRow.appendChild(nameEl);
    topRow.appendChild(regionBadge);

    // Bottom row
    const bottomRow = document.createElement("div");
    bottomRow.className = "state-card__bottom";

    const hint = document.createElement("div");
    hint.className = "state-card__hint";
    /*hint.textContent =
      hintText ||
      description ||
      "Explore crafts, textiles, and delicacies from this region.";*/

    const cta = document.createElement("div");
    cta.className = "state-card__cta";
    cta.innerHTML =
      '<span></span><span class="state-card__cta-icon">↗</span>';

    bottomRow.appendChild(hint);
    bottomRow.appendChild(cta);

    // Optional silhouette image
    /*if (silhouette) {
      const shape = document.createElement("img");
      shape.className = "state-card__shape";
      shape.src = `assets/img/${silhouette}`;
      shape.alt = `${name} outline`;
      content.appendChild(shape);
    }*/

    content.appendChild(topRow);
    content.appendChild(bottomRow);

    // Assemble card
    cardLink.appendChild(bg);
    cardLink.appendChild(overlay);
    cardLink.appendChild(content);

    gridEl.appendChild(cardLink);
  });
}

// ---------- Filtering ----------
function applyFilters() {
  const term = (searchInput.value || "").toLowerCase().trim();
  const region = regionFilter.value;

  const filtered = allStates.filter((state) => {
    const name = (state.name || "").toLowerCase();
    const stateRegion = state.region || "";
    const matchesName = !term || name.includes(term);
    const matchesRegion = !region || stateRegion === region;
    return matchesName && matchesRegion;
  });

  renderStates(filtered);
}

// ---------- Event listeners ----------
if (searchInput) {
  searchInput.addEventListener("input", () => {
    window.clearTimeout(searchInput._debounce);
    searchInput._debounce = window.setTimeout(applyFilters, 120);
  });
}

if (regionFilter) {
  regionFilter.addEventListener("change", applyFilters);
}

// ---------- Init ----------
document.addEventListener("DOMContentLoaded", () => {
  renderStates(allStates);
});

// ---------- Map → products navigation ----------

// ----- SVG map: state click → products page -----
document.addEventListener("DOMContentLoaded", () => {
  const indiaMap = document.getElementById("indiaMap");
  if (!indiaMap) return;

  indiaMap.querySelectorAll(".india-state").forEach((region) => {
    region.addEventListener("click", () => {
      const stateName = region.getAttribute("data-state");
      if (!stateName) return;

      const urlState = encodeURIComponent(stateName);
      window.location.href = `products.html?state=${urlState}`;
    });
  });
});

// ----- Header search bar: Enter key → products page -----
// ----- Global header search → products page -----
document.addEventListener("DOMContentLoaded", () => {
  const globalSearch = document.getElementById("globalSearch");
  if (!globalSearch) return;

  globalSearch.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;

    e.preventDefault();
    const term = globalSearch.value.trim();
    const q = encodeURIComponent(term);

    // go to products.html (no state → you can pick default there)
    if (term) {
      window.location.href = `products.html?q=${q}`;
    } else {
      window.location.href = `products.html`;
    }
  });
});

// ----- Global header autocomplete search -----
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("globalSearch");
  if (!input) return;

  const form = input.closest(".header-search");
  if (!form) return;

  // dropdown under existing header search
  const resultsBox = document.createElement("div");
  resultsBox.className = "header-search__results";
  resultsBox.hidden = true;
  form.appendChild(resultsBox);

  const products = Array.isArray(window.ALL_PRODUCTS) ? window.ALL_PRODUCTS : [];

  function hideResults() {
    resultsBox.innerHTML = "";
    resultsBox.hidden = true;
  }

  function showResults(matches) {
    if (!matches.length) {
      hideResults();
      return;
    }
    resultsBox.innerHTML = "";
    matches.slice(0, 5).forEach((p) => {
      const item = document.createElement("div");
      item.className = "header-search__result-item";
      item.innerHTML = `
        <span>${p.name}</span>
        <span style="color:#856a5f;">₹ ${p.price.toLocaleString("en-IN")}</span>
      `;
      item.addEventListener("click", () => {
        const urlState = encodeURIComponent(p.state);
        const urlName = encodeURIComponent(p.name);
        window.location.href = `products.html?state=${urlState}&q=${urlName}`;
      });
      resultsBox.appendChild(item);
    });
    resultsBox.hidden = false;
  }

  input.addEventListener("input", () => {
    const term = input.value.toLowerCase().trim();
    if (!term) {
      hideResults();
      return;
    }
    const matches = products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        (p.meta || "").toLowerCase().includes(term)
    );
    showResults(matches);
  });

  // Enter → full search page
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const term = input.value.trim();
      if (!term) return;
      const q = encodeURIComponent(term);
      window.location.href = `products.html?q=${q}`;
    } else if (e.key === "Escape") {
      hideResults();
    }
  });

  // click outside hides dropdown
  document.addEventListener("click", (e) => {
    if (!form.contains(e.target)) {
      hideResults();
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const globalSearch = document.getElementById("globalSearch");
  if (!globalSearch) return;

  globalSearch.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;

    e.preventDefault();
    const term = globalSearch.value.trim();
    if (!term) return;

    const q = encodeURIComponent(term);
    // Go to products page; products.js will handle filtering
    window.location.href = `products.html?q=${q}`;
  });
});
