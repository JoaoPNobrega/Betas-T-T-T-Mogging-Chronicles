import { Jogo } from './jogo.js';

function obterParametros() {
    const params = new URLSearchParams(window.location.search);
    const nome1 = params.get('p1')?.trim() || 'Jogador 1';
    const nome2 = params.get('p2')?.trim() || 'Jogador 2';
    const classe1 = (params.get('c1') || 'cavaleiro').toLowerCase();
    const classe2 = (params.get('c2') || 'bandido').toLowerCase();
    return [
        { nome: nome1, classe: classe1 },
        { nome: nome2, classe: classe2 }
    ];
}

function configurarBotoes(jogo) {
    document.querySelectorAll('.action-button[data-action]').forEach((botao) => {
        botao.addEventListener('click', () => {
            jogo.executarAcao(botao.dataset.action);
        });
    });
}

function inicializarIntro() {
    const intro = document.getElementById('space-intro');
    if (!intro) return;
    const esconder = () => intro.classList.add('hidden');
    intro.addEventListener('click', esconder, { once: true });
    window.setTimeout(esconder, 32000);
}

document.addEventListener('DOMContentLoaded', () => {
    const jogadoresInfo = obterParametros();
    const jogo = new Jogo({
        rootElement: document.body,
        jogadoresInfo
    });
    configurarBotoes(jogo);
    inicializarIntro();
});
