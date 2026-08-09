// Halaman awal polos (0 bunga)
document.addEventListener('DOMContentLoaded', () => {
  createFlowers(0);
});

function revealSite() {
  const hero = document.querySelector('.hero-section');
  const main = document.getElementById('mainContainer');
  const music = document.getElementById('bgMusic');

  // Putar musik jika ada
  if (music) {
    music.play().catch(error => console.log("Autoplay:", error));
  }

  // 1. SURPRISE: Ledakan bunga memancar keluar dari posisi kado
  explodeGiftFlowers();

  // Animasi kado membesar sedikit
  hero.style.transform = 'scale(1.08)';

  // 2. JEDA SEBELUM MEMUDAR
  setTimeout(() => {
    hero.style.opacity = '0';
  }, 600);

  // 3. MASUK KE HALAMAN UTAMA (SURAT)
  setTimeout(() => {
    hero.style.display = 'none';
    main.classList.remove('hidden');
    window.scrollTo(0, 0);

    // Percikan Ulang Tahun (Confetti Warna-warni & Emas)
    triggerBirthdayConfetti();

    // Munculkan Bunga & Daun Pink Sedikit di Latar Belakang (8 saja)
    createFlowers(8);
  }, 1200); // Jeda 1.2 detik
}

// Efek ledakan bunga yang meluncur keluar dari kado
function explodeGiftFlowers() {
  const giftBox = document.querySelector('.gift-box');
  if (!giftBox) return;

  const rect = giftBox.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // Variasi bunga & kelopak
  const flowers = ['🌸', '🌺', '🌹', '🌷', '🪷', '✨', '💖'];
  const totalExplosion = 45; 

  for (let i = 0; i < totalExplosion; i++) {
    const flower = document.createElement('div');
    flower.classList.add('burst-flower');
    flower.innerText = flowers[Math.floor(Math.random() * flowers.length)];

    flower.style.left = `${centerX}px`;
    flower.style.top = `${centerY}px`;

    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 280 + 120;
    const x = Math.cos(angle) * velocity;
    const y = Math.sin(angle) * velocity - 120; 

    flower.style.setProperty('--tx', `${x}px`);
    flower.style.setProperty('--ty', `${y}px`);

    document.body.appendChild(flower);

    setTimeout(() => {
      flower.remove();
    }, 1500);
  }
}

// Percikan Ulang Tahun / Confetti
function triggerBirthdayConfetti() {
  if (typeof confetti === 'function') {
    // Semburan dari kiri & kanan
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { x: 0.2, y: 0.5 },
      colors: ['#f43f5e', '#fb7185', '#fef08a', '#e11d48']
    });
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { x: 0.8, y: 0.5 },
      colors: ['#f43f5e', '#fb7185', '#fef08a', '#e11d48']
    });
  }
}

// Bunga Pink & Daun Pink Sedikit di Latar Belakang
function createFlowers(amount) {
  const container = document.getElementById('petalContainer');
  if (!container) return;

  container.innerHTML = '';
  if (amount === 0) return;

  // Fokus bunga & kelopak daun pink saja
  const pinkFlowers = ['🌸', '🌺', '🪷', '💮', '🩷'];

  for (let i = 0; i < amount; i++) {
    const flower = document.createElement('div');
    flower.classList.add('falling-flower');
    flower.innerText = pinkFlowers[Math.floor(Math.random() * pinkFlowers.length)];

    const size = Math.random() * 1.0 + 0.8;
    flower.style.fontSize = `${size}rem`;
    flower.style.left = `${Math.random() * 100}%`;
    flower.style.animationDuration = `${Math.random() * 5 + 4}s`;
    flower.style.animationDelay = `${Math.random() * 3}s`;

    container.appendChild(flower);
  }
}
