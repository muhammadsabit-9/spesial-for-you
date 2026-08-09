document.addEventListener('DOMContentLoaded', () => {
  // Awalnya munculkan bunga sedikit di latar belakang (12 bunga)
  createFlowers(12);
});

function revealSite() {
  const hero = document.querySelector('.hero-section');
  const main = document.getElementById('mainContainer');
  const music = document.getElementById('bgMusic');

  // Putar musik jika ada
  if (music) {
    music.play().catch(error => console.log("Autoplay:", error));
  }

  // 1. EFEK SURPRISE: Ledakan bunga dari dalam kado
  explodeGiftFlowers();

  // Efek kembang api confetti
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 }
    });
  }

  // Animasi kado membesar sedikit lalu memudar
  hero.style.transform = 'scale(1.08)';
  
  // 2. JEDA (DELAY) SEBELUM MASUK KE ISI SURAT
  setTimeout(() => {
    hero.style.opacity = '0';
  }, 600);

  setTimeout(() => {
    hero.style.display = 'none';
    main.classList.remove('hidden');
    window.scrollTo(0, 0);

    // Kembalikan bunga ke jumlah normal/sedikit agar teks surat tidak tertutup
    createFlowers(12);
  }, 1200); // Jeda 1.2 detik agar efek kejutan bunga selesai dulu
}

// Efek ledakan bunga yang meluncur keluar dari posisi kado
function explodeGiftFlowers() {
  const giftBox = document.querySelector('.gift-box');
  if (!giftBox) return;

  const rect = giftBox.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const flowers = ['🌸', '🌺', '🌻', '🌹', '🌷', '🪷', '🌼', '💐', '✨'];
  const totalExplosion = 40; // Banyak bunga yang memancar keluar kado

  for (let i = 0; i < totalExplosion; i++) {
    const flower = document.createElement('div');
    flower.classList.add('burst-flower');
    flower.innerText = flowers[Math.floor(Math.random() * flowers.length)];

    // Posisi awal persis di tengah kado
    flower.style.left = `${centerX}px`;
    flower.style.top = `${centerY}px`;

    // Arah lemparan bunga secara acak ke segala arah
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 250 + 100; // Jarak lemparan
    const x = Math.cos(angle) * velocity;
    const y = Math.sin(angle) * velocity - 100; // Cenderung meluncur ke atas dulu

    flower.style.setProperty('--tx', `${x}px`);
    flower.style.setProperty('--ty', `${y}px`);

    document.body.appendChild(flower);

    // Hapus elemen bunga burst setelah animasinya selesai
    setTimeout(() => {
      flower.remove();
    }, 1500);
  }
}

// Bunga latar belakang yang melayang perlahan
function createFlowers(amount) {
  const container = document.getElementById('petalContainer');
  if (!container) return;

  container.innerHTML = '';
  const flowers = ['🌸', '🌺', '🌻', '🌹', '🌷', '🪷', '🌼'];

  for (let i = 0; i < amount; i++) {
    const flower = document.createElement('div');
    flower.classList.add('falling-flower');
    flower.innerText = flowers[Math.floor(Math.random() * flowers.length)];

    const size = Math.random() * 1.2 + 0.8;
    flower.style.fontSize = `${size}rem`;
    flower.style.left = `${Math.random() * 100}%`;
    flower.style.animationDuration = `${Math.random() * 4 + 3}s`;
    flower.style.animationDelay = `${Math.random() * 3}s`;

    container.appendChild(flower);
  }
                   }
