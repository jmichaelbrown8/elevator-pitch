const getSpace = async (event) => {
  event.preventDefault();

  const space_id = document.querySelector('#myspace-id').value;
  const response = await fetch('/space/' + space_id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

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

  if (space_name === '') {
    localStorage.setItem('toast', 'Please include a space name');
    toastIt(true);
    return;
  }

  const response = await fetch('api/space/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: space_name,
    }),
  });

  if (response.ok) {
    const mySpaceData = await response.json();
    localStorage.setItem('toast', `Created new space ${mySpaceData.name}`);
    document.location.href = `/space/${mySpaceData.id}`;
  } else {
    const errorObj = await response.json();
    localStorage.setItem('toast', errorObj.message);
    toastIt(true);
  }
};

document
  .querySelector('.form-enter-space')
  .addEventListener('submit', getSpace);
document
  .querySelector('.form-create-space')
  .addEventListener('submit', createSpace);
