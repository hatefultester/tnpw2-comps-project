const createFormDOM = document.querySelector('.create-competition');
const nameInput = document.querySelector('.name-input');
const dateInput = document.querySelector('.date-input');
const shortDescriptionInput = document.querySelector('.short-description-input');
const descriptionInput = document.querySelector('.description-input');

createFormDOM.addEventListener('submit', async(e) => {
    e.preventDefault();
    if (!(nameInput && dateInput && shortDescriptionInput)) return;

    const name = nameInput.value;
    const date = dateInput.value;
    const shortDescription = shortDescriptionInput.value;
    const description = descriptionInput.value;
    const body = { name, date, shortDescription, description };


    console.log(JSON.stringify(body));

    try {
        const response = await fetch('/api/comp/create', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (response.status === 200) {
            location.replace('/register');
        }
    } catch (error) {
        console.log(error);
    }
});