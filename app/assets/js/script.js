// const apiKey = "67a5be5f9c979725831b2a7d"; // Replace with your actual API key
// const databaseUrl = "https://feddatabase-954b.restdb.io/rest/products  "; // Replace with your database URL

// async function fetchFirstProduct() {
//     try {
//         const response = await fetch(databaseUrl, {
//             headers: {
//                 "x-apikey": apiKey,
//                 "Accept": "application/json"
//             }
//         });

//         if (!response.ok) throw new Error("Failed to fetch products");

//         const products = await response.json();
//         if (products.length > 0) {
//             displayFirstProduct(products[0]);
//         }
//     } catch (error) {
//         console.error("Error:", error);
//     }
// }

// function displayFirstProduct(product) {
//     document.getElementById("product-img1").src = product.image1 || "https://via.placeholder.com/200";
//     document.getElementById("product-img2").src = product.image2 || "https://via.placeholder.com/200";
//     document.getElementById("product-name").textContent = product.name;
//     document.getElementById("product-price").textContent = `$${product.price}`;
// }

// // Fetch the first product when the page loads
// fetchFirstProduct();
