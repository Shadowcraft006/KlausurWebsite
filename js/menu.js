function toggleMenu() {
    const nav = document.getElementById('mainNav');
    nav.classList.toggle('open');
  }
  
  // Menü automatisch schließen bei Klick auf Link (für Mobile)
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.main-nav a').forEach(link => {
      link.addEventListener('click', () => {
        const nav = document.getElementById('mainNav');
        nav.classList.remove('open');
      });
    });
  });
  