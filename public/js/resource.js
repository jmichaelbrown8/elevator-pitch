const uploadItem = async (body) => {
  const { space_id, idea_id } = getContext();

  // markdown or link data sent through.
  const response = await fetch(
    `/api/space/${space_id}/idea/${idea_id}/resource/file`,
    {
      method: 'POST',
      body: JSON.stringify({ body }),
      headers: { 'Content-Type': 'application/json' },
    }
  );
  console.log(body);
  if (response.ok) {
    localStorage.setItem('toast', `Created new resource!`);

    const item = await response.json();
    console.log(item);
    // re-route back to create another resource
    document.location.href = `/space/${item.space_id}/idea/${item.id}`;
  } else {
    const errorObj = await response.json();
    console.log(errorObj, 'This is the error obj in client side js');
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
    name: 'link' + '-' + Date.now(),
    type: 'link',
    content: $('#link-content').val(),
  };
  uploadItem(body);
};

// html tags for each form (add, update, or delete)
$('#markdown-upload').on('click', markdownUpload);
$('#link-upload').on('click', linkUpload);
