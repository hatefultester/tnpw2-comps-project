const changeLanguageDOM = document.querySelector('.change-language');

changeLanguageDOM.addEventListener('click', async(e) => {
    e.preventDefault();

    try {
        const response = fetch('/api/lang/change', {
            method: 'GET'
        });
        location.reload();
    } catch (err) {
        console.log(err);
    }
});