const btnSearch = document.getElementById('btnSearch');
const resultDiv = document.getElementById('result');

function searchDestination() {
const input = document.getElementById('searchInput').value.toLowerCase();
resultDiv.innerHTML = '';

fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
    if (input=='country' || input=='countries') {
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
        resultDiv.innerHTML += `<h4>${location.name}</h4>`;
        resultDiv.innerHTML += `<img src="${location.imageUrl}">`;
        resultDiv.innerHTML += `<p>${location.description}</p>`;
    });
  }

  btnSearch.addEventListener('click', searchDestination);