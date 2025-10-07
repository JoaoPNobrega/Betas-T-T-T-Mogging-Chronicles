import { Jogador } from './jogador.js';
import { FASES } from './fase.js';

export class Jogo {
    constructor({ rootElement, jogadoresInfo }) {
        this.rootElement = rootElement;
        this.eraLabel = document.getElementById('era-label');
        this.logBody = document.querySelector('#log-table tbody');
        this.habilidadesList = document.getElementById('habilidades-list');
        this.brutalBanner = document.getElementById('brutal');
        this.timeTravelBtn = document.getElementById('time-travel');
        this.actionButtons = Array.from(document.querySelectorAll('.action-button[data-action]'));

        this.turnoJogadorIndex = 0;
        this.turnCounter = 1;
        this.faseIndex = 0;
        this.faseAtual = null;
        this.faseConcluida = false;
        this.vencedorAtual = null;
        this.campeonatoConcluido = false;

        this.jogadores = jogadoresInfo.map((info, index) => new Jogador({
            nome: info.nome,
            classe: info.classe,
            painel: {
                nome: document.getElementById(`player-name-${index + 1}`),
                classe: document.getElementById(`player-class-${index + 1}`),
                hpFill: document.getElementById(`hp-fill-${index + 1}`),
                hpValue: document.getElementById(`hp-value-${index + 1}`),
                container: document.getElementById(`player-panel-${index + 1}`)
            },
            spriteElement: document.getElementById(`fighter${index + 1}`)
        }));

        this.fases = FASES;
        this.iniciarFase(0, this.jogadores[0]);
    }

    iniciarFase(indice, jogadorInicial) {
        this.faseIndex = indice;
        this.faseAtual = this.fases[this.faseIndex];
        this.faseAtual.aplicarTema(this.rootElement, this.eraLabel);
        this.turnCounter = 1;
        this.faseConcluida = false;
        this.vencedorAtual = null;
        this.campeonatoConcluido = false;
        this.ocultarBrutal();
        this.limparLog();
        this.jogadores.forEach((jogador) => jogador.resetarHP());
        this.turnoJogadorIndex = this.jogadores.indexOf(jogadorInicial);
        if (this.turnoJogadorIndex === -1) {
            this.turnoJogadorIndex = 0;
        }
        this.atualizarPainelTurno();
        this.atualizarListaHabilidades();
        this.timeTravelBtn.disabled = true;
        this.timeTravelBtn.textContent = 'Viajar no Tempo';
        this.actionButtons.forEach((btn) => {
            if (btn.dataset.action !== 'viajar') {
                btn.disabled = false;
            }
        });
        this.adicionarLog('Narrador', `A batalha pela ${this.faseAtual.nome} começou!`);
    }

    atualizarPainelTurno() {
        this.jogadores.forEach((jogador, index) => {
            if (jogador.painel.container) {
                jogador.painel.container.classList.toggle('active-turn', index === this.turnoJogadorIndex);
            }
        });
    }

    atualizarListaHabilidades() {
        if (!this.faseAtual) return;
        const jogadorAtual = this.jogadores[this.turnoJogadorIndex];
        const habilidades = this.faseAtual.listarHabilidades(jogadorAtual.classe);
        const extras = [
            'Defender — reduz pela metade o próximo dano recebido.',
            'Provocar — dispara uma frase meme para desestabilizar o rival.'
        ];
        this.habilidadesList.innerHTML = '';
        [...habilidades, ...extras].forEach((texto) => {
            const li = document.createElement('li');
            li.textContent = `${jogadorAtual.nome}: ${texto}`;
            this.habilidadesList.appendChild(li);
        });
    }

    executarAcao(acao) {
        if (this.faseConcluida && acao !== 'viajar') {
            return;
        }

        const jogadorAtual = this.jogadores[this.turnoJogadorIndex];
        const oponente = this.jogadores[1 - this.turnoJogadorIndex];

        switch (acao) {
            case 'atacar': {
                const golpe = this.faseAtual.obterGolpeAleatorio(jogadorAtual.classe);
                const variacao = Math.floor(Math.random() * 5);
                const danoTotal = oponente.receberDano(golpe.dano + variacao);
                jogadorAtual.animarAtaque(golpe.efeito || 'impact');
                oponente.receberImpacto(golpe.efeito || 'impact');
                const detalhe = golpe.descricao ? ` ${golpe.descricao}` : '';
                this.adicionarLog(jogadorAtual.nome, `Atacou com ${golpe.nome} causando ${danoTotal} de dano.${detalhe}`);
                if (!oponente.estaVivo()) {
                    this.resolverVitoria(jogadorAtual, oponente);
                }
                break;
            }
            case 'defender': {
                jogadorAtual.ativarDefesa();
                this.adicionarLog(jogadorAtual.nome, 'Levantou a defesa! Próximo dano será reduzido.');
                jogadorAtual.animarDefesa();
                break;
            }
            case 'provocar': {
                const frase = this.faseAtual.obterProvocacao();
                this.adicionarLog(jogadorAtual.nome, `Provocou: “${frase}”`);
                jogadorAtual.mostrarProvocacao(frase);
                jogadorAtual.animarProvocacao();
                break;
            }
            case 'viajar': {
                this.processarViagemTemporal();
                return;
            }
            default:
                return;
        }

        if (!this.faseConcluida) {
            this.avancarTurno();
        }
    }

    adicionarLog(jogador, descricao) {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${this.turnCounter}</td><td>${jogador}</td><td>${descricao}</td>`;
        this.logBody.appendChild(row);
        this.turnCounter += 1;
        this.logBody.scrollTop = this.logBody.scrollHeight;
    }

    limparLog() {
        this.logBody.innerHTML = '';
    }

    avancarTurno() {
        this.turnoJogadorIndex = 1 - this.turnoJogadorIndex;
        this.atualizarPainelTurno();
        this.atualizarListaHabilidades();
    }

    resolverVitoria(vencedor) {
        this.faseConcluida = true;
        this.vencedorAtual = vencedor;
        vencedor.vitorias += 1;
        this.adicionarLog('Narrador', `${vencedor.nome} dominou a ${this.faseAtual.nome}!`);
        this.mostrarBrutal('BRUTAL!');
        this.timeTravelBtn.disabled = false;
        this.actionButtons.forEach((btn) => {
            if (btn.dataset.action !== 'viajar') {
                btn.disabled = true;
            }
        });
        if (this.faseIndex === this.fases.length - 1) {
            this.declararChadSupremo(vencedor);
        }
    }

    mostrarBrutal(texto) {
        this.brutalBanner.textContent = texto;
        this.brutalBanner.classList.add('visible');
    }

    ocultarBrutal() {
        this.brutalBanner.classList.remove('visible');
    }

    processarViagemTemporal() {
        if (this.campeonatoConcluido) {
            this.reiniciarJogo();
            return;
        }

        if (!this.faseConcluida || !this.vencedorAtual) {
            return;
        }

        if (this.faseIndex < this.fases.length - 1) {
            this.iniciarFase(this.faseIndex + 1, this.vencedorAtual);
        } else {
            this.declararChadSupremo(this.vencedorAtual);
        }
    }

    declararChadSupremo(vencedor) {
        this.campeonatoConcluido = true;
        this.mostrarBrutal('CHAD SUPREMO!');
        this.adicionarLog('Narrador', `${vencedor.nome} tornou-se o Chad Supremo!`);
        this.timeTravelBtn.disabled = false;
        this.timeTravelBtn.textContent = 'Reiniciar Eras';
    }

    reiniciarJogo() {
        this.jogadores.forEach((jogador) => {
            jogador.vitorias = 0;
        });
        this.iniciarFase(0, this.jogadores[0]);
    }
}
