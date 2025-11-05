let popupCounter = localStorage.getItem('popupCounter') ? parseInt(localStorage.getItem('popupCounter')) : 0;
const maxPopupShows = 2;

// Function to show the popup
function showPopup() {
    const popup = document.getElementById('popup');
    if (popup && popupCounter < maxPopupShows) {
        popup.style.display = 'flex';
        popupCounter++;
        localStorage.setItem('popupCounter', popupCounter); // Update the counter in localStorage
    }
}

// Function to hide the popup
function hidePopup() {
    const popup = document.getElementById('popup');
    if (popup) {
        popup.style.display = 'none';
        setTimeout(showPopup, 60000);
    }
}

// Function to handle clicks outside the popup
function handleClickOutside(event) {
    const popup = document.getElementById('popup');
    const popupContent = document.querySelector('.popup-content');

    if (popup && popupContent && !popupContent.contains(event.target)) {
        hidePopup();
    }
}

setTimeout(showPopup, 60000);


function closepopup() {
    hidePopup();
}

// Add event listener to handle clicks outside the popup
document.addEventListener('click', handleClickOutside);

window.addEventListener('beforeunload', function() {
    localStorage.removeItem('popupCounter');
});