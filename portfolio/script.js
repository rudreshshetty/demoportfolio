// --- DOM Constants ---
const loader = document.getElementById('loader');
const backToTop = document.getElementById('backToTop');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navbar = document.getElementById('navbar');
const scrollProgress = document.getElementById('scrollProgress');
const typewriterElement = document.getElementById('typewriter');
const mainSlider = document.getElementById('mainSlider');

// --- 1. Loading Screen ---
window.addEventListener('load', () => {
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
    }, 500); // Shorter delay for faster loading feel
});

// --- 2. Typewriter Effect ---
const roles = ["MCA Student", "Full Stack Developer", "UI/UX Designer"," Web Developer", "AI Enthusiast", "Cloud Intern"];
let roleIdx = 0;
let charIdx = 0;
let isDeleting = false;

function type() {
    const currentRole = roles[roleIdx];
    if (isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, charIdx - 1);
        charIdx--;
    } else {
        typewriterElement.textContent = currentRole.substring(0, charIdx + 1);
        charIdx++;
    }

    let typeSpeed = isDeleting ? 100 : 200;
    if (!isDeleting && charIdx === currentRole.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        typeSpeed = 500;
    }
    setTimeout(type, typeSpeed);
}
if (typewriterElement) type();

// --- 3. Particle Background ---
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.alpha = Math.random() * 0.5 + 0.2;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    }
    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < 60; i++) particles.push(new Particle());

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();

// --- 4. Scroll Interactions ---
// We replace window scroll with slider logic
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

function handleReveal() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add('active');
        }
    });
}

// Scroll Event Listener
window.addEventListener('scroll', () => {
    // Navbar sticky effect
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        backToTop.style.display = 'flex';
    } else {
        navbar.classList.remove('scrolled');
        backToTop.style.display = 'none';
    }

    handleReveal();
});

// Initial call
window.addEventListener('load', handleReveal);

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Logo click returns to home
document.querySelector('.logo').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// --- 8. Hamburger Menu Toggle ---
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active'); // Optional: for animating hamburger icon
});

// Close nav menu when a link is clicked (for mobile)
navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// --- 9. Resume Button Click Interaction ---
document.querySelectorAll('.resume-btn').forEach(btn => {
    btn.addEventListener('mousedown', () => {
        btn.style.transform = 'scale(0.95) translateY(2px)';
    });
    
    btn.addEventListener('mouseup', () => {
        btn.style.transform = '';
    });
});