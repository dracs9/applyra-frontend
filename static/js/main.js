/**
 * APPLYRA - Main JavaScript
 * Shared utilities and functions
 */

// Sidebar toggle for mobile (to be implemented when needed)
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const sidebar = document.querySelector('.sidebar');
    const header = document.querySelector('.header');
    
    // Create mobile menu button if on mobile
    if (window.innerWidth <= 768 && sidebar) {
        const menuButton = document.createElement('button');
        menuButton.className = 'mobile-menu-btn';
        menuButton.innerHTML = '☰';
        menuButton.style.cssText = 'position: fixed; top: 1rem; left: 1rem; z-index: 300; background: var(--primary-blue); color: white; border: none; padding: 0.5rem; border-radius: 4px; cursor: pointer;';
        
        if (header) {
            header.appendChild(menuButton);
        }
        
        menuButton.addEventListener('click', function() {
            sidebar.classList.toggle('open');
        });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768 && sidebar && sidebar.classList.contains('open')) {
            if (!sidebar.contains(event.target) && !event.target.classList.contains('mobile-menu-btn')) {
                sidebar.classList.remove('open');
            }
        }
    });
    
    // Initialize tooltips if needed
    initializeTooltips();
    
    // Initialize charts placeholders
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

