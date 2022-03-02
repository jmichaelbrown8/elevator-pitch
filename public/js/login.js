const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (response.ok) {
      localStorage.setItem('toast', 'You are now logged in.');
      document.location.replace('/dashboard');
    } else {
      localStorage.setItem('toast', 'Failed to log in.');
      toastIt(true);
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);