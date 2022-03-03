const getSpace = async (event) => {
  event.preventDefault();

  const space_id = document.querySelector('#myspace-id').value;
  //   Working properly
  console.log(space_id);

  const response = await fetch('/space/' + space_id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(response);
  if (response.ok) {
    localStorage.setItem('toast', 'Welcome to your space');
    document.location.replace('/space/' + space_id);
  } else {
    localStorage.setItem('toast', 'Your space id could not be found.');
    toastIt(true);
  }
};

const createSpace = async (event) => {
  event.preventDefault();

  const space_name = document.querySelector('#myspace-name').value;
  //   value is getting through.
  //   Console log is working properly. Sending it through to route iscoming back with a 500 internal server error.
  const response = await fetch('api/space/name/' + space_name, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      space_name,
    }),
  });
  console.log(response);
  if (response.ok) {
    localStorage.setItem('toast', 'Tell us more about your new space');
  } else {
    localStorage.setItem(
      'toast',
      'Please try a different name, that one may be taken.'
    );
    toastIt(true);
  }
};


document.querySelector('.form-enter-space').addEventListener('submit', getSpace);
document.querySelector('.form-create-space').addEventListener('submit', createSpace);
