/**
 * Page Transitions Script
 * Handles directional sliding animations between pages
 */

(function() {
  'use strict';

  // Page order for horizontal navigation
  const PAGE_ORDER = ['home', 'journey', 'writing', 'projects', 'contact'];

  // Get current page from body or meta tag
  function getCurrentPage() {
    const pageContainer = document.querySelector('.page-container');
    if (pageContainer && pageContainer.dataset.page) {
      return pageContainer.dataset.page;
    }

    // Fallback: determine from URL
    const path = window.location.pathname;
    if (path === '/' || path === '/index.html') return 'home';
    if (path.includes('/journey')) return 'journey';
    if (path.includes('/writing')) return 'writing';
    if (path.includes('/projects')) return 'projects';
    if (path.includes('/contact')) return 'contact';
    return 'home';
  }

  // Get previous page from sessionStorage
  function getPreviousPage() {
    return sessionStorage.getItem('previousPage') || null;
  }

  // Set current page in sessionStorage
  function setCurrentPage(page) {
    sessionStorage.setItem('previousPage', page);
  }

  // Determine transition direction
  function getTransitionDirection(fromPage, toPage) {
    if (!fromPage || !toPage) return 'fade';

    const fromIndex = PAGE_ORDER.indexOf(fromPage);
    const toIndex = PAGE_ORDER.indexOf(toPage);

    if (fromIndex === -1 || toIndex === -1) return 'fade';

    // Horizontal navigation
    if (toIndex > fromIndex) {
      return 'slide-right'; // Moving forward (e.g., Home -> Journey)
    } else if (toIndex < fromIndex) {
      return 'slide-left'; // Moving backward (e.g., Writing -> Journey)
    }

    return 'fade';
  }

  // Apply transition on page load
  function applyPageTransition() {
    const currentPage = getCurrentPage();
    const previousPage = getPreviousPage();
    const pageContainer = document.querySelector('.page-container');

    if (pageContainer) {
      const transition = getTransitionDirection(previousPage, currentPage);
      pageContainer.setAttribute('data-transition', transition);

      // Store current page for next navigation
      setCurrentPage(currentPage);
    }
  }

  // Handle navigation clicks to determine direction
  function handleNavigationClick(event) {
    const link = event.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:')) {
      return; // Skip anchors, external links, and mailto links
    }

    // Determine target page from href
    let targetPage = 'home';
    if (href.includes('/journey')) targetPage = 'journey';
    else if (href.includes('/writing')) targetPage = 'writing';
    else if (href.includes('/projects')) targetPage = 'projects';
    else if (href.includes('/contact')) targetPage = 'contact';

    // Store the intended navigation for the next page
    sessionStorage.setItem('navigationTarget', targetPage);
  }

  // Enhanced dock item interactions
  function enhanceDockInteractions() {
    const dockItems = document.querySelectorAll('.os-dock-item');

    dockItems.forEach((item, index) => {
      // Add haptic feedback on hover (for supported devices)
      item.addEventListener('mouseenter', () => {
        if (navigator.vibrate) {
          navigator.vibrate(5); // Subtle vibration
        }
      });

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
    const sections = ['landing', 'about', 'footer'];

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

  // Keyboard navigation
  function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      const currentPage = getCurrentPage();
      const currentIndex = PAGE_ORDER.indexOf(currentPage);

      // Arrow keys for horizontal navigation
      if (e.key === 'ArrowRight' && currentIndex < PAGE_ORDER.length - 1) {
        e.preventDefault();
        const nextPage = PAGE_ORDER[currentIndex + 1];
        navigateToPage(nextPage);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        e.preventDefault();
        const prevPage = PAGE_ORDER[currentIndex - 1];
        navigateToPage(prevPage);
      }
    });
  }

  // Navigate to a specific page
  function navigateToPage(page) {
    const routes = {
      home: '/',
      journey: '/journey.html',
      writing: '/writing',
      projects: '/projects',
      contact: '#footer'
    };

    const route = routes[page];
    if (route) {
      if (route.startsWith('#')) {
        const section = document.querySelector(route);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        sessionStorage.setItem('navigationTarget', page);
        window.location.href = route;
      }
    }
  }

  // Initialize
  function init() {
    // Apply page transition on load
    applyPageTransition();

    // Set up navigation tracking
    document.addEventListener('click', handleNavigationClick);

    // Enhance dock interactions
    enhanceDockInteractions();

    // Handle vertical navigation
    handleVerticalNavigation();

    // Setup keyboard navigation
    setupKeyboardNavigation();

    // Performance: Remove transition after animation completes
    const pageContainer = document.querySelector('.page-container');
    if (pageContainer) {
      pageContainer.addEventListener('animationend', () => {
        // Keep the transition attribute for reference but prevent re-animation
        pageContainer.style.animation = 'none';
      }, { once: true });
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
