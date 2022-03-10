const addInterest = async (event) => {
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

  if (response.ok) {
    localStorage.setItem('toast', `Thanks for your interest!`);
    document.location.reload();
  } else {
    localStorage.setItem('toast', 'Failed to add your interest.');
    toastIt(true);
  }
};

const removeInterest = async (event) => {
  const idea_id = event.target.value;
  const response = await fetch('/api/interest', {
    method: 'DELETE',
    body: JSON.stringify({
      idea_id,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    localStorage.setItem('toast', `Removed your interest`);
    document.location.reload();
  } else {
    localStorage.setItem('toast', 'Failed to remove your interest.');
    toastIt(true);
  }
};

const interestHandler = (event) => {
  if (event.target.classList.contains('interest-false')) {
    event.preventDefault();
    addInterest(event);
    return;
  }

  if (event.target.classList.contains('interest-true')) {
    event.preventDefault();
    removeInterest(event);
    return;
  }
};

// document.querySelector('#ideas').addEventListener('click', interestHandler);
