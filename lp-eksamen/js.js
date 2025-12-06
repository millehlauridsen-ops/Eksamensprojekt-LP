// JSON and product changes!

let allproducts = [];

// #0: Listen for page load
window.addEventListener("DOMContentLoaded", initApp); // When the DOM is loaded, run initApp function

function initApp() {
  console.log("initApp is running");
  toggleSwitch();
  getproducts();
  changeSite();
}

async function getproducts() {
  const response = await fetch("app.json");
  allproducts = await response.json();
  displayproduct(allproducts[0]);
  displayProductElipses(allproducts);
  selectProduct(allproducts[0]);
  showProduct(allproducts[0]);
}

function displayProductElipses1(products) {
  const elipses = document.querySelector("#elipses1");

  for (const product of allproducts) {
    const elipsesHTML = /*html*/ `
      <img src="${product.elipse}" alt="${product.title}" class="elipse" />
    `;
    elipses.insertAdjacentHTML("beforeend", elipsesHTML);
    elipses.lastElementChild.addEventListener("click", () => {
      displayProduct(product);
    });
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
                <div id="elipses1" ></div>
            </div>
            <div class="productbuttom">
                <button class="button button2">BUY NOW</button>
            <section class="prices">
                <p class="price"> ${product.price} DKK</p>
                <p class="saleprice"> Sale: ${product.sale} DKK</p>
            </section>
            </div>
           
        </article>

     </div>
  `;
  productList.insertAdjacentHTML("beforeend", product_infoHTML);
  displayProductElipses1(allproducts);
}

// #3: Display all movies as clickable images
function displayProductElipses(products) {
  const elipses = document.querySelector("#elipses");

  for (const product of allproducts) {
    const elipsesHTML = /*html*/ `
      <img src="${product.elipse}" alt="${product.title}" class="elipse" />
    `;
    elipses.insertAdjacentHTML("beforeend", elipsesHTML);
    elipses.lastElementChild.addEventListener("click", () => {
      selectProduct(product);
    });
  }
}

function selectProduct(product) {
  const selectedProduct = document.querySelector("#selected-product");
  selectedProduct.innerHTML = /*html*/ `
    <figure class="giftimage">
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
        <h3> GET 15% OFF</h3>
            <p>${product.description}</p>
        </div>
        <article class="colorsandprices">
            <div class="productcolor">
                <h5>${product.title}</h5>
                <div id="elipses" ></div>
            </div>
            <div class="productbuttom">
                <button class="button button2">BUY NOW</button>
            <section class="prices">
                <p class="price"> ${product.price} DKK</p>
                <p class="saleprice"> Sale: ${product.sale} DKK</p>
            </section>
            </div>
           
        </article>

     </div>
  `;
  displayProductElipses(allproducts);
}

function changeSite() {
  const button = document.querySelectorAll(".button").forEach((btn) => {
    btn.addEventListener("click", () => {
      window.location.href = "product.html";
    });
  });
}

function toggleSwitch() {
  const toggle = document.getElementById("toggleswitch");

  const hero = document.getElementById("hero");
  if (!toggle) return; // no element on this page — avoid errors

  const heroDay =
    'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 35%), linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%), url("images/hero.png")';
  const heroNight =
    'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 35%), linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%), url("images/nightHero.png")';

  // apply initial state immediately
  //Spørgsmålstegn er ligesom en if else funktion. Så hvis den er true/checked, apply'er den koden -ellers gør den ikke
  const apply = (checked) => {
    if (!hero) return;
    hero.style.backgroundImage = checked ? heroNight : heroDay;

    document.documentElement.style.setProperty(
      "--colors__bg",
      checked ? "#62493C" : "#ffffff"
    );
    document.documentElement.style.setProperty(
      "--colors__mrkebrun",
      checked ? "#fafafa" : "#282119"
    );
    document.documentElement.style.setProperty(
      "--colors__moonlightwhite",
      checked ? "#282119" : "#fafafa"
    );
  };
  apply(toggle.checked);

  toggle.addEventListener("change", function () {
    apply(this.checked);
  });
}

// Get a reference to the body element
const body = document.body;

// Get all elements with the class 'slide'
const slides = document.querySelectorAll(".slide");

// Get references to the left and right arrow buttons
const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");

// Set the initial active slide index to 4
let activeSlide = 0;

// Event listener for the right arrow button
rightBtn.addEventListener("click", () => {
  // Increment the active slide index
  activeSlide++;

  // If the index goes beyond the last slide, loop back to the first slide
  if (activeSlide > slides.length - 1) {
    activeSlide = 0;
  }

  // Call the function to set the active slide
  setActiveSlide();

  // Log the current activeSlide to the console
  console.log("Current activeSlide:", activeSlide);
});

// Event listener for the left arrow button
leftBtn.addEventListener("click", () => {
  // Decrement the active slide index
  activeSlide--;

  // If the index goes below the first slide, loop back to the last slide
  if (activeSlide < 0) {
    activeSlide = slides.length - 1;
  }

  // Call the function to set the active slide
  setActiveSlide();

  // Log the current activeSlide to the console
  console.log("Current activeSlide:", activeSlide);
});

// Function to set the active slide
function setActiveSlide() {
  // Remove the 'active' class from all slides
  slides.forEach((slide) => slide.classList.remove("active"));

  // Add the 'active' class to the current active slide
  slides[activeSlide].classList.add("active");
}
