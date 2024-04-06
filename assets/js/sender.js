const name = document.getElementById("name");
const subject = document.getElementById("subject");
const message = document.getElementById("message");
const sendBtn = document.getElementById("sendBtn");

const modal = document.getElementById("modal-contact-send");
const closeButton = document.getElementsByClassName("close-button")[0];

// Cuando el usuario haga click cerrar el modal
closeButton.onclick = function () {
    modal.style.display = "none";
}

// Cuando el usuario haga clic fuera del modal, cerrarlo
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
function showModal(message) {
    document.getElementById("modal-message").textContent = message;
    modal.style.display = "block";
}

const sendForm = (formData) => {
    fetch("https://nest-email-service-production.up.railway.app/mail", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
        .then(response => response.json())
        .then((data) => {
            (data.message == "Email sent") ?
                showModal("Mensaje enviado con exito, nos pondremos en contacto")
                :
                showModal(data.message)
        })
        .catch(error => console.log(error)
        )
}

sendBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if (name.value == "" || subject.value == "" || message.value == "") {
        showModal("Todos los campos son obligatorios")
        return;
    }
    const formData = {
        name: name.value,
        subject: subject.value,
        message: message.value,
    }
    sendForm(formData);
})
