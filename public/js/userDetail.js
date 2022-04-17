const updateUserFormDOM = document.querySelector('.user-edit');
const usernameInput = document.querySelector('.username-input');


updateUserFormDOM.addEventListener('submit', async(e) => {
    e.preventDefault();
    if (!usernameInput.value) return;
    const username = usernameInput.value;

    try {
        const response = await fetch('api/user/update', {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ username })
        });

        if (response.status === 200) {
            location.reload();
        }
    } catch (err) {
        console.log(err);
    }
});

const updateUserPasswordFormDOM = document.querySelector('.user-edit-password');
const oldPasswordInput = document.querySelector('.old-password-input');
const newPasswordInput = document.querySelector('.new-password-input');
const repeatPasswordInput = document.querySelector('.repeat-password-input');

updateUserPasswordFormDOM.addEventListener('submit', async(e) => {
    e.preventDefault();
    const oldPassword = oldPasswordInput.value;
    const newPassword = newPasswordInput.value;
    const repeatNewPassword = repeatPasswordInput.value;

    const body = { oldPassword, newPassword, repeatNewPassword };

    console.log(body);
    try {
        const response = await fetch('api/user/updatePassword', {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (response.status === 200) {
            location.reload();
        }
    } catch (err) {
        console.log(err);
    }
});

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