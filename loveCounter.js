// Anniversary date - October 15th, 2024
const anniversaryDate = new Date('2024-10-15');

// Calculate months and days together
function updateLoveCounter() {
    const today = new Date();
    
    // Calculate the difference
    let years = today.getFullYear() - anniversaryDate.getFullYear();
    let months = today.getMonth() - anniversaryDate.getMonth();
    let days = today.getDate() - anniversaryDate.getDate();
    
    // Adjust for negative days
    if (days < 0) {
        months--;
        // Get days in previous month
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();
    }
    
    // Adjust for negative months
    if (months < 0) {
        years--;
        months += 12;
    }
    
    // Convert years to months for total months display
    const totalMonths = years * 12 + months;
    
    // Update the display
    let displayText;
    if (totalMonths === 0) {
        displayText = `${days} day${days !== 1 ? 's' : ''}`;
    } else if (days === 0) {
        displayText = `${totalMonths} month${totalMonths !== 1 ? 's' : ''}`;
    } else {
        displayText = `${totalMonths} month${totalMonths !== 1 ? 's' : ''}, ${days} day${days !== 1 ? 's' : ''}`;
    }
    
    document.getElementById('timeCounter').textContent = displayText;
}

// Initialize the counter when the page loads
document.addEventListener("DOMContentLoaded", () => {
    updateLoveCounter();
    
    // Optional: Update every day at midnight
    // Calculate time until next midnight
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const msUntilMidnight = tomorrow.getTime() - now.getTime();
    
    // Set timeout for midnight, then update daily
    setTimeout(() => {
        updateLoveCounter();
        // Then update every 24 hours
        setInterval(updateLoveCounter, 24 * 60 * 60 * 1000);
    }, msUntilMidnight);
});
