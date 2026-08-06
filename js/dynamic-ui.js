document.addEventListener('DOMContentLoaded', () => {
    populateBirthForm();
    initCustomSelects(); // Convert all native selects to custom animated UI
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

// Custom Animated Selects Implementation
function initCustomSelects() {
    const nativeSelects = document.querySelectorAll('.luxury-input select, .dock-select');
    
    // Close all open dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.custom-select-wrapper')) {
            document.querySelectorAll('.custom-options-container').forEach(container => {
                container.classList.remove('active');
            });
            document.querySelectorAll('.custom-select-trigger').forEach(trigger => {
                trigger.classList.remove('active');
            });
            
            // Reset z-index for all field boxes
            document.querySelectorAll('.field-box, .action-group, .form-group').forEach(box => {
                box.style.zIndex = '';
            });
        }
    });

    nativeSelects.forEach(select => {
        // Skip if already initialized
        if (select.closest('.custom-select-wrapper')) return;

        // 1. Create wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'custom-select-wrapper';

        // 2. Hide native select but keep it functioning for forms
        select.style.display = 'none';
        
        // 3. Create trigger element
        const trigger = document.createElement('div');
        trigger.className = 'custom-select-trigger';
        // Use the selected option's text or placeholder
        const selectedOption = select.options[select.selectedIndex];
        trigger.innerHTML = `<span>${selectedOption ? selectedOption.text : ''}</span>`;
        
        // 4. Create options container
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'custom-options-container';
        
        // 5. Populate options
        Array.from(select.options).forEach((option, index) => {
            if (option.disabled && option.hidden) return; // Skip placeholder

            const customOption = document.createElement('div');
            customOption.className = 'custom-option';
            if (option.selected) customOption.classList.add('selected');
            customOption.textContent = option.text;
            customOption.dataset.value = option.value;
            customOption.dataset.index = index;

            customOption.addEventListener('click', function(e) {
                // Update native select
                select.selectedIndex = this.dataset.index;
                select.dispatchEvent(new Event('change'));

                // Update trigger text
                trigger.querySelector('span').textContent = this.textContent;

                // Update selected state
                optionsContainer.querySelectorAll('.custom-option').forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');

                // Close dropdown
                optionsContainer.classList.remove('active');
                trigger.classList.remove('active');
                
                // Reset z-index
                const parentBox = this.closest('.field-box, .action-group, .form-group');
                if (parentBox) {
                    parentBox.style.zIndex = '';
                }

                e.stopPropagation();
            });

            optionsContainer.appendChild(customOption);
        });

        // Toggle dropdown on click
        trigger.addEventListener('click', function(e) {
            e.stopPropagation();
            const isActive = this.classList.contains('active');
            
            // Close all other dropdowns
            document.querySelectorAll('.custom-options-container').forEach(c => c.classList.remove('active'));
            document.querySelectorAll('.custom-select-trigger').forEach(t => t.classList.remove('active'));
            
            // Reset z-index for all field boxes
            document.querySelectorAll('.field-box, .action-group, .form-group').forEach(box => {
                box.style.zIndex = '';
            });
            
            if (!isActive) {
                this.classList.add('active');
                optionsContainer.classList.add('active');
                
                // Elevate z-index of parent field-box so dropdown overlaps siblings
                const parentBox = this.closest('.field-box, .action-group, .form-group');
                if (parentBox) {
                    parentBox.style.zIndex = '50';
                }
            }
        });

        // Assemble DOM
        select.parentNode.insertBefore(wrapper, select);
        wrapper.appendChild(select);
        wrapper.appendChild(trigger);
        wrapper.appendChild(optionsContainer);
    });
}
