// ------------ post function ------------
const newPost = async (event) => {
    event.preventDefault();
  
    const title = await document.querySelector('#Post-name').value.trim();
    const content = await document.querySelector('#Post-desc').value.trim();
    const image_link = await document.querySelector('#Post-image').value.trim();
  
    if (title && content) {
      const response = await fetch("api/posts", {
        method: 'POST',
        body: JSON.stringify({ title, content, image_link }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to create post');
      }
    }
  };

  document
  .querySelector('#Post')
  .addEventListener('click', newPost);