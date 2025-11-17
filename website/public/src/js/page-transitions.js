/**
 * Navigation Enhancements
 * Handles dock interactions and vertical navigation
 */

(function() {
  'use strict';

  // Enhanced dock item interactions
  function enhanceDockInteractions() {
    const dockItems = document.querySelectorAll('.os-dock-item');

    dockItems.forEach((item, index) => {
      // Stagger animation on page load
      item.style.animationDelay = `${index * 0.05}s`;
      item.classList.add('dock-item-enter');
    });
  }

  // Handle vertical navigation (scroll sections)
  function handleVerticalNavigation() {
    const verticalNav = document.querySelector('.vnav');
    if (!verticalNav) return;

    const navCircles = verticalNav.querySelectorAll('.vnav-circle');

    // Determine sections based on page
    let sections = ['landing', 'about', 'footer']; // Default for home page

    // Check if we're on journey page (has #creative section)
    if (document.getElementById('creative')) {
      sections = ['landing', 'creative', 'footer'];
    }

    // Highlight active section based on scroll
    function updateActiveSection() {
      let currentSection = sections[0];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((sectionId) => {
        const section = document.getElementById(sectionId);
        if (section && section.offsetTop <= scrollPosition) {
          currentSection = sectionId;
        }
      });

      navCircles.forEach((circle, index) => {
        const sectionId = sections[index];
        if (sectionId === currentSection) {
          circle.classList.add('active');
        } else {
          circle.classList.remove('active');
        }
      });
    }

    // Smooth scroll to section on click
    navCircles.forEach((circle, index) => {
      circle.parentElement.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = sections[index];
        const section = document.getElementById(sectionId);

        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // Update on scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updateActiveSection, 50);
    });

    // Initial update
    updateActiveSection();
  }

  // Initialize
  function init() {
    // Enhance dock interactions
    enhanceDockInteractions();

    // Handle vertical navigation
    handleVerticalNavigation();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
