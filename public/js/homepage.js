const getSpace = async (event) => {
  event.preventDefault();

  const space_id = document.querySelector('#myspace-id').value;
  //   Console log is working properly. Route is responding with 500 err. View console for response information.
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
    document.location.replace('/space');
  } else {
    localStorage.setItem('toast', 'Your space id could not be found.');
    toastIt(true);
  }
};


const createSpace = async (event) => {
  event.preventDefault();

  const space_name = document.querySelector('#myspace-name').value;
  //   value is getting through.
  console.log(space_name);
  //   Console log is working properly. Sending it through to route iscoming back with a 500 internal server error.
  const response = await fetch('/space/' +space_name, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    localStorage.setItem('toast', 'Tell us more about your new space');
    document.location.replace('/space');
  } else {
    localStorage.setItem(
      'toast',
      'Please try a different name, that one may be taken.'
    );
    toastIt(true);
  }
};


document.querySelector('.get-space').addEventListener('click', getSpace);
document.querySelector('.create-space').addEventListener('click', createSpace);
