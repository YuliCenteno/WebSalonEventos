const toggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }
});

/* ANIMACIONES AL SCROLL - Intersection Observer */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Aplicar fade-in a todas las secciones
document.querySelectorAll('.section-secondary, .hero-section').forEach(section => {
  section.classList.add('fade-in');
  observer.observe(section);
});

// Galería modal
document.querySelectorAll('.gallery-link').forEach((link, index) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const slideIndex = parseInt(link.getAttribute('data-slide'));
    const modal = new bootstrap.Modal(document.getElementById('galleryModal'));
    modal.show();
    // Esperar a que el modal se muestre para setear el slide
    setTimeout(() => {
      const carousel = bootstrap.Carousel.getInstance(document.getElementById('galleryCarousel')) || new bootstrap.Carousel(document.getElementById('galleryCarousel'));
      carousel.to(slideIndex);
    }, 300);
  });
});

/* MANEJO DEL FORMULARIO DE CONTACTO */
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validar formulario
    const nombre = contactForm.nombre.value.trim();
    const email = contactForm.email.value.trim();
    const fecha = contactForm.fecha.value;
    const telefono = contactForm.telefono.value.trim();
    const mensaje = contactForm.mensaje.value.trim();

    // Limpiar mensajes previos
    formMessage.style.display = 'none';
    formMessage.innerHTML = '';
    formMessage.classList.remove('success', 'error');

    // Validaciones
    if (!nombre || !email || !fecha || !mensaje) {
      showMessage('Por favor completa todos los campos requeridos.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showMessage('Por favor ingresa un email válido.', 'error');
      return;
    }

    // Aquí iría el envío al servidor
    // Por ahora, mostramos un mensaje de éxito local
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    // Simulación de envío (sin servidor)
    setTimeout(() => {
      showMessage('¡Gracias! Tu solicitud fue recibida. Nos contactaremos pronto.', 'success');
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar';
    }, 1000);
  });
}

function showMessage(message, type) {
  formMessage.textContent = message;
  formMessage.classList.add(type);
  formMessage.style.display = 'block';
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
