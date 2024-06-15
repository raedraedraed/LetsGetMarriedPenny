document.addEventListener('DOMContentLoaded', function() {
    const contents = document.querySelectorAll('.content');
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;

    function checkScroll() {
        contents.forEach(content => {
            const rect = content.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                content.classList.add('show');
            } else if (rect.bottom < 0 || rect.top > window.innerHeight) {
                content.classList.remove('show');
            }
        });

        if (window.scrollY > lastScrollY) {
            header.style.top = '-100px'; 
        } else {
            header.style.top = '0'; 
        }
        lastScrollY = window.scrollY;
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll(); 
});
