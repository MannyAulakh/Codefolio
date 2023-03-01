const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#name-signup').value.trim();
    const lastname = document.querySelector('#lname-signup').value.trim();
    const firstname = document.querySelector('#fname-signup').value.trim();
    const occupation = document.querySelector('#occupation-signup').value.trim();
    const education = document.querySelector('#education-signup').value.trim();
    const experience = document.querySelector('#experience-signup').value.trim();
    const portfolio_website = document.querySelector('#portfolio_website-signup').value.trim();
    const project1 = document.querySelector('#project1-signup').value.trim();
    const project2 = document.querySelector('#project2-signup').value.trim();
    const project3 = document.querySelector('#project3-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && lastname && firstname && occupation && education && experience && portfolio_website && project1 && project2 && project3 && email && password) {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ email, firstname, lastname, username, password, occupation, education, experience, portfolio_website, project1, project2, project3}),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
