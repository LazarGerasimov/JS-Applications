export function search() {
    
    let tableRows = document.querySelector('.container tbody').children;

    let input = document.querySelector('#searchField');

    let searchTerm = input.value;
    input.value = '';

    for (let row of tableRows) {
        row.classList.remove('select');

        if (row.textContent.toLowerCase().includes(searchTerm.toLowerCase())) {
            row.classList.add('select')
        }
    }
 }