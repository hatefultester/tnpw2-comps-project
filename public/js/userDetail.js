/*const editUserDOM = document.querySelector('.registration');
const usernameInput = document.querySelector('.username-input');

editUserDOM.addEventListener('submit', async(e) => {
    e.preventDefault();
    if (!usernameInput.value || !passwordInput.value) return;
    const username = usernameInput.value;
    const user = { username };
    /*
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
        }
    } catch (error) {
        console.log(error);
    }
});*/
const logoutButton = document.querySelector('.logout-user');

const logout = async(e) => {
    try {
        const response = await fetch('api/user/logout', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        });

        if (response.status === 200) {
            location.reload();
        }
    } catch (err) {
        console.log(err);
    }
};