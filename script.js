document.addEventListener('DOMContentLoaded', () => {
  // Awalnya layar polos (0 bunga di latar)
  createPinkPetals(0);
});

function revealSite() {
  const hero = document.querySelector('.hero-section');
  const main = document.getElementById('mainContainer');
  const music = document.getElementById('bgMusic');

  if (music) {
    music.play().catch(error => console.log("Autoplay:", error));
  }

  // 1. EFEK SEMBURAN BUNGA KE ATAS DARI KADO (SEPERTI VIDEO)
  burstFlowersUpward();

  // 2. JEDA SMOOTH TRANSITION
  setTimeout(() => {
    hero.style.opacity = '0';
  }, 700);

  setTimeout(() => {
    hero.style.display = 'none';
    main.classList.remove('hidden');
    window.scrollTo(0, 0);

    // 3. PERCIKAN ULANG TAHUN (CONFETTI)
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f472b6', '#fb7185', '#fef08a', '#ffffff']
      });
    }

    // 4. MUNCULKAN KELOPAK/DAUN PINK BERJATUHAN (SEDIKIT)
    createPinkPetals(10);
  }, 1400); // Jeda 1.4 detik
}

// Semburan bunga ke atas
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

    // Arah meluncur ke atas memancar
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

// Kelopak/Daun Pink Berjatuhan
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
