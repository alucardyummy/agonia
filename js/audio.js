export const bgMusic = new Audio('audio/Mii Editor - Mii Maker (Wii U) Music.mp3');
export const woohoo = new Audio('audio/woohoo.mp3');

bgMusic.loop = true;
bgMusic.volume = 0.05;

export function toggleMute(muteBtn) {
    bgMusic.muted = !bgMusic.muted;
    muteBtn.style.opacity = bgMusic.muted ? "0.5" : "1";
}
