
/* =========================================
   MOBILE NAVIGATION
========================================= */

const navToggle = document.querySelector(".nav__toggle");
const mobileMenu = document.querySelector(".nav__mobile-menu");
const mobileLinks = document.querySelectorAll(".nav__mobile-menu a");


if (navToggle && mobileMenu) {

    navToggle.addEventListener("click", () => {

        const isOpen = mobileMenu.classList.toggle("is-open");

        navToggle.classList.toggle("is-active");

        navToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

    });


    mobileLinks.forEach((link) => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("is-open");

            navToggle.classList.remove("is-active");

            navToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}



/* =========================================
   NAVBAR COLOR CHANGE
   Homepage only
========================================= */

const nav = document.querySelector(".nav");
const portfolio = document.querySelector("#portfolio");


if (nav && portfolio) {

    function updateNavbar() {

        const portfolioPosition =
            portfolio.getBoundingClientRect().top;


        if (portfolioPosition <= nav.offsetHeight) {

            nav.classList.add("is-scrolled");

        } else {

            nav.classList.remove("is-scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        updateNavbar
    );


    window.addEventListener(
        "resize",
        updateNavbar
    );


    updateNavbar();

}



/* =========================================
   WELCOME TEXT
   Homepage only
========================================= */

const welcomeTitle =
    document.querySelector(".welcome-title");


if (welcomeTitle) {

    let wasAtTop = true;


    function playWelcomeAnimation() {

        // Reset animation
        welcomeTitle.classList.remove(
            "is-animating"
        );

        welcomeTitle.classList.remove(
            "is-fading"
        );


        // Reset opacity
        welcomeTitle.style.opacity = "1";


        // Force browser to reset animation
        void welcomeTitle.offsetWidth;


        // Start drawing letters
        welcomeTitle.classList.add(
            "is-animating"
        );


        // Leave visible, then fade
        setTimeout(() => {

            welcomeTitle.classList.add(
                "is-fading"
            );

        }, 3000);

    }


    /* Initial load */

    playWelcomeAnimation();


    /* Replay when returning to top */

    window.addEventListener("scroll", () => {

        const isAtTop =
            window.scrollY < 40;


        if (isAtTop && !wasAtTop) {

            playWelcomeAnimation();

        }


        wasAtTop = isAtTop;

    });

}



/* =========================================
   CREATIONS TITLE
   Homepage only
========================================= */

const creationsTitle =
    document.querySelector(".creations-title");


if (creationsTitle) {

    const creationsObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        creationsTitle.classList.remove(
                            "is-visible"
                        );


                        // Reset animation
                        void creationsTitle.offsetWidth;


                        creationsTitle.classList.add(
                            "is-visible"
                        );

                    } else {

                        // Allows animation to replay
                        creationsTitle.classList.remove(
                            "is-visible"
                        );

                    }

                });

            },

            {
                threshold: 0.35
            }

        );


    creationsObserver.observe(
        creationsTitle
    );

}



/* =========================================
   PORTFOLIO FILTER
   Homepage only
========================================= */

const filterButtons =
    document.querySelectorAll(
        ".portfolio-filter__button"
    );


const portfolioProjects =
    document.querySelectorAll(
        ".portfolio-project"
    );


filterButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            const selectedFilter =
                button.dataset.filter;


            /* Reset buttons */

            filterButtons.forEach((btn) => {

                btn.classList.remove(
                    "is-active"
                );

                btn.setAttribute(
                    "aria-pressed",
                    "false"
                );

            });


            /* Activate selected button */

            button.classList.add(
                "is-active"
            );

            button.setAttribute(
                "aria-pressed",
                "true"
            );


            /* Filter projects */

            portfolioProjects.forEach(
                (project) => {

                    const projectDuration =
                        project.dataset.duration;


                    if (
                        selectedFilter === "all" ||
                        projectDuration === selectedFilter
                    ) {

                        project.classList.remove(
                            "is-hidden"
                        );

                    } else {

                        project.classList.add(
                            "is-hidden"
                        );

                    }

                }
            );

        }
    );

});



/* =========================================
   CONTACT POPUP
   Works on every page
========================================= */

const contactTriggers =
    document.querySelectorAll(
        ".contact-trigger"
    );


if (contactTriggers.length > 0) {


    /* Create popup once */

    if (!document.querySelector(".contact-popup")) {

        const contactPopupHTML = `
            <div
                class="contact-popup"
                aria-hidden="true"
            >

                <div
                    class="contact-popup__backdrop"
                ></div>

                <div
                    class="contact-popup__window"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Contact Edit Domoszlai"
                >

                    <button
                        class="contact-popup__close"
                        type="button"
                        aria-label="Close contact window"
                    >
                        <i
                            class="fa-solid fa-xmark"
                            aria-hidden="true"
                        ></i>
                    </button>


                    <span
                        class="contact-popup__label"
                    >
                        Get in touch
                    </span>


                    <a
                        class="contact-popup__email"
                        href="mailto:edit.domoszlai@gmail.com"
                    >
                        edit.domoszlai@gmail.com
                    </a>

                </div>

            </div>
        `;


        document.body.insertAdjacentHTML(
            "beforeend",
            contactPopupHTML
        );

    }


    /* Popup elements */

    const contactPopup =
        document.querySelector(
            ".contact-popup"
        );


    const contactClose =
        document.querySelector(
            ".contact-popup__close"
        );


    const contactBackdrop =
        document.querySelector(
            ".contact-popup__backdrop"
        );


    /* Open */

    contactTriggers.forEach((trigger) => {

        trigger.addEventListener(
            "click",
            (event) => {

                event.preventDefault();


                /* Close mobile menu */

                if (mobileMenu) {

                    mobileMenu.classList.remove(
                        "is-open"
                    );

                }


                if (navToggle) {

                    navToggle.classList.remove(
                        "is-active"
                    );

                    navToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }


                /* Open popup */

                contactPopup.classList.add(
                    "is-open"
                );

                contactPopup.setAttribute(
                    "aria-hidden",
                    "false"
                );

            }
        );

    });


    /* Close */

    function closeContactPopup() {

        contactPopup.classList.remove(
            "is-open"
        );

        contactPopup.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    if (contactClose) {

        contactClose.addEventListener(
            "click",
            closeContactPopup
        );

    }


    if (contactBackdrop) {

        contactBackdrop.addEventListener(
            "click",
            closeContactPopup
        );

    }


    /* ESC closes popup */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                closeContactPopup();

            }

        }
    );

}



/* =========================================
   ABOUT IMAGE CAROUSEL
========================================= */

const aboutCarousel =
    document.querySelector(".about-carousel");


if (aboutCarousel) {

    const slides =
        aboutCarousel.querySelectorAll(
            ".about-carousel__slide"
        );

    const prevButton =
        aboutCarousel.querySelector(
            ".about-carousel__button--prev"
        );

    const nextButton =
        aboutCarousel.querySelector(
            ".about-carousel__button--next"
        );

    const counter =
        aboutCarousel.querySelector(
            ".about-carousel__current"
        );


    let currentSlide = 0;


    function showSlide(index) {

        slides.forEach((slide) => {
            slide.classList.remove("is-active");
        });


        currentSlide =
            (index + slides.length) %
            slides.length;


        slides[currentSlide].classList.add(
            "is-active"
        );


        counter.textContent =
            String(currentSlide + 1).padStart(
                2,
                "0"
            );

    }


    nextButton.addEventListener(
        "click",
        () => {

            showSlide(currentSlide + 1);

        }
    );


    prevButton.addEventListener(
        "click",
        () => {

            showSlide(currentSlide - 1);

        }
    );

}