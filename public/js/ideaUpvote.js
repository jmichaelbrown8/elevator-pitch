const addVote = async (event) => {
  const idea_id = event.target.value;
  const response = await fetch('/api/upvote', {
    method: 'POST',
    body: JSON.stringify({
      idea_id,
    }),
    headerss: {
      'Content-type': 'application/json',
    },
  });
  if (response.ok) {
    localStorage.setItem('toast', 'Thank you for your vote!');
    document.location.reload();
  } else {
    localStorage.setItem('toast', 'Your vote was not counted.');
    toastIt(true);
  }
};

const removeVote = async (event) => {
  const idea_id = event.target.value;
  const response = await fetch('/api/upvote', {
    method: 'DELETE',
    body: JSON.stringify({
      idea_id,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    localStorage.setItem('toast', 'Removed your vote.');
    document.location.reload();
  } else {
    localStorage.setItem('toast', 'Unable to remove your vote.');
    toastIt(true);
  }
};

const voteHandler = (event) => {
  if (event.target.classList.contains('vote-false')) {
    event.preventDefault();
    addVote(event);
    return;
  }
  if (event.target.classList.contains('vote-true')) {
    event.preventDefault();
    removeVote(event);
    return;
  }
};
document.querySelector('.like').addEventListener('click', console.log("hello world"));
