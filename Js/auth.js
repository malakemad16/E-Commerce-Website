//Nav bar Mobile
const listIcon = document.querySelector(".list-icon");
const mobileNav = document.querySelector(".mobile-nav");
listIcon.addEventListener("click", () => {
    mobileNav.classList.toggle("mobile-nav-hide")
})

// Handle Signup
if (window.location.pathname.includes('sign-up.html')) {
    const signupForm = document.querySelector('.auth-form');

    signupForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const name = signupForm.querySelector('input[type="text"]').value.trim();
        const email = signupForm.querySelector('input[type="email"]').value.trim();
        const password = signupForm.querySelector('input[type="password"]').value.trim();

        // Simple validation
        if (!name || !email || !password) {
            alert('Please fill all fields');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push({ name, email, password });
        localStorage.setItem('users', JSON.stringify(users));

        // Redirect to login
        window.location.href = 'log-in.html';
    });
}

// Handle Login
if (window.location.pathname.includes('log-in.html')) {
    const loginForm = document.querySelector('.auth-form');

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = loginForm.querySelector('input[type="email"]').value.trim();
        const password = loginForm.querySelector('input[type="password"]').value.trim();

        // Check credentials
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            // Mark as logged in
            localStorage.setItem('isLoggedIn', 'true');
            // Redirect to home
            window.location.href = 'index.html';
        } else {
            alert('Invalid email or password');
        }
    });
}

if (window.location.pathname.includes('index.html')) {
    if (!localStorage.getItem('isLoggedIn')) {
        console.log('Not logged in - showing public content');
    }
}