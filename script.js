document.addEventListener("DOMContentLoaded", function () {
    const timeTrigger = document.getElementById("time-trigger");
    const calendarPopup = document.getElementById("calendar-popup");
    const taskbarTime = document.getElementById("taskbar-time");
    const taskbarDate = document.getElementById("taskbar-date");
  
    const popupTimeDisplay = document.getElementById("popup-current-time");
    const popupDateDisplay = document.getElementById("popup-current-date");
    const currentMonthDisplay = document.getElementById("popup-current-month");
    const calendarDates = document.getElementById("popup-calendar-dates");
    const prevMonthBtn = document.getElementById("popup-prev-month");
    const nextMonthBtn = document.getElementById("popup-next-month");
  
    const daysInWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
  
    let currentDate = new Date();
  
    function updateTime() {
      const now = new Date();
      const hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;
  
      taskbarTime.textContent = `${formattedHours}:${minutes} ${ampm}`;
      taskbarDate.textContent = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
  
      popupTimeDisplay.textContent = `${formattedHours}:${minutes}:${seconds} ${ampm}`;
      popupDateDisplay.textContent = `${daysInWeek[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
    }
  
    function renderCalendar() {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
  
      currentMonthDisplay.textContent = `${months[month]} ${year}`;
      calendarDates.innerHTML = "";
  
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
  
      for (let i = 0; i < firstDay; i++) {
        calendarDates.innerHTML += `<div class="date"></div>`;
      }
  
      for (let day = 1; day <= daysInMonth; day++) {
        const isToday =
          day === new Date().getDate() &&
          month === new Date().getMonth() &&
          year === new Date().getFullYear();
  
        calendarDates.innerHTML += `<div class="date ${
          isToday ? "today" : ""
        }">${day}</div>`;
      }
    }
  
    prevMonthBtn.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar();
    });
  
    nextMonthBtn.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar();
    });
  
    timeTrigger.addEventListener("click", () => {
      calendarPopup.style.display =
        calendarPopup.style.display === "flex" ? "none" : "flex";
    });
  
    setInterval(updateTime, 1000);
    renderCalendar();
    updateTime();
  });
  