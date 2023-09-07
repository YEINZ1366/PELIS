let currentLanguage = 'es';
const apiKey = '10abff4ebbcdab126ecf38c3862cf2b7';
const apiUrl = 'https://api.themoviedb.org/3/';
const languageSelect = document.getElementById('languageSelect');
const genreSelect = document.getElementById('genreSelect');
const moviesContainer = document.getElementById('moviesContainer');
const paginationContainer = document.getElementById('paginationContainer');
const pageInfo = document.getElementById('pageInfo');

let currentPage = 1;
let currentGenreId = '';

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

function loadMovies(page = 1) {
    const params = new URLSearchParams({
        api_key: apiKey,
        language: currentLanguage,
        page: page,
        with_genres: currentGenreId
    });

    fetch(`${apiUrl}discover/movie?${params}`)
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

            // Actualizar información de paginación
            const totalPages = data.total_pages;
            pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;

            // Mostrar u ocultar botones de paginación según corresponda
            if (currentPage === 1) {
                prevPageButton.disabled = true;
            } else {
                prevPageButton.disabled = false;
            }

            if (currentPage === totalPages) {
                nextPageButton.disabled = true;
            } else {
                nextPageButton.disabled = false;
            }
        })
        .catch(error => console.error('Error al cargar películas:', error));
}

// Evento de cambio en el select de idioma
languageSelect.addEventListener('change', function () {
    currentLanguage = this.value;
    currentPage = 1; // Reiniciar página al cambiar el idioma
    loadMovies();
});

// Evento de cambio en el select de géneros
genreSelect.addEventListener('change', function () {
    currentGenreId = this.value;
    currentPage = 1; // Reiniciar página al cambiar el género
    loadMovies();
});

// Botones de paginación
const prevPageButton = document.getElementById('prevPage');
const nextPageButton = document.getElementById('nextPage');

prevPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        loadMovies(currentPage);
    }
});

nextPageButton.addEventListener('click', () => {
    currentPage++;
    loadMovies(currentPage);
});

// Cargar géneros y películas al cargar la página
loadGenres();
loadMovies();

