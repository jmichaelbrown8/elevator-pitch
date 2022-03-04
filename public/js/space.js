// Display toggle functions

// eslint-disable-next-line no-unused-vars
const showIdea = () => {
  const ideaCard = document.querySelector('.show-idea');
  ideaCard.style.display = 'block';
  const hideButton = document.querySelector('.hide-button');
  hideButton.style.display = 'block';
  const addButton = document.querySelector('.add-button');
  addButton.style.display = 'none';
};
// eslint-disable-next-line no-unused-vars
const hideIdea = () => {
  const ideaCard = document.querySelector('.show-idea');
  ideaCard.style.display = 'none';
  const hideButton = document.querySelector('.hide-button');
  hideButton.style.display = 'none';
  const addButton = document.querySelector('.add-button');
  addButton.style.display = 'block';
};

// eslint-disable-next-line no-unused-vars
const showNumber = () => {
  const checkbox = document.querySelector('#member-validate');
  const question = document.querySelector('.member-number');

  if (checkbox.checked === true) {
    question.style.display = 'block';
  } else {
    question.style.display = 'none';
  }
};

// eslint-disable-next-line no-unused-vars
const showHelp = () => {
  const checkbox = document.querySelector('#skill-validate');
  const question = document.querySelector('.skills');

  if (checkbox.checked === true) {
    question.style.display = 'block';
  } else {
    question.style.display = 'none';
  }
};

const createIdea = async (event) => {
  alert('Hello Line 47');
  event.preventDefault();
  alert('Hello line 4');

  const name = document.querySelector('#idea-name').value;
  const pitch = document.querySelector('#idea-content').value.trim();
  const members = parseInt(document.querySelector('#member-number').value);
  const skills = document.querySelector('#skills').value.trim();
  //   alert(name, pitch, members, skills)
  // console.log(name, pitch, members, skills)
  //   alert('Hello');
  if (name && pitch) {
    const response = await fetch('api/idea', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        pitch,
        members,
        skills
      })
    });

    console.log(response);
    if (response.ok) {
      const myIdea = await response.json();
      localStorage.setItem('toast', `Created new idea - ${myIdea.name}`);
      document.location.href = `/idea/${myIdea.id}`;
    } else {
      const errorObj = await response.json();
      localStorage.setItem('toast', errorObj.message);
      toastIt(true);
    }
  }
};

document
  .querySelector('#form-create-idea')
  .addEventListener('submit', createIdea);
