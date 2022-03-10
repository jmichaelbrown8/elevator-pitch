

const updateStatus = async (event) => {
  event.preventDefault();

  console.log(event.target);

  if (event.target.type === 'button') {
    const status = event.target.dataset.status;
    const user_id = event.target.dataset.id;

    console.log(`${status}    ${user_id}`);
    // need to add in space_id into url
    // const response = await fetch(`/api/space/:space_id/update`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     user_id,
    //     status,
    //   }),
    // });

    // if (response.ok) {
    //   const Spaceman = await response.json();

    //   localStorage.setItem('toast', `Updated user - ${Spaceman.name}`);
    //   //    place to re-route after idea creation
    //   document.location.href = `/space/${Spaceman.space_id}`;
    // } else {
    //   const errorObj = await response.json();
    //   localStorage.setItem('toast', errorObj.message);
    //   toastIt(true);
    // }
  }
};

document.querySelector('#memberList').addEventListener('click', updateStatus);
