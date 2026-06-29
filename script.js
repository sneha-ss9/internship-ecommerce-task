const productList = document.getElementById("product-list");
let allProducts = [];

fetch("https://dummyjson.com/products?limit=194")
    .then(response => response.json())
    .then(data => {
        allProducts = data.products;

        let html = "";

        data.products.forEach(product => {
            html += `
                <div class="card">
                    <img src="${product.thumbnail}" alt="${product.title}">
                    <h3>${product.title}</h3>
                    <p class="price">$${product.price}</p>
                    <p class="rating">⭐ ${product.rating}</p>

                    <button class="btn view" onclick="goToProduct(${product.id})">
                        View Details
                    </button>

                    <button class="btn cart" onclick="addToCart(${product.id})">
                        Add To Cart
                    </button>
                </div>
            `;
        });

        productList.innerHTML = html;
    })
    .catch(error => {
        console.error("Error fetching products:", error);
    });

function goToProduct(id) {
    window.location.href = `product.html?id=${id}`;
}

function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const selectedProduct = allProducts.find(product => product.id === id);

    if (selectedProduct) {
        cart.push(selectedProduct);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Product Added To Cart!");
    }
}