const loginFormDOM = document.querySelector('.create-competition');
const usernameInput = document.querySelector('.name-input');
const passwordInput = document.querySelector('.date-input');
/*
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
*/