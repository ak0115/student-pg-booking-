document.addEventListener('DOMContentLoaded', function() {
    // Toggle Password Visibility
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            
            // Toggle password visibility
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            } else {
                passwordInput.type = 'password';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            }
        });
    });

    // Password Strength Meter
    const passwordInput = document.getElementById('password');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    if (passwordInput && strengthBar && strengthText) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const strength = checkPasswordStrength(password);
            
            // Update strength bar
            strengthBar.style.width = strength.percentage + '%';
            strengthBar.style.backgroundColor = strength.color;
            
            // Update strength text
            strengthText.textContent = strength.message;
            strengthText.style.color = strength.color;
        });
    }
    
    function checkPasswordStrength(password) {
        // Initialize variables
        let strength = 0;
        let message = '';
        let color = '';
        
        // Check password length
        if (password.length === 0) {
            return {
                percentage: 0,
                message: 'Password strength',
                color: '#e5e7eb'
            };
        } else if (password.length < 6) {
            strength += 1;
        } else if (password.length < 10) {
            strength += 2;
        } else {
            strength += 3;
        }
        
        // Check for mixed case
        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) {
            strength += 1;
        }
        
        // Check for numbers
        if (password.match(/\d/)) {
            strength += 1;
        }
        
        // Check for special characters
        if (password.match(/[^a-zA-Z\d]/)) {
            strength += 1;
        }
        
        // Calculate percentage and set message
        let percentage = 0;
        
        switch (strength) {
            case 0:
            case 1:
                percentage = 20;
                message = 'Very Weak';
                color = '#ef4444';
                break;
            case 2:
            case 3:
                percentage = 40;
                message = 'Weak';
                color = '#f97316';
                break;
            case 4:
                percentage = 60;
                message = 'Medium';
                color = '#eab308';
                break;
            case 5:
                percentage = 80;
                message = 'Strong';
                color = '#22c55e';
                break;
            case 6:
                percentage = 100;
                message = 'Very Strong';
                color = '#16a34a';
                break;
        }
        
        return {
            percentage,
            message,
            color
        };
    }

    // Form Validation
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Simple validation
            if (!email || !password) {
                showAlert('Please fill in all fields', 'error');
                return;
            }
            
            // Simulate login (in a real app, this would be an API call)
            simulateLogin(email, password);
        });
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const firstName = document.getElementById('first-name').value;
            const lastName = document.getElementById('last-name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const userType = document.querySelector('input[name="user-type"]:checked').value;
            const termsAccepted = document.getElementById('terms').checked;
            
            // Simple validation
            if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
                showAlert('Please fill in all fields', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                showAlert('Passwords do not match', 'error');
                return;
            }
            
            if (!termsAccepted) {
                showAlert('Please accept the Terms of Service and Privacy Policy', 'error');
                return;
            }
            
            // Simulate signup (in a real app, this would be an API call)
            simulateSignup(firstName, lastName, email, phone, password, userType);
        });
    }
    
    function simulateLogin(email, password) {
        // Show loading state
        showAlert('Logging in...', 'info');
        
        // Simulate API call with timeout
        setTimeout(() => {
            // In a real app, you would validate credentials with a backend API
            // For demo purposes, we'll just redirect to the dashboard
            showAlert('Login successful! Redirecting...', 'success');
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        }, 1500);
    }
    
    function simulateSignup(firstName, lastName, email, phone, password, userType) {
        // Show loading state
        showAlert('Creating your account...', 'info');
        
        // Simulate API call with timeout
        setTimeout(() => {
            // In a real app, you would send user data to a backend API
            // For demo purposes, we'll just redirect to the dashboard
            showAlert('Account created successfully! Redirecting...', 'success');
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        }, 1500);
    }
    
    // Alert System
    function showAlert(message, type) {
        // Remove any existing alerts
        const existingAlert = document.querySelector('.alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        // Create alert element
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.textContent = message;
        
        // Add alert to the page
        const authForm = document.querySelector('.auth-form');
        if (authForm) {
            authForm.insertBefore(alert, authForm.firstChild);
            
            // Auto remove after 5 seconds for success and error messages
            if (type === 'success' || type === 'error') {
                setTimeout(() => {
                    alert.remove();
                }, 5000);
            }
        }
    }
    
    // Add alert styles
    const style = document.createElement('style');
    style.textContent = `
        .alert {
            padding: 1rem;
            border-radius: var(--border-radius);
            margin-bottom: 1.5rem;
            font-size: 0.875rem;
            font-weight: 500;
        }
        
        .alert-success {
            background-color: #dcfce7;
            color: #16a34a;
            border: 1px solid #86efac;
        }
        
        .alert-error {
            background-color: #fee2e2;
            color: #dc2626;
            border: 1px solid #fca5a5;
        }
        
        .alert-info {
            background-color: #dbeafe;
            color: #2563eb;
            border: 1px solid #93c5fd;
        }
    `;
    document.head.appendChild(style);
});