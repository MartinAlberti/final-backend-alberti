
setTimeout(() => {
    const productsContainer = document.getElementById("productsCards-div");

    console.log(productsContainer)

    productsContainer.addEventListener("click", event => {

        let cart = productsContainer.getAttribute("data-cartId");

        if (event.target.classList.contains("btn-add-to-cart")) {
            const productId = event.target.getAttribute("data-productId");
            fetch(`./carts/${cart}/products/${productId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.log(error));

        }
    });
}, 200)

