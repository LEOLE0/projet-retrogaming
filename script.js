document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const passwordStrength = document.getElementById('passwordStrength');

    function validateUsername() {
        return username.value.length >= 3;
    }

    function validateEmail() {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email.value);
    }

    function validatePassword() {
        const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$&*]).{8,}$/;
        return passwordPattern.test(password.value);
    }

    function validateConfirmPassword() {
        return password.value === confirmPassword.value;
    }

    function updatePasswordStrength() {
        const strongPasswordPattern = /^(?=.*[A-Z])(?=.*[!@#$&*]).{12,}$/;
        const mediumPasswordPattern = /^(?=.*[A-Z])(?=.*[!@#$&*]).{8,}$/;

        if (strongPasswordPattern.test(password.value)) {
            passwordStrength.style.backgroundColor = 'green';
            passwordStrength.style.width = '100%';
        } else if (mediumPasswordPattern.test(password.value)) {
            passwordStrength.style.backgroundColor = 'blue';
            passwordStrength.style.width = '66%';
        } else {
            passwordStrength.style.backgroundColor = 'red';
            passwordStrength.style.width = '33%';
        }
    }

    form.addEventListener('input', function() {
        if (!validateUsername()) {
            username.nextElementSibling.style.display = 'block';
        } else {
            username.nextElementSibling.style.display = 'none';
        }

        if (!validateEmail()) {
            email.nextElementSibling.style.display = 'block';
        } else {
            email.nextElementSibling.style.display = 'none';
        }

        if (!validatePassword()) {
            password.nextElementSibling.style.display = 'block';
        } else {
            password.nextElementSibling.style.display = 'none';
        }

        if (!validateConfirmPassword()) {
            confirmPassword.nextElementSibling.style.display = 'block';
        } else {
            confirmPassword.nextElementSibling.style.display = 'none';
        }

        updatePasswordStrength();
    });

    form.addEventListener('submit', function(event) {
        if (!validateUsername() || !validateEmail() || !validatePassword() || !validateConfirmPassword()) {
            event.preventDefault();
        } else {
            event.preventDefault(); // Empêche la soumission du formulaire
            window.location.href = 'home.html'; // Redirige vers la page de succès
        }
    });
});