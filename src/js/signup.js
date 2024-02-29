async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('.username-signup').value.trim();
    const email = document.querySelector('.email-signup').value.trim();
    const password = document.querySelector('.password-signup').value.trim();
    const passwordConfirm = document.querySelector('.password-confirm-signup').value.trim();

    if (password != passwordConfirm){
        alert("Passwords do not match")
        return
    }else{
        if (username && email && password && passwordConfirm) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
            username,
            email,
            password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
        }
    }
}

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);