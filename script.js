// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Example word lists
    /*
    const wordLists = [
        ['Apple', 'Banana', 'Cherry'],
        ['Dog', 'Cat', 'Mouse'],
        ['Red', 'Blue', 'Green']
    ];*/
    const wordLists = [
        ['Dog', 'Cat', 'Mouse'],
        ['Big', 'Small', 'Angry', 'Happy'],
        ['Apple', 'Banana', 'Cherry'],
        ['Delicious', 'Rotten', 'Many', 'Few'],
        ['Ate', 'Threw', 'Touched'],
    ];
    const boxColors = ['red', 'pink', 'blue', 'skyblue', 'green'];
    const boxMargins = ['0px 0px 20px 0px', '0px 50px 0px 0px', '0px 0px 20px 0px', '0px 50px 0px 0px', '0px'];
    const dropDownContainer = document.querySelector('.dropdown-container'); // Assuming a container div exists
    const boxes = document.querySelector('.boxes'); // Assuming a container div exists

    // Populate the dropdowns and add event listeners
    wordLists.forEach((list, index) => {
        // Create the select element
        const select = document.createElement('select');
        select.id = `list${index + 1}`;
        list.forEach(word => {
            const option = document.createElement('option');
            option.value = word;
            option.textContent = word;
            select.appendChild(option);
        });

        // Create the box
        const box = document.createElement('div');
        box.id = `box${index + 1}`;
        box.className = 'box';
        box.textContent = ' '; // Placeholder text or empty
        box.style.marginBottom = '20px'; // Adjust spacing as needed
        box.style.backgroundColor = boxColors[index];
        box.style.margin = boxMargins[index];

        // Append the select element and the box to the container
        dropDownContainer.appendChild(select);
        boxes.appendChild(box);

        // Add event listener for each select
        select.addEventListener('change', function() {
            updateBox(index + 1, this.value);
        });

        // Adding right-click event listener to each box
        //const box = document.getElementById(`box${index + 1}`);
        box.addEventListener('contextmenu', function(e) {
            e.preventDefault(); // Prevent the default context menu
            showContextMenu(e, list, box); // Show custom context menu
        });
    });
});

// Function to update the corresponding box
function updateBox(boxNumber, word) {
    const box = document.getElementById(`box${boxNumber}`);
    box.textContent = word;
}

function fillBoxesRandomly() {
    for (let i = 1; i <= 5; i++) {
        const select = document.getElementById(`list${i}`);
        const options = select.options;
        const randomIndex = Math.floor(Math.random() * options.length); // Generate a random index
        const randomWord = options[randomIndex].value; // Get the random word
        
        // Update the corresponding box with the random word
        updateBox(i, randomWord);
        select.selectedIndex = randomIndex;
    }
}

// Function to show custom context menu
function showContextMenu(event, wordList, box) {
    // Remove any existing context menu
    const existingMenu = document.getElementById('custom-context-menu');
    if (existingMenu) {
        existingMenu.remove();
    }

    // Create a new context menu
    const menu = document.createElement('ul');
    menu.id = 'custom-context-menu';
    menu.style.position = 'absolute';
    menu.style.top = `${event.pageY}px`;
    menu.style.left = `${event.pageX}px`;
    menu.style.backgroundColor = 'white';
    menu.style.padding = '10px';
    menu.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    menu.style.borderRadius = '5px';
    menu.style.listStyle = 'none';
    menu.style.cursor = 'pointer';
    document.body.appendChild(menu);

    // Add word options to the menu
    wordList.forEach(word => {
        const item = document.createElement('li');
        item.textContent = word;
        item.style.padding = '5px 10px';
        item.addEventListener('click', () => {
            updateBox(box.id.replace('box', ''), word);
            menu.remove(); // Remove the menu after selection
        });
        menu.appendChild(item);
    });

    // Close the menu on click outside
    document.addEventListener('click', function closeMenu(e) {
        if (e.target.id !== 'custom-context-menu' && e.target.parentNode.id !== 'custom-context-menu') {
            menu.remove();
            document.removeEventListener('click', closeMenu);
        }
    });
}