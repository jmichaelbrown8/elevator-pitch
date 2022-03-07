const addComment = async (event) => {
  event.preventDefault();

  const idea_id = document.querySelector('#form-add-comment').dataset.ideaId;
  const comment = document.querySelector('#addComment').value;

  if (idea_id && comment) {
    const response = await fetch('/api/comment/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idea_id,
        comment,
      }),
    });

    if (response.ok) {
      const commentRes = await response.json();

      localStorage.setItem('toast', `${commentRes.message}`);
      //    place to re-route after idea creation
      document.location.href = document.location.href;
    } else {
      const errorObj = await response.json();
      localStorage.setItem('toast', errorObj.message);
      toastIt(true);
    }
  }
};

document
  .querySelector('#form-add-comment')
  .addEventListener('click', addComment);
