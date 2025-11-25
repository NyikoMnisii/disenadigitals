// ============================================
// MOBILE NAVIGATION - VANILLA JS
// ============================================

// ============================================
// MOBILE NAVIGATION - VANILLA JS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const navLinks = document.querySelectorAll('.mobile-nav a');
  
  // Toggle menu function - EXACT IMPLEMENTATION AS REQUESTED
  if (toggleBtn && mobileNav) {
    toggleBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      mobileNav.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', mobileNav.classList.contains('open'));
    });
  }
  
  // Auto-close menu when clicking nav links - EXACT IMPLEMENTATION AS REQUESTED
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Close menu immediately
      mobileNav.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      
      // Get target section
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      
      if (target) {
        // Smooth scroll with navbar offset
        setTimeout(function() {
          const navbarHeight = document.getElementById('navbar').offsetHeight;
          const targetPosition = target.offsetTop - navbarHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }, 150);
      }
    });
  });
  
  // Close menu when clicking outside (optional enhancement)
  document.addEventListener('click', function(e) {
    const navbar = document.getElementById('navbar');
    
    if (mobileNav && mobileNav.classList.contains('open')) {
      if (!navbar.contains(e.target)) {
        mobileNav.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    }
  });
  
  // Smooth scroll for navbar brand
  const navbarBrand = document.querySelector('.navbar-brand');
  if (navbarBrand) {
    navbarBrand.addEventListener('click', function(e) {
      e.preventDefault();
      if (mobileNav) {
        mobileNav.classList.remove('open');
        if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
      }
      
      const target = document.getElementById('hero');
      if (target) {
        const navbarHeight = document.getElementById('navbar').offsetHeight;
        const targetPosition = target.offsetTop - navbarHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  }
});
