const productDetails = document.getElementById("product-details");

// URL se product id lena
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

let currentProduct = null;

// Product fetch karna
fetch(`https://dummyjson.com/products/${id}`)
    .then(response => response.json())
    .then(product => {
        currentProduct = product;

        productDetails.innerHTML = `
            <div class="detail-card">

                <div class="image-section">
                    <img src="${product.thumbnail}" alt="${product.title}">
                </div>

                <div class="product-info">
                    <h2>${product.title}</h2>

                    <p class="desc">
                        ${product.description}
                    </p>

                    <div class="info-grid">
                        <div class="info-item">
                            <h4>Category</h4>
                            <p>${product.category}</p>
                        </div>

                        <div class="info-item">
                            <h4>Price</h4>
                            <p>$${product.price}</p>
                        </div>

                        <div class="info-item">
                            <h4>Rating</h4>
                            <p>⭐ ${product.rating}</p>
                        </div>

                        <div class="info-item">
                            <h4>Stock</h4>
                            <p>${product.stock}</p>
                        </div>
                    </div>

                    <button class="btn cart" onclick="addToCart()">
                        Add To Cart
                    </button>
                </div>

            </div>
        `;
    })
    .catch(error => {
        console.error("Error fetching product:", error);
    });


// Add to cart function
function addToCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (currentProduct) {
        cart.push(currentProduct);

        localStorage.setItem("cart", JSON.stringify(cart));

        alert("Product Added To Cart!");
    }
}