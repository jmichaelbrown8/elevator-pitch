(() => {
  const joinSpace = async () => {
    // const space_id = target.dataset.id;

    // Get the space ID from global context.
    const { space_id } = getContext();

    const response = await fetch(`/api/space/${space_id}/member`, {
      method: 'POST',
      body: JSON.stringify({ space_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      localStorage.setItem('toast', 'Your request for access has been sent.');
      document.location.replace(`/`);
    } else {
      localStorage.setItem('toast', 'Failed to request access. Are you already a member?');
      toastIt(true);
    }
  };

  const joinButton = document.getElementById('access-space');

  if (joinButton) {
    joinButton.addEventListener('click', joinSpace);
  }
})();
