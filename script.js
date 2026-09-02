const pixKey = document.getElementById('pixKey').textContent.trim();
const residentialAddress = 'Rua Silvio Gallicho, 301, Jardim Ipê, São Paulo - SP, 05797-440';

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.setAttribute('readonly', '');
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.select();
  const copied = document.execCommand('copy');
  textArea.remove();
  if (!copied) throw new Error('Não foi possível copiar');
}

document.getElementById('copyAddress').addEventListener('click', async () => {
  const status = document.getElementById('addressCopyStatus');
  try {
    await copyText(residentialAddress);
    status.textContent = 'Endereço copiado! Cole-o no endereço de entrega do Mercado Livre.';
  } catch {
    status.textContent = 'Não foi possível copiar automaticamente. Peça o endereço à família.';
  }
});

document.getElementById('copyPix').addEventListener('click', async () => {
  try {
    await copyText(pixKey);
    document.getElementById('copyStatus').textContent = 'Código Pix copiado!';
  } catch {
    document.querySelector('.pix-details').open = true;
    document.getElementById('copyStatus').textContent = 'Não foi possível copiar automaticamente. Selecione o código acima.';
  }
});

let audioCtx, master, playing = false, timer;
const chords = [
  [261.63, 329.63, 392.00],
  [220.00, 329.63, 440.00],
  [246.94, 293.66, 392.00],
  [196.00, 261.63, 329.63]
];

function playTone(freq, start, dur) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.08, start);
  gain.gain.linearRampToValueAtTime(0.035, start + 0.08);
  gain.gain.exponentialRampToValueAtTime(0.001, start + dur);
  osc.connect(gain).connect(master);
  osc.start(start);
  osc.stop(start + dur + 0.05);
}

function scheduleMusic() {
  const now = audioCtx.currentTime;
  for (let i = 0; i < 8; i++) {
    const chord = chords[i % chords.length];
    chord.forEach((f, idx) => playTone(f, now + i * 1.8 + idx * 0.08, 1.55));
    playTone(chord[0] * 2, now + i * 1.8 + 0.65, 0.9);
  }
}

document.getElementById('musicBtn').addEventListener('click', async () => {
  const btn = document.getElementById('musicBtn');
  if (!playing) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) {
      btn.textContent = 'Música indisponível neste navegador';
      btn.disabled = true;
      return;
    }
    audioCtx = new AudioContext();
    await audioCtx.resume();
    master = audioCtx.createGain();
    master.gain.value = 0.75;
    master.connect(audioCtx.destination);
    playing = true;
    btn.setAttribute('aria-pressed', 'true');
    btn.textContent = 'Pausar música suave';
    scheduleMusic();
    timer = setInterval(scheduleMusic, 14400);
  } else {
    playing = false;
    btn.setAttribute('aria-pressed', 'false');
    btn.textContent = 'Tocar música suave';
    clearInterval(timer);
    const contextToClose = audioCtx;
    const masterToFade = master;
    if (masterToFade) {
      masterToFade.gain.exponentialRampToValueAtTime(0.0001, contextToClose.currentTime + 4);
    }
    setTimeout(() => {
      if (contextToClose) {
        contextToClose.close();
      }
      if (audioCtx === contextToClose) {
        audioCtx = null;
        master = null;
      }
    }, 4000);
  }
});
