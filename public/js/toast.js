// get toast value and Toastify it if it exists
const toastIt = (danger = false) => {
  const toast = localStorage.getItem('toast');

  if (toast) {
    Toastify({
      text: toast,
      duration: 3000,
      close: true,
      gravity: 'top',
      position: 'right',
      stopOnFocus: true,
      style: {
        background: danger ? '#E5383B' : '#009ecc',
      },
    }).showToast();

    localStorage.removeItem('toast');
  }
};

toastIt();
