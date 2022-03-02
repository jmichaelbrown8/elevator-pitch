const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && password) {
    const response = await fetch('/api/user', {
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
      localStorage.setItem('toast', 'User created.');
      document.location.replace('/dashboard');
    } else {
      localStorage.setItem('toast', 'Failed to sign up.');
      toastIt(true);
    }
  }
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);