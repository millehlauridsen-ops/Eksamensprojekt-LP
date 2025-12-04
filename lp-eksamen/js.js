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

let allproducts = [];

async function getproducts() {
  const response = await fetch("app.json");
  allproducts = await response.json();
}

function displayproduct(product) {
  const productList = document.querySelector("#productsinfo");

  const product_infoHTML = `
    <div class="productinfo">
      <article class="card2-info">
      <h3>${product.title}</h3>
        <section class="atributterCard2">
            <p class="priceinfo">Price: ${product.price} DKK</p>
            <p class="saleprice"> Sale: ${product.sale} DKK</p>
        </section>
      </article>

    </div>
  `;
  productlist.insertAdjacentHTML("beforeend", gameHTML);
}
