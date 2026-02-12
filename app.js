// Theme Management
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Load saved theme or use system preference
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}

// Toggle theme
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

themeToggle.addEventListener('click', toggleTheme);

// Load theme on page load
loadTheme();

// Auto-scroll on page load
window.addEventListener('load', () => {
    // Small delay to ensure page is fully rendered
    setTimeout(() => {
        const scrollDuration = 2000; // 2 seconds
        const scrollHeight = window.innerHeight * 0.5; // Scroll down by 50% of viewport
        const startPosition = window.pageYOffset;
        const startTime = performance.now();

        function easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        function scrollAnimation(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / scrollDuration, 1);
            const easeProgress = easeInOutCubic(progress);
            
            window.scrollTo(0, startPosition + (scrollHeight * easeProgress));

            if (progress < 1) {
                requestAnimationFrame(scrollAnimation);
            }
        }

        requestAnimationFrame(scrollAnimation);
    }, 300);
});

// PWA Installation
let deferredPrompt;
const installPrompt = document.getElementById('install-prompt');
const installAccept = document.getElementById('install-accept');
const installReject = document.getElementById('install-reject');

// Listen for the beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    
    // Check if user has already dismissed the prompt
    const hasSeenPrompt = localStorage.getItem('installPromptDismissed');
    
    if (!hasSeenPrompt) {
        // Show the install prompt after a short delay
        setTimeout(() => {
            installPrompt.classList.remove('hidden');
        }, 2000);
    }
});

// Handle install acceptance
installAccept.addEventListener('click', async () => {
    if (!deferredPrompt) {
        return;
    }
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    console.log(`User response to the install prompt: ${outcome}`);
    
    // Hide the prompt
    installPrompt.classList.add('hidden');
    
    // Clear the deferredPrompt
    deferredPrompt = null;
});

// Handle install rejection
installReject.addEventListener('click', () => {
    installPrompt.classList.add('hidden');
    localStorage.setItem('installPromptDismissed', 'true');
    deferredPrompt = null;
});

// Detect when PWA is successfully installed
window.addEventListener('appinstalled', () => {
    console.log('PWA was installed successfully');
    installPrompt.classList.add('hidden');
    deferredPrompt = null;
});

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('Service Worker registered successfully:', registration.scope);
                
                // Check for updates periodically
                setInterval(() => {
                    registration.update();
                }, 60000); // Check every minute
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
    
    // Handle service worker updates
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
            refreshing = true;
            window.location.reload();
        }
    });
}

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add intersection observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all product cards
document.querySelectorAll('.product-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(card);
});

// Handle offline/online status
window.addEventListener('online', () => {
    console.log('Connection restored');
    // You can show a notification here if desired
});

window.addEventListener('offline', () => {
    console.log('Connection lost - working offline');
    // You can show a notification here if desired
});

// Lazy loading images
if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Add to home screen detection for iOS
const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
};

const isInStandaloneMode = () => {
    return ('standalone' in window.navigator) && (window.navigator.standalone);
};

// Show iOS-specific install instructions if needed
if (isIos() && !isInStandaloneMode()) {
    // You can add iOS-specific install instructions here
    console.log('iOS device detected - user can install via Safari Share menu');
}