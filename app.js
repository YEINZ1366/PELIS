let currentLanguage = 'es';
const apiKey = '10abff4ebbcdab126ecf38c3862cf2b7';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMGFiZmY0ZWJiY2RhYjEyNmVjZjM4YzM4NjJjZjJiNyIsInN1YiI6IjY0ZjEzYmFhZWJiOTlkMDEzYmNmMDRjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZAINrGQZNJvcCPmDqcDfgEeS3jprJTtMPEDEga4vyHw';
const apiUrl = 'https://api.themoviedb.org/3/';
const languageSelect = document.getElementById('languageSelect');
const genreSelect = document.getElementById('genreSelect');
const moviesContainer = document.getElementById('moviesContainer');

function loadGenres() {
    fetch(`${apiUrl}genre/movie/list?api_key=${apiKey}&language=${currentLanguage}`)
        .then(response => response.json())
        .then(data => {
            data.genres.forEach(genre => {
                const option = document.createElement('option');
                option.value = genre.id;
                option.textContent = genre.name;
                genreSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error al cargar géneros:', error));
}

function loadPopularMovies(genreId = '') {
    const params = new URLSearchParams({
        api_key: apiKey,
        language: currentLanguage,
        with_genres: genreId
    });

    fetch(`${apiUrl}movie/popular?${params}`)
        .then(response => response.json())
        .then(data => {
            moviesContainer.innerHTML = '';

            data.results.forEach(movie => {
                const movieCard = document.createElement('div');
                movieCard.classList.add('movie-card');

                const poster = document.createElement('img');
                poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                poster.alt = movie.title;

                const title = document.createElement('h2');
                title.textContent = movie.title;

                const description = document.createElement('p');
                description.textContent = movie.overview;

                movieCard.appendChild(poster);
                movieCard.appendChild(title);
                movieCard.appendChild(description);

                moviesContainer.appendChild(movieCard);
            });
        })
        .catch(error => console.error('Error al cargar películas:', error));
}

// Evento de cambio en el select de idioma
languageSelect.addEventListener('change', function() {
    currentLanguage = this.value;
    // Recargar géneros y películas con el nuevo idioma seleccionado
    genreSelect.innerHTML = ''; // Limpiar el select de géneros
    loadGenres();
    loadPopularMovies();
});

// Evento de cambio en el select de géneros
genreSelect.addEventListener('change', function() {
    const selectedGenreId = this.value;
    loadPopularMovies(selectedGenreId);
});

// Cargar géneros y películas al cargar la página
loadGenres();
loadPopularMovies();
