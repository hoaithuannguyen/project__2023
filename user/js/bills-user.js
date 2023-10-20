let bills = JSON.parse(localStorage.getItem("bills")) || [];
let userLogin = JSON.parse(localStorage.getItem("userLogin"));

// định dạng chuyển đổi tiền tệ
let VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

function renderBill() {
    let bills = JSON.parse(localStorage.getItem("bills"));
    let userLogin = JSON.parse(localStorage.getItem("userLogin"));
    let resultBill = "";
    const data = bills.filter(item => item.user_id == userLogin.id)


    for (let i = 0; i < data.length; i++) {
        let stringCart = "";
        let currentCart = data[i].cart;
        let totalPrice = 0;
        for (let j = 0; j < currentCart.length; j++) {
            totalPrice += Number(currentCart[j].price) * Number(currentCart[j].quantity);

            stringCart +=
                `
                <div>
                <img src=" ${currentCart[j].image}" alt="" class="img1">
                </div>
                <div class="tensanpham">Tên sản phẩm: ${currentCart[j].name}</div>
                <div>SL: ${currentCart[j].quantity}</div>
                
            `
        }
        resultBill +=
            `
            <tr>
                <td>${data[i].id}</td>
                <td>${data[i].user_id}</td>
                <td>${data[i].status == 0 ? "Wait" : data[i].status == 1 ? "Accept" : "Cancel"}</td>
                <td>${stringCart}</td>
                <td>${VND.format(totalPrice)}</td>
                <td>
                ${data[i].status == 0 ? `<button onclick="cancel(${data[i].id})"id="btn">Hủy đơn</button>` : `<span></span>`}  
                </td>
            </tr>
        `
    }
    document.getElementById("tbody").innerHTML = resultBill;
}
renderBill();

function cancel(id) {
    console.log(id);
    let bills = JSON.parse(localStorage.getItem("bills")) || [];
    for (let i = 0; i < bills.length; i++) {
        // thay đổi status để xác nhận đơn hàng.
        if (bills[i].id == id) {
            bills[i].status = 2;
            break;
        }
    }
    localStorage.setItem("bills", JSON.stringify(bills));
    renderBill();
}

