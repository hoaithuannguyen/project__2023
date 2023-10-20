let users = JSON.parse(localStorage.getItem("users")) || [];

function signIn() {

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let check = true;
    for (let i = 0; i < users.length; i++) {
        if (email == "") {
            // alert("Vui lòng điền đủ thông tin");
            check = false
            continue;
        }
        if (users[i].password != password) {
            // alert("Mật khẩu không hợp lệ");
            check = false
            continue;
        }
        if ((users[i].email == email) && (users[i].password == password)) {
            if (!users[i].status) {
                alert("Tài khoản đã bị khóa");
                return;
            }

            localStorage.setItem("userLogin", JSON.stringify(users[i]));
            if (users[i].role == 0) {
                window.location.href = "index.html";
            } else {
                window.location.href = "./admin/page/user.html";
            }
            check = true
            break;
        }
    }
    if (!check) {
        alert("Thông tin đăng nhập sai!")
    }
}