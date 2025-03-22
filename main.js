// Kiểm tra nếu JavaScript đã tải
console.log("JavaScript đã tải thành công!");

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM đã tải hoàn toàn!");

    // Lấy các phần tử HTML
    const loginBtn = document.getElementById("login-btn");
    const registerBtn = document.getElementById("register-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const sendBtn = document.getElementById("send-btn");

    // Kiểm tra nếu các nút có tồn tại
    if (!loginBtn || !registerBtn || !logoutBtn || !sendBtn) {
        console.error("Không tìm thấy một số phần tử cần thiết! Kiểm tra lại ID trong HTML.");
        return;
    }

    /** ==========================
     *  ĐĂNG KÝ TÀI KHOẢN
     *  ========================== */
    registerBtn.addEventListener("click", () => {
        console.log("Nút đăng ký đã được bấm!");

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log("Đăng ký thành công!", userCredential.user);
                alert("Đăng ký thành công! Vui lòng đăng nhập.");
            })
            .catch(error => {
                console.error("Lỗi đăng ký:", error.message);
                alert("Lỗi đăng ký: " + error.message);
            });
    });

    /** ==========================
     *  ĐĂNG NHẬP
     *  ========================== */
    loginBtn.addEventListener("click", () => {
        console.log("Nút đăng nhập đã được bấm!");

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log("Đăng nhập thành công!", userCredential.user);
                document.getElementById("login-section").style.display = "none";
                document.getElementById("chat-section").style.display = "block";
            })
            .catch(error => {
                console.error("Lỗi đăng nhập:", error.message);
                alert("Lỗi đăng nhập: " + error.message);
            });
    });

    /** ==========================
     *  ĐĂNG XUẤT
     *  ========================== */
    logoutBtn.addEventListener("click", () => {
        console.log("Nút đăng xuất đã được bấm!");

        auth.signOut()
            .then(() => {
                console.log("Đã đăng xuất!");
                document.getElementById("login-section").style.display = "block";
                document.getElementById("chat-section").style.display = "none";
            })
            .catch(error => {
                console.error("Lỗi đăng xuất:", error.message);
                alert("Lỗi đăng xuất: " + error.message);
            });
    });

    /** ==========================
     *  GỬI TIN NHẮN
     *  ========================== */
    sendBtn.addEventListener("click", async () => {
        console.log("Nút gửi tin nhắn đã được bấm!");

        const message = document.getElementById("message-input").value;
        if (message.trim() === "") return;

        await db.collection("messages").add({
            text: message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            sender: auth.currentUser.email
        });

        document.getElementById("message-input").value = "";
    });

    /** ==========================
     *  LẤY TIN NHẮN TỪ FIRESTORE
     *  ========================== */
    db.collection("messages").orderBy("timestamp").onSnapshot(snapshot => {
        const messagesDiv = document.getElementById("messages");
        messagesDiv.innerHTML = "";
        snapshot.forEach(doc => {
            const data = doc.data();
            messagesDiv.innerHTML += `<p><b>${data.sender}:</b> ${data.text}</p>`;
        });
    });

    /** ==========================
     *  THEO D
