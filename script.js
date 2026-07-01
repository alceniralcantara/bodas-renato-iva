const pixKey = '11972933217';
document.getElementById('copyPix').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(pixKey);
    document.getElementById('copyStatus').textContent = 'Chave Pix copiada!';
  } catch {
    document.getElementById('copyStatus').textContent = 'Chave Pix: ' + pixKey;
  }
});

// Create YouTube iframe for background music
const ytUrl = 'https://www.youtube.com/embed/eU9ChWn_G-8?autoplay=1&loop=1&playlist=eU9ChWn_G-8';
const musicFrame = document.createElement('iframe');
musicFrame.id = 'musicFrame';
musicFrame.src = ytUrl;
musicFrame.style.display = 'none';
musicFrame.allow = 'autoplay';
document.body.appendChild(musicFrame);

// Toggle music on button click
document.getElementById('musicBtn').addEventListener('click', () => {
  if (musicFrame.style.display === 'none') {
    musicFrame.style.display = 'block';
    document.getElementById('musicBtn').textContent = 'Parar música';
  } else {
    musicFrame.style.display = 'none';
    document.getElementById('musicBtn').textContent = 'Tocar música';
  }
});
