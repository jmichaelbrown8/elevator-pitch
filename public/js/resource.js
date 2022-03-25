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

const editLink = async (event) => {
  event.preventDefault();
  const { space_id, idea_id } = getContext();
  const resource_id = $('.link-update').attr('data-id');
  const body = {
    id: resource_id,
    name: $('.link-name').val(),
    type: 'link',
    content: $('.link-content').val(),
  };
  // markdown, image, or link data sent through.
  const response = await fetch(
    `/api/space/${space_id}/idea/${idea_id}/resource/${resource_id}`,
    {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    }
  );

  if (response.ok) {
    localStorage.setItem('toast', `Resource updated`);
    document.location.href = `/space/${space_id}/idea/${idea_id}`;
  } else {
    localStorage.setItem('toast', `Unable to update this :().`);
    toastIt(true);
  }
};

const editMarkdown = async (event) => {
  event.preventDefault();
  const { space_id, idea_id } = getContext();
  const resource_id = $('.markdown-update').attr('data-id');

  const body = {
    id: resource_id,
    name: $('.markdown-name').val(),
    type: 'markdown',
    content: $('.markdown-content').val(),
  };
  // markdown, image, or link data sent through.
  const response = await fetch(
    `/api/space/${space_id}/idea/${idea_id}/resource/${resource_id}`,
    {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    }
  );

  if (response.ok) {
    localStorage.setItem('toast', `Resource updated`);
    document.location.href = `/space/${space_id}/idea/${idea_id}`;
  } else {
    localStorage.setItem('toast', `Unable to update this :().`);
    toastIt(true);
  }
};

const currentResource = async (event) => {
  event.preventDefault();
  event.currentTarget;

  const { space_id, idea_id } = getContext();
  const resource_id = $('.editing-buttons').attr('data-id');
  // having problems with this. Every resource_id is coming back with the first, no matter what happens with the click event. How do I target just the one I want here.

  console.log(space_id, idea_id, resource_id);
  const response = await fetch(
    `/api/space/${space_id}/idea/${idea_id}/resource/${resource_id}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
  );
  if (response.ok) {
    const resourceRes = await response.json();
    console.log(resourceRes);
    // link name and content is coming through fine.
    $('.markdown-name').val(resourceRes.name);
    $('.markdown-content').val(resourceRes.content);
    $('.link-name').val(resourceRes.name);
    $('.link-content').val(resourceRes.content);
    $('.link-update').attr('data-id', resourceRes.id);
  } else {
    localStorage.setItem('toast', `Unable to update this :().`);
    toastIt(true);
  }
};

// html click events for each form (add, update, or delete)
$('#markdown-upload').on('click', markdownUpload);
$('#link-upload').on('click', linkUpload);
$('.delete-resource').on('click', deleteResource);
$('.current-resource').on('click', currentResource);
$('.link-update').on('click', editLink);
$('.markdown-update').on('click', editMarkdown);
