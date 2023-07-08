let isReversed = false;
const reverseByDate = document.getElementById('reverseByDate');
const loadingSpinner = document.getElementById('loadingSpinner');
const tableBody = document.getElementById('tableBody');
const bodyElement = document.getElementById('main-content');

// Function to disable submit button if either title or content fields are empty
function checkInputFieldsAfter() {
  const title = document.getElementById('editTitle').value;
  const content = document.getElementById('editContent').value;
  const saveButton = document.getElementById('saveButton');

  if (title.trim() === '' || content.trim() === '') {
    saveButton.disabled = true;
  } else {
    saveButton.disabled = false;
  }
}

reverseByDate.addEventListener("click", function() {
    // Blur background and show loading animation
    bodyElement.classList.add('blur'); 
    loading.style.display = 'flex';

    // Simulate loading delay
    setTimeout(function() {
        // Get the table body element
        var rows = Array.from(tableBody.children);

        // Reverse the order of table rows
        rows.reverse().forEach(function(tr) {
        tableBody.appendChild(tr);
        });

        isReversed = !isReversed;
        // Change icon displayed on click
        if (isReversed) {
        reverseIcon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
            <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
            </svg>
        `;
        } else {
        reverseIcon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
            </svg>
        `;
        }

        // Remove blur and loading animation
        bodyElement.classList.remove('blur');
        loading.style.display = 'none';
    }, 500); // Simulate a 0.5-second loading delay
});
