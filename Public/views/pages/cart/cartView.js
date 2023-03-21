const btnCheckOut = document.getElementById("checkout-btn");
const cartContainer = document.getElementById("cart-div");
let cart = cartContainer.getAttribute("data-cartId");

btnCheckOut.addEventListener("click", event => {

    fetch(`./checkout/${cart}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.text())
        .then(data => {
            alert('We recived your order successfully!')
        })
        .catch(error => {
            alert('Unexpected error :(')
            console.log(error)
        });

    fetch(`./${cart}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => { })
        .catch(error => {
            console.log(error)
        });

    window.location.assign('../home');

});




cartContainer.addEventListener("click", event => {
    if (event.target.classList.contains("deleteProduct-btn")) {
        const productId = event.target.getAttribute("data-deleteProduct");
        fetch(`/carts/${cart}/products/${productId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        })
            .then(response => response.json())
            .then(data => {
                location.reload()
            })
            .catch(error => {
                alert('Unexpected error :(')
                console.log(error)
            });
    }
});
