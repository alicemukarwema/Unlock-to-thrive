// registration-validation.js

document.addEventListener('DOMContentLoaded', function() {
    // Toggle between student and mentor fields
    const studentRadio = document.getElementById('studentAccount');
    const mentorRadio = document.getElementById('mentorAccount');
    const studentFields = document.getElementById('studentFields');
    const mentorFields = document.getElementById('mentorFields');

    function toggleFields() {
        if (studentRadio && mentorRadio && studentFields && mentorFields) {
            if (studentRadio.checked) {
                studentFields.style.display = 'block';
                mentorFields.style.display = 'none';
            } else if (mentorRadio.checked) {
                studentFields.style.display = 'none';
                mentorFields.style.display = 'block';
            }
        }
    }

    // Add event listeners to the radio buttons if they exist
    if (studentRadio && mentorRadio) {
        studentRadio.addEventListener('change', toggleFields);
        mentorRadio.addEventListener('change', toggleFields);
        // Initialize the form based on the default selection
        toggleFields();
    }

    // Form validation
    const registrationForm = document.getElementById('registrationForm');
    
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            // Reset previous errors
            const invalidInputs = document.querySelectorAll('.is-invalid');
            invalidInputs.forEach(input => input.classList.remove('is-invalid'));
            
            // Get form elements
            const fullName = document.getElementById('fullName');
            const email = document.getElementById('email');
            const password = document.getElementById('password');
            const confirmPassword = document.getElementById('confirmPassword');
            const termsCheck = document.getElementById('termsCheck');
            
            // Validate full name
            if (!fullName.value.trim()) {
                showError(fullName, 'Full name is required');
                isValid = false;
            }
            
            // Validate email
            if (!email.value.trim()) {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate password
            if (!password.value) {
                showError(password, 'Password is required');
                isValid = false;
            } else if (!isStrongPassword(password.value)) {
                showError(password, 'Password must be at least 8 characters with uppercase, lowercase, and numbers');
                isValid = false;
            }
            
            // Validate confirm password
            if (password.value !== confirmPassword.value) {
                showError(confirmPassword, 'Passwords do not match');
                isValid = false;
            }
            
            // Validate terms checkbox
            if (!termsCheck.checked) {
                showError(termsCheck, 'You must agree to the Terms of Service');
                termsCheck.nextElementSibling.classList.add('text-danger');
                isValid = false;
            }
            
            // Validate student-specific fields if student account is selected
            if (studentRadio && studentRadio.checked) {
                const educationLevel = document.getElementById('educationLevel');
                if (educationLevel.value === 'Select your education level') {
                    showError(educationLevel, 'Please select your education level');
                    isValid = false;
                }
            }
            
            // Validate mentor-specific fields if mentor account is selected
            if (mentorRadio && mentorRadio.checked) {
                const profession = document.getElementById('profession');
                const expertise = document.getElementById('expertise');
                const availability = document.getElementById('availability');
                
                if (!profession.value.trim()) {
                    showError(profession, 'Profession is required');
                    isValid = false;
                }
                
                if (!expertise.value.trim()) {
                    showError(expertise, 'Areas of expertise is required');
                    isValid = false;
                }
                
                if (availability.value === 'Select your availability') {
                    showError(availability, 'Please select your availability');
                    isValid = false;
                }
            }
            
            if (isValid) {
                // For demonstration - replace with actual registration
                console.log('Registration form submitted successfully');
                
                // Add success message
                const formContainer = registrationForm.parentElement;
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success mt-3';
                successMessage.textContent = 'Registration successful! Redirecting to login page...';
                formContainer.appendChild(successMessage);
                
                // Redirect to login page (demo only)
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            }
        });
    }
    
    // Helper functions
    function showError(input, message) {
        input.classList.add('is-invalid');
        
        // Create error message for checkbox
        if (input.type === 'checkbox') {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'invalid-feedback d-block';
            errorDiv.textContent = message;
            input.parentElement.appendChild(errorDiv);
            return;
        }
        
        // Add error message for other inputs
        const errorDiv = input.nextElementSibling;
        if (errorDiv && errorDiv.classList.contains('invalid-feedback')) {
            errorDiv.textContent = message;
        } else {
            const newErrorDiv = document.createElement('div');
            newErrorDiv.className = 'invalid-feedback';
            newErrorDiv.textContent = message;
            input.parentNode.insertBefore(newErrorDiv, input.nextSibling);
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isStrongPassword(password) {
        // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passwordRegex.test(password);
    }
});