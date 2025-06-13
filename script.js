     const monthNames = [
            'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
            'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
        ];
        const weekdays = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];
        // holiday ห้าม key ซ้ำ
        const holidays = {
            '2025': {
                '1-1': { type: 'holiday', name: 'ปีใหม่' },
                '2-12': { type: 'holiday', name: 'มาฆบูชา' },
                '4-7': { type: 'special', name: 'วันหยุดชุดเฉย' },
                '4-13': { type: 'holiday', name: 'สงกรานต์' },
                '4-14': { type: 'holiday', name: 'สงกรานต์' },
                '4-15': { type: 'holiday', name: 'สงกรานต์' },
                '5-1': { type: 'holiday', name: 'แรงงาน' },
                '5-12': { type: 'holiday', name: 'วิสาขบูชา' },
                '6-3': { type: 'holiday', name: 'วันเฉลิมพระชนมพรรษาสมเด็จพระนางเจ้าฯ พระบรมราชินี' },
                '7-10': { type: 'holiday', name: 'วันอาสาฬหบูชา' },
                '7-28': { type: 'holiday', name: 'วันเฉลิมพระชนมพรรษาพระบาทสมเด็จพระเจ้าอยู่หัว' },
                '8-12': { type: 'holiday', name: 'วันแม่แห่งชาติ' },
                '9-6': { type: 'work', name: 'วันสารทจีน' },
                '9-22': { type: 'work', name: 'วันสารทไทย' },
                '10-6': { type: 'work', name: 'วันไหว้พระจันทร์' },
                '10-7': { type: 'work', name: 'วันออกพรรษา' },
                '10-13': { type: 'holiday', name: 'วันนวมินทรมหาราช' },
                '10-21': { type: 'work', name: 'วันเริ่มเทศกาลกินเจ 🥢' },
                '10-23': { type: 'holiday', name: 'วันปิยมหาราช' },
                '12-5': { type: 'holiday', name: 'วันพ่อแห่งชาติ' },
                '12-10': { type: 'holiday', name: 'รัฐธรรมนูญ' },
                '12-31': { type: 'holiday', name: 'ส่งท้ายปี' }
            }
        };

        // วันพระ ใช้ array ของวัน key เป็น 'month-day'
const monkDays = {
  '2025': [
    // มกราคม
    '1-6',  '1-13', '1-21', '1-28',
    // กุมภาพันธ์
    '2-5',  '2-12', '2-20', '2-26',
    // มีนาคม
    '3-6',  '3-13', '3-21', '3-28',
    // เมษายน
    '4-5',  '4-12', '4-20', '4-26',
    // พฤษภาคม
    '5-4',  '5-11', '5-19', '5-26',
    // มิถุนายน
    '6-3',  '6-10', '6-18', '6-25',
    // กรกฎาคม
    '7-3',  '7-10', '7-18', '7-25',
    // สิงหาคม
    '8-2',  '8-9',  '8-17', '8-23', '8-31',
    // กันยายน
    '9-7',  '9-15', '9-22', '9-30',
    // ตุลาคม
    '10-7', '10-15', '10-21', '10-29',
    // พฤศจิกายน
    '11-5', '11-13', '11-20', '11-28',
    // ธันวาคม
    '12-5', '12-13', '12-19', '12-27'
  ]
};


        let currentMonth = new Date().getMonth();
        let currentYear = new Date().getFullYear();

        function initializeCalendar() {
            document.getElementById('monthSelect').value = currentMonth;
            document.getElementById('yearSelect').value = currentYear;
            const weekdaysHeader = document.getElementById('weekdaysHeader');
            weekdaysHeader.innerHTML = '';
            weekdays.forEach((day, idx) => {
                const weekdayEl = document.createElement('div');
                weekdayEl.className = 'weekday';
                if (idx === 0) weekdayEl.classList.add('sunday');
                if (idx === 6) weekdayEl.classList.add('saturday');
                weekdayEl.textContent = day;
                weekdaysHeader.appendChild(weekdayEl);
            });
            generateCalendar(currentMonth, currentYear);
        }

        function generateCalendar(month, year) {
            const calendarDays = document.getElementById('calendarDays');
            calendarDays.innerHTML = '';
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            const daysInMonth = lastDay.getDate();
            const startingDayOfWeek = firstDay.getDay();
            const today = new Date();
            const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

            // Add previous month's trailing days
            for (let i = 0; i < startingDayOfWeek; i++) {
                const prevMonthLastDay = new Date(year, month, 0).getDate();
                const dayNumber = prevMonthLastDay - startingDayOfWeek + i + 1;
                const dayEl = createDayElement(dayNumber, true, month, year);
                calendarDays.appendChild(dayEl);
            }
            // Days of this month
            for (let day = 1; day <= daysInMonth; day++) {
                const dayEl = createDayElement(day, false, month, year);
                if (isCurrentMonth && day === today.getDate()) {
                    dayEl.classList.add('today');
                }
                // Info for modal
                const holidayKey = `${month+1}-${day}`;
                const yearHolidays = holidays[year];
                let info = '';
                if (yearHolidays && yearHolidays[holidayKey]) {
                    const holiday = yearHolidays[holidayKey];
                    dayEl.classList.add(holiday.type);
                    if (holiday.name) {
                        const holidayNameEl = document.createElement('div');
                        holidayNameEl.className = 'holiday-name';
                        holidayNameEl.textContent = holiday.name;
                        dayEl.appendChild(holidayNameEl);
                        info = holiday.name;
                    }
                } else {
                    const dayOfWeek = new Date(year, month, day).getDay();
                    if (dayOfWeek === 0 || dayOfWeek === 6) {
                        dayEl.classList.add('weekend');
                        info = 'วันหยุดสุดสัปดาห์';
                    } else {
                        info = 'วันทำงาน';
                    }
                }
                // Modal click event
                dayEl.addEventListener('click', function() {
                    const dateStr = `${day} ${monthNames[month]} ${year+543}`;
                    showModal(dateStr, info);
                });
                calendarDays.appendChild(dayEl);
            }
            // Fill next month's days to complete grid
            const totalCells = Math.ceil((startingDayOfWeek + daysInMonth) / 7) * 7;
            const remainingCells = totalCells - (startingDayOfWeek + daysInMonth);
            for (let i = 0; i < remainingCells; i++) {
                const dayEl = createDayElement(i + 1, true, month, year);
                calendarDays.appendChild(dayEl);
            }
            document.querySelector('.calendar-title').textContent =
                `ปฏิทิน ${monthNames[month]} ${year + 543}`;
        }

        function createDayElement(dayNumber, isOtherMonth, month, year) {
            const dayEl = document.createElement('div');
            dayEl.className = 'day';
            if (isOtherMonth) dayEl.classList.add('other-month');
            // วันพระ
            const monkArr = monkDays[year] || [];
            const thisDateKey = `${month+1}-${dayNumber}`;
            if (monkArr.includes(thisDateKey)) {
                dayEl.insertAdjacentHTML('afterbegin', `
                    <span class="monk-icon-svg">
                        <svg width="18" height="18" viewBox="0 0 64 64" fill="none">
                            <defs>
                                <linearGradient id="buddhaGradient" x1="0" y1="32" x2="64" y2="32" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#FFA726"/>
                                    <stop offset="1" stop-color="#FFD54F"/>
                                </linearGradient>
                            </defs>
                            <path d="M32 4c1.2 3.6 1.5 6.5 0.85 8.5a5.1 5.1 0 012.93 1.8c1.17 1.6 1.38 3.38 1.18 6.7 2.2 1.4 5.57 7.05 5.57 14.5 0 4.52-.2 6.5-.83 8.2 2.38.83 6.3 4.1 8.23 8.23C51.5 54 46 58 32 58s-19.5-4-17.93-14.07C16 44.7 19.93 41.53 22.3 40.7c-.63-1.7-.83-3.68-.83-8.2 0-7.45 3.38-13.1 5.57-14.5-.2-3.32.01-5.1 1.18-6.7a5.1 5.1 0 012.93-1.8C30.5 10.5 30.8 7.6 32 4z" fill="url(#buddhaGradient)"/>
                        </svg>
                    </span>
                `);
            }
            const dayNumberEl = document.createElement('div');
            dayNumberEl.className = 'day-number';
            dayNumberEl.textContent = dayNumber;
            dayEl.appendChild(dayNumberEl);
            return dayEl;
        }

        // Modal functions
        function showModal(date, info) {
            document.getElementById('modalDate').innerText = date;
            document.getElementById('modalInfo').innerText = info;
            document.getElementById('infoModal').style.display = 'flex';
        }
        function closeModal() {
            document.getElementById('infoModal').style.display = 'none';
        }

        // Event listeners
        document.getElementById('prevMonth').addEventListener('click', () => {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            updateCalendar();
        });
        document.getElementById('nextMonth').addEventListener('click', () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            updateCalendar();
        });
        document.getElementById('monthSelect').addEventListener('change', (e) => {
            currentMonth = parseInt(e.target.value);
            updateCalendar();
        });
        document.getElementById('yearSelect').addEventListener('change', (e) => {
            currentYear = parseInt(e.target.value);
            updateCalendar();
        });
        function updateCalendar() {
            document.getElementById('monthSelect').value = currentMonth;
            document.getElementById('yearSelect').value = currentYear;
            generateCalendar(currentMonth, currentYear);
        }

        document.addEventListener('DOMContentLoaded', initializeCalendar);
