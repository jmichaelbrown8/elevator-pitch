(($) => {
  const updateInterestStatus = (user_id, status) => {
    const { space_id, idea_id } = getContext();
    return fetch(`/api/space/${space_id}/idea/${idea_id}/interest/${user_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
  };
  const handleError = ( message ) => {
    localStorage.setItem('toast', message);
    toastIt(true);
  };
  const handleSuccess = ( message ) => {
    localStorage.setItem('toast', message);
    location.reload();
  };

  $('#idea-members').on('click', 'button', async e => {
    const button = $(e.currentTarget);
    const status = button.data('status');
    try {
      const response = await updateInterestStatus(
        button.closest('.card').data('user-id'),
        status
      );
      if(response.ok) {
        handleSuccess(`User ${status}.`);
      } else {
        handleError(`User was unable to be ${status}.`);
      }
    } catch(err) {
      handleError(`User was unable to be ${status}.`);
    }
  });
})(jQuery);
