const submitImage = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#image').name;
  const type = document.querySelector('#image').type;
  const content = document.querySelector('#image').file;

  if (type && content) {
    const response = await fetch(`/space/:space_id/idea/:idea_id/resource`, {
      method: 'POST',
      body: JSON.stringify({ name, type, content }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      const myResource = await response.json();

      localStorage.setItem('toast', `Created new resource!`);
      //    place to re-route after resource
      document.location.href = `/space/${myResource.space_id}/idea/${myResource.id}/resource/create`;
    } else {
      const errorObj = await response.json();
      localStorage.setItem('toast', errorObj.message);
      toastIt(true);
    }
  }
};

const submitLink = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#link').name;
  const type = document.querySelector('#link').type;
  const content = document.querySelector('#link').file[0];

  if (type && content) {
    const response = await fetch(`/space/:space_id/idea/:idea_id/resource`, {
      method: 'POST',
      body: JSON.stringify({ name, type, content }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      const myResource = await response.json();

      localStorage.setItem('toast', `Created new resource!`);
      //    place to re-route after resource
      document.location.href = `/space/${myResource.space_id}/idea/${myResource.id}/resource/create`;
    } else {
      const errorObj = await response.json();
      localStorage.setItem('toast', errorObj.message);
      toastIt(true);
    }
  }
};

document.querySelector('.submit-image').addEventListener('submit', submitImage);

document.querySelector('.submit-link').addEventListener('click', submitLink);
