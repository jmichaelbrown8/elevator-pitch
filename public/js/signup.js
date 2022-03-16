const signupFormHandler = async (event) => {
  event.preventDefault();
  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      localStorage.setItem('toast', `Welcome ${name}! Let's create.`);
      const { redirect } = await response.json();
      document.location.replace(redirect || '/');
    } else {
      localStorage.setItem('toast', 'Failed to sign up.');
      toastIt(true);
    }
  }
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
