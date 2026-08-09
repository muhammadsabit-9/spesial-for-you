document.addEventListener('DOMContentLoaded', () => {
  // Saat halaman kado awal, tidak ada kelopak bunga jatuh
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

  // 1. SURPRISE: Semburan bunga meluncur ke atas dari kotak kado
  burstFlowersUpward();

  // 2. Transisi mulus memudarkan kado
  setTimeout(() => {
    hero.style.opacity = '0';
  }, 700);

  // 3. Masuk ke halaman utama (surat)
  setTimeout(() => {
    hero.style.display = 'none';
    main.classList.remove('hidden');
    window.scrollTo(0, 0);

    // Percikan Ulang Tahun (Confetti)
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f472b6', '#fb7185', '#fef08a', '#e11d48']
      });
    }

    // MUNCULKAN KELOPAK PINK SEDIKIT (Cuma 7 kelopak agar estetik & tidak ramai)
    createPinkPetals(7);
  }, 1400);
}

// Efek semburan kejutan bunga meluncur ke atas dari kado
function burstFlowersUpward() {
  const giftBox = document.querySelector('.gift-box');
  if (!giftBox) return;

  const rect = giftBox.getBoundingClientRect();
  const startX = rect.left + rect.width / 2;
  const startY = rect.top;

  const flowerTypes = ['🌸', '🌺', '🌻', '🌹', '🌷', '🪷', '🌼', '💖', '✨'];
  const totalCount = 45;

  for (let i = 0; i < totalCount; i++) {
    const flower = document.createElement('div');
    flower.classList.add('burst-flower');
    flower.innerText = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];

    flower.style.left = `${startX}px`;
    flower.style.top = `${startY}px`;

    const xSpread = (Math.random() - 0.5) * 320; 
    const yHeight = -(Math.random() * 260 + 150); 

    flower.style.setProperty('--tx', `${xSpread}px`);
    flower.style.setProperty('--ty', `${yHeight}px`);

    document.body.appendChild(flower);

    setTimeout(() => {
      flower.remove();
    }, 1300);
  }
}

// Kelopak Bunga Pink Jatuh Lembut (Mirip Screenshot)
function createPinkPetals(amount) {
  const container = document.getElementById('petalContainer');
  if (!container) return;

  container.innerHTML = '';
  if (amount === 0) return;

  // Menggunakan bentuk kelopak pink simpel agar persis seperti di gambar
  const pinkPetals = ['🌸', '🌸', '🩷', '💮'];

  for (let i = 0; i < amount; i++) {
    const petal = document.createElement('div');
    petal.classList.add('falling-flower');
    petal.innerText = pinkPetals[Math.floor(Math.random() * pinkPetals.length)];

    // Ukuran dibuat agak kecil & sedang biar tidak terlalu besar
    const size = Math.random() * 0.4 + 0.8; // 0.8rem - 1.2rem
    petal.style.fontSize = `${size}rem`;
    petal.style.left = `${Math.random() * 90 + 5}%`;
    petal.style.animationDuration = `${Math.random() * 4 + 5}s`; // Jatuh perlahan
    petal.style.animationDelay = `${Math.random() * 4}s`;

    container.appendChild(petal);
  }
}
