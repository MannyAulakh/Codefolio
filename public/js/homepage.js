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

// ------------ post function to create new comment------------
const newComment = async (button) => {
  event.preventDefault();

  const content = $(button).parent().parent().siblings().children(".form-control").val().trim();

  const ids = button.id;
  console.log(ids);
  const post_id = ids.split(" ")[1];
  console.log(post_id);

  console.log(JSON.stringify({ content, post_id }));

  if (content) {
    const response = await fetch("api/comments", {
      method: 'POST',
      body: JSON.stringify({ content, post_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload('/');
    } else {
      alert('Failed to create comment');
    }
  }
};

$("button[id^='comment_button']").on("click", function () {
  newComment(this);
});


// var commentButtons = document.getElementsByRegex('^comment_button.*');

// commentButtons.forEach(button => {
//   button.addEventListener('click', newComment);
// });

// document
//   .querySelectorAll('#comment_button')
//   .addEventListener('click', newComment);
