document.addEventListener(
    'DOMContentLoaded',
    () => {
        console.log('rankor JS imported successfully!')
    },
    false
)

const btn = document.querySelectorAll('.ranking-btn')
btn.forEach(elm => elm.onclick = () => document.querySelector('.ranking').classList.toggle('open'))

let pics = document.querySelectorAll('.category-card')
let picsSrc = [
    '/images/pic1.jpg',
    '/images/pic2.jpg',
    '/images/pic3.jpg',
    '/images/pic4.jpg',
    '/images/pic5.jpg',
    '/images/pic6.jpg',
    '/images/pic7.jpg',
    '/images/pic8.jpg',
    '/images/pic9.jpg',
    '/images/pic10.jpg',
    '/images/pic11.jpg',
    '/images/pic12.jpg',
]
pics.forEach((elm, i) => elm.style.backgroundImage = `url(${picsSrc[i]})`)