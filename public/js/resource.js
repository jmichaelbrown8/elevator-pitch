const uploadImage = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#image').name;
  const type = document.querySelector('#image').type;
  const content = document.querySelector('#image').files;

  const { space_id, idea_id } = getContext();
  // console.log showing properly
  // image data sent in something different than our body. Form-body element.

  const data = new FormData();
  data.append('name', name);
  data.append('type', type);
  data.append('image', content);
  console.log(data, name);

  const response = await fetch(
    `/api/space/${space_id}/idea/${idea_id}/resource`,
    {
      method: 'POST',
      body: data,
    }
  );

  console.log(response);
  if (response.ok) {
    localStorage.setItem('toast', `Created new resource!`);
    const item = await response.json();
    // re-route back to create another resource
    document.location.href = `/space/${item.space_id}/idea/${item.id}`;
  } else {
    const errorObj = await response.json();
    localStorage.setItem('toast', errorObj.message);
    toastIt(true);
  }
};

const uploadLink = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#link').name;
  const type = document.querySelector('#link').type;
  const content = document.querySelector('#link').value.trim();
  console.log(name, type, content);

  if (name && type && content) {
    const response = await fetch(
      `/api/space/${space_id}/idea/${idea_id}/resource`,
      {
        method: 'POST',
        body: JSON.stringify({ name, type, content }),
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (response.ok) {
      localStorage.setItem('toast', `Created new resource!`);
      // re-route back to create another resource
      document.location.href = `api/space/${item.space_id}/idea/${item.id}/resource/create`;
    } else {
      const errorObj = await response.json();
      localStorage.setItem('toast', errorObj.message);
      toastIt(true);
    }
  }
};

document.querySelector('#upload-image').addEventListener('click', uploadImage);

document.querySelector('#upload-link').addEventListener('click', uploadLink);
