const pixKey = '11972933217';
document.getElementById('copyPix').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(pixKey); document.getElementById('copyStatus').textContent = 'Chave Pix copiada!'; }
  catch { document.getElementById('copyStatus').textContent = 'Chave Pix: ' + pixKey; }
});

let audioCtx, master, playing=false, timer;
const chords = [[261.63,329.63,392.00],[220.00,329.63,440.00],[246.94,293.66,392.00],[196.00,261.63,329.63]];
function playTone(freq, start, dur){
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine'; osc.frequency.value = freq;
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(0.035, start+0.08);
  gain.gain.exponentialRampToValueAtTime(0.001, start+dur);
  osc.connect(gain).connect(master); osc.start(start); osc.stop(start+dur+.05);
}
function scheduleMusic(){
  const now = audioCtx.currentTime;
  for(let i=0;i<8;i++){
    const chord = chords[i % chords.length];
    chord.forEach((f, idx)=>playTone(f, now+i*1.8+idx*.08, 1.55));
    playTone(chord[0]*2, now+i*1.8+.65, .9);
  }
}
document.getElementById('musicBtn').addEventListener('click', async () => {
  const btn = document.getElementById('musicBtn');
  if(!playing){
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    await audioCtx.resume();
    master = audioCtx.createGain(); master.gain.value=.75; master.connect(audioCtx.destination);
    playing=true; btn.textContent='⏸ Pausar música suave'; scheduleMusic(); timer=setInterval(scheduleMusic, 13000);
  } else {
    playing=false; btn.textContent='▶ Tocar música suave'; clearInterval(timer); if(master) master.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime+.4);
  }
});
