window.addEventListener('load', (e) => {

    const form = document.querySelector('.stars')
    const radios = document.querySelectorAll('input[type=radio]')
    const ratee = document.querySelector('#hiddenStar').value

    radios.forEach(el => el.addEventListener('click', (e) => {
        axios.post('/user/add-rating', { ratee, rating: el.value })
            .then(response => console.log(response.data))
            .catch(err => form.reset())
    }))
})