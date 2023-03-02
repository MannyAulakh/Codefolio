// ------------ post function ------------
const newPost = async (event) => {
    event.preventDefault();
  
    const title = await document.querySelector('#Post-name').value.trim();
    const content = await document.querySelector('#Post-desc').value.trim();
  
    console.log(JSON.stringify({ title, content }))
  
    if (title && content) {
      const response = await fetch("api/posts", {
        method: 'POST',
        body: JSON.stringify({ title, content }),
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