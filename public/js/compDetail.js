const editFormDOM = document.querySelector('.edit-results');
const idInput = document.querySelector('.id-input');
const firstInput = document.querySelector('.first-input');
const secondInput = document.querySelector('.second-input');
const thirdInput = document.querySelector('.third-input');
const fourthInput = document.querySelector('.fourth-input');
const fifthInput = document.querySelector('.fifth-input');
const addFormDOM = document.querySelector('.add-competitor');
const newCompetitor = document.querySelector('.name-input');
const compIdInput = document.querySelector('.comp-id');


addFormDOM.addEventListener('submit', async(e) => {
    e.preventDefault();
    const name = newCompetitor.value;
    const compId = compIdInput.innerText;
    if (!name) return;
    const res = await fetch(`/api/competitor/add?id=${compId}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({ name })
    });
    if (res.status === 200) {
        location.reload();
    }
});

editFormDOM.addEventListener('submit', async(e) => {
    e.preventDefault();

    const id = idInput.value;
    const first = firstInput.value;
    const second = secondInput.value;
    const third = thirdInput.value;
    const fourth = fourthInput.value;
    const fifth = fifthInput.value;

    if (!id) return

    const body = {
        id,
        first,
        second,
        third,
        fourth,
        fifth
    };

    try {

    } catch (err) {
        console.log(err);
    }

    const res = await fetch(`/api/competitor/update`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(body)
    });
    if (res.status === 200) {
        location.reload();
    }
});

async function fill(id) {
    if (!id) return;
    try {
        const res = await fetch(`/api/competitor/get?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            }
        }).then(response => response.json()).then(data => {
            idInput.value = id;
            if (data.first != undefined) firstInput.value = data.first;
            else firstInput.value = '';
            if (data.second != undefined) secondInput.value = data.second;
            else secondInput.value = '';
            if (data.third != undefined) thirdInput.value = data.third;
            else thirdInput.value = '';
            if (data.fourth != undefined) fourthInput.value = data.fourth;
            else fourthInput.value = '';
            if (data.fifth != undefined) fifthInput.value = data.fifth;
            else fifthInput.value = '';

        });
    } catch (error) {
        console.log(error);
    }
}

async function del(id) {
    if (!id) return;
    try {
        const res = await fetch(`/api/competitor/delete?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            }
        });

        if (res.status === 200) location.reload();
    } catch (error) {
        console.log(error);
    }
}