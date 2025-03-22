
// Kiểm tra nếu JavaScript đã tải
console.log("JavaScript đã tải thành công!");

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM đã tải hoàn toàn!");

    const loginBtn = document.getElementById("login-btn");
    const registerBtn = document.getElementById("register-btn");
    const sendBtn = document.getElementById("send-btn");

    if (!loginBtn || !registerBtn || !sendBtn) {
        console.error("Không tìm thấy nút cần thiết! Kiểm tra lại ID trong HTML.");
        return;
    }

    loginBtn.addEventListener("click", () => {
        console.log("Nút đăng nhập đã được bấm!");
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log("Đăng nhập thành công!");
                document.getElementById("login-section").style.display = "none";
                document.getElementById("chat-section").style.display = "block";
            })
            .catch(error => alert("Lỗi đăng nhập: " + error.message));
    });

    registerBtn.addEventListener("click", () => {
        console.log("Nút đăng ký đã được bấm!");
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        auth.createUserWithEmailAndPassword(email, password)
            .then(() => alert("Đăng ký thành công!"))
            .catch(error => alert("Lỗi đăng ký: " + error.message));
    });

    sendBtn.addEventListener("click", async () => {
        console.log("Nút gửi tin nhắn đã được bấm!");
        const message = document.getElementById("message-input").value;
        if (message.trim() === "") return;

        await db.collection("messages").add({ 
            text: message, 
            timestamp: firebase.firestore.FieldValue.serverTimestamp() 
        });
        document.getElementById("message-input").value = "";
    });

    // Kiểm tra Firebase đã khởi tạo chưa
    console.log("Firebase: ", firebase.apps.length > 0 ? "Đã khởi tạo" : "Chưa khởi tạo");

    // Lắng nghe tin nhắn từ Firestore
    db.collection("messages").orderBy("timestamp").onSnapshot(snapshot => {
        const messagesDiv = document.getElementById("messages");
        messagesDiv.innerHTML = "";
        snapshot.forEach(doc => {
            messagesDiv.innerHTML += `<p>${doc.data().text}</p>`;
        });
    });
});
