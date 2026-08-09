function revealSite() {
  const hero = document.querySelector('.hero-section');
  const main = document.getElementById('mainContainer');
  const music = document.getElementById('bgMusic');

  // 1. Putar Musik
  if (music) {
    music.play().catch(error => console.log("Autoplay:", error));
  }

  // 2. Ubah Warna Latar Belakang dari Hitam ke Soft Pink
  document.body.classList.add('soft-pink-bg');

  // 3. Hilangkan Cover Hitam
  hero.style.opacity = '0';

  setTimeout(() => {
    hero.style.display = 'none';
    main.classList.remove('hidden');
    window.scrollTo(0, 0);

    // 4. Efek Kembang Api
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }

    // 5. Munculkan Banyak Bunga Berjatuhan
    createManyFlowers();
  }, 500);
}

// Fungsi membuat bermacam-macam bunga jatuh
function createManyFlowers() {
  const container = document.getElementById('petalContainer');
  if (!container) return;

  // Jenis-jenis emoji bunga
  const flowers = ['🌸', '🌺', '🌻', '🌹', '🌷', '🪷', '🌼'];
  const totalFlowers = 35; // Jumlah bunga diperbanyak

  for (let i = 0; i < totalFlowers; i++) {
    const flower = document.createElement('div');
    flower.classList.add('falling-flower');
    
    // Pilih bunga acak
    const randomFlower = flowers[Math.floor(Math.random() * flowers.length)];
    flower.innerText = randomFlower;

    // Ukuran & Posisi Acak
    const size = Math.random() * 1.2 + 1; // Ukuran bunga bervariasi
    flower.style.fontSize = `${size}rem`;
    flower.style.left = `${Math.random() * 100}%`;
    flower.style.animationDuration = `${Math.random() * 3 + 3}s`;
    flower.style.animationDelay = `${Math.random() * 2}s`;

    container.appendChild(flower);
  }
}
