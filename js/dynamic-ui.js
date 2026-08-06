document.addEventListener('DOMContentLoaded', () => {
    populateBirthForm();
    initMiniCalendar();
});

function populateBirthForm() {
    // 1. Days
    const daySelect = document.getElementById('birthDay');
    if (daySelect) {
        for (let i = 1; i <= 31; i++) {
            const val = i.toString().padStart(2, '0');
            daySelect.add(new Option(val, val));
        }
    }

    // 2. Months
    const monthSelect = document.getElementById('birthMonth');
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    if (monthSelect) {
        months.forEach((m, idx) => {
            const val = (idx + 1).toString().padStart(2, '0');
            monthSelect.add(new Option(m, val));
        });
    }

    // 3. Years
    const yearSelect = document.getElementById('birthYear');
    const currentYear = new Date().getFullYear();
    if (yearSelect) {
        for (let i = currentYear; i >= 1950; i--) {
            yearSelect.add(new Option(i, i));
        }
    }

    // 4. Hours
    const hourSelect = document.getElementById('birthHour');
    if (hourSelect) {
        for (let i = 1; i <= 12; i++) {
            const val = i.toString().padStart(2, '0');
            hourSelect.add(new Option(val, val));
        }
    }

    // 5. Minutes & Seconds
    const minSelect = document.getElementById('birthMinute');
    const secSelect = document.getElementById('birthSecond');
    if (minSelect && secSelect) {
        for (let i = 0; i < 60; i++) {
            const val = i.toString().padStart(2, '0');
            minSelect.add(new Option(val, val));
            secSelect.add(new Option(val, val));
        }
    }

    // 6. Countries
    const countries = [
        "India", "USA", "UK", "Canada", "Australia", "UAE", "Singapore", "Malaysia", 
        "New Zealand", "South Africa", "Germany", "France", "Japan"
    ];
    
    const countrySelect = document.getElementById('birthCountry');
    if (countrySelect) {
        countries.forEach(c => countrySelect.add(new Option(c, c)));
    }
    
    const dockCountrySelect = document.getElementById('dockCountry');
    if (dockCountrySelect) {
        countries.forEach(c => dockCountrySelect.add(new Option(c, c)));
        dockCountrySelect.value = "India"; 
    }
}

function initMiniCalendar() {
    const calendarEl = document.getElementById('miniCalendar');
    const titleContainer = document.getElementById('calendarMonthYear');
    
    if (!calendarEl || !titleContainer) return;

    let currentDate = new Date(); 
    const today = new Date(); 

    function renderCalendar() {
        calendarEl.innerHTML = '';
        
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        
        // Render Title as Dropdowns
        titleContainer.innerHTML = '';
        titleContainer.style.display = 'flex';
        titleContainer.style.gap = '4px';

        const mSelect = document.createElement('select');
        mSelect.style.cssText = "padding:2px; font-size:12px; border:1px solid #cbd5e1; border-radius:4px; outline:none;";
        monthNames.forEach((m, i) => {
            const opt = new Option(m, i);
            if(i === month) opt.selected = true;
            mSelect.add(opt);
        });
        mSelect.addEventListener('change', (e) => {
            currentDate.setMonth(parseInt(e.target.value));
            renderCalendar();
        });

        const ySelect = document.createElement('select');
        ySelect.style.cssText = "padding:2px; font-size:12px; border:1px solid #cbd5e1; border-radius:4px; outline:none;";
        for(let i = today.getFullYear() + 5; i >= 1950; i--) {
            const opt = new Option(i, i);
            if(i === year) opt.selected = true;
            ySelect.add(opt);
        }
        ySelect.addEventListener('change', (e) => {
            currentDate.setFullYear(parseInt(e.target.value));
            renderCalendar();
        });

        titleContainer.appendChild(mSelect);
        titleContainer.appendChild(ySelect);

        const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        dayNames.forEach(d => {
            const el = document.createElement('div');
            el.className = 'day-name';
            el.textContent = d;
            calendarEl.appendChild(el);
        });

        const firstDayIndex = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDayIndex; i++) {
            const empty = document.createElement('div');
            empty.className = 'day empty';
            calendarEl.appendChild(empty);
        }

        for (let i = 1; i <= lastDate; i++) {
            const dayEl = document.createElement('div');
            dayEl.className = 'day';
            dayEl.textContent = i;

            if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayEl.classList.add('today');
            }

            calendarEl.appendChild(dayEl);
        }
    }

    // Hide old nav buttons if they exist
    const prevBtn = document.getElementById('prevMonth');
    const nextBtn = document.getElementById('nextMonth');
    if(prevBtn) prevBtn.style.display = 'none';
    if(nextBtn) nextBtn.style.display = 'none';
    
    // Prevent clicking inside calendar from closing the popup
    const dateDrop = document.getElementById('dateDropdown');
    const locDrop = document.getElementById('locationDropdown');
    if(dateDrop) dateDrop.addEventListener('click', e => e.stopPropagation());
    if(locDrop) locDrop.addEventListener('click', e => e.stopPropagation());

    renderCalendar();
}

// Prevent empty links in footer from scrolling to top
document.querySelectorAll('footer a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => e.preventDefault());
});
