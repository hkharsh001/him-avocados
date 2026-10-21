
/* ========================================
   THE HIMALAYAN AVOCADOS
   Interactive Website JavaScript
======================================== */

document.addEventListener("DOMContentLoaded", () => {

    // ELEMENTS
    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");
    const navLinks = navMenu
        ? navMenu.querySelectorAll("a")
        : [];

    /* ========================================
       MOBILE NAVIGATION
    ======================================== */

    function closeMenu() {
        if (!menuBtn || !navMenu) return;

        navMenu.classList.remove("active");

        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open navigation");

        menuBtn.textContent = "☰";
    }

    function toggleMenu() {
        if (!menuBtn || !navMenu) return;

        const isOpen = navMenu.classList.toggle("active");

        menuBtn.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuBtn.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );

        menuBtn.textContent = isOpen ? "✕" : "☰";
    }

    if (menuBtn && navMenu) {
        menuBtn.addEventListener("click", toggleMenu);

        // Close menu after selecting a section.
        navLinks.forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        // Close menu when tapping outside it.
        document.addEventListener("click", event => {
            const clickedInsideMenu =
                navMenu.contains(event.target);

            const clickedMenuButton =
                menuBtn.contains(event.target);

            if (!clickedInsideMenu && !clickedMenuButton) {
                closeMenu();
            }
        });

        // Close menu with the Escape key.
        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        // Reset navigation when switching to desktop layout.
        window.addEventListener("resize", () => {
            if (window.innerWidth > 680) {
                closeMenu();
            }
        });
    }


    /* ========================================
       AUTOMATIC COPYRIGHT YEAR
    ======================================== */

    const yearElement = document.getElementById("currentYear");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* ========================================
       SMOOTH INTERNAL NAVIGATION
    ======================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches ? "auto" : "smooth",
                block: "start"
            });

            // Keep the URL in sync with the selected section.
            if (window.location.hash !== targetId) {
                history.replaceState(null, "", targetId);
            }

        });

    });


    /* ========================================
       IMAGE FALLBACK
       Hide broken images gracefully.
    ======================================== */

    document.querySelectorAll("img").forEach(img => {

        img.addEventListener("error", () => {
            img.classList.add("image-unavailable");
        });

    });


    /* ========================================
       PREMIUM CARD INTERACTIONS
       Respect reduced-motion preferences.
    ======================================== */

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!reduceMotion) {

        document.querySelectorAll(".plant-card").forEach(card => {

            card.addEventListener("pointerenter", () => {
                card.classList.add("is-hovered");
            });

            card.addEventListener("pointerleave", () => {
                card.classList.remove("is-hovered");
            });

        });

    }

});
.brand img,
.footer-brand img {
  display: block !important;
  width: 62px;
  height: 62px;
  max-width: none;
  object-fit: contain;
  opacity: 1;
  visibility: visible;
  flex-shrink: 0;
}

.brand {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}
