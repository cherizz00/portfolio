(function () {
  const nav = document.getElementById("top-nav");
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.querySelectorAll("[data-nav-link]");
  const sections = document.querySelectorAll("main section[id]");
  const backToTop = document.getElementById("back-to-top");
  const yearSpan = document.getElementById("year");
  const filters = document.querySelectorAll(".filter-chip");
  const projects = document.querySelectorAll(".project-card");
  const skillToggles = document.querySelectorAll("[data-skill-toggle]");
  const form = document.getElementById("contact-form");
  const downloadBtn = document.getElementById("download-resume");
  const animatedBlocks = document.querySelectorAll("[data-animate]");
  const themeToggle = document.getElementById("theme-toggle");

  yearSpan.textContent = new Date().getFullYear();

  // Theme Toggle Functionality
  function getTheme() {
    return localStorage.getItem("theme") || "dark";
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }

  function initTheme() {
    const savedTheme = getTheme();
    setTheme(savedTheme);
  }

  if (themeToggle) {
    initTheme();
    
    themeToggle.addEventListener("click", () => {
      const currentTheme = getTheme();
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      setTheme(newTheme);
    });
  }

  if (navToggle) {
    navToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      nav.classList.toggle("nav-menu-open");
      // Prevent body scroll when menu is open
      if (nav.classList.contains("nav-menu-open")) {
        document.body.style.overflow = "hidden";
        // Move CTA button into menu on mobile
        if (window.innerWidth <= 720) {
          const navCta = document.querySelector(".nav-cta");
          const navLinks = document.querySelector(".nav-links");
          if (navCta && navLinks && !navLinks.contains(navCta)) {
            navLinks.appendChild(navCta);
          }
        }
      } else {
        document.body.style.overflow = "";
        // Move CTA button back to original position
        if (window.innerWidth <= 720) {
          const navCta = document.querySelector(".nav-cta");
          const navInner = document.querySelector(".nav-inner");
          const navLinks = document.querySelector(".nav-links");
          if (navCta && navInner && navLinks && navLinks.contains(navCta)) {
            navInner.appendChild(navCta);
          }
        }
      }
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("nav-menu-open");
      document.body.style.overflow = "";
      // Restore CTA button position
      if (window.innerWidth <= 720) {
        const navCta = document.querySelector(".nav-cta");
        const navInner = document.querySelector(".nav-inner");
        const navLinks = document.querySelector(".nav-links");
        if (navCta && navInner && navLinks && navLinks.contains(navCta)) {
          navInner.appendChild(navCta);
        }
      }
    });
  });

  // Helper function to restore CTA button
  function restoreCtaButton() {
    if (window.innerWidth <= 720) {
      const navCta = document.querySelector(".nav-cta");
      const navInner = document.querySelector(".nav-inner");
      const navLinks = document.querySelector(".nav-links");
      if (navCta && navInner && navLinks && navLinks.contains(navCta)) {
        navInner.appendChild(navCta);
      }
    }
  }

  // Close menu when clicking outside or on overlay
  document.addEventListener("click", function(e) {
    if (nav && nav.classList.contains("nav-menu-open")) {
      const navLinksElement = nav.querySelector(".nav-links");
      const navInner = nav.querySelector(".nav-inner");
      const isClickInsideMenu = navLinksElement && navLinksElement.contains(e.target);
      const isClickOnToggle = navToggle && navToggle.contains(e.target);
      const isClickOnNavInner = navInner && navInner.contains(e.target) && !isClickOnToggle && !isClickInsideMenu;
      
      // Close if clicking outside menu or on overlay
      if (!isClickInsideMenu && !isClickOnToggle) {
        nav.classList.remove("nav-menu-open");
        document.body.style.overflow = "";
        restoreCtaButton();
      }
    }
  });

  // Close menu on escape key
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && nav && nav.classList.contains("nav-menu-open")) {
      nav.classList.remove("nav-menu-open");
      document.body.style.overflow = "";
      restoreCtaButton();
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === "#" + id
            );
          });
        }
      });
    },
    {
      root: null,
      threshold: 0.4,
    }
  );

  sections.forEach((section) => observer.observe(section));

  window.addEventListener("scroll", () => {
    const show = window.scrollY > 260;
    backToTop.classList.toggle("visible", show);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  filters.forEach((chip) => {
    chip.addEventListener("click", () => {
      const type = chip.getAttribute("data-filter");
      filters.forEach((c) => c.classList.toggle("active", c === chip));
      projects.forEach((project) => {
        const match =
          type === "all" ||
          project.getAttribute("data-type") === type;
        project.style.display = match ? "" : "none";
      });
    });
  });

  skillToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const extra = toggle.nextElementSibling;
      if (!extra) return;
      const hidden = extra.hasAttribute("hidden");
      if (hidden) {
        extra.removeAttribute("hidden");
        toggle.textContent = "Hide details";
      } else {
        extra.setAttribute("hidden", "hidden");
        // reset label depending on original text
        if (toggle.textContent.toLowerCase().indexOf("tools") !== -1) {
          toggle.textContent = "Show tools";
        } else {
          toggle.textContent = "Show details";
        }
      }
    });
  });

  if (form) {
    // Initialize EmailJS
    (function() {
      emailjs.init("1RdG9o6-DR7HKj5zt");//1RdG9o6-DR7HKj5zt
    })();

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      
      // Get form data
      const formData = {
        from_name: document.getElementById("name").value,
        from_email: document.getElementById("email").value,
        message: document.getElementById("message").value,
      };

      // Show loading state
      const submitBtn = form.querySelector(".form-submit");
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Sending...</span> <span>⏳</span>';
      submitBtn.disabled = true;

      // Send email using EmailJS
      emailjs
        .send("service_pus3mv9", "template_j1dobnh", formData)
        .then(
          function (response) {
            // Success
            submitBtn.innerHTML = '<span>Message Sent! ✓</span>';
            submitBtn.style.backgroundColor = "#4ade80";
            alert("Thank you! Your message has been sent successfully.");
            form.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
              submitBtn.innerHTML = originalText;
              submitBtn.style.backgroundColor = "";
              submitBtn.disabled = false;
            }, 3000);
          },
          function (error) {
            // Error
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            alert("Sorry, there was an error sending your message. Please try again or email me directly at cherrybangari583@gmail.com");
            console.error("EmailJS Error:", error);
          }
        );
    });
  }

  if (downloadBtn) {
    downloadBtn.addEventListener("click", function (e) {
      // if the link fails in some environments, show a note
      const href = downloadBtn.getAttribute('href') || '';
      if (!href) {
        e.preventDefault();
        alert("Resume link not configured. Replace href with your resume file path.");
      }
    });
  }

  const animateObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          animateObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  animatedBlocks.forEach((el) => animateObserver.observe(el));
})();

