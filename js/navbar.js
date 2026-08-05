// Drawer Logic
const menuToggle = document.getElementById('menuToggle');
const closeDrawer = document.getElementById('closeDrawer');
const mobileDrawer = document.getElementById('mobileDrawer');
const drawerOverlay = document.getElementById('drawerOverlay');

function openMenu() {
    mobileDrawer.classList.add('open');
    drawerOverlay.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeMenuFunc() {
    mobileDrawer.classList.remove('open');
    drawerOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

if (menuToggle) {
    menuToggle.addEventListener('click', openMenu);
}
if (closeDrawer) {
    closeDrawer.addEventListener('click', closeMenuFunc);
}
if (drawerOverlay) {
    drawerOverlay.addEventListener('click', closeMenuFunc);
}

// Mobile Drawer Accordion Logic
const drawerDropdowns = document.querySelectorAll('.has-drawer-dropdown > .drawer-link');
drawerDropdowns.forEach(link => {
    link.addEventListener('click', function(e) {
        // If the link is just for toggling the submenu
        if (this.nextElementSibling && this.nextElementSibling.classList.contains('drawer-submenu')) {
            e.preventDefault();
            const parentLi = this.parentElement;
            parentLi.classList.toggle('active');
        }
    });
});
// Dropdown Search Bar Logic
const desktopSearchBtn = document.getElementById('desktopSearchBtn');
const mobileSearchBtn = document.getElementById('mobileSearchBtn');
const dropdownSearchBar = document.getElementById('dropdownSearchBar');
const closeDropdownSearchBtn = document.getElementById('closeDropdownSearchBtn');
const dropdownSearchInput = document.getElementById('dropdownSearchInput');

function openSearch(e) {
    e.preventDefault();
    dropdownSearchBar.classList.add('active');
    setTimeout(() => dropdownSearchInput.focus(), 100);
}

function closeSearch() {
    dropdownSearchBar.classList.remove('active');
    dropdownSearchInput.value = '';
}

if (desktopSearchBtn) desktopSearchBtn.addEventListener('click', openSearch);
if (mobileSearchBtn) mobileSearchBtn.addEventListener('click', openSearch);
if (closeDropdownSearchBtn) closeDropdownSearchBtn.addEventListener('click', closeSearch);

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && dropdownSearchBar && dropdownSearchBar.classList.contains('active')) {
        closeSearch();
    }
});
