// Jalankan animasi bunga banyak di awal saat web pertama kali dimuat
document.addEventListener('DOMContentLoaded', () => {
  createFlowers(40); // 40 bunga saat di halaman kado
});

function revealSite() {
  const hero = document.querySelector('.hero-section');
  const main = document.getElementById('mainContainer');
  const music = document.getElementById('bgMusic');

  if (music) {
    music.play().catch(error => console.log("Autoplay:", error));
  }

  // Sembunyikan cover kado
  hero.style.opacity = '0';

  setTimeout(() => {
    hero.style.display = 'none';
    main.classList.remove('hidden');
    window.scrollTo(0, 0);

    // Efek Confetti saat kado dibuka
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    // Ubah jumlah bunga jadi SEDIKIT saja saat masuk ke isi surat
    createFlowers(12); // Hanya 12 bunga agar teks tidak tertutup
  }, 500);
}

function createFlowers(amount) {
  const container = document.getElementById('petalContainer');
  if (!container) return;

  // Bersihkan bunga sebelumnya
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
