// localStorage.clear();

// tạo sản phẩm, lưu trên localStorage
/* let productsObject = [{
    id: 1,
    name: "sản phẩm 1",
    price: 9000,
    img: "./images/images/begai2.jpg",
    stock: 10,
    categoryId: 3
},
{
    id: 2,
    name: "sản phẩm 2",
    price: 8000,
    img: "./images/images/begai4.jpg",
    stock: 10,
    categoryId: 1
},
{
    id: 3,
    name: "sản phẩm 3",
    price: 12000,
    img: "./images/images/mombaby2.jpg",
    stock: 10,
    categoryId: 1
},
{
    id: 4,
    name: "sản phẩm 4",
    price: 5000,
    img: "./images/images/betrai20.jpg",
    stock: 10,
    categoryId: 1
},
{
    id: 5,
    name: "sản phẩm 5",
    price: 3000,
    img: "./images/images/betrai25.jpg",
    stock: 10,
    categoryId: 2
},
{
    id: 6,
    name: "sản phẩm 6",
    price: 10000,
    img: "./images/images/betrai29.jpg",
    stock: 10,
    categoryId: 2
},
{
    id: 7,
    name: "sản phẩm 7",
    price: 5000,
    img: "./images/images/mombaby3.jpg",
    stock: 10,
    categoryId: 2
},
{
    id: 8,
    name: "sản phẩm 8",
    price: 3000,
    img: "./images/images/mombaby1.jpg",
    stock: 10,
    categoryId: 3
},
{
    id: 9,
    name: "sản phẩm 9",
    price: 3000,
    img: "./images/images/mombaby1.jpg",
    stock: 10,
    categoryId: 1
},
{
    id: 10,
    name: "sản phẩm 10",
    price: 3000,
    img: "./images/images/mombaby1.jpg",
    stock: 10,
    categoryId: 2
},
{
    id: 11,
    name: "sản phẩm 11",
    price: 3000,
    img: "./images/images/mombaby1.jpg",
    stock: 10,
    categoryId: 3
},
{
    id: 12,
    name: "sản phẩm 12",
    price: 3000,
    img: "./images/images/mombaby1.jpg",
    stock: 10,
    categoryId: 3
},
{
    id: 13,
    name: "sản phẩm 13",
    price: 12000,
    img: "./images/images/mombaby2.jpg",
    stock: 10,
    categoryId: 1
},
{
    id: 14,
    name: "sản phẩm 14",
    price: 12000,
    img: "./images/images/mombaby2.jpg",
    stock: 10,
    categoryId: 1
},
{
    id: 15,
    name: "sản phẩm 15",
    price: 5000,
    img: "./images/images/mombaby3.jpg",
    stock: 10,
    categoryId: 2
},
{
    id: 16,
    name: "sản phẩm 16",
    price: 5000,
    img: "./images/images/mombaby3.jpg",
    stock: 10,
    categoryId: 2
},
{
    id: 17,
    name: "sản phẩm 17",
    price: 5000,
    img: "./images/images/mombaby3.jpg",
    stock: 10,
    categoryId: 2
},
];
localStorage.setItem("productsObject", JSON.stringify(productsObject)); */

// let category = [
//     {
//         id: 1,
//         name: "Bé trai"
//     },
//     {
//         id: 2,
//         name: "Bé gái"
//     },
//     {
//         id: 3,
//         name: "Phụ kiện"
//     },
// ]
// localStorage.setItem("category", JSON.stringify(category));

let userLogin = JSON.parse(localStorage.getItem("userLogin")) || {};
let users = JSON.parse(localStorage.getItem("users")) || [];
let category = JSON.parse(localStorage.getItem("category"));
let dataImage;

// hàm này dùng để thay đổi ảnh đại diện
function changeImage() {
    // đi đến ô input chọn ảnh
    let elementImage = document.getElementById("changeImage")
    // lấy file ảnh đã chọn
    var file = elementImage.files[0];
    // khai báo một đối tượng để làm chức năng đọc ảnh
    var reader = new FileReader();
    // đọc ảnh
    reader.onloadend = function () {
        // hứng kết quả đọc đc
        dataImage = reader.result
        // đưa kết quả lên màn hình
        document.getElementById("image").src = dataImage
        // lưu sự thay đổi này lên local
        userLogin.image = dataImage
        localStorage.setItem("userLogin", JSON.stringify(userLogin))

        let index = users.findIndex(user => user.id == userLogin.id)
        users[index] = userLogin
        localStorage.setItem("users", JSON.stringify(users))
    }
    reader.readAsDataURL(file);
}
//
function thongbao() {
    document.getElementById("thongbao").innerHTML = `${(userLogin.cart.length)} (sản phẩm)`
    renderProducts();
}
//
if (userLogin && userLogin.email) {
    document.getElementById("div-in-signin").innerHTML =
        `
            <div>
                <label for="changeImage">Đổi Ảnh Đại Diện</label>
                <input type="file" id="changeImage" hidden onchange="changeImage()">
            </div>
            <div onclick="changePassword()" id="changePassword">Đổi mật khẩu</div>
            <div onclick="logOut()">Đăng xuất</div>
        `
    document.getElementById("image").src = userLogin.image;
    document.getElementById("thongbao").innerHTML = `${(userLogin.cart.length)} (sản phẩm)`
} else {
    document.getElementById("div-in-signin").innerHTML =
        `
        <div id="logIn" onclick="logIn()">Đăng nhập</div>
        <div id="register" onclick="register()">Đăng ký</div>
    `
}

// định dạng chuyển đổi tiền tệ
let VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

// render các sản phẩm 

let products = JSON.parse(localStorage.getItem("productsObject")) || [];
console.log(products);

let itemsPerPage = 8;
let totalPages = Math.ceil(products.length / itemsPerPage);
let currentPage = 1;

function renderProducts() {

    let start = (currentPage - 1) * itemsPerPage;
    let end = currentPage * itemsPerPage;
    if (end > products.length) {
        end = products.length
    }

    let resultProducts = "";
    for (let i = start; i < end; i++) {
        resultProducts += `
                        <div class="discount-products">
                            <img src="${products[i].image}" alt="" class="img-discount">
                            <div class="name">${products[i].name}</div>
                            <div class="price">${VND.format(products[i].price)}</div>
                            <div class="buy"><button onclick="buyItems(${products[i].id})">Mua hàng</button></div>
                        </div>
                        `
    }
    document.getElementById("div-content").innerHTML = resultProducts;
}
renderProducts();
// 
function renderPages() {
    let resultPages = "";
    for (let i = 1; i <= totalPages; i++) {
        resultPages += `
                        <span onclick="selectPage(${i})" class="span" id="btn${i}">${i}</span>                 
                `
    }
    document.getElementById("div2").innerHTML = resultPages;
    document.getElementById("btn1").style.color = "rgb(56, 179, 138)";
}
renderPages();

// 

function selectPage(page) {
    console.log(page, "page");
    document.getElementById("btn1").style.color = "";
    let span = document.getElementsByClassName("span");

    for (let i = 0; i < span.length; i++) {
        if (i == page - 1) {
            span[i].classList.add("image-card-choose");
        } else {
            span[i].classList.remove("image-card-choose");
        }
    }
    currentPage = page;
    renderProducts();
}

function toPrevPage() {
    let span = document.getElementsByClassName("span");
    document.getElementById("btn1").style.color = "";
    console.log(span, "1");
    currentPage--;
    if (currentPage < 1) {
        currentPage = 1
    }

    for (let i = 0; i < span.length; i++) {
        if (i + 1 == currentPage) {
            span[i].classList.add("image-card-choose");
        } else {
            span[i].classList.remove("image-card-choose");
        }
    }
    renderProducts();
}
// 
function toNextPage() {
    let span = document.getElementsByClassName("span");
    document.getElementById("btn1").style.color = "";

    currentPage++;
    let totalPage = Math.ceil(products.length / itemsPerPage);
    if (currentPage > totalPage) {
        currentPage = totalPage
    }

    for (let i = 0; i < span.length; i++) {
        if (i + 1 == currentPage) {
            span[i].classList.add("image-card-choose");
        } else {
            span[i].classList.remove("image-card-choose");
        }
    }
    renderProducts();
}

// khi click vào thì sẽ chuyển trang

function register() {
    window.location.href = "./user/page/register.html";
}

function logIn() {
    window.location.href = "login.html";
}

function logOut() {
    localStorage.setItem("userLogin", JSON.stringify({}));
    window.location.href = "index.html";
}

//wiper---------------------------------------
let swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 10000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

//----------------------------------------------
//thay đổi password
function changePassword() {
    document.getElementById("form-changePassword").style.display = "block";
    document.getElementById("form-changePassword").innerHTML =
        `
    <div class="changepassword">
        <table>
            <tr>
                <td><label for="">Mật khẩu cũ</label></td>
                <td><input type="text" id="old-password"></td>
                    
            </tr>
            <tr>
                <td><label for="">Mật khẩu mới</label></td>
                <td><input type="text" id="new-pasword"></td>
                
            </tr>
            <tr>
                <td><label for="">Xác nhận lại mật khẩu</label></td>
                <td><input type="text" id="confirm-pasword"></td>
                
            </tr>
        </table>
            <div class="div-changepassword">
            <button onclick="deleteChangePassword()" class=btn-one>Hủy</button>
            <button onclick="confirmNewPassword()" class=btn-one>Xác nhận</button>
            </div>
    </div>
        `
}
// hàm tắt việc thay đổi password
function deleteChangePassword() {
    document.getElementById("form-changePassword").style.display = "none";

}
//hàm thay đổi password
function confirmNewPassword() {

    let oldPassword = document.getElementById("old-pasword").value;
    let newPasword = document.getElementById("new-pasword").value;
    let confirmPasword = document.getElementById("confirm-pasword").value;
    if (userLogin.password === oldPassword) {

        if (newPasword == confirmPasword) {
            userLogin.password = newPasword;
            localStorage.setItem("userLogin", JSON.stringify(userLogin));

            let index = users.findIndex((user) => user.email === userLogin.email);
            users[index] = userLogin;
            localStorage.setItem("users", JSON.stringify(users));
        }
    } else {
        alert("Sai mật khẩu cũ");
    }
    document.getElementById("form-changePassword").style.display = "none";
}

// ----------------------------------------
function renderCategory() {
    let resultCategory = "";
    let id = 2;
    for (let i = 0; i < category.length; i++) {
        resultCategory += `
                            <div onclick="handleCategory(${category[i].id})">${category[i].name}</div>
                            `
    }
    document.getElementById("category").innerHTML = resultCategory;
    handleCategory(id);
}
renderCategory();

// hàm filter là lọc giá trị theo đk,sau đó trả về 1 mảng gồm những phần tử thỏa mãn
// đk mảng.filter((đại diện mảng) => đại diện mảng.categoryId === đk)

function handleCategory(id) {
    let productsCategory = products.filter((product) => (product.categoryId == id));
    console.log(productsCategory);
    let resultProductsCategory = "";
    for (let i = 0; i < productsCategory.length; i++) {
        resultProductsCategory += `
                                 <div class="test-products">
                                 <img src="${productsCategory[i].image}" alt="" class="img-discount">
                                 <div class="name">${productsCategory[i].name}</div>
                                 <div class="price">${VND.format(productsCategory[i].price)}</div>
                                 <div class="buy"><button onclick="buyItems(${productsCategory[i].id})">Mua hàng</button></div>
                                 </div>
                                    `
    }
    document.getElementById("render_by_category").innerHTML = resultProductsCategory;
}

// hàm mua sản phẩm
let cart = userLogin.cart;

function buyItems(id) {
    // hàm find là tìm kiếm phần tử trong mảng theo điều kiện, gặp thì trả lại Obj
    let product = products.find(product => product.id === id);
    console.log("product-1", product);
    // khi sử dụng phương thức find, nếu có gtri thì trả về obj, không có trả về undfine
    let itemInCart = cart.find(itemInCart => itemInCart.id === id);

    if (itemInCart) {
        itemInCart.quantity += 1;
    } else {
        item = {
            ...product,
            quantity: 1
        }
        cart.push(item);
    }
    userLogin.cart = cart;
    localStorage.setItem("userLogin", JSON.stringify(userLogin));
    let findUser = users.findIndex((user) => user.id === userLogin.id)
    users[findUser].cart = cart;
    localStorage.setItem("users", JSON.stringify(users));
    thongbao();
}
//click vào giỏ hàng thì chuyển trang
function renderCart() {
    console.log("hellllo");
    window.location.href = "./user/page/cart.html";
}