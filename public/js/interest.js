(($) => {
  const detailsInput = $('#interest-details');
  const handleError = ( message ) => {
    localStorage.setItem('toast', message);
    toastIt(true);
  };
  const handleSuccess = ( message ) => {
    localStorage.setItem('toast', message);
    location.reload();
  };
  let addMode = 'POST';

  // Focus the input after the modal is shown
  $('#add-interest-modal').on('shown.bs.modal', e => {
    addMode = $(e.relatedTarget).data('type') === 'resend' ? 'PUT' : 'POST';
    if( detailsInput.length ) {
      detailsInput.focus();
    }
  });

  $('#add-interest-form').on('submit', async (e) => {
    e.preventDefault();
    const details = detailsInput.val();

    if (!details) {
      handleError('Please provide some details about your interest.');
      return;
    }

    try {
      const { space_id, idea_id } = getContext();
      const response = await fetch(`/api/space/${space_id}/idea/${idea_id}/interest`, {
        method: addMode,
        body: JSON.stringify({ details }),
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if(response.ok) {
        handleSuccess('Your interest to collaborate on the idea has been submitted.');
      } else {
        handleError('Unable to join the idea.');
      }
    } catch (err) {
      handleError('Unable to join the idea.');
    }
  });

  $('#remove-interest').on('click', async () => {
    try {
      const { space_id, idea_id } = getContext();
      const response = await fetch(`/api/space/${space_id}/idea/${idea_id}/interest`, { method: 'DELETE' });

      if( response.ok ) {
        handleSuccess('Your interest to collaborate has been removed.');
      } else {
        handleError('Failed to remove interest.');
      }

    } catch(err) {
      handleError('Failed to remove interest.');
    }
  });
})(jQuery);