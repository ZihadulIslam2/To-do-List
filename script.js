let myList = JSON.parse(localStorage.getItem('myList')) || [] // Load tasks from local storage
let inputEl = document.getElementById('listText-el')
let saveBtn = document.getElementById('Save-btn')
let ulEl = document.getElementById('ulEl')
let clearTaskBtn = document.getElementById('clear-btn')

saveBtn.addEventListener("click", function() {
    let inputValue = inputEl.value.trim() // Trim whitespace
    if (inputValue !== '') { // Check if the input is not empty
        myList.push({ text: inputValue, checked: false }) // Store objects with text and checked status
        renderList()
        inputEl.value = ''
    }
})

clearTaskBtn.addEventListener("click", function() {
    myList = [] // Clear the myList array
    renderList() // Re-render the list to update the UI
})

function renderList() {
    localStorage.setItem('myList', JSON.stringify(myList)) // Save tasks to local storage
    let list = ''
    for (let i = 0; i < myList.length; i++) {
        list += `
            <li class="border-b-2 border-black px-4 pt-1 italic text-lg">
                <input type="checkbox" id="checkbox-${i}" ${myList[i].checked ? 'checked' : ''} tabindex="0">
                <label for="checkbox-${i}" class="${myList[i].checked ? 'line-through' : ''}">${myList[i].text}</label>             
            </li>
        `
    }
    ulEl.innerHTML = list

    // Add event listeners to checkboxes
    for (let i = 0; i < myList.length; i++) {
        document.getElementById(`checkbox-${i}`).addEventListener('change', function() {
            myList[i].checked = this.checked
            if (this.checked) {
                // Move the item to the bottom of the list
                myList.push(myList.splice(i, 1)[0])
            } else {
                // Move the item to the top of the list if unchecked
                myList.unshift(myList.splice(i, 1)[0])
            }
            renderList()
        })
    }
}

// Initial render of the list
renderList()
