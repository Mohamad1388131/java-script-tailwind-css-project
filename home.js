const nav = document.getElementById("Nav");
      const logInPage = document.getElementById("logInPage");
      const userGmail = document.getElementById("Gmail");
      const userPassword = document.getElementById("Password");
      const showTag = document.getElementById("productShowTag");
      let filtersProductByCategory = document.getElementById("filter");
      let product;
      document.addEventListener("scroll", function (event) {
        let scrollOffset = window.pageYOffset;
        if (scrollOffset > 56) {
          nav.classList.add("fixed");
          nav.classList.add("top-0");
        }
        if (scrollOffset < 56) {
          nav.classList.remove("fixed");
          nav.classList.remove("top-0");
        }
      });
      function logPage() {
        logInPage.classList.remove("-right-full");
        logInPage.classList.remove("left-full");
        logInPage.classList.add("right-0");
        logInPage.classList.add("left-0");
      }
      function getBack() {
        logInPage.classList.add("-right-full");
        logInPage.classList.add("left-full");
        logInPage.classList.remove("right-0");
        logInPage.classList.remove("left-0");
      }
      function logInFinished() {
        if (userGmail.value === "") {
          userGmail.classList.remove("bg-white");
          userGmail.classList.add("bg-black");
          userGmail.classList.add("text-white");
        }
        if (userGmail.value === "") return;
        if (userPassword.value.trim() === "") {
          userPassword.classList.remove("bg-white");
          userPassword.classList.add("bg-black");
          userPassword.classList.add("text-white");
        }
        if (userPassword.value.trim() === "") return;
        getBack();
        let userInfo = {
          gmail: userGmail.value,
          password: userPassword.value.trim(),
        };
        localStorage.setItem(user, JSON.stringify(userInfo));
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
        showTag.innerHTML = "";
        products.forEach((Element) => {
          showTag.innerHTML += `
        <a href="./product.html" class="group border-2 border-solid border-red-200 rounded-2xl hover:shadow-black duration-500 ease-linear transition hover:border-0 hover:text-white hover:bg-red-400 flex justify-between items-center flex-col py-0.5 col-span-1" onclick="passString(${Element.id})">
          <div class="duration-500 ease-linear transition font-bold text-black group-hover:text-white">${Element.title}</div>
          <img class="w-full h-2/4 text-black" src="${Element.image}" alt="${Element.title}">
          <div class="duration-500 ease-linear transition font-bold text-2xl text-orange-400 group-hover:text-white">${Element.price}$</div>
          <div class="duration-500 ease-linear transition font-bold text-2xl text-orange-400 group-hover:text-white">rating:${Element.rating.rate}</div>
        </a>
        `;
        });
      }
      function filterProductCategory() {
        if (filtersProductByCategory.value === "") {
          showProduct(products);
        };
        if (filtersProductByCategory.value === "") return;
        let productsNewListCategory = products.filter(
          (Element) => Element.category === filtersProductByCategory.value
        );
        showProduct(productsNewListCategory);
      };
      function passString(id){
        window.localStorage.setItem("id", id);
        window.location.href = "./product.html";
      };
      window.onload = getProduct();