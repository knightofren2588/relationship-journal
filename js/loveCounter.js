/* ============================================================
   loveCounter.js — The Two Clocks

   Clock 1 (#timeCounter):  frozen forever.
     October 15th, 2024 → July 6th, 2026.
     The time we were given.

   Clock 2 (#eternalCounter):  never stops.
     Counts from October 15th, 2024 and keeps going,
     because love never dies.
   ============================================================ */

const anniversaryDate = new Date('2024-10-15T00:00:00');
const memorialDate    = new Date('2026-07-06T00:00:00');

// Works out the gap between two dates as months + days.
function dateDifference(fromDate, toDate) {
  let years  = toDate.getFullYear() - fromDate.getFullYear();
  let months = toDate.getMonth()    - fromDate.getMonth();
  let days   = toDate.getDate()     - fromDate.getDate();

  // If the day-of-month hasn't been reached yet, borrow a month
  if (days < 0) {
    months--;
    const lastMonth = new Date(toDate.getFullYear(), toDate.getMonth(), 0);
    days += lastMonth.getDate();
  }

  // If the month hasn't been reached yet, borrow a year
  if (months < 0) {
    years--;
    months += 12;
  }

  return { totalMonths: years * 12 + months, days: days };
}

// Turns { totalMonths, days } into readable text
function formatDifference(diff) {
  const m = diff.totalMonths;
  const d = diff.days;

  if (m === 0) return `${d} day${d !== 1 ? 's' : ''}`;
  if (d === 0) return `${m} month${m !== 1 ? 's' : ''}`;
  return `${m} month${m !== 1 ? 's' : ''}, ${d} day${d !== 1 ? 's' : ''}`;
}

function updateCounters() {
  // Clock 1 — frozen at the memorial date
  const frozen = document.getElementById('timeCounter');
  if (frozen) {
    frozen.textContent = formatDifference(dateDifference(anniversaryDate, memorialDate));
  }

  // Clock 2 — still counting, always
  const eternal = document.getElementById('eternalCounter');
  if (eternal) {
    eternal.textContent = formatDifference(dateDifference(anniversaryDate, new Date()));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateCounters();

  // Refresh the eternal clock at midnight, then daily after that
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  setTimeout(() => {
    updateCounters();
    setInterval(updateCounters, 24 * 60 * 60 * 1000);
  }, tomorrow.getTime() - now.getTime());
});
