'use strict';

import { api_key, fetchDataFromServer } from './api.js';

export function sidebar() {
  const genreList = {};

  fetchDataFromServer(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`, function ({ genres }, optionalParam) {
    for (const { id, name } of genres) {
      genreList[id] = name;
    }
    genreLink();
  });

  const sidebarInner = document.createElement('div');
  sidebarInner.classList.add('sidebar-inner');

  sidebarInner.innerHTML = `
    <div class="sidebar-list">
      <p class="title">Genres</p>
    </div>

    <div class="sidebar-list">
      <p class="title">Languages</p>
      <a href="./movie-list.html" menu-close class="sidebar-link">English</a>
      <a href="./movie-list.html" menu-close class="sidebar-link">French</a>
      <a href="./movie-list.html" menu-close class="sidebar-link">German</a>
      <a href="./movie-list.html" menu-close class="sidebar-link">Italian</a>
      <a href="./movie-list.html" menu-close class="sidebar-link">Japanese</a>
      <a href="./movie-list.html" menu-close class="sidebar-link">Korean</a>
      <a href="./movie-list.html" menu-close class="sidebar-link">Spanish</a>
    </div>
        
    <div class="sidebar-footer">
      <p class="copyright">copyright 2023
        <a href="#">code</a>
      </p>
      <img src="../assets/images/tmdb-logo.svg" width="130" height="17" alt="the movie database logo">
    </div>`;

  const genreLink = function () {
    for (const [genreId, genreName] of Object.entries(genreList)) {
      const link = document.createElement('a');
      link.classList.add('sidebar-link');
      link.setAttribute('href', `./movie-list.html?with_genres=${genreId}`);
      link.setAttribute('menu-close', '');
      // link.setAttribute('onclick', `getMovieList("with_genres=${genreId}", "${genreName}")`);
      link.textContent = genreName;

      sidebarInner.querySelectorAll('.sidebar-list')[0].appendChild(link);
    }

    const sidebar = document.querySelector('[sidebar]');
    sidebar.appendChild(sidebarInner);
    toggleSidebar(sidebar);
  };

  const toggleSidebar = function (sidebar) {
    const sidebarBtn = document.querySelector('[menu-btn]');
    const sidebarTogglers = document.querySelectorAll('[menu-toggler]');
    const sidebarClose = document.querySelectorAll('[menu-close]');
    const overlay = document.querySelector('[overlay]');

    const addEventOnElements = function (elements, event, callback) {
      for (const element of elements) {
        element.addEventListener(event, callback);
      }
    };

    addEventOnElements(sidebarTogglers, 'click', function () {
      sidebar.classList.toggle('active');
      sidebarBtn.classList.toggle('active');
      overlay.classList.toggle('active');
    });

    addEventOnElements(sidebarClose, 'click', function () {
      sidebar.classList.remove('active');
      sidebarBtn.classList.remove('active');
      overlay.classList.remove('active');
    });
  };
}
