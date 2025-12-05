// ...existing code will initialize after DOMContentLoaded
let body = null;
let slides = [];
let leftBtn = null;
let rightBtn = null;
let activeSlide = 0;

function setActiveSlide() {
  if (!slides || slides.length === 0) return;
  slides.forEach((slide) => slide.classList.remove("active"));
  // ensure activeSlide is in range
  activeSlide = ((activeSlide % slides.length) + slides.length) % slides.length;
  const current = slides[activeSlide];
  if (current) current.classList.add("active");
}

let allproducts = [];

// #0: Listen for page load
window.addEventListener("DOMContentLoaded", initApp); // When the DOM is loaded, run initApp function

function initApp() {
  console.log("initApp is running");

  // safe DOM queries after DOM is ready
  body = document.body;
  slides = Array.from(document.querySelectorAll(".slide"));
  leftBtn = document.getElementById("left");
  rightBtn = document.getElementById("right");

  // wire slider buttons if they exist
  if (rightBtn) {
    rightBtn.addEventListener("click", () => {
      if (!slides || slides.length === 0) return;
      activeSlide = (activeSlide + 1) % slides.length;
      setActiveSlide();
      console.log("Current activeSlide:", activeSlide);
    });
  }

  if (leftBtn) {
    leftBtn.addEventListener("click", () => {
      if (!slides || slides.length === 0) return;
      activeSlide = (activeSlide - 1 + slides.length) % slides.length;
      setActiveSlide();
      console.log("Current activeSlide:", activeSlide);
    });
  }

  getproducts();
}

async function getproducts() {
  try {
    const response = await fetch("app.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    allproducts = await response.json();
    // show first product (replace existing content)
    if (allproducts && allproducts.length) {
      displayproduct(allproducts[0]);
      displayProductElipses(allproducts);
    }
  } catch (err) {
    console.error("getproducts error", err);
  }
}

function displayproduct(product) {
  console.log(product);
  const productList = document.querySelector("#productinfo");

  const product_infoHTML = `
    <div class="productinfo">
        <div class="headline-product">
            <h5>LUMINA one</h5>
            <h2>Portable Bluetooth Speaker</h2>
        </div>
        <div class="rating">
            <img src="${product.rating}" alt="rating" class="ratingstars"/>
            <h5> 3k reviews on Trustpilot</h5>
        </div>
        <div class="productdescription">
            <p>${product.description}</p>
        </div>
        <article class="colorsandprices">
            <div class="productcolor">
                <h5>${product.title}</h5>
                <img src="${product.elipse}" alt="${product.title}" class="color"/>
            </div>
            <div class="productbuttom">
                <button class="button button2">BUY NOW</button>
            <section class="prices">
                <p class="price">Price: ${product.price} DKK</p>
                <p class="saleprice"> Sale: ${product.sale} DKK</p>
            </section>
            </div>
           
        </article>

     </div>
  `;
  if (!productList) return;
  productList.innerHTML = product_infoHTML; // replace content instead of appending
}

// #3: Display all movies as clickable images
function displayProductElipses(products) {
  const elipses = document.querySelector("#elipses");
  if (!elipses) return;
  elipses.innerHTML = "";
  for (const product of products) {
    const img = document.createElement("img");
    img.src = product.elipse;
    img.alt = product.title;
    img.className = "elipse";
    img.addEventListener("click", () => selectProduct(product));
    elipses.appendChild(img);
  }
}

function selectProduct(product) {
  const selectedProduct = document.querySelector("#selected-product");
  if (!selectedProduct) return;
  selectedProduct.innerHTML = /*html*/ `
    <figure>
      <img src="${product.giftimage}" alt="${product.title}" />
    </figure>
   <div class="productinfo">
        <div class="headline-product">
            <h5>LUMINA one</h5>
            <h2>Portable Bluetooth Speaker</h2>
        </div>
        <div class="rating">
            <img src="${product.rating}" alt="rating" class="ratingstars"/>
            <h5> 3k reviews on Trustpilot</h5>
        </div>
        <div class="productdescription">
            <p>${product.description}</p>
        </div>
        <article class="colorsandprices">
      <div class="productcolor">
        <h5>${product.title}</h5>
        <div class="elipses-container"></div>
      </div>
            <div class="productbuttom">
                <button class="button button2">BUY NOW</button>
            <section class="prices">
                <p class="price">Price: ${product.price} DKK</p>
                <p class="saleprice"> Sale: ${product.sale} DKK</p>
            </section>
            </div>
           
        </article>

     </div>
  `;
  // populate the elipses for the selected area (use class to avoid duplicate id)
  const container = selectedProduct.querySelector(".elipses-container");
  if (container) {
    container.innerHTML = "";
    for (const p of allproducts) {
      const img = document.createElement("img");
      img.src = p.elipse;
      img.alt = p.title;
      img.className = "elipse";
      img.addEventListener("click", () => selectProduct(p));
      container.appendChild(img);
    }
  }
}
