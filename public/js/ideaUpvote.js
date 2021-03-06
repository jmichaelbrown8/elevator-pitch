const addVote = async (event) => {
  const idea_id = event.target.value;
  const response = await fetch('/api/upvote', {
    method: 'POST',
    body: JSON.stringify({
      idea_id,
    }),
    headers: {
      'Content-type': 'application/json',
    },
  });
  if (response.ok) {
    localStorage.setItem('toast', `Idea liked!`);
    document.location.reload();
  } else {
    localStorage.setItem('toast', `Unable to like.`);
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
    localStorage.setItem('toast', `Like removed.`);
    document.location.reload();
  } else {
    localStorage.setItem('toast', `Unable to unlike.`);
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
const likes = document.querySelectorAll('.like');
likes.forEach((like) => {
  like.addEventListener('click', voteHandler);
});
