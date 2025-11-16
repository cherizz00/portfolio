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

  yearSpan.textContent = new Date().getFullYear();

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      nav.classList.toggle("nav-menu-open");
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("nav-menu-open");
    });
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
            showNotification("Message sent successfully!", "success");
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
            showNotification("Failed to send message. Please try again or email directly.", "error");
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

  // Notification Toast Function
  function showNotification(message, type = "success") {
    const toast = document.getElementById("notification-toast");
    const toastIcon = document.getElementById("toast-icon");
    const toastMessage = document.getElementById("toast-message");

    if (!toast) return;

    // Set icon and message
    toastIcon.textContent = type === "success" ? "✓" : "✕";
    toastMessage.textContent = message;

    // Set type class
    toast.className = "notification-toast";
    if (type === "error") {
      toast.classList.add("error");
    }

    // Show toast
    toast.classList.add("show");

    // Hide after 4 seconds
    setTimeout(() => {
      toast.classList.remove("show");
    }, 4000);
  }

  // Make function globally available
  window.showNotification = showNotification;
})();

