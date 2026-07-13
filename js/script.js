document.addEventListener('DOMContentLoaded', () => {
    // Loading Screen
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.style.opacity = '0';
        setTimeout(() => {
            loading.style.display = 'none';
        }, 500);
    }, 1500);

    // Nav Menu
    const navMenu = document.getElementById('nav-menu'),
          navToggle = document.getElementById('nav-toggle'),
          navClose = document.getElementById('nav-close');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
        });
    }

    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    }

    // Remove menu mobile
    const navLink = document.querySelectorAll('.nav__link');
    function linkAction() {
        const navMenu = document.getElementById('nav-menu');
        navMenu.classList.remove('show-menu');
    }
    navLink.forEach(n => n.addEventListener('click', linkAction));

    // Scroll Header
    function scrollHeader() {
        const header = document.getElementById('header');
        if (this.scrollY >= 50) header.classList.add('scroll-header');
        else header.classList.remove('scroll-header');
    }
    window.addEventListener('scroll', scrollHeader);

    // Show Scroll Up
    function scrollUp() {
        const scrollUp = document.getElementById('scroll-up');
        if (this.scrollY >= 200) scrollUp.classList.add('show-scroll');
        else scrollUp.classList.remove('show-scroll');
    }
    window.addEventListener('scroll', scrollUp);

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // Scroll Animation (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // If it's the stats section, run counter animation
                if (entry.target.classList.contains('stats__card')) {
                    animateCounters();
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(el => observer.observe(el));

    // Booking Form Submission
    const bookingForm = document.getElementById('booking-form');
    const popup = document.getElementById('popup');
    const popupClose = document.getElementById('popup-close');
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxthAmAGTAbI0_DGgrs1DgQaSRwYJHX7bPAXYfY74J0V0v9Wr1cdZudm5Fg1OP1H_2a/exec";

    if (bookingForm) {
        bookingForm.addEventListener("submit", function(e) {
            e.preventDefault();

            const data = {
                name: document.getElementById("name").value,
                phone: document.getElementById("phone").value,
                email: document.getElementById("email").value,
                barber: document.getElementById("barber").value,
                service: document.getElementById("service").value,
                date: document.getElementById("date").value,
                time: document.getElementById("time").value,
                message: document.getElementById("message").value
            };

            fetch(SCRIPT_URL, {
                method: "POST",
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                if (popup) {
                    popup.classList.add("show-popup");
                }
                bookingForm.reset();
            })
            .catch(error => {
                console.log(error);
                alert("Something went wrong.");
            });
        });
    }

    if (popupClose) {
        popupClose.addEventListener('click', () => {
            popup.classList.remove('show-popup');
        });
    }
});
