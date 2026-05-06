export function abrirModal(id, element) {
    const modal = document.getElementById(id);
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-aberto');
    history.pushState({ modalId: id }, ""); 
    if (element) { 
        element.style.transform = 'scale(0.95)'; 
        setTimeout(() => element.style.transform = '', 100); 
    }
}

export function fecharModal(id) {
    const m = document.getElementById(id);
    if (!m) return;
    m.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.body.classList.remove('modal-aberto');
    m.querySelectorAll('video').forEach(v => v.pause());
}

export async function copiarLink() {
    const toast = document.getElementById('toast-notif');
    await navigator.clipboard.writeText(window.location.href);
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
    if (navigator.share) try { await navigator.share({ title: 'Guia Sims 4 Android', url: window.location.href }); } catch (err) {}
}

export function esperarCarregar() {
    return new Promise((resolve) => {
        const imagens = document.images;
        let carregadas = 0;
        if (imagens.length === 0) resolve();
        for (let img of imagens) {
            if (img.complete) {
                carregadas++;
            } else {
                img.onload = img.onerror = () => {
                    carregadas++;
                    if (carregadas === imagens.length) resolve();
                };
            }
        }
        if (carregadas === imagens.length) resolve();
    });
}
