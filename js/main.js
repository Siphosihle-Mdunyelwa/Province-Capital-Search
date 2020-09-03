const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

// Search provinces.json
const searchProvinces = async searchText => {
    const res = await fetch('../data/provinces.json');
    const provinces = await res.json();

    // Get matches to current text input
    let matches = provinces.filter(provinces => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return provinces.name.match(regex) || provinces.abbr.match(regex);
    });

    if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = '';
    }

    outputHtml(matches);
};

// Show results in HTML
const outputHtml = matches => {
    if (matches.length > 0) {
        const html = matches.map(match => `
            <div class = "card card-body mb-4">
                <h4>${match.name} (${match.abbr}) <span class = "text-primary">${match.capital}</span></h4>
                <small>Lat: ${match.lat} / Long: ${match.long}</small>
            </div>
        `).join('');

        matchList.innerHTML = html;
    }
}

search.addEventListener('input', () => searchProvinces(search.value));