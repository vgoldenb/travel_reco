const btnSearch = document.getElementById('btnSearch');


  function searchDestination() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        const country = data.countries.find(item => item.name.toLowerCase() === input);

        if (country) {
            country.cities.forEach (function(city) {
                resultDiv.innerHTML += `<h4>${city.name}</h4>`;
                resultDiv.innerHTML += `<img src="${city.imageUrl}">`;
                resultDiv.innerHTML += `<p>${city.description}</p>`;
            });
        } else {
          resultDiv.innerHTML = 'country not found.';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
  }

  btnSearch.addEventListener('click', searchDestination);