
/////Navbar - mobile


const navToggle = document.querySelector(".nav__toggle");
const mobileMenu = document.querySelector(".nav__mobile-menu");
const mobileLinks = document.querySelectorAll(".nav__mobile-menu a");

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


/////////navbar color change


const nav = document.querySelector(".nav");
const portfolio = document.querySelector("#portfolio");

function updateNavbar() {

    const portfolioPosition = portfolio.getBoundingClientRect().top;

    if (portfolioPosition <= nav.offsetHeight) {
        nav.classList.add("is-scrolled");
    } else {
        nav.classList.remove("is-scrolled");
    }
}

window.addEventListener("scroll", updateNavbar);
window.addEventListener("resize", updateNavbar);

updateNavbar();




////////welcome text

const welcomeTitle = document.querySelector(".welcome-title");

let wasAtTop = true;


function playWelcomeAnimation() {

    // Reset everything
    welcomeTitle.classList.remove("is-animating");
    welcomeTitle.classList.remove("is-fading");

    // Reset opacity
    welcomeTitle.style.opacity = "1";

    // Force browser to reset animation
    void welcomeTitle.offsetWidth;

    // Start drawing letters
    welcomeTitle.classList.add("is-animating");


    // Drawing finishes around 1.4s
    // Leave it visible briefly, then fade
    setTimeout(() => {
        welcomeTitle.classList.add("is-fading");
    }, 3000);
}


/* Initial load */

window.addEventListener("DOMContentLoaded", () => {
    playWelcomeAnimation();
});


/* Replay when returning to top */

window.addEventListener("scroll", () => {

    const isAtTop = window.scrollY < 40;

    if (isAtTop && !wasAtTop) {
        playWelcomeAnimation();
    }

    wasAtTop = isAtTop;
});





const creationsTitle = document.querySelector(".creations-title");

const creationsObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                creationsTitle.classList.remove("is-visible");

                // Reset animation
                void creationsTitle.offsetWidth;

                creationsTitle.classList.add("is-visible");

            } else {

                // Allows animation to replay
                creationsTitle.classList.remove("is-visible");

            }

        });

    },
    {
        threshold: 0.35
    }
);

creationsObserver.observe(creationsTitle);




/////////filtering

/* =========================================
   Portfolio Filter
========================================= */

const filterButtons = document.querySelectorAll(
    ".portfolio-filter__button"
);

const portfolioProjects = document.querySelectorAll(
    ".portfolio-project"
);


filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const selectedFilter = button.dataset.filter;


        /* Reset buttons */

        filterButtons.forEach((btn) => {

            btn.classList.remove("is-active");

            btn.setAttribute(
                "aria-pressed",
                "false"
            );

        });


        /* Activate selected button */

        button.classList.add("is-active");

        button.setAttribute(
            "aria-pressed",
            "true"
        );


        /* Filter projects */

        portfolioProjects.forEach((project) => {

            const projectDuration =
                project.dataset.duration;


            if (
                selectedFilter === "all" ||
                projectDuration === selectedFilter
            ) {

                project.classList.remove("is-hidden");

            } else {

                project.classList.add("is-hidden");

            }

        });

    });

});