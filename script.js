const apiUrl = "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
let products = []
const buttonList = document.querySelectorAll(".cat-btn");

function mountCategory(category) {
    if (category && category.category_products) {
        const displayProducts = category.category_products;
        const productGallery = document.querySelector(".product-gallery");
        productGallery.innerHTML = "";
    
        displayProducts.forEach((product) => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <div class="title-line">
                    <h3 class="product-title">${product.title.substring(0, 20) + `${product.title.length > 20 ? '...' : ''}`}</h3>
                    <p class="product-vendor">&#x25CF;&nbsp;${product.vendor}</p>
                </div>
                <div class="price-line">
                    <p class="product-price">$${product.price}</p>
                    <p class="product-mrp">$${product.compare_at_price}</p>
                    <p class="product-discount">${Math.floor(((parseFloat(product.compare_at_price) - parseFloat(product.price))) / parseFloat(product.compare_at_price) * 100).toFixed(2)}% off</p>
                </div>
                <button class="add-to-cart">Add to Cart</button>
            `;
            productGallery.appendChild(productCard);
        });
    } else {
        console.error("Category not found or products not available.");
    }
}

buttonList.forEach((button) => {
    button.addEventListener("click", () => {
        button.classList.toggle("active-btn")
        const otherButtons = [...buttonList].filter((btn) => btn !== button);
        otherButtons.forEach((btn) => btn.classList.remove("active-btn"));

        const currentCategory = button.textContent;
        const category = products.find((category) => category.category_name === currentCategory);
        if (category) {
            mountCategory(category);
        }
    })
})

async function fetchProducts() {
    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const data  = await response.json();
            products = data.categories;
            buttonList[0].click();
        } else {
            throw new Error('Failed to fetch products');
        }
    } catch (error) {
        console.error(error);
    }
}

fetchProducts();
