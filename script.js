// --- CREDENCIALES DE PRUEBA POR ROL ---
const USUARIOS_VALIDOS = [
  { 
    usuario: "12.345.678-9", 
    pass: "estudiante123", 
    nombre: "Juan Pérez (Estudiante)", 
    rol: "estudiante",
    pagina: "estudiante.html" 
  },
  { 
    usuario: "98.765.432-1", 
    pass: "profesor123", 
    nombre: "María González (Docente)", 
    rol: "profesor",
    pagina: "profesor.html" 
  },
  { 
    usuario: "admin.utp", 
    pass: "utp12345", 
    nombre: "Carlos Soto (Encargado UTP)", 
    rol: "utp",
    pagina: "utp.html" 
  }
];

// --- ELEMENTOS DEL DOM ---
const passwordInput = document.getElementById("intraPass");
const togglePassBtn = document.getElementById("togglePass");
const loginForm = document.getElementById("loginForm");
const userInput = document.getElementById("intraUser");
const alertBox = document.getElementById("alertBox");
const alertIcon = document.getElementById("alertIcon");
const alertText = document.getElementById("alertText");
const closeBtn = document.getElementById("closeBtn");
const forgotPassLink = document.getElementById("forgotPassLink");

// Toggle visibilidad contraseña
togglePassBtn.addEventListener("click", () => {
  const mostrar = passwordInput.type === "password";
  passwordInput.type = mostrar ? "text" : "password";

  togglePassBtn.innerHTML = mostrar
    ? '<i class="fas fa-eye-slash"></i>'
    : '<i class="fas fa-eye"></i>';
});

// Manejo del formulario de Login
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const userEntered = userInput.value.trim();
  const passEntered = passwordInput.value.trim();

  // Buscar coincidencia en los roles
  const usuarioEncontrado = USUARIOS_VALIDOS.find(
    (u) => u.usuario === userEntered && u.pass === passEntered
  );

  if (usuarioEncontrado) {
    mostrarAlerta(`¡Bienvenido/a, ${usuarioEncontrado.nombre}! Redirigiendo...`, "success", "fa-check-circle");

    // Guardar datos de sesión temporalmente
    localStorage.setItem("sesionIniciada", "true");
    localStorage.setItem("usuarioNombre", usuarioEncontrado.nombre);
    localStorage.setItem("usuarioRol", usuarioEncontrado.rol);

    // Redirigir a la página correspondiente según el rol después de 1.2 segundos
    setTimeout(() => {
      window.location.href = usuarioEncontrado.pagina;
    }, 1200);

  } else {
    mostrarAlerta("Credenciales incorrectas. Prueba con un usuario válido del sistema.", "error", "fa-lock");
  }
});

// Función para mostrar alertas estilizadas
function mostrarAlerta(mensaje, tipo, icono) {
  alertText.textContent = mensaje;
  alertIcon.className = `fas ${icono}`;
  alertBox.className = `alert-box ${tipo}`;
  alertBox.style.display = "flex";
}

// Botón de cerrar
closeBtn.addEventListener("click", () => {
  if (confirm("¿Deseas cerrar la ventana de inicio de sesión?")) {
    document.querySelector(".login-card").style.display = "none";
  }
});

// Olvidaste contraseña
forgotPassLink.addEventListener("click", (e) => {
  e.preventDefault();
  mostrarAlerta("Para restablecer la clave, contacta a soporte@liceoavb.cl", "error", "fa-exclamation-circle");
});