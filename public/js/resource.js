const uploadItem = async (event) => {
  event.preventDefault();
  const { space_id, idea_id } = getContext();
  console.log(body);
  // markdown or link data sent through.
  const response = await fetch(`/api/space/${space_id}/idea/${idea_id}/resource/file`, {
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

// markdown type and query selector different than link
const markdownUpload = () => {
  const body = {
    name: 'markdown' + '-' + Date.now(),
    type: 'markdown',
    content: $('#markdown-content').val(),
  };
  uploadItem(body);
};
//  link type and query selector different place than markdown
const linkUpload = () => {
  const body = {
    name: 'link' + '-' + Date.now(),
    type: 'link',
    content: $('#link-content').val(),
  };
  uploadItem(body);
};

// html tags for each form (add, update, or delete)
$('#markdown-upload').addEventListener('click', markdownUpload);
$('#link-upload').addEventListener('click', linkUpload);

// Separate issue - add edit/delete options to resource.handlebars
// $('#markdown-edit').addEventListener('click', updateItem);
// $('#link-edit').addEventListener('click', updateItem);

// $('#markdown-delete').addEventListener('click', deleteItem);
// $('#link-delete').addEventListener('click', deleteItem);
