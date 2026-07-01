const pixKey = '11972933217';

document.getElementById('copyPix').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(pixKey);
    document.getElementById('copyStatus').textContent = 'Chave Pix copiada!';
  } catch {
    document.getElementById('copyStatus').textContent = 'Chave Pix: ' + pixKey;
  }
});

// Create hidden YouTube iframe for background music
const ytUrl = 'https://www.youtube.com/embed/eU9ChWn_G-8?autoplay=1&loop=1&playlist=eU9ChWn_G-8&controls=0&showinfo=0&modestbranding=1&rel=0';
const musicFrame = document.createElement('iframe');
musicFrame.id = 'musicFrame';
// Hide the iframe completely
musicFrame.style.position = 'absolute';
musicFrame.style.width = '0';
musicFrame.style.height = '0';
musicFrame.style.border = '0';
musicFrame.style.opacity = '0';
// Start with no source; will be set when playing
musicFrame.src = '';
musicFrame.allow = 'autoplay';
document.body.appendChild(musicFrame);

// Toggle music on button click
const musicBtn = document.getElementById('musicBtn');
musicBtn.addEventListener('click', () => {
  if (musicFrame.src) {
    // Stop the music by clearing the source
    musicFrame.src = '';
    musicBtn.textContent = 'Tocar música';
  } else {
    // Play music by setting the YouTube URL
    musicFrame.src = ytUrl;
    musicBtn.textContent = 'Parar música';
  }
});
