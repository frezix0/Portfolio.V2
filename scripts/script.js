// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// Typing effect function
function typeWriterLoop(textArray, element, typingSpeed = 120, deletingSpeed = 60, pause = 1500) {
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = textArray[textIndex];

        if (!isDeleting) {
            // Typing
            element.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(type, pause);
                return;
            }
        } else {
            // Deleting
            element.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % textArray.length;
            }
        }

        setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
    }

    type();
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize typing effect for hero title
    const heroTitle = document.querySelector('.hero-dynamic-role');
    if (heroTitle) {
        heroTitle.textContent = '';
        typeWriterLoop(
            [
                "Full-Stack Developer",
                "IT Engineer",
                "Code Enthusiast",
                "Problem Solver"
            ],
            heroTitle,
            100,
            50,
            2000
        );
    }

    // Observe all sections for scroll animations
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Hero section is always visible
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }

    // Tab switching functionality 
    const tabButtons = document.querySelectorAll('.skills-nav-btn');
    const tabContents = document.querySelectorAll('.skills-tab-content');

    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function () {
                const targetTab = this.getAttribute('data-tab');

                // Remove active from all buttons
                tabButtons.forEach(btn => btn.classList.remove('active'));

                // Remove active from all content - use display instead of class
                tabContents.forEach(content => {
                    content.classList.remove('active');
                });

                // Add active to clicked button
                this.classList.add('active');

                // Add active to target content and show it
                const targetContent = document.getElementById(targetTab);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });

    }

    // Certificate modal functionality
    const certificateCards = document.querySelectorAll('.certificate-card');
    const modal = document.getElementById('certificateModal');
    const modalImg = document.getElementById('modalImage');
    const caption = document.getElementById('caption');
    const closeBtn = document.querySelector('.close');

    if (modal && modalImg && caption && closeBtn) {
        // Close modal function
        function closeModal() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        // Open modal when certificate card is clicked
        certificateCards.forEach(card => {
            card.addEventListener('click', () => {
                const img = card.querySelector('.certificate-preview img');
                const title = card.querySelector('.certificate-info h4');

                if (img && title) {
                    modal.style.display = 'block';
                    modalImg.src = img.src;
                    modalImg.alt = img.alt;
                    caption.textContent = title.textContent;
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Close modal events
        closeBtn.addEventListener('click', closeModal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                closeModal();
            }
        });
    }
});