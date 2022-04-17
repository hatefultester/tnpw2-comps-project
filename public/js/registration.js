const registrationFormDOM = document.querySelector('.registration');
const usernameInput = document.querySelector('.username-input');
const passwordInput = document.querySelector('.password-input');
const repeatPasswordInput = document.querySelector('.repeat-password-input');

registrationFormDOM.addEventListener('submit', async(e) => {
    e.preventDefault();
    if (!usernameInput.value || !passwordInput.value) return;
    const username = usernameInput.value;
    const password = passwordInput.value;
    const repeatPassword = repeatPasswordInput.value;
    const user = { username, password, repeatPassword };
    try {
        const response = await fetch('/api/user/create', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (response.status === 201) {
            usernameInput.value = '';
            passwordInput.value = '';
            repeatPasswordInput.value = '';
            resMessage.textContent = 'Succesful';
            location.replace('/');
        }
    } catch (error) {
        console.log(error);
    }
});