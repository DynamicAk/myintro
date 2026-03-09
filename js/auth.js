/**
 * Authentication System for Portfolio
 * Handles login, session management, and access control
 */

// Configuration - CHANGE THIS PASSWORD TO YOUR OWN SECURE PASSWORD
// Instructions: Replace the password below with your own strong password
// Example strong passwords: "MyUniqueP@ssw0rd!", "Secure#Portfolio2024", "MySecret$123"
const PORTFOLIO_PASSWORD = "abhishek123"; // ⚠️ IMPORTANT: Change this to your desired password
const SESSION_KEY = "portfolio_authenticated";
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Hash function for password (simple client-side hashing)
 * Note: For better security, consider using a more robust hashing method
 */
function simpleHash(str) {
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString();
}

/**
 * Check if user is currently authenticated
 */
function isAuthenticated() {
  const authData = localStorage.getItem(SESSION_KEY);
  if (!authData) return false;
  
  try {
    const { timestamp, hash } = JSON.parse(authData);
    const now = Date.now();
    
    // Check if session has expired
    if (now - timestamp > SESSION_DURATION) {
      localStorage.removeItem(SESSION_KEY);
      return false;
    }
    
    // Verify the stored hash
    return hash === simpleHash(PORTFOLIO_PASSWORD);
  } catch (error) {
    localStorage.removeItem(SESSION_KEY);
    return false;
  }
}

/**
 * Authenticate user with password
 */
function authenticate(password) {
  if (password === PORTFOLIO_PASSWORD) {
    const authData = {
      timestamp: Date.now(),
      hash: simpleHash(password)
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(authData));
    return true;
  }
  return false;
}

/**
 * Logout user by clearing session
 */
function logout() {
  localStorage.removeItem(SESSION_KEY);
  window.location.href = 'login.html';
}

/**
 * Redirect to login if not authenticated
 */
function requireAuth() {
  if (!isAuthenticated()) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

/**
 * Login form handler
 */
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  const passwordInput = document.getElementById('password');
  const errorMessage = document.getElementById('errorMessage');
  
  // If already authenticated, redirect to messages page
  if (isAuthenticated() && window.location.pathname.includes('login.html')) {
    window.location.href = 'messages.html';
    return;
  }
  
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const password = passwordInput.value;
      
      if (authenticate(password)) {
        // Success - redirect to messages page
        window.location.href = 'messages.html';
      } else {
        // Show error message
        errorMessage.style.display = 'block';
        passwordInput.value = '';
        passwordInput.focus();
        
        // Add shake animation to form
        loginForm.classList.add('shake');
        setTimeout(() => {
          loginForm.classList.remove('shake');
        }, 600);
      }
    });
    
    // Hide error message when user starts typing
    passwordInput.addEventListener('input', function() {
      errorMessage.style.display = 'none';
    });
  }
});

/**
 * Add logout functionality to protected pages
 */
function addLogoutButton() {
  const navbar = document.querySelector('.navbar');
  if (navbar && !document.querySelector('.logout-btn')) {
    const logoutBtn = document.createElement('button');
    logoutBtn.className = 'logout-btn';
    logoutBtn.innerHTML = '<ion-icon name="log-out-outline"></ion-icon>';
    logoutBtn.title = 'Logout';
    logoutBtn.onclick = logout;
    navbar.appendChild(logoutBtn);
  }
}