const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');
const resultDiv = document.getElementById('result');

function searchDestination() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            const country = data.countries.find(item => item.name.toLowerCase() === input);

            if (country) {
                displayDestination(country.cities);
            } else if (input=='country' || input=='countries') {
                data.countries.forEach (function(country) {
                    displayDestination(country.cities);
                });
            } else if (input=='beach' || input=='beaches') {
                displayDestination(data.beaches);
            } else if (input=='temple' || input=='temples') {
                displayDestination(data.temples);
            } else {
                    resultDiv.innerHTML = 'Result not found';
            }
        })
        .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
}

function displayDestination(locationType) {
    locationType.forEach (function(location) {
        const localTime = new Date().toLocaleTimeString('en-US', { timeZone: location.timeZone, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' });
        
        resultDiv.innerHTML += `<h4>${location.name}</h4> (local time: ${localTime})`;
        resultDiv.innerHTML += `<img src="${location.imageUrl}">`;
        resultDiv.innerHTML += `<p>${location.description}</p>`;
    });
}

function clearResult() {
    document.getElementById('searchInput').value = '';
    resultDiv.innerHTML = '';
}

btnSearch.addEventListener('click', searchDestination);
btnClear.addEventListener('click', clearResult);