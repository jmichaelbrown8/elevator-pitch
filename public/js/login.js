const loginFormHandler = async (event) => {
  event.preventDefault();
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      localStorage.setItem('toast', 'You are now logged in.');
      const { redirect } = await response.json();
      document.location.replace(redirect || '/');
    } else {
      localStorage.setItem('toast', 'Failed to log in.');
      toastIt(true);
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
