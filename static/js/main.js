
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');
    const header = document.querySelector('.header');
    const body = document.body;
    
    // Create mobile menu overlay
    function createMobileMenuOverlay() {
        if (document.querySelector('.mobile-menu-overlay')) {
            return document.querySelector('.mobile-menu-overlay');
        }
        
        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        body.appendChild(overlay);
        
        overlay.addEventListener('click', function() {
            if (sidebar) {
                sidebar.classList.remove('open');
                overlay.classList.remove('active');
                body.style.overflow = '';
                const menuButton = document.querySelector('.mobile-menu-toggle');
                if (menuButton) {
                    menuButton.setAttribute('aria-expanded', 'false');
                    menuButton.innerHTML = '☰';
                }
            }
        });
        
        return overlay;
    }
    
    // Create mobile menu toggle button
    function createMobileMenuButton() {
        if (document.querySelector('.mobile-menu-toggle')) {
            return; // Button already exists
        }
        
        const menuButton = document.createElement('button');
        menuButton.className = 'mobile-menu-toggle';
        menuButton.innerHTML = '☰';
        menuButton.setAttribute('aria-label', 'Toggle menu');
        menuButton.setAttribute('aria-expanded', 'false');
        
        body.appendChild(menuButton);
        
        const overlay = createMobileMenuOverlay();
        
        menuButton.addEventListener('click', function(e) {
            e.stopPropagation();
            if (sidebar) {
                sidebar.classList.toggle('open');
                const isOpen = sidebar.classList.contains('open');
                menuButton.setAttribute('aria-expanded', isOpen);
                menuButton.innerHTML = isOpen ? '✕' : '☰';
                
                // Toggle overlay
                if (isOpen) {
                    overlay.classList.add('active');
                    body.style.overflow = 'hidden';
                } else {
                    overlay.classList.remove('active');
                    body.style.overflow = '';
                }
            }
        });
    }
    
    // Initialize mobile menu button
    if (sidebar) {
        createMobileMenuButton();
        
        // Handle window resize
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                const isMobile = window.innerWidth <= 768;
                const menuButton = document.querySelector('.mobile-menu-toggle');
                
                if (isMobile && !menuButton) {
                    createMobileMenuButton();
                } else if (!isMobile && menuButton) {
                    sidebar.classList.remove('open');
                    body.style.overflow = '';
                    const overlay = document.querySelector('.mobile-menu-overlay');
                    if (overlay) {
                        overlay.classList.remove('active');
                    }
                    if (menuButton) {
                        menuButton.setAttribute('aria-expanded', 'false');
                        menuButton.innerHTML = '☰';
                    }
                }
            }, 250);
        });
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(event) {
            if (window.innerWidth <= 768 && sidebar && sidebar.classList.contains('open')) {
                const menuButton = document.querySelector('.mobile-menu-toggle');
                const overlay = document.querySelector('.mobile-menu-overlay');
                if (!sidebar.contains(event.target) && 
                    event.target !== menuButton && 
                    !menuButton.contains(event.target) &&
                    event.target !== overlay) {
                    sidebar.classList.remove('open');
                    body.style.overflow = '';
                    if (overlay) {
                        overlay.classList.remove('active');
                    }
                    if (menuButton) {
                        menuButton.setAttribute('aria-expanded', 'false');
                        menuButton.innerHTML = '☰';
                    }
                }
            }
        });
        
        // Close sidebar on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
                body.style.overflow = '';
                const overlay = document.querySelector('.mobile-menu-overlay');
                if (overlay) {
                    overlay.classList.remove('active');
                }
                const menuButton = document.querySelector('.mobile-menu-toggle');
                if (menuButton) {
                    menuButton.setAttribute('aria-expanded', 'false');
                    menuButton.innerHTML = '☰';
                }
            }
        });
    }
    
    initializeTooltips();
    
    initializeChartPlaceholders();
});

/**
 * Initialize tooltips for elements with data-tooltip attribute
 */
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            // Tooltip implementation can be added here
            // For now, using title attribute as fallback
        });
    });
}

/**
 * Initialize chart placeholders
 * These will be replaced with actual Chart.js implementations later
 */
function initializeChartPlaceholders() {
    const chartContainers = document.querySelectorAll('.chart-container');
    chartContainers.forEach(container => {
        if (!container.querySelector('.chart-placeholder')) {
            const placeholder = document.createElement('div');
            placeholder.className = 'chart-placeholder';
            placeholder.textContent = 'Chart will be rendered here (Chart.js integration)';
            placeholder.style.cssText = 'text-align: center; color: var(--text-secondary); padding: 2rem;';
            container.appendChild(placeholder);
        }
    });
}

/**
 * Format number with commas
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Format date
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

/**
 * Calculate percentage
 */
function calculatePercentage(part, total) {
    if (total === 0) return 0;
    return Math.round((part / total) * 100);
}

/**
 * Animate progress bar
 */
function animateProgressBar(progressBar, targetPercent) {
    let currentPercent = 0;
    const interval = setInterval(() => {
        if (currentPercent >= targetPercent) {
            clearInterval(interval);
            return;
        }
        currentPercent += 2;
        progressBar.style.width = currentPercent + '%';
    }, 20);
}

// Export functions for use in other scripts
window.APPLYRA = {
    formatNumber,
    formatDate,
    calculatePercentage,
    animateProgressBar
};

