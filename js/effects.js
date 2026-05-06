let totalParticles = 0;
const MAX_PARTICLES = 50;

export function criarUmCoracao() {
    if (totalParticles >= MAX_PARTICLES) return;
    
    totalParticles++;
    
    const coracao = document.createElement('div');
    coracao.classList.add('heart-particle');
    const size = Math.random() * 50 + 45; 
    coracao.style.width = `${size}px`;
    coracao.style.height = `${size}px`;
    coracao.style.left = Math.random() * 100 + 'vw';
    coracao.style.setProperty('--random-x', (Math.random() - 0.5) * 200 + 'px');
    document.body.appendChild(coracao);

    const tempoVida = Math.random() * 3000 + 3000;
    
    setTimeout(() => {
        const rect = coracao.getBoundingClientRect();
        const x = rect.left + size/2;
        const y = rect.top + size/2;
        const sorteio = Math.random();

        if (sorteio < 0.25) {
            origemExplosaoPop(x, y);
            coracao.remove();
        } else if (sorteio < 0.50) {
            criarExplosaoFumaca(x, y); 
            coracao.remove();
        } else if (sorteio < 0.75) {
            coracao.classList.add('vibe-poeira');
            setTimeout(() => coracao.remove(), 1000);
        } else {
            coracao.classList.add('coracao-vira-fumaca');
            setTimeout(() => coracao.remove(), 1500);
        }
        
        totalParticles--; 
    }, tempoVida);
}

export function origemExplosaoPop(x, y) {
    const quantidade = 8;
    for (let i = 0; i < quantidade; i++) {
        const p = document.createElement('div');
        p.className = 'pop-bubble-original';
        p.style.left = x + 'px';
        p.style.top = y + 'px';
        p.style.setProperty('--dx', (Math.random() - 0.5) * 150 + 'px');
        p.style.setProperty('--dy', (Math.random() - 0.5) * 150 + 'px');
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 600);
    }
}

export function criarExplosaoFumaca(x, y) {
    const quantidade = 15;
    for (let i = 0; i < quantidade; i++) {
        const p = document.createElement('div');
        p.className = 'pop-bubble-fumaca';
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 80 + 20; 
        const dx = Math.cos(angle) * velocity;
        const dy = Math.sin(angle) * velocity;
        p.style.left = x + 'px';
        p.style.top = y + 'px';
        p.style.setProperty('--dx', dx + 'px');
        p.style.setProperty('--dy', dy + 'px');
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 800);
    }
}

export function criarPoeiraNoCursor(cursor) {
    for (let i = 0; i < 8; i++) {
        const p = document.createElement('div');
        p.className = 'poeira-cosmica';
        p.style.position = 'absolute';
        p.style.left = '25px'; 
        p.style.top = '25px';
        const ax = (Math.random() - 0.5) * 45;
        const ay = (Math.random() - 0.5) * 45;
        p.style.setProperty('--x', ax + 'px');
        p.style.setProperty('--y', ay + 'px');
        p.style.animation = 'brilharSuave 0.6s forwards';
        cursor.appendChild(p);
        setTimeout(() => p.remove(), 600);
    }
}

export function criarPoeiraLivre(x, y) {
    for (let i = 0; i < 10; i++) {
        const p = document.createElement('div');
        p.className = 'poeira-cosmica';
        p.style.position = 'fixed';
        p.style.left = x + 'px';
        p.style.top = y + 'px';
        const ax = (Math.random() - 0.5) * 120;
        const ay = Math.random() * 150;
        p.style.setProperty('--x', ax + 'px');
        p.style.setProperty('--y', ay + 'px');
        p.style.animation = 'brilharSuave 0.8s ease-out forwards';
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 800);
    }
}
