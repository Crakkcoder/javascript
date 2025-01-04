const priceRange = document.getElementById("price-range");
const minPriceInput = document.getElementById("min-price");
const maxPriceInput = document.getElementById("max-price");
const priceDisplay = document.getElementById("price-display");

// Function to update the price range value and input fields
function updatePrice() {
  const minPrice = parseInt(minPriceInput.value);
  const maxPrice = parseInt(maxPriceInput.value);

  // Ensure max price is always greater than or equal to min price
  if (maxPrice < minPrice) {
    maxPriceInput.value = minPrice;
  }

  // Update slider range and value
  priceRange.min = minPrice;
  priceRange.max = maxPrice;
  priceRange.value = minPrice;

  priceDisplay.textContent = priceRange.value;
}

// Update the slider and input fields when the range changes
priceRange.addEventListener("input", () => {
  minPriceInput.value = priceRange.value;
  priceDisplay.textContent = priceRange.value;
});

// Update the slider when input values change
minPriceInput.addEventListener("input", updatePrice);
maxPriceInput.addEventListener("input", updatePrice);

// Initialize price range
updatePrice();

