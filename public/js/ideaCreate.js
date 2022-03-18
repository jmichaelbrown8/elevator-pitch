const createIdea = async (event) => {
  event.preventDefault();


  const { space_id } = getContext();
  const name = $('#idea-name').val();
  const pitch = $('#idea-content').val().trim();
  const members = parseInt($('#member-number').val());
  const skills = $('#skills').val().trim();

  if (space_id && name && pitch) {
    const response = await fetch(`/api/space/${space_id}/idea`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        pitch,
        members,
        skills,
      }),
    });

    if (response.ok) {
      const myIdea = await response.json();

      localStorage.setItem('toast', `Created new idea - ${myIdea.name}`);
      //    place to re-route after idea creation
      document.location.href = `/space/${myIdea.space_id}/idea/${myIdea.id}`;
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
