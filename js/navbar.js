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

// Dock Popups Logic
const locationBtn = document.getElementById('locationBtn');
const locationDropdown = document.getElementById('locationDropdown');
const dateBtn = document.getElementById('dateBtn');
const dateDropdown = document.getElementById('dateDropdown');

function closeAllDockPopups() {
    if (locationDropdown) locationDropdown.classList.remove('active');
    if (dateDropdown) dateDropdown.classList.remove('active');
}

if (locationBtn && locationDropdown) {
    locationBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isActive = locationDropdown.classList.contains('active');
        closeAllDockPopups();
        if (!isActive) locationDropdown.classList.add('active');
    });
}

if (dateBtn && dateDropdown) {
    dateBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isActive = dateDropdown.classList.contains('active');
        closeAllDockPopups();
        if (!isActive) dateDropdown.classList.add('active');
    });
}

// Close popups when clicking anywhere outside
document.addEventListener('click', (e) => {
    if (locationDropdown && locationDropdown.classList.contains('active') && !locationBtn.contains(e.target) && !locationDropdown.contains(e.target)) {
        locationDropdown.classList.remove('active');
    }
    if (dateDropdown && dateDropdown.classList.contains('active') && !dateBtn.contains(e.target) && !dateDropdown.contains(e.target)) {
        dateDropdown.classList.remove('active');
    }
});
