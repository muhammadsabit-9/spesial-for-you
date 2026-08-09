function revealSite() {
  const hero = document.querySelector('.hero-section');
  const main = document.getElementById('mainContainer');
  const music = document.getElementById('bgMusic');

  // Putar Musik
  if (music) {
    music.play().catch(error => console.log("Autoplay:", error));
  }

  // Sembunyikan cover kado
  hero.style.opacity = '0';

  setTimeout(() => {
    hero.style.display = 'none';
    main.classList.remove('hidden');
    window.scrollTo(0, 0);

    // Efek Kembang Api Confetti
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
      });
    }

    // MUNCULKAN BANJIR BUNGA
    createBanjirBunga();
  }, 500);
}

function createBanjirBunga() {
  const container = document.getElementById('petalContainer');
  if (!container) return;

  const flowers = ['🌸', '🌺', '🌻', '🌹', '🌷', '🪷', '🌼', '💐'];
  const totalBunga = 50; // Jumlah bunga diperbanyak agar melimpah

  for (let i = 0; i < totalBunga; i++) {
    const flower = document.createElement('div');
    flower.classList.add('falling-flower');
    
    flower.innerText = flowers[Math.floor(Math.random() * flowers.length)];

    const size = Math.random() * 1.3 + 1;
    flower.style.fontSize = `${size}rem`;
    flower.style.left = `${Math.random() * 100}%`;
    flower.style.animationDuration = `${Math.random() * 3 + 2.5}s`;
    flower.style.animationDelay = `${Math.random() * 3}s`;

    container.appendChild(flower);
  }
}
