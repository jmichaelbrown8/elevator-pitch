const updateStatus = async (event) => {
  event.preventDefault();

  if (event.target.type === 'button') {
    const status = event.target.dataset.status;
    const user_id = event.target.dataset.id;
    const { space_id } = getContext();

    const response = await fetch(`/api/space/${space_id}/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id,
        status,
      }),
    });

    if (response.ok) {
      const Spaceman = await response.json();
      localStorage.setItem('toast', `Updated user status to ${Spaceman.member.status}`);
      document.location.href = `/space/${Spaceman.member.space_id}`;
    } else {
      const errorObj = await response.json();
      localStorage.setItem('toast', errorObj.message);
      toastIt(true);
    }
  }
};

document.querySelector('#memberList').addEventListener('click', updateStatus);
