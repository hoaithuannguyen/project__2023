// 
function product() {
    console.log("hello");
    window.location.href = "./product.html";
}
// 
function user() {
    console.log("hello");
    window.location.href = "./user.html";
}
// 
function category() {
    console.log("hello");
    window.location.href = "./category.html";
}
let bills = JSON.parse(localStorage.getItem("bills")) || [];
let users = JSON.parse(localStorage.getItem("users")) || [];

function renderNameAdmin() {

    let resultNameAdmin = "";
    for (let i = 0; i < users.length; i++) {
        if (users[i].role == 1) {
            resultNameAdmin +=
                `
                <div>${users[i].email}</div>
                `
        }
    }
    document.getElementById("name").innerHTML = resultNameAdmin;
}
renderNameAdmin();
// định dạng chuyển đổi tiền tệ
let VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

function renderBills() {
    let bills = JSON.parse(localStorage.getItem("bills"));
    let resultBills = "";
    for (let i = 0; i < bills.length; i++) {
        let stringCart = "";
        let currentCart = bills[i].cart;
        let totalPrice = 0;
        for (let j = 0; j < currentCart.length; j++) {
            totalPrice += Number(currentCart[j].price) * Number(currentCart[j].quantity);

            stringCart +=
                `
                <div>Tên sản phẩm:${currentCart[j].name}</div>
                <div>SL:${currentCart[j].quantity}</div>
                <div>
                <img src=" ${currentCart[j].image}" alt="" class="img1">
                </div>
            `
        }

        resultBills +=
            `
            <tr>
            <td>${bills[i].id}</td>
            <td>${bills[i].user_id}</td>
            <td>${bills[i].status == 0 ? "Wait" : bills[i].status == 1 ? "Accept" : "Cancel"}</td>
            <td>${stringCart}</td>
            <td>${VND.format(totalPrice)}</td>
            <td>
               

${bills[i].status == 0 ? `<button onclick="accept(${bills[i].id})"id="btn">Đồng ý</button><button onclick="cancel(${bills[i].id})"id="btn">Hủy đơn</button>` : `<span></span>`}

          </td>
            </tr>
        `
    }
    document.getElementById("tbody").innerHTML = resultBills;
}
renderBills();

function accept(id) {
    let bills = JSON.parse(localStorage.getItem("bills")) || [];
    // thay đổi status để xác nhận đơn hàng.
    for (let i = 0; i < bills.length; i++) {
        // thay đổi status để xác nhận đơn hàng.
        if (bills[i].id == id) {
            bills[i].status = 1;
            break;
        }
    }
    localStorage.setItem("bills", JSON.stringify(bills));
    renderBills();
}

function cancel(id) {
    let bills = JSON.parse(localStorage.getItem("bills")) || [];
    for (let i = 0; i < bills.length; i++) {
        // thay đổi status để xác nhận đơn hàng.
        if (bills[i].id == id) {
            bills[i].status = 2;
            break;
        }
    }
    localStorage.setItem("bills", JSON.stringify(bills));
    renderBills();
}