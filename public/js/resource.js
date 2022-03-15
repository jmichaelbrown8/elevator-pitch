const uploadItem = async (event) => {
  event.preventDefault();

  const body = {
    name: document.querySelector('#markdown-name').name,
    type: document.querySelector('#markdown-type').type,
    content: document.querySelector('#markdown').value,
  };
  const { space_id, idea_id } = getContext();

  // markdown or link data sent through.

  const response = await fetch(`/api/space/${space_id}/idea/${idea_id}/files`, {
    method: 'POST',
    body: JSON.stringify({ body }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    localStorage.setItem('toast', `Created new resource!`);
    const item = await response.json();
    // re-route back idea to view or create another resource.
    document.location.href = `/space/${item.space_id}/idea/${item.id}`;
  } else {
    const errorObj = await response.json();
    localStorage.setItem('toast', errorObj.message);
    toastIt(true);
  }
};

// add in html tag for each form.
$('#markdown-upload').addEventListener('click', uploadItem);
$('#link-upload').addEventListener('click', uploadItem);
