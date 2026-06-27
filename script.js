/* ===========================
   OUZHANN GROUP - SCRIPTS
   =========================== */

document.addEventListener('DOMContentLoaded', function() {
    // WhatsApp numarasini ulke koduyla ve + isareti olmadan yazin. Ornek: 905551112233
    const whatsappNumber = '905541282943';

    // Burger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', String(hamburger.classList.contains('active')));
        });

        hamburger.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                hamburger.click();
            }
        });
    }

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // CTA button in hero section
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            const contactSection = document.querySelector('#iletisim');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const serviceField = document.getElementById('service');
            const service = serviceField.value;
            const serviceLabel = serviceField.options[serviceField.selectedIndex].text;
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !phone || !service || !message) {
                alert('Lutfen tum alanlari doldurunuz!');
                return;
            }

            const emailRegexForWhatsapp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegexForWhatsapp.test(email)) {
                alert('Lutfen gecerli bir e-mail adresi giriniz!');
                return;
            }

            if (phone.length < 10) {
                alert('Lutfen gecerli bir telefon numarasi giriniz!');
                return;
            }

            const whatsappMessage = [
                'Yeni teklif talebi',
                '',
                `Ad Soyad: ${name}`,
                `E-mail: ${email}`,
                `Telefon: ${phone}`,
                `Hizmet Turu: ${serviceLabel}`,
                '',
                `Mesaj: ${message}`
            ].join('\n');

            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappUrl, '_blank');
            this.reset();
        });
    }

    // Keep the embedded Google Map in sync with the visible address text.
    const businessAddress = document.getElementById('business-address');
    const addressMap = document.getElementById('address-map');
    if (businessAddress && addressMap) {
        const address = businessAddress.textContent.trim();
        if (address) {
            addressMap.src = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
        }
    }

    // Hide missing project/service images so the styled fallback labels remain clean.
    document.querySelectorAll('.portfolio-image img, .service-icon img, .gallery-zoom img').forEach(image => {
        if (image.complete && image.naturalWidth === 0) {
            image.classList.add('is-missing');
        }

        if (image.complete && image.naturalWidth > 0) {
            image.classList.remove('is-missing');
        }

        image.addEventListener('load', function() {
            this.classList.remove('is-missing');
        });

        image.addEventListener('error', function() {
            this.classList.add('is-missing');
        });
    });

    document.querySelectorAll('[data-gallery]').forEach(gallery => {
        const track = gallery.querySelector('.gallery-track');
        const slides = Array.from(gallery.querySelectorAll('.gallery-slide'));
        const previous = gallery.querySelector('.gallery-prev');
        const next = gallery.querySelector('.gallery-next');
        let index = 0;

        function updateGallery() {
            track.style.transform = `translateX(-${index * 100}%)`;
        }

        if (previous && next && slides.length) {
            previous.addEventListener('click', function() {
                index = (index - 1 + slides.length) % slides.length;
                updateGallery();
            });

            next.addEventListener('click', function() {
                index = (index + 1) % slides.length;
                updateGallery();
            });
        }
    });

    const lightbox = document.getElementById('image-lightbox');
    if (lightbox) {
        const lightboxImage = lightbox.querySelector('img');
        const lightboxClose = lightbox.querySelector('.lightbox-close');

        document.querySelectorAll('.gallery-zoom').forEach(button => {
            button.addEventListener('click', function() {
                const image = this.querySelector('img');
                const fallback = this.querySelector('.gallery-fallback');
                const lightboxFallback = lightbox.querySelector('.lightbox-fallback');

                if (!image) {
                    return;
                }

                lightboxImage.src = this.dataset.full || image.src;
                lightboxImage.alt = image.alt;
                lightboxImage.classList.toggle('is-missing', image.classList.contains('is-missing'));
                if (lightboxFallback) {
                    lightboxFallback.textContent = fallback ? fallback.textContent : image.alt;
                }
                lightbox.classList.add('is-open');
                lightbox.setAttribute('aria-hidden', 'false');
            });
        });

        function closeLightbox() {
            lightbox.classList.remove('is-open');
            lightbox.setAttribute('aria-hidden', 'true');
            lightboxImage.classList.remove('is-missing');
            lightboxImage.src = '';
        }

        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }

        lightbox.addEventListener('click', function(event) {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
                closeLightbox();
            }
        });
    }

    // Add animation to elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service cards and portfolio items
    const serviceCards = document.querySelectorAll('.service-card');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const reviewCards = document.querySelectorAll('.review-card');

    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    portfolioItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });

    reviewCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // Active nav link highlight
    window.addEventListener('scroll', function() {
        updateActiveNav();
    });

    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id], main[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.color = 'white';
            if (link.getAttribute('href') === '#' + currentSection) {
                link.style.color = '#D4AF37';
            }
        });
    }

});
