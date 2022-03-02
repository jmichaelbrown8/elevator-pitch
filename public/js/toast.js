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
        background: danger ? '#F44336' : '#2196F3',
      },
    }).showToast();

    localStorage.removeItem('toast');
  }
};

toastIt();
