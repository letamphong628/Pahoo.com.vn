document.getElementById("register-btn").addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    auth.createUserWithEmailAndPassword(email, password)
        .then(() => alert("Đăng ký thành công!"))
        .catch(error => alert("Lỗi: " + error.message));
});

document.getElementById("login-btn").addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            document.getElementById("login-section").style.display = "none";
            document.getElementById("chat-section").style.display = "block";
        })
        .catch(error => alert("Lỗi: " + error.message));
});

document.getElementById("send-btn").addEventListener("click", async () => {
    const message = document.getElementById("message-input").value;
    if (message.trim() === "") return;
    await db.collection("messages").add({ text: message, timestamp: firebase.firestore.FieldValue.serverTimestamp() });
    document.getElementById("message-input").value = "";
});

db.collection("messages").orderBy("timestamp").onSnapshot(snapshot => {
    const messagesDiv = document.getElementById("messages");
    messagesDiv.innerHTML = "";
    snapshot.forEach(doc => {
        messagesDiv.innerHTML += `<p>${doc.data().text}</p>`;
    });
});
