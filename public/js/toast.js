window.toastIt = (() => {
  // get toast value and Toastify it if it exists
  const toastIt = (danger = false) => {
    const toast = localStorage.getItem('toast');

    if (toast) {
      Toastify({
        text: toast,
        duration: 3000,
        close: true,
        gravity: 'bottom',
        position: 'center',
        stopOnFocus: true,
        style: {
          background: danger ? '#E5383B' : '#009ecc',
        },
      }).showToast();

      localStorage.removeItem('toast');
    }
  };

  const params = new URLSearchParams(location.search);
  const message = params.get('error') || params.get('success');

  if (message) {
    localStorage.setItem('toast', message);
  }

  toastIt(params.has('error'));

  return toastIt;
})();
