// login-validation.js

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');
    const loginAlert = document.getElementById('loginAlert');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            // Reset errors
            loginAlert.style.display = 'none';
            loginEmail.classList.remove('is-invalid');
            loginPassword.classList.remove('is-invalid');
            
            // Validate email
            if (!loginEmail.value.trim()) {
                showError(loginEmail, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(loginEmail.value)) {
                showError(loginEmail, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate password
            if (!loginPassword.value.trim()) {
                showError(loginPassword, 'Password is required');
                isValid = false;
            }
            
            if (isValid) {
                // For demonstration - replace with actual authentication
                // Normally you would send this to a server
                console.log('Login form submitted successfully');
                
                // Simulate successful login
                loginAlert.textContent = 'Login successful! Redirecting...';
                loginAlert.classList.remove('alert-danger');
                loginAlert.classList.add('alert-success');
                loginAlert.style.display = 'block';
                
                // Redirect to dashboard (demo only)
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            }
        });
    }
    
    // Helper functions
    function showError(input, message) {
        input.classList.add('is-invalid');
        const errorDiv = input.nextElementSibling;
        if (errorDiv && errorDiv.classList.contains('invalid-feedback')) {
            errorDiv.textContent = message;
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});