// CREATIVUN 2025 - JavaScript Features (Non-PWA Version)

// Global app state
const AppState = {
    lastUpdate: null,
    user: null,
    notifications: []
};

// Notification system
class NotificationManager {
    static show(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => document.body.removeChild(notification), 300);
        }, duration);
    }
}

// Registration management
class RegistrationManager {
    static async register(formData) {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Store in localStorage for demo
            const registrations = JSON.parse(localStorage.getItem('creativun_registrations') || '[]');
            const newRegistration = {
                id: Date.now(),
                ...formData,
                timestamp: new Date().toISOString()
            };
            registrations.push(newRegistration);
            localStorage.setItem('creativun_registrations', JSON.stringify(registrations));
            
            NotificationManager.show('Pendaftaran berhasil!', 'success');
            this.updateProgressBar();
            return true;
        } catch (error) {
            NotificationManager.show('Pendaftaran gagal. Silakan coba lagi.', 'error');
            return false;
        }
    }
    
    static updateProgressBar() {
        const registrations = JSON.parse(localStorage.getItem('creativun_registrations') || '[]');
        const currentCount = registrations.length;
        const targetCount = 500; // Target peserta
        const percentage = Math.min((currentCount / targetCount) * 100, 100);
        
        const progressBar = document.getElementById('registrationProgress');
        const progressText = document.getElementById('progressText');
        
        if (progressBar && progressText) {
            progressBar.style.width = `${percentage}%`;
            progressText.textContent = `${currentCount}/${targetCount} peserta terdaftar`;
        }
    }
}

// Live updates manager
class LiveUpdateManager {
    static async fetchUpdates() {
        try {
            // Simulate fetching live updates
            const updates = [
                {
                    id: 1,
                    time: '2 menit lalu',
                    message: '15 peserta baru mendaftar dari Jakarta'
                },
                {
                    id: 2,
                    time: '5 menit lalu',
                    message: 'Workshop "Digital Marketing" hampir penuh'
                },
                {
                    id: 3,
                    time: '8 menit lalu',
                    message: 'Merchandise CREATIVUN 2025 sudah tersedia'
                }
            ];
            
            const container = document.getElementById('liveUpdates');
            if (container) {
                container.innerHTML = updates.map(update => `
                    <div class="bg-gray-700 rounded-lg p-4 border-l-4 border-cyan-400">
                        <div class="text-cyan-400 text-sm">${update.time}</div>
                        <div class="text-gray-300 mt-1">${update.message}</div>
                    </div>
                `).join('');
            }
            
            AppState.lastUpdate = new Date();
        } catch (error) {
            console.error('Failed to fetch live updates:', error);
        }
    }
    
    static startPolling() {
        this.fetchUpdates();
        setInterval(() => this.fetchUpdates(), 30000); // Update setiap 30 detik
    }
}

// Enhanced countdown timer
class CountdownManager {
    static start() {
        const eventDate = new Date('2025-10-17T09:00:00+07:00'); // 17 Oktober 2025
        
        const updateCountdown = () => {
            const now = new Date();
            const timeDiff = eventDate - now;
            
            // Debug logging
            console.log('Current time:', now);
            console.log('Event date:', eventDate);
            console.log('Time difference (ms):', timeDiff);
            
            if (timeDiff <= 0) {
                // Cek jika masih dalam periode event (17-18 Oktober)
                const eventEndDate = new Date('2025-10-18T18:00:00+07:00');
                if (now <= eventEndDate) {
                    document.getElementById('countdown').innerHTML = 
                        '<div class="text-center text-2xl text-cyan-400">🎉 EVENT SEDANG BERLANGSUNG! 🎉</div>';
                } else {
                    document.getElementById('countdown').innerHTML = 
                        '<div class="text-center text-2xl text-gray-400">📅 EVENT TELAH SELESAI</div>';
                }
                return;
            }
            
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
            
            // Update elemen dengan null checking
            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');
            
            if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
            if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
            if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
            if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
            
            console.log(`Countdown: ${days}d ${hours}h ${minutes}m ${seconds}s`);
        };
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
}

// Lazy loading manager
class LazyLoadManager {
    static init() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('shimmer');
                        observer.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
}

// Network status manager (simplified without PWA)
class NetworkManager {
    static init() {
        const updateOnlineStatus = () => {
            const isOffline = !navigator.onLine;
            
            if (isOffline) {
                NotificationManager.show('Anda sedang offline', 'info');
            } else {
                NotificationManager.show('Koneksi kembali normal', 'success');
            }
        };
        
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);
    }
}

// Form validation
class FormValidator {
    static validateRegistration(formData) {
        const errors = [];
        
        if (!formData.name || formData.name.length < 2) {
            errors.push('Nama harus diisi minimal 2 karakter');
        }
        
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.push('Email tidak valid');
        }
        
        if (!formData.phone || !/^(\+62|62|0)[0-9]{9,13}$/.test(formData.phone)) {
            errors.push('Nomor telepon tidak valid');
        }
        
        if (!formData.university || formData.university.length < 3) {
            errors.push('Universitas harus diisi minimal 3 karakter');
        }
        
        return errors;
    }
}

// Analytics manager
class AnalyticsManager {
    static track(event, data = {}) {
        // Simulasi tracking analytics
        console.log('Analytics:', event, data);
        
        // Store locally for demo
        const events = JSON.parse(localStorage.getItem('creativun_analytics') || '[]');
        events.push({
            event,
            data,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        });
        localStorage.setItem('creativun_analytics', JSON.stringify(events));
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all managers
    CountdownManager.start();
    LiveUpdateManager.startPolling();
    LazyLoadManager.init();
    NetworkManager.init();
    RegistrationManager.updateProgressBar();
    
    // Create and setup back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑';
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Kembali ke atas');
    backToTopButton.setAttribute('title', 'Kembali ke atas');
    document.body.appendChild(backToTopButton);
    
    // Back to top functionality
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        AnalyticsManager.track('back_to_top_clicked');
    });
    
    // Track page view
    AnalyticsManager.track('page_view', {
        page: 'home',
        timestamp: new Date().toISOString()
    });
    
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                AnalyticsManager.track('navigation', {
                    target: this.getAttribute('href')
                });
            }
        });
    });
    
    // Enhanced modal functionality
    window.openModal = function() {
        document.getElementById('registrationModal').classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        AnalyticsManager.track('modal_open', { modal: 'registration' });
    };
    
    window.closeModal = function() {
        document.getElementById('registrationModal').classList.add('hidden');
        document.body.style.overflow = 'auto';
        AnalyticsManager.track('modal_close', { modal: 'registration' });
    };
    
    // Enhanced registration form
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.innerHTML = '<div class="spinner"></div> Mendaftar...';
            submitBtn.disabled = true;
            
            const formData = {
                name: this.name.value,
                email: this.email.value,
                phone: this.phone.value,
                university: this.university.value
            };
            
            // Validate form
            const errors = FormValidator.validateRegistration(formData);
            if (errors.length > 0) {
                NotificationManager.show(errors[0], 'error');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                return;
            }
            
            // Submit registration
            const success = await RegistrationManager.register(formData);
            
            if (success) {
                this.reset();
                closeModal();
                AnalyticsManager.track('registration_success', formData);
            } else {
                AnalyticsManager.track('registration_error', formData);
            }
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    }
    
    // FAQ toggle functionality
    window.toggleFAQ = function(element) {
        const content = element.nextElementSibling;
        const icon = element.querySelector('span');
        
        if (content && content.classList.contains('hidden')) {
            content.classList.remove('hidden');
            if (icon) icon.textContent = '-';
        } else if (content) {
            content.classList.add('hidden');
            if (icon) icon.textContent = '+';
        }
        
        AnalyticsManager.track('faq_toggle', {
            question: element.textContent.trim()
        });
    };
    
    // Close modal when clicking outside
    document.getElementById('registrationModal')?.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    // Add intersection observer for animations
    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            animationObserver.observe(el);
        });
    }
});

// Export for use in other scripts
window.CREATIVUN = {
    NotificationManager,
    RegistrationManager,
    LiveUpdateManager,
    CountdownManager,
    AnalyticsManager,
    AppState
};