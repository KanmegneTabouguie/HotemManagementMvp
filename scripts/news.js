document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '5fce6ed246144683b9701e9fde0196da';

    fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const newsList = document.getElementById('newsList');
            data.articles.forEach(article => {
                const li = document.createElement('li');
                li.innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a>`;
                newsList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching news data:', error));
});
