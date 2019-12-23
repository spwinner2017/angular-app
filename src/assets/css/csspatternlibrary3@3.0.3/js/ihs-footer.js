function changeClass() {
    $('.footer').toggleClass('footer-expanded');
    $(this).toggleClass('rotate-270');
}

$('#footer-toggle').on('click', changeClass);