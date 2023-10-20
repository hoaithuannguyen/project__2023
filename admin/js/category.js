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
function bill() {
    console.log("hello");
    window.location.href = "./bill.html";
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

let products = JSON.parse(localStorage.getItem("productsObject")) || [];

function renderCategory() {
    const categorys = JSON.parse(localStorage.getItem("category")) || [];
    let stringHTML = "";
    for (let i = 0; i < categorys.length; i++) {
        stringHTML +=
            `
            <tr>
                <td>${categorys[i].id}</td>
                <td>${categorys[i].name}</td>
                <td>
                    <button onclick="clickUpdateCategory(${categorys[i].id})">Sua</button>
                    <button onclick="deleteCategory(${categorys[i].id})">Xoa</button>
                </td>
            </tr>
        `
    }
    document.getElementById("table_body").innerHTML = stringHTML
}
renderCategory()

function addCategory() {
    let categorys = JSON.parse(localStorage.getItem("category")) || [];
    const category = document.getElementById("input_category").value
    if (category) {
        categorys.push({
            id: categorys[categorys.length - 1].id + 1,
            name: category
        })
        localStorage.setItem("category", JSON.stringify(categorys))
        document.getElementById("input_category").value = ""
        renderCategory()
    }
}

function deleteCategory(id) {
    let categorys = JSON.parse(localStorage.getItem("category")) || [];
    categorys = categorys.filter(item => item.id != id)
    localStorage.setItem("category", JSON.stringify(categorys))
    renderCategory()
}

let idUpdate
function clickUpdateCategory(id) {
    idUpdate = id
    let categorys = JSON.parse(localStorage.getItem("category")) || [];
    const category = categorys.find(item => item.id == id)
    document.getElementById("input_category").value = category.name
}

function updateCategory() {
    let categorys = JSON.parse(localStorage.getItem("category")) || [];
    const newCategory = document.getElementById("input_category").value
    const index = categorys.findIndex(item => item.id == idUpdate)
    if (index > - 1) {
        categorys[index] = {
            id: idUpdate,
            name: newCategory
        }
        localStorage.setItem("category", JSON.stringify(categorys))
        document.getElementById("input_category").value = ""
        renderCategory()
    } else {
        alert("ko tim thay")
    }
}


