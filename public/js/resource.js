const uploadImage = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#image').name;
  const type = document.querySelector('#image').type;
  const content = document.querySelector('#image').files;
  // console.log showing properly
  console.log(name, type, content);

  if (name && type && content) {
    const response = await fetch(`api/space/:space_id/idea/:idea_id/resource`, {
      method: 'POST',
      body: JSON.stringify({ name, type, content }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(response);
    // Unsure if a code block is needed to append the item to our page.

    // if (response.ok) {
    //   const item = await response.json();
    //   console.log(item);
    //   if (content) {
    //     const data = new FormData();
    //     data.append('content', item.content);
    //     data.append('id', item.id);
    //     const upload = await fetch(
    //       `/space/:space_id/idea/:idea_id/resource/${item.id}`,
    //       {
    //         method: 'POST',
    //         body: data,
    //       }
    //     );
    //     if (upload.ok) {
    //       localStorage.setItem('toast', `Created new resource!`);
    //       // re-route back to create another resource
    //       document.location.href = `/space/${item.space_id}/idea/${item.id}/resource/create`;
    //     } else {
    //       const errorObj = await response.json();
    //       localStorage.setItem('toast', errorObj.message);
    //       toastIt(true);
    //     }
    if (response.ok) {
      localStorage.setItem('toast', `Created new resource!`);
      const item = await response.json();
      // re-route back to create another resource
      document.location.href = `/space/${item.space_id}/idea/${item.id}/resource/create`;
    } else {
      const errorObj = await response.json();
      localStorage.setItem('toast', errorObj.message);
      toastIt(true);
    }
  }
};

const uploadLink = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#link').name;
  const type = document.querySelector('#link').type;
  const content = document.querySelector('#link').value.trim();
  console.log(name, type, content);

  if (name && type && content) {
    const response = await fetch(`api/space/:space_id/idea/:idea_id/resource`, {
      method: 'POST',
      body: JSON.stringify({ name, type, content }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      const item = await response.json();
      console.log(item);
      if (content) {
        const data = new FormData();
        data.append('content', item.content);
        data.append('id', item.id);
        const upload = await fetch(
          `//space/:space_id/idea/:idea_id/resource/${item.id}`,
          {
            method: 'POST',
            body: data,
          }
        );
        if (upload.ok) {
          localStorage.setItem('toast', `Created new resource!`);
          // re-route back to create another resource
          document.location.href = `/space/${item.space_id}/idea/${item.id}/resource/create`;
        }
      } else {
        const errorObj = await response.json();
        localStorage.setItem('toast', errorObj.message);
        toastIt(true);
      }
    } else {
      const errorObj = await response.json();
      localStorage.setItem('toast', errorObj.message);
      toastIt(true);
    }
  }
};

document.querySelector('#upload-image').addEventListener('click', uploadImage);

document.querySelector('#upload-link').addEventListener('click', uploadLink);
