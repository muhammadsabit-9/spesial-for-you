function revealSite() {
  const hero = document.querySelector('.hero-section');
  const main = document.getElementById('mainContainer');
  const music = document.getElementById('bgMusic');

  // Putar Musik
  if (music) {
    music.play();
  }

  // Hilangkan sampul depan
  hero.style.opacity = '0';

  setTimeout(() => {
    hero.style.display = 'none';
    main.classList.remove('hidden');
    window.scrollTo(0, 0);

    // Jalankan Kembang Api
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    // Jalankan Animasi Kelopak Bunga Jatuh
    createPetals();
  }, 500);
}

// Fungsi membuat animasi kelopak bunga jatuh
function createPetals() {
  const container = document.getElementById('petalContainer');
  const petalCount = 20;

  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement('div');
    petal.classList.add('petal');
    
    // Ukuran acak
    const size = Math.random() * 10 + 10;
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    
    // Posisi dan kecepatan acak
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.animationDuration = `${Math.random() * 3 + 4}s`;
    petal.style.animationDelay = `${Math.random() * 2}s`;

    container.appendChild(petal);
  }
}
