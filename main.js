/**
 * Toggles the class 'hidden' for the element id 'menu'
 */
function toggleMenu () {
    const menu = document.getElementById('menu');
    if ( menu.classList.contains('hidden') ) return menu.classList.remove('hidden');
    menu.classList.add('hidden')
}