(($) => {
  const handleError = (message) => {
    localStorage.setItem('toast', message);
    toastIt(true);
  };
  const handleSuccess = (message, redirect) => {
    localStorage.setItem('toast', message);
    redirect ? location.replace(redirect) : location.reload();
  };
  $('#claim-idea').on('click', async () => {
    try {
      const { space_id, idea_id } = getContext();
      const response = await fetch(
        `/api/space/${space_id}/idea/${idea_id}/claim`,
        {
          method: 'PUT',
        }
      );
      const { message } = await response.json();
      if (response.ok) {
        handleSuccess(message || 'Claimed Idea.', `/space/${space_id}/idea/${idea_id}`
        );
      } else {
        handleError(message || 'Unable to claim Idea.');
      }
    } catch (err) {
      handleError('Unable to abandon Idea.');
    }
  });
})(jQuery);
