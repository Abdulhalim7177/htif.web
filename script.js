document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            }
        });
    }

    // --- Dark Mode Toggle ---
    const themeToggleBtns = [
        document.getElementById('theme-toggle'),
        document.getElementById('mobile-theme-toggle')
    ];
    
    // Check local storage or system preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        updateThemeIcons(true);
    } else {
        document.documentElement.classList.remove('dark');
        updateThemeIcons(false);
    }

    themeToggleBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                document.documentElement.classList.toggle('dark');
                const isDark = document.documentElement.classList.contains('dark');
                
                // Save preference
                localStorage.theme = isDark ? 'dark' : 'light';
                updateThemeIcons(isDark);
            });
        }
    });

    function updateThemeIcons(isDark) {
        themeToggleBtns.forEach(btn => {
            if(!btn) return;
            const icon = btn.querySelector('i');
            if (isDark) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
    }


    // --- Animated Stats Counter ---
    const statsSection = document.getElementById('stats');
    const counters = document.querySelectorAll('.counter');
    let started = false; // Function started ?

    function startCount(el) {
        const target = +el.getAttribute('data-target');
        const count = +el.innerText;
        const speed = 200; // lower is slower
        const inc = target / speed;

        if (count < target) {
            el.innerText = Math.ceil(count + inc);
            setTimeout(() => startCount(el), 20);
        } else {
            el.innerText = target;
        }
    }

    if(statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !started) {
                counters.forEach(counter => startCount(counter));
                started = true;
            }
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }
    
    // --- Scroll Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

        document.querySelectorAll('.fade-in, .slide-up').forEach(el => {

            observer.observe(el);

        });

    

        // --- Testimonial Slider ---

        const slider = document.getElementById('testimonial-slider');

        const dots = document.querySelectorAll('.dot-indicator');

        const prevBtn = document.getElementById('prev-slide');

        const nextBtn = document.getElementById('next-slide');

        

        if (slider) {

            let currentSlide = 0;

            const totalSlides = slider.children.length;

    

            function updateSlider() {

                slider.style.transform = `translateX(-${currentSlide * 100}%)`;

                dots.forEach((dot, index) => {

                    if (index === currentSlide) {

                        dot.classList.add('active', 'bg-[#0ea5e9]');

                        dot.classList.remove('bg-slate-300', 'dark:bg-slate-600');

                    } else {

                        dot.classList.remove('active', 'bg-[#0ea5e9]');

                        dot.classList.add('bg-slate-300', 'dark:bg-slate-600');

                    }

                });

            }

    

            function nextSlide() {

                currentSlide = (currentSlide + 1) % totalSlides;

                updateSlider();

            }

    

            function prevSlide() {

                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;

                updateSlider();

            }

    

            // Event Listeners

            if(nextBtn) nextBtn.addEventListener('click', nextSlide);

            if(prevBtn) prevBtn.addEventListener('click', prevSlide);

    

            dots.forEach((dot, index) => {

                dot.addEventListener('click', () => {

                    currentSlide = index;

                    updateSlider();

                });

            });

    

            // Initialize

            updateSlider();

    

                    // Auto play

    

                    setInterval(nextSlide, 5000);

    

                }

    

            

    

                // --- Back to Top Button ---



                const backToTopBtn = document.getElementById('back-to-top');







                if (backToTopBtn) {



                    window.addEventListener('scroll', () => {



                        if (window.scrollY > 300) {



                            backToTopBtn.classList.remove('translate-y-20', 'opacity-0');



                            backToTopBtn.classList.add('translate-y-0', 'opacity-100');



                        } else {



                            backToTopBtn.classList.add('translate-y-20', 'opacity-0');



                            backToTopBtn.classList.remove('translate-y-0', 'opacity-100');



                        }



                    });







                    backToTopBtn.addEventListener('click', () => {



                        window.scrollTo({



                            top: 0,



                            behavior: 'smooth'



                        });



                    });



                }







            });


    // --- WhatsApp Button Expansion ---
    const whatsappExpandBtn = document.getElementById('whatsapp-expand');
    const whatsappOptions = document.getElementById('whatsapp-options');
    const whatsappCancelBtn = document.getElementById('whatsapp-cancel');
    let isExpanded = false;

    if (whatsappExpandBtn) {
        whatsappExpandBtn.addEventListener('click', (e) => {
            e.preventDefault();
            isExpanded = !isExpanded;

            if (isExpanded) {
                whatsappOptions.classList.remove('hidden');
                whatsappOptions.classList.add('flex');
            } else {
                whatsappOptions.classList.add('hidden');
                whatsappOptions.classList.remove('flex');
            }
        });
    }

    if (whatsappCancelBtn) {
        whatsappCancelBtn.addEventListener('click', () => {
            whatsappOptions.classList.add('hidden');
            whatsappOptions.classList.remove('flex');
            isExpanded = false;
        });
    }

    // Close WhatsApp options when clicking outside
    document.addEventListener('click', (event) => {
        if (isExpanded &&
            !whatsappExpandBtn.contains(event.target) &&
            !whatsappOptions.contains(event.target)) {
            whatsappOptions.classList.add('hidden');
            whatsappOptions.classList.remove('flex');
            isExpanded = false;
        }
    });
