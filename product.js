   let product;
      let productsCostumerList = [];
      let productId;
      let products;
      let showerTag = document.getElementById("product");
      function pruebaString() {
        productId = window.localStorage.getItem("id");
      }
      function getProduct() {
        fetch("https://fakestoreapi.com/products")
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            products = data;
            showProduct(products);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }
      function showProduct(products) {
        showerTag.innerHTML = "";
        product = products[productId - 1];
        showerTag.innerHTML = `
        <div class="text-4xl md:col-span-4 m-2">${product.title}</div>
      <img src="${product.image}" alt="${product.title}" class="h-2/4 w-2/4 md:h-full md:w-full md:col-span-1 text-gray-700 shadow-2xl shadow-red-400">
      <div class="text-2xl text-gray-500 md:col-span-3 pl-3">${product.description}</div>
      <div class="font-bold text-3xl md:col-span-4">Category:${product.category}</div>
      <div class="font-bold text-3xl md:col-span-2">rating:${product.rating.rate}</div>
      <div class="font-bold text-3xl md:col-span-2">count:${product.rating.count}</div>
      <div class="font-bold text-amber-400 md:col-span-4 text-4xl">price:${product.price}</div>
      <button onclick="addToCart()" class="bg-green-500 p-1.5 rounded-2xl hover:bg-green-800 hover:text-white shadow-lg hover:shadow-black m-5 duration-500 ease-linear transition md:col-span-2">Add to Cart</button>
      <a class="bg-red-500 p-1.5 rounded-2xl hover:bg-red-800 hover:text-white shadow-lg hover:shadow-black m-5 duration-500 ease-linear transition md:col-span-2 flex justify-center items-center" href="./home.html">Get Back</a>
        `;
      }
      function  addToCart(){
        productsCostumerList.push(product);
        window.localStorage.setItem("costumerList",productsCostumerList);
        alert("it added to cart")
      }
      window.onload = pruebaString();
      window.onload = getProduct();