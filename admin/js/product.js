// 
function category() {
    console.log("hello");
    window.location.href = "./category.html";
}
// 
function user() {
    console.log("hello");
    window.location.href = "./user.html";
}
// 
function bill() {
    console.log("hello");
    window.location.href = "./bill.html";
}
// tạo id ngẫu nhiên
function uuid() {
    return Math.floor(Math.random() * 9999999999) + new Date().getMilliseconds();
}

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

// lấy dữ liệu từ local về sau đó render 
let products = JSON.parse(localStorage.getItem("productsObject")) || [];
let itemsPerPage = 4;
let totalPages = Math.ceil(products.length / itemsPerPage);
let currentPage = 1;
let flag = true;
let renderArray = products;
let selectedIndex;

function renderProducts() {
    let start = (currentPage - 1) * itemsPerPage;
    let end = currentPage * itemsPerPage;
    if (end > renderArray.length) {
        end = renderArray.length
    }
    let render = "";
    for (let i = start; i < end; i++) {
        render += `
                        <tr>
                        <td>${renderArray[i].id}</td>
                        <td>${renderArray[i].name}</td>
                        <td><img width="100px" src=${renderArray[i].image} alt="" / class="img1"></td>
                        <td>${VND.format(renderArray[i].price)}</td>
                        <td>${renderArray[i].stock}</td>
                        <td><button onclick="showFormUpdate(${renderArray[i].id})" class="btn1-1">Edit</button></td>
                        <td><button onclick="deleteObj(${renderArray[i].id})" class="btn1-1">Delete</button></td>
                        </tr>
                         `
    }
    document.getElementById("tbody").innerHTML = render;
}
renderProducts();

function renderPages() {
    let resultPages = "";
    for (let i = 1; i <= totalPages; i++) {
        resultPages += `
                        <span onclick="selectPage(${i})" class="spanAdmin" id="btn${i}">${i}</span>                 
                `
    }
    document.getElementById("div2").innerHTML = resultPages;
    document.getElementById("btn1").style.color = "rgb(56, 179, 138)";
}
renderPages();


function selectPage(page) {
    let a = document.getElementById("btn1")
    a.style.color = "";
    let span = document.getElementsByClassName("spanAdmin");
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
    let span = document.getElementsByClassName("spanAdmin");
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
    let span = document.getElementsByClassName("spanAdmin");
    document.getElementById("btn1").style.color = "";
    console.log(span, "2");

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
// 
// tìm kiếm sản phẩm
function search() {
    let arrSearch = [];
    let input = document.getElementById("search").value;

    for (let i = 0; i < products.length; i++) {
        let includes = products[i].name.toLowerCase().includes(input.toLowerCase());
        if (includes) {
            arrSearch.push(products[i]);
        }
    }
    renderArray = arrSearch;
    renderProducts();
}
// 
function addProduct() {
    let inputOne = document.getElementById("input-one").value;
    let inputTwo = document.getElementById("input-two").value;
    let inputThree = document.getElementById("input-three").value;
    let value_select = document.getElementById("select-category").value;
    console.log(value_select, "value_select");
    obj = {
        id: uuid(),
        name: inputOne,
        image: dataImage,
        price: inputTwo,
        stock: inputThree,
        categoryId: +value_select
    }

    products.unshift(obj);

    localStorage.setItem("productsObject", JSON.stringify(products));

    console.log(products);
    renderProducts();
    dataImage = ""
    document.getElementById("previewImage").src = dataImage;
}

// 
function deleteObj(id) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            products.splice(i, 1);
        }
    }
    localStorage.setItem("productsObject", JSON.stringify(products));
    renderProducts();
}

function showFormUpdate(id) {
    console.log(id);
    flag = false;
    let nameProduct = document.getElementById("input-one");
    let price = document.getElementById("input-two");
    let quantity = document.getElementById("input-three");
    let category = document.getElementById("select-category");
    let image = document.getElementById("previewImage");
    console.log(image);
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            nameProduct.value = products[i].name;
            price.value = products[i].price;
            quantity.value = products[i].stock;
            category.value = +products[i].categoryId;
            image.src = products[i].image;
        }
    }
    selectedIndex = id;
}

function activeSave() {
    let nameProduct = document.getElementById("input-one");
    let price = document.getElementById("input-two");
    let quantity = document.getElementById("input-three");
    let category = document.getElementById("select-category");
    let image = document.getElementById("previewImage");
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == selectedIndex) {
            products[i].name = nameProduct.value;
            products[i].price = price.value;
            products[i].stock = quantity.value;
            products[i].categoryId = category.value;
            products[i].image = image.src;
        }
    }
    localStorage.setItem("productsObject", JSON.stringify(products));
    renderProducts();
    flag = true;
}

function addNewOrEdit() {
    if (flag) {
        addProduct();
    } else {
        activeSave();
    }
}
// 

// 
let dataImage;
// hàm này dùng để thay đổi ảnh đại diện
function changeImage() {
    // đi đến ô input chọn ảnh
    const elementImage = document.getElementById("image")
    // lấy file ảnh đã chọn
    var file = elementImage.files[0];
    // khai báo một đối tượng để làm chức năng đọc ảnh
    var reader = new FileReader();
    // đọc ảnh
    reader.onloadend = function () {
        // hứng kết quả đọc đc
        dataImage = reader.result
        // đưa kết quả lên màn hình
        document.getElementById("previewImage").src = dataImage
    }
    reader.readAsDataURL(file);
}
// liên quan đến chọn category(bé trai,gái,phụ kiện)

let category_local = JSON.parse(localStorage.getItem("category"));
let categorySelected = document.getElementById("select-category");
// forEach lặp qua từng phần tử trong mảng nhưng ko sinh ra mảng mới
category_local.forEach((categoryItem) => {
    //categoryItem là đại diện cho từng phần tử trong mảng
    // createElement tạo ra thẻ option
    const option = document.createElement("option");
    // option.value là khai báo value của thẻ option
    option.value = categoryItem.id;
    // option.text là khai báo text của thẻ option
    // <option value="default">Chọn loại sản phẩm(text)</option>
    option.text = categoryItem.name;
    //appendChild sinh ra thẻ con ở trong thẻ cha(categorySelected là thẻ cha)
    categorySelected.appendChild(option);
});
// 