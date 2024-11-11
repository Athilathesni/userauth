const apiUrl = 'http://localhost:5000/api/auth';

// Register function
async function register() {
  const username = document.getElementById('register-username').value;
  const password = document.getElementById('register-password').value;

  const response = await fetch(`${apiUrl}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await response.json();
  if (response.ok) {
    alert('Registration successful');
  } else {
    alert(data.message);
  }
}

// Login function
async function login() {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  const response = await fetch(`${apiUrl}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await response.json();
  if (response.ok) {
    localStorage.setItem('token', data.token);
    showProtectedContent();
  } else {
    alert(data.message);
  }
}

// Show protected content
function showProtectedContent() {
  document.getElementById('protected-content').style.display = 'block';
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('register-form').style.display = 'none';
}

// Logout function
function logout() {
  localStorage.removeItem('token');
  window.location.reload();
}

// Check token on page load
window.onload = () => {
  const token = localStorage.getItem('token');
  if (token) {
    showProtectedContent();
  }
};
