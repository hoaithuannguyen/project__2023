// kéo kho sản phẩm về
const products = JSON.parse(localStorage.getItem("productsObject")) || [];
const userLogin = JSON.parse(localStorage.getItem("userLogin"));
const users = JSON.parse(localStorage.getItem("users"));

console.log(userLogin);
if (!userLogin.id) {
    alert("Ban chua dang nhap !")
    window.location.href = "../../login.html"
}

// tao Id ngau nhien
function uuid() {
    return Math.floor(Math.random() * 999999) + new Date().getMilliseconds();
}

// định dạng chuyển đổi tiền tệ
let VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

let totalPrice = 0

function renderCart() {
    let users = JSON.parse(localStorage.getItem("users"));
    let userLogin = JSON.parse(localStorage.getItem("userLogin"));
    let cart;
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == userLogin.email) {
            cart = users[i].cart;
            break;
        }
    }
    // sau khi có dữ liệu của cart rồi thì in ra
    let resultCart = ""; totalPrice = 0;
    for (let j = 0; j < cart.length; j++) {
        totalPrice += Number(cart[j].price) * Number(cart[j].quantity);
        resultCart +=
            `
                <div id="divPhoto">
                    <img src="${cart[j].image}" alt="" id="img-divphoto">
                    <p>Tên: ${cart[j].name}</p>
                    <p>Giá: ${VND.format(cart[j].price)}</p>
                    <div class="div-photo">
                        <button onclick="handleChangeQuantity(${cart[j].id}, 0)">-</button>
                        <span>SL: ${cart[j].quantity}</span>
                        <button onclick="handleChangeQuantity(${cart[j].id}, 1)">+</button>
                    </div>
                    <p class="thanhtien">Thành tiền: ${VND.format(cart[j].price * cart[j].quantity)}</p>
                </div>
        `
    }
    document.getElementById("div1").innerHTML = resultCart;
    document.getElementById("total").innerHTML = VND.format(totalPrice)
}
renderCart();

function handleChangeQuantity(id, status) {
    const products = JSON.parse(localStorage.getItem("productsObject")) || [];
    const userLogin = JSON.parse(localStorage.getItem("userLogin"));
    const users = JSON.parse(localStorage.getItem("users"));

    const indexUser = users.findIndex(item => item.id === userLogin.id)
    const cart = users[indexUser].cart

    const indexProduct = cart.findIndex(item => item.id === id)
    switch (status) {
        case 0:
            if ((cart[indexProduct].quantity - 1) < 1) {
                cart.splice(indexProduct, 1)
            } else {
                cart[indexProduct].quantity -= 1
            }
            users[indexUser].cart = cart
            localStorage.setItem("users", JSON.stringify(users))

            userLogin.cart = cart
            localStorage.setItem("userLogin", JSON.stringify(userLogin))

            renderCart()
            break
        case 1:
            const product = products.find(item => item.id === id)
            if ((cart[indexProduct].quantity + 1) > product.stock) {
                alert("qua so luong trong kho !")
            } else {
                cart[indexProduct].quantity += 1
            }
            users[indexUser].cart = cart
            localStorage.setItem("users", JSON.stringify(users))

            userLogin.cart = cart
            localStorage.setItem("userLogin", JSON.stringify(userLogin))
            renderCart()
            break
    }
}

function pay() {
    const bills = JSON.parse(localStorage.getItem("bills")) || [];
    const userLogin = JSON.parse(localStorage.getItem("userLogin"));
    const users = JSON.parse(localStorage.getItem("users"));

    if (userLogin.cart.length == 0) {
        alert("ban chua them san pham vao gio hang")
        window.location.href = "./bills-user.html";
        return
    }

    let order = {
        id: uuid(),
        cart: userLogin.cart,
        status: 0,
        user_id: userLogin.id
    }
    bills.push(order);
    console.log(bills);
    localStorage.setItem("bills", JSON.stringify(bills));

    userLogin.cart = [];
    localStorage.setItem("userLogin", JSON.stringify(userLogin));

    let index = users.findIndex(user => user.id === userLogin.id);
    users[index].cart = [];
    localStorage.setItem("users", JSON.stringify(users));

    window.location.href = "./bills-user.html";

}


