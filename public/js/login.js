const loginFormDOM = document.querySelector('.login');
const usernameInput = document.querySelector('.username-input');
const passwordInput = document.querySelector('.password-input');

loginFormDOM.addEventListener('submit', async(e) => {
    e.preventDefault();
    if (!usernameInput.value || !passwordInput.value) return;
    const username = usernameInput.value;
    const password = passwordInput.value;
    const user = { username, password };
    try {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (response.status === 200) {
            usernameInput.value = '';
            passwordInput.value = '';
        }
    } catch (error) {
        console.log(error);
    }
});