const interestHandler = async (event) => {
  if (!event.target.classList.contains('interest')) {
    return;
  }
  event.preventDefault();
  const idea_id = event.target.value;

  const response = await fetch('/api/interest', {
    method: 'POST',
    body: JSON.stringify({
      idea_id,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    localStorage.setItem('toast', 'Failed to add your interest.');
    toastIt(true);
    return;
  }

  // conditionally show if interest was added or removed
  const responseJSON = await response.json();
  if (responseJSON.interested) {
    localStorage.setItem('toast', `Thanks for your interest!`);
  } else {
    localStorage.setItem('toast', `Interest removed.`);
  }
  document.location.reload();
};

document.querySelector('#ideas').addEventListener('click', interestHandler);
