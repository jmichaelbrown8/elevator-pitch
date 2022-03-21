const uploadItem = async (body) => {
  const { space_id, idea_id } = getContext();

  // markdown or link data sent through.
  const response = await fetch(
    `/api/space/${space_id}/idea/${idea_id}/resource/file`,
    {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    }
  );

  if (response.ok) {
    localStorage.setItem('toast', `Created new resource!`);
    // re-route back to create another resource
    document.location.href = `/space/${space_id}/idea/${idea_id}`;
  } else {
    const errorObj = await response.json();
    localStorage.setItem('toast', errorObj.message);
    toastIt(true);
  }
};

const markdownUpload = () => {
  const body = {
    name: 'markdown' + '-' + Date.now(),
    type: 'markdown',
    content: $('#markdown-content').val(),
  };
  uploadItem(body);
};

const linkUpload = () => {
  const body = {
    name: $('#link-name').val(),
    type: 'link',
    content: $('#link-content').val(),
  };
  uploadItem(body);
};

const deleteResource = async (event) => {
  event.preventDefault();
  const { space_id, idea_id } = getContext();
  const resource_id = $('.delete-resource').attr('data-id');

  // markdown, image, or link data sent through.
  const response = await fetch(
    `/api/space/${space_id}/idea/${idea_id}/resource/${resource_id}`,
    {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }
  );

  if (response.ok) {
    localStorage.setItem('toast', `Resource removed`);
    document.location.href = `/space/${space_id}/idea/${idea_id}`;
  } else {
    localStorage.setItem('toast', `Unable to delete this :().`);
    toastIt(true);
  }
};

// html tags for each form (add, update, or delete)
$('#markdown-upload').on('click', markdownUpload);
$('#link-upload').on('click', linkUpload);
$('.delete-resource').on('click', deleteResource);
