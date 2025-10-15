// Navigation functions
function navigateToDay(dayNumber) {
    window.location.href = `days/day${dayNumber}.html`;
}

function nextDay() {
    const currentDay = parseInt(window.location.pathname.split('day')[1].split('.')[0]);
    if (currentDay < 30) {
        navigateToDay(currentDay + 1);
    }
}

function previousDay() {
    const currentDay = parseInt(window.location.pathname.split('day')[1].split('.')[0]);
    if (currentDay > 1) {
        navigateToDay(currentDay - 1);
    }
}

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
        nextDay();
    } else if (event.key === 'ArrowLeft') {
        previousDay();
    }
});

// Progress tracking
function updateProgress() {
    const completedDays = localStorage.getItem('completedDays') || '[]';
    const completed = JSON.parse(completedDays);
    
    // Update UI to show completed days
    completed.forEach(day => {
        const dayElement = document.querySelector(`[onclick="navigateToDay(${day})"]`);
        if (dayElement) {
            dayElement.style.background = '#d4edda';
        }
    });
}

// Mark day as completed
function markDayCompleted(dayNumber) {
    const completedDays = localStorage.getItem('completedDays') || '[]';
    const completed = JSON.parse(completedDays);
    
    if (!completed.includes(dayNumber)) {
        completed.push(dayNumber);
        localStorage.setItem('completedDays', JSON.stringify(completed));
    }
    
    updateProgress();
}

// Search functionality
function searchDays() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const dayCards = document.querySelectorAll('.day-card');
    
    dayCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateProgress();
    
    // Add search input if it doesn't exist
    if (!document.getElementById('searchInput')) {
        const searchHtml = `
            <div class="search-container" style="margin: 1rem 0; text-align: center;">
                <input type="text" id="searchInput" placeholder="Search days..." 
                       style="padding: 0.5rem; width: 300px; max-width: 100%; border: 1px solid #ddd; border-radius: 4px;">
                <button onclick="searchDays()" style="padding: 0.5rem 1rem; background: #3498db; color: white; border: none; border-radius: 4px; margin-left: 0.5rem;">
                    Search
                </button>
            </div>
        `;
        document.querySelector('main').insertAdjacentHTML('afterbegin', searchHtml);
    }
});

// Export functionality
function exportToPDF(dayNumber) {
    // This would integrate with a PDF generation library
    console.log(`Exporting day ${dayNumber} to PDF`);
    // Implementation would depend on the PDF library used
}

// Statistics
function showStatistics() {
    const completedDays = localStorage.getItem('completedDays') || '[]';
    const completed = JSON.parse(completedDays);
    
    alert(`Training Progress:\n\nCompleted Days: ${completed.length}/30\nProgress: ${Math.round((completed.length/30)*100)}%`);
}
