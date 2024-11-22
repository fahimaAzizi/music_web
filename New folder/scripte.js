document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
  }
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
  
    // Simulate a Gmail validation (replace with server-side logic in production)
    if (email.endsWith('@gmail.com') && password.trim().length > 0) {
      // Redirect to the second page if valid
      window.location.href = 'second.html';
    } else {
      // Display error message if invalid
      errorMessage.textContent = 'Invalid Gmail or password. Please try again.';
    }
  });
 
  