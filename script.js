document.addEventListener('DOMContentLoaded', () => {
  // Awalnya halaman kado bersih tanpa kelopak jatuh
  createPinkPetals(0);
});

function revealSite() {
  const hero = document.querySelector('.hero-section');
  const main = document.getElementById('mainContainer');
  const music = document.getElementById('bgMusic');

  // Putar musik jika ada
  if (music) {
    music.play().catch(error => console.log("Autoplay:", error));
  }

  // 1. SURPRISE: Semburan bunga meluncur ke atas persis seperti di video
  burstFlowersUpward();

  // 2. Transisi mulus (fading out kado)
  setTimeout(() => {
    hero.style.opacity = '0';
  }, 700);

  // 3. Masuk ke halaman utama kata-kata
  setTimeout(() => {
    hero.style.display = 'none';
    main.classList.remove('hidden');
    window.scrollTo(0, 0);

    // Percikan Ulang Tahun / Birthday Confetti
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#fb7185', '#fef08a', '#e11d48', '#ffffff']
      });
    }

    // Kelopak bunga pink berjatuhan sedikit di latar soft pink
    createPinkPetals(10);
  }, 1400);
}

// Efek semburan bunga meluncur ke atas
function burstFlowersUpward() {
  const giftBox = document.querySelector('.gift-box');
  if (!giftBox) return;

  const rect = giftBox.getBoundingClientRect();
  const startX = rect.left + rect.width / 2;
  const startY = rect.top;

  const flowerTypes = ['🌸', '🌺', '🌻', '🌹', '🌷', '🪷', '🌼', '💖', '✨'];
  const totalCount = 50; // Jumlah bunga yang menyembur

  for (let i = 0; i < totalCount; i++) {
    const flower = document.createElement('div');
    flower.classList.add('burst-flower');
    flower.innerText = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];

    flower.style.left = `${startX}px`;
    flower.style.top = `${startY}px`;

    // Penyebaran ke kiri/kanan dan meluncur ke atas
    const xSpread = (Math.random() - 0.5) * 340; 
    const yHeight = -(Math.random() * 280 + 160); 

    flower.style.setProperty('--tx', `${xSpread}px`);
    flower.style.setProperty('--ty', `${yHeight}px`);

    document.body.appendChild(flower);

    setTimeout(() => {
      flower.remove();
    }, 1300);
  }
}

// Kelopak/Daun Pink Berjatuhan di Halaman Utama
function createPinkPetals(amount) {
  const container = document.getElementById('petalContainer');
  if (!container) return;

  container.innerHTML = '';
  if (amount === 0) return;

  const pinkLeaves = ['🌸', '🪷', '🏵️', '🩷', '🍃'];

  for (let i = 0; i < amount; i++) {
    const leaf = document.createElement('div');
    leaf.classList.add('falling-flower');
    leaf.innerText = pinkLeaves[Math.floor(Math.random() * pinkLeaves.length)];

    const size = Math.random() * 0.8 + 0.8;
    leaf.style.fontSize = `${size}rem`;
    leaf.style.left = `${Math.random() * 100}%`;
    leaf.style.animationDuration = `${Math.random() * 5 + 4}s`;
    leaf.style.animationDelay = `${Math.random() * 3}s`;

    container.appendChild(leaf);
  }
}
