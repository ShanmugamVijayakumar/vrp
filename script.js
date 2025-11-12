const bgMusic = document.getElementById('bgMusic');
  const muteBtn = document.getElementById('muteBtn');
  const musicIcon = document.getElementById('musicIcon');

  // Set initial state
  bgMusic.volume = 0.4;
  bgMusic.muted = false;
  musicIcon.src = 'sound.png'; // initial icon

  // Try to play after user interaction
  function playMusicOnInteraction() {
    bgMusic.play().catch(() => {});
    window.removeEventListener('click', playMusicOnInteraction);
    window.removeEventListener('keydown', playMusicOnInteraction);
  }
  window.addEventListener('click', playMusicOnInteraction);
  window.addEventListener('keydown', playMusicOnInteraction);

  // Mute toggle
  muteBtn.addEventListener('click', () => {
    bgMusic.muted = !bgMusic.muted;
    musicIcon.src = bgMusic.muted ? 'no-sound.png' : 'sound.png';
 });