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
(($) => {
  const detailsInput = $('#interest-details');

  // Focus the input after the modal is shown
  $('#add-interest-modal').on('shown.bs.modal', () => {
    console.log('yes');
    detailsInput.focus();
  });

  $('#add-interest-form').on('submit', async (e) => {
    e.preventDefault();
    const details = detailsInput.val();

    if (!details) {
      localStorage.setItem('toast','Please provide some details about your interest.');
      toastIt(true);
      return;
    }

    try {
      const { space_id, idea_id } = getContext();
      await fetch(`/api/space/${space_id}/idea/${idea_id}/interest`, { method: 'POST' });
      localStorage.setItem('toast', 'Your interest to collaborate on the idea has been submitted.');
      location.reload();
    } catch (err) {
      localStorage.setItem('toast', 'Unable to join the idea.');
      toastIt(true);
    }
  });
})(jQuery);
// document.querySelector('#ideas').addEventListener('click', interestHandler);
