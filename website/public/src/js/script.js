// new fullpage("#fullpage", {
//   //options here
//   autoScrolling: true,
//   scrollHorizontally: true,
// });

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');

  if (hamburger && mobileNavOverlay) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      mobileNavOverlay.classList.toggle('active');

      // Prevent body scroll when menu is open
      if (mobileNavOverlay.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Close menu when clicking on overlay background
    mobileNavOverlay.addEventListener('click', function(e) {
      if (e.target === mobileNavOverlay) {
        hamburger.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Close menu when clicking on a nav item
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item a');
    mobileNavItems.forEach(item => {
      item.addEventListener('click', function() {
        hamburger.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
});
