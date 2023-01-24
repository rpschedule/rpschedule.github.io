/**
 * Toggles the class 'hidden' for the element id 'menu'
 */
function toggleMenu () {
    const menu = document.getElementById('menu');
    if ( menu.style.width == "0" ) return menu.style.width = "250px";
    menu.style.width = "0";
}