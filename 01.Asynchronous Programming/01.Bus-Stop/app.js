async function getInfo() {

    const stopNameElement = document.getElementById('stopName');
    const timeTableElement = document.getElementById('buses');

    let stopId = document.getElementById('stopId').value;
    let URL = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;

    try {
        stopNameElement.textContent = 'Loading...';
        timeTableElement.replaceChildren();

        const res = await fetch(URL);


        if (res.status !== 200) {
            throw new Error('Stop ID not found');
        }

        const data = await res.json();

        stopNameElement.textContent = data.name;

        Object.entries(data.buses).forEach(b => {
            const liElement = document.createElement('li');
            liElement.textContent = `Bus ${b[0]} arrives in ${b[1]} minutes`;
            timeTableElement.appendChild(liElement);
        })

        // `Bus ${} arrives in ${} minutes`

    } catch (error) {
        stopNameElement.textContent = 'Error';
    }

}