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
    const imagens = [...document.images];
    return Promise.all(imagens.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
            img.onload = img.onerror = resolve;
        });
    }));
}
