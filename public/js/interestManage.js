(($) => {
  const updateInterestStatus = (user_id, status) => {
    const { space_id, idea_id } = getContext();
    return fetch(`/api/space/${space_id}/idea/${idea_id}/interest/${user_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
  };
  const handleError = (message) => {
    localStorage.setItem('toast', message);
    toastIt(true);
  };
  const handleSuccess = (message, redirect) => {
    localStorage.setItem('toast', message);
    redirect ? location.replace(redirect) : location.reload();
  };

  $('#idea-members').on('click', 'button[data-status]', async (e) => {
    const button = $(e.currentTarget);
    const status = button.data('status');
    try {
      const response = await updateInterestStatus(
        button.closest('.card').data('user-id'),
        status
      );
      if (response.ok) {
        handleSuccess(`User ${status}.`);
      } else {
        handleError(`User was unable to be ${status}.`);
      }
    } catch (err) {
      handleError(`User was unable to be ${status}.`);
    }
  });
  $('#delete-idea').on('click', async () => {
    try {
      const { space_id, idea_id } = getContext();
      const response = await fetch(`/api/space/${space_id}/idea/${idea_id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        handleSuccess(`Idea deleted.`, `/space/${space_id}`);
      } else {
        const { message } = await response.json();
        handleError(message || 'Unable to delete Idea.');
      }
    } catch (err) {
      handleError('Unable to delete Idea.');
    }
  });
  $('#abandon-idea').on('click', async () => {
    try {
      const { space_id, idea_id } = getContext();
      const response = await fetch(
        `/api/space/${space_id}/idea/${idea_id}/abandon`,
        {
          method: 'PUT',
        }
      );
      const { message } = await response.json();
      if (response.ok) {
        handleSuccess(message || 'Abandoned idea.', `/space/${space_id}`);
      } else {
        handleError(message || 'Unable to abandon Idea.');
      }
    } catch (err) {
      handleError('Unable to abandon Idea.');
    }
  });
})(jQuery);
