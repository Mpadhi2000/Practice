function scrollIntoView(id) {
    var element = document.getElementById(id);
    var bodyRect = document.body.getBoundingClientRect();
    var elementRect = element.getBoundingClientRect();
    var offset   = elementRect.top - bodyRect.top;
    window.scrollTo({ top: offset, behavior: 'smooth' });
}
