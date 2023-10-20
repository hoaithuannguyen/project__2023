let users = JSON.parse(localStorage.getItem("users")) || [];

// tao Id ngau nhien
function uuid() {
    return Math.floor(Math.random() * 999999) + new Date().getMilliseconds();
}

function conditionEmail(email) {
    // Kiểm tra định dạng email bằng regex
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
function conditionPassword(password) {
    // Kiểm tra mật khẩu có ít nhất 6 ký tự, gồm chữ cái hoa, chữ cái thường và số
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    return regex.test(password);
}

// hàm đăng nhập
function signUp() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmpassword = document.getElementById("confirmpassword").value;

    if (password != confirmpassword) {
        alert("Password không hợp lệ");
        return;
    }

    if (!conditionEmail(email)) {
        alert("Email không hợp lệ");
        return;
    }
    if (!conditionPassword(password)) {
        // div2.style.display = "block";
        // div2.innerHTML = "Mật khẩu không hợp lệ. Mật khẩu phải có ít nhất 6 ký tự, gồm chữ cái hoa, chữ cái thường và số.";
        alert("Password không hợp lệ");
        // div1.style.display = "none";
        return;
    }

    for (let i = 0; i < users.length; i++) {
        if ((users[i].email == email)) {
            alert("Email đã được đăng ký");
            return;
        }
    }

    let object = {
        id: uuid(),
        email: email,
        password: password,
        image: dataImage,
        role: 0,
        status: true,
        cart: [],
    }

    users.push(object);
    localStorage.setItem("users", JSON.stringify(users));
    console.log(users);
    alert("Đăng ký thành công");
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("confirmpassword").value = "";
    document.getElementById("previewImage").src = "";
}

// ======================================================================
// chuyển đổi file ảnh sang dữ liệu sang dạng chữ(để lưu lên localStorage)
// liên quan đến ảnh đại diện
let dataImage;
function changeImage() {
    const elementImage = document.getElementById("image")
    var file = elementImage.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        dataImage = reader.result
        document.getElementById("previewImage").src = dataImage
    }
    reader.readAsDataURL(file);
}
