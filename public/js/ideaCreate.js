const createIdea = async (event) => {
  event.preventDefault();

  const space_id = document.querySelector('.space-id').getAttribute('data-id');
  const name = document.querySelector('#idea-name').value;
  const pitch = document.querySelector('#idea-content').value.trim();
  const members = parseInt(document.querySelector('#member-number').value);
  const skills = document.querySelector('#skills').value.trim();

  if (space_id && name && pitch) {
    const response = await fetch('/api/idea', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        pitch,
        members,
        skills,
        space_id,
      }),
    });

    if (response.ok) {
      const myIdea = await response.json();

      localStorage.setItem('toast', `Created new idea - ${myIdea.name}`);
      //    place to re-route after idea creation
      document.location.href = `/space/${myIdea.space_id}`;
    } else {
      const errorObj = await response.json();
      localStorage.setItem('toast', errorObj.message);
      toastIt(true);
    }
  }
};

document
  .querySelector('#form-create-idea')
  .addEventListener('click', createIdea);
