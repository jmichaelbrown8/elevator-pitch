const res = require('express/lib/response');

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
    res.status(200);
    document.location.reload();
  } else {
    res.json({ message: 'Unable to like' });
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
    res.status(200);
    document.location.reload();
  } else {
    res.json({ message: 'Unable to unlike' });
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
