(($) => {
  const detailsInput = $('#interest-details');

  // Focus the input after the modal is shown
  $('#add-interest-modal').on('shown.bs.modal', () => {
    if( detailsInput.length ) {
      detailsInput.focus();
    }
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
      await fetch(`/api/space/${space_id}/idea/${idea_id}/interest`, {
        method: 'POST',
        body: JSON.stringify({ details }),
        headers: {
          'Content-Type': 'application/json'
        },
      });
      localStorage.setItem('toast', 'Your interest to collaborate on the idea has been submitted.');
      location.reload();
    } catch (err) {
      localStorage.setItem('toast', 'Unable to join the idea.');
      toastIt(true);
    }
  });

  $('#remove-interest').on('click', async () => {
    try {
      const { space_id, idea_id } = getContext();
      await fetch(`/api/space/${space_id}/idea/${idea_id}/interest`, { method: 'DELETE' });
      localStorage.setItem('toast', 'Your interest to collaborate has been removed.');
      location.reload();
    } catch(err) {
      console.log();
      localStorage.setItem('toast', 'Failed to remove interest.');
      toastIt(true);
    }
  });
})(jQuery);
// document.querySelector('#ideas').addEventListener('click', interestHandler);
