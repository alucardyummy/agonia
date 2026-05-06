 import { bgMusic, woohoo, toggleMute } from './audio.js';
import { criarUmCoracao, criarPoeiraNoCursor, criarPoeiraLivre } from './effects.js';
import { abrirModal, fecharModal, copiarLink, esperarCarregar } from './ui.js';

window.abrirModal = abrirModal;
window.fecharModal = fecharModal;
window.copiarLink = copiarLink;

let gifClicks = 0;
let easterEggAtivo = false;
let jaAconteceu = false;
let intervalCora;

const nhawGif = document.getElementById('pet-clicavel');
const hintCat = document.getElementById('hint-cat');
const btn = document.getElementById('btn-comecar');
const hero = document.getElementById('hero-section');
const topbar = document.getElementById('minha-topbar');
const divisor = document.getElementById('meu-divisor');
const deviceInfo = document.getElementById('device-info');
const cards = document.getElementById('guia-cards');
const cursor = document.getElementById('custom-cursor');
const bttElement = document.getElementById("backToTop");
const targetCard = document.getElementById("ultimo-card");

const muteBtn = document.createElement('button');
muteBtn.id = 'mute-control';
muteBtn.style.cssText = 'position:fixed; bottom:20px; right:20px; background:rgba(0,0,0,0.6); border:1px solid #3ec6b8; border-radius:50%; width:40px; height:40px; z-index:2000; display:none; justify-content:center; align-items:center; background-image: url("mandiueni.webp"); background-size: 80%; background-repeat: no-repeat; background-position: center; transition: 0.3s;';
document.body.appendChild(muteBtn);

if (nhawGif) {
    nhawGif.addEventListener('click', () => {
        if (jaAconteceu) return;
        gifClicks++;
        if (gifClicks === 2 && hintCat) {
            hintCat.style.opacity = "1";
        }
        if ([1, 3, 4].includes(gifClicks)) {
            document.body.classList.add('tremidinha-ativa');
            setTimeout(() => document.body.classList.remove('tremidinha-ativa'), 300);
        }
        if (gifClicks === 5) {
            jaAconteceu = true;
            easterEggAtivo = true;
            gifClicks = 0;
            if (hintCat) hintCat.style.opacity = "0";
            bgMusic.pause();
            document.body.classList.add('vibe-rosa');
            woohoo.currentTime = 0;
            woohoo.volume = 1.0;
            woohoo.play();
            intervalCora = setInterval(() => {
                if(easterEggAtivo) criarUmCoracao();
            }, 200);
            setTimeout(() => {
                clearInterval(intervalCora);
                easterEggAtivo = false;
                document.body.classList.remove('vibe-rosa');
                let fadeout = setInterval(() => {
                    if (woohoo.volume > 0.05) {
                        woohoo.volume -= 0.05;
                    } else { 
                        woohoo.pause(); 
                        bgMusic.play(); 
                        clearInterval(fadeout); 
                    }
                }, 300);
            }, 23000);
        }
    });
}

if (hintCat) {
    hintCat.addEventListener('click', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        for(let i=0; i<5; i++) {
            criarPoeiraLivre(x, y);
        }
        hintCat.style.transform = 'translateY(-10px)';
        setTimeout(() => hintCat.style.transform = 'translateY(0)', 200);
    });
}

btn.addEventListener('click', () => {
    hero.classList.add('fade-out');
    bgMusic.play().catch(() => {});
    const loaderTransicao = document.getElementById('loader-transicao');
    loaderTransicao.style.display = 'flex';
    setTimeout(() => loaderTransicao.style.opacity = "1", 50);
    setTimeout(() => {
        hero.style.display = 'none';
        topbar.style.display = 'flex';
        divisor.style.display = 'block';
        deviceInfo.style.display = 'block';
        cards.style.display = 'grid';
        muteBtn.style.display = 'flex';
        esperarCarregar().then(() => {
            loaderTransicao.style.opacity = "0";
            document.body.classList.add('blur-in');
            setTimeout(() => {
                loaderTransicao.style.display = 'none';
                topbar.style.opacity = "1";
                divisor.style.opacity = "1";
                deviceInfo.style.opacity = "1";
                cards.style.opacity = "1";
            }, 500);
        });
    }, 1000);
});

muteBtn.addEventListener('click', () => toggleMute(muteBtn));

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        easterEggAtivo = false;
        if (intervalCora) clearInterval(intervalCora);
        document.body.classList.remove('vibe-rosa');
        bgMusic.pause();
        woohoo.pause();
    } else if (hero.style.display === 'none' && !bgMusic.muted) {
        if (woohoo.paused) {
            bgMusic.play().catch(() => {});
        }
    }
}); 

window.addEventListener('popstate', (event) => {
    const modais = document.querySelectorAll('.modal-overlay');
    modais.forEach(m => {
        if (m.style.display === 'flex') {
            fecharModal(m.id);
        }
    });
});

window.addEventListener('mousedown', (e) => {
    const sorteioCursor = Math.random(); 
    if (sorteioCursor < 0.5) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursor.classList.remove('expandir-cursor');
        void cursor.offsetWidth;
        cursor.classList.add('expandir-cursor');
        criarPoeiraNoCursor(cursor);
    } else {
        criarPoeiraLivre(e.clientX, e.clientY);
    }
});

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) bttElement.classList.add("show"); else bttElement.classList.remove("show"); });
}, { threshold: 0.1 });
if (targetCard) scrollObserver.observe(targetCard);

bttElement.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
document.querySelectorAll('video').forEach(v => v.addEventListener('contextmenu', e => e.preventDefault()));

const videos = document.querySelectorAll('video');
const videoObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const video = entry.target;
            const source = video.querySelector('source');
            if (source && !source.src && source.dataset.src) {
                source.src = source.dataset.src;
                video.load();
            }
            videoObserver.unobserve(video);
        }
    });
});
videos.forEach(v => videoObserver.observe(v));
