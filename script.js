// --- Lógica del Chatbot del Colegio Sagrado Corazón ---

// Esperamos a que todo el DOM y los iconos estén listos
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar iconos de Lucide
    lucide.createIcons();
    
    // Variables de Elementos del DOM
    const messagesBox = document.getElementById('messages-box');
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const themeToggle = document.getElementById('theme-toggle');
    const infoBtn = document.getElementById('info-btn');

    // Base de datos simulada de respuestas académicas
    const respuestasSoporte = {
        saludo: "¡Hola! Bienvenido al portal de atención del Colegio Sagrado Corazón. ¿En qué puedo ayudarte hoy?",
        horarios: "El horario de clases de primaria es de 07:30 a 13:00, y para secundaria es de 07:30 a 14:00.",
        matriculas: "El proceso de matrículas extraordinarias para el año escolar actual está abierto en secretaría académica de lunes a viernes.",
        contactos: "Puedes comunicarte con colecturía al correo colecturia@sagradocorazon.edu o llamar al número principal del plantel.",
        default: "Gracias por tu consulta. Tu requerimiento ha sido registrado en nuestra base de datos. Un asesor académico se pondrá en contacto contigo si es necesario."
    };

    // Agregar mensaje de bienvenida inicial
    agregarMensaje("sistema", respuestasSoporte.saludo);

    // Manejar envío de formulario
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const texto = userInput.value.trim();
        
        if (!texto) {
            showToast("Por favor escribe una consulta válida.");
            return;
        }

        // Agregar mensaje del usuario
        agregarMensaje("usuario", texto);
        userInput.value = "";

        // Simular respuesta del sistema con retraso
        setTimeout(() => {
            const respuesta = procesarConsulta(texto);
            agregarMensaje("sistema", respuesta);
        }, 800);
    });

    // Función para procesar y responder consultas
    function procesarConsulta(texto) {
        const busqueda = texto.toLowerCase();
        
        if (busqueda.includes("hola") || busqueda.includes("buenos dias") || busqueda.includes("buenas tardes")) {
            return respuestasSoporte.saludo;
        } else if (busqueda.includes("horario") || busqueda.includes("clase") || busqueda.includes("hora")) {
            return respuestasSoporte.horarios;
        } else if (busqueda.includes("matricula") || busqueda.includes("inscribir") || busqueda.includes("costo")) {
            return respuestasSoporte.matriculas;
        } else if (busqueda.includes("contacto") || busqueda.includes("correo") || busqueda.includes("telefono") || busqueda.includes("llamar")) {
            return respuestasSoporte.contactos;
        } else {
            return respuestasSoporte.default;
        }
    }

    // Función para pintar mensajes en pantalla
    function agregarMensaje(remitente, texto) {
        const divMsg = document.createElement('div');
        divMsg.className = `flex ${remitente === 'usuario' ? 'justify-end' : 'justify-start'} animate-fade-in`;
        
        const burbuja = document.createElement('div');
        burbuja.className = `max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-md ${
            remitente === 'usuario' 
            ? 'bg-brand-600 text-white rounded-br-none' 
            : 'bg-slate-800 text-slate-100 rounded-bl-none border border-slate-700/50'
        }`;
        
        burbuja.innerHTML = texto;
        divMsg.appendChild(burbuja);
        messagesBox.appendChild(divMsg);
        
        scrollToBottom();
    }

    // Desplazar automáticamente el chat hacia abajo
    function scrollToBottom() {
        messagesBox.scrollTop = messagesBox.scrollHeight;
    }

    // Toggle de Modo Oscuro / Modo Claro
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        const esOscuro = document.documentElement.classList.contains('dark');
        if (esOscuro) {
            showSuccessToast("Modo oscuro activado");
        } else {
            showSuccessToast("Modo claro activado");
        }
    });

    // Botón de información
    infoBtn.addEventListener('click', () => {
        agregarMensaje("sistema", "ℹ️ Este chat es un asistente de simulación de consultas académicas diseñado para alumnos del <strong>Colegio Sagrado Corazón</strong>.");
    });
});

// Mensajes de alerta Toast personalizados
function showToast(msg) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-message').innerText = msg;
    toast.className = toast.className.replace('translate-y-20 opacity-0', 'translate-y-0 opacity-100');
    setTimeout(() => {
        toast.className = toast.className.replace('translate-y-0 opacity-100', 'translate-y-20 opacity-0');
    }, 3000);
}

function showSuccessToast(msg) {
    const toast = document.getElementById('success-toast');
    document.getElementById('success-toast-message').innerText = msg;
    toast.className = toast.className.replace('translate-y-20 opacity-0', 'translate-y-0 opacity-100');
    setTimeout(() => {
        toast.className = toast.className.replace('translate-y-0 opacity-100', 'translate-y-20 opacity-0');
    }, 2500);
}