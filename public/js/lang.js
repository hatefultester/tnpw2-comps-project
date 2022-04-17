const switchLang = async() => {
    try {
        const response = fetch('/api/lang/change', {
            method: 'GET'
        });
        location.reload();

    } catch (err) {
        console.log(err);
    }
};