// 
function category() {
    console.log("hello");
    window.location.href = "./category.html";
}
// 
function product() {
    console.log("hello");
    window.location.href = "./product.html";
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
                <div class="div-admin">${users[i].email}</div>
                `
        }
    }
    document.getElementById("name").innerHTML = resultNameAdmin;
}
renderNameAdmin();

function renderUser() {
    let users = JSON.parse(localStorage.getItem("users"));
    let resultUsers = "";
    for (let i = 0; i < users.length; i++) {
        resultUsers += `
                    <tr>
                        <td>${users[i].id}</td>
                        <td>${users[i].email}</td>
                        <td>
                        <img src="${users[i].image}" alt="" class="img1">
                        </td>
                        <td>${users[i].status ? "Active" : "Block"}</td>
                        <td>
                            <button onclick="changeStatus(${i})">${users[i].status ? "Block" : "Active"}</button>
                        </td>
                    </tr>
                            `
    }
    document.getElementById("tbody").innerHTML = resultUsers;
}
renderUser();

function changeStatus(index) {
    let users = JSON.parse(localStorage.getItem("users"));
    users[index].status = !users[index].status;
    localStorage.setItem("users", JSON.stringify(users));
    renderUser();
}

function logOutAdmin() {
    window.location.href = "/index.html";
}
