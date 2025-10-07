import { Jogador } from './jogador.js';
import { FASES } from './fase.js';

export class Jogo {
    constructor({ rootElement, jogadoresInfo }) {
        this.rootElement = rootElement;
        this.eraLabel = document.getElementById('era-label');
        this.logBody = document.querySelector('#log-table tbody');
        this.habilidadesList = document.getElementById('habilidades-list');
        this.brutalBanner = document.getElementById('brutal');
        this.actionButtons = Array.from(document.querySelectorAll('.action-button[data-action]'));
        this.nextPhaseBtn = document.getElementById('next-phase');

        this.bossPanel = {
            container: document.getElementById('boss-panel'),
            nome: document.getElementById('boss-name'),
            desc: document.getElementById('boss-desc'),
            hpFill: document.getElementById('boss-hp-fill'),
            hpValue: document.getElementById('boss-hp-value')
        };
        this.bossSprite = document.getElementById('boss');

        this.turnoJogadorIndex = 0;
        this.turnCounter = 1;
        this.faseIndex = 0;
        this.faseAtual = null;
        this.faseConcluida = false;
        this.vencedorAtual = null;
        this.campeonatoConcluido = false;
        this.derrotaNaFase = false;
        this.boss = null;

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
        this.nextPhaseBtn.addEventListener('click', () => this.processarProximoSalto());
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
        this.derrotaNaFase = false;
        this.boss = null;
        this.ocultarBrutal();
        this.brutalBanner.textContent = 'BRUTAL!';
        this.limparLog();
        this.jogadores.forEach((jogador) => jogador.resetarHP());
        this.turnoJogadorIndex = this.jogadores.indexOf(jogadorInicial);
        if (this.turnoJogadorIndex === -1) {
            this.turnoJogadorIndex = 0;
        }
        this.configurarBoss();
        this.atualizarPainelTurno();
        this.atualizarListaHabilidades();
        this.actionButtons.forEach((btn) => {
            btn.disabled = false;
        });
        this.nextPhaseBtn.disabled = true;
        this.nextPhaseBtn.textContent = this.faseAtual.hasBoss() ? 'Próximo salto planetário' : 'Resolver destino final';
        const narrativa = this.faseAtual.obterNarrativa();
        if (narrativa) {
            this.adicionarLog('Narrador', narrativa);
        }
    }

    configurarBoss() {
        if (this.faseAtual.hasBoss()) {
            const dados = this.faseAtual.boss;
            this.boss = {
                nome: dados.nome,
                descricao: dados.descricao,
                maxHP: dados.maxHP,
                hp: dados.maxHP,
                ataques: dados.ataques || []
            };
            this.atualizarBossPainel();
            this.bossPanel.container.classList.remove('hidden');
            if (this.bossSprite) {
                this.bossSprite.classList.remove('hidden');
                this.bossSprite.dataset.boss = this.faseAtual.slug;
            }
        } else {
            this.ocultarBoss();
        }
    }

    ocultarBoss() {
        this.bossPanel.container.classList.add('hidden');
        if (this.bossSprite) {
            this.bossSprite.classList.add('hidden');
        }
    }

    atualizarBossPainel() {
        if (!this.boss) return;
        this.bossPanel.nome.textContent = this.boss.nome;
        this.bossPanel.desc.textContent = this.boss.descricao;
        const percentual = Math.max(0, (this.boss.hp / this.boss.maxHP) * 100);
        this.bossPanel.hpFill.style.width = `${percentual}%`;
        this.bossPanel.hpValue.textContent = `${this.boss.hp} / ${this.boss.maxHP}`;
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
            'Sinergizar — canaliza energia estelar para turbinar o próximo ataque (+8 de dano).'
        ];
        if (this.faseAtual.hasBoss() && this.boss) {
            extras.push(`${this.boss.nome} — permaneçam coordenados para derrubar o guardião planetário.`);
        } else {
            extras.push('Duelo Final — todo golpe agora mira diretamente no ex-amigo.');
        }
        this.habilidadesList.innerHTML = '';
        [...habilidades, ...extras].forEach((texto) => {
            const li = document.createElement('li');
            li.textContent = `${jogadorAtual.nome}: ${texto}`;
            this.habilidadesList.appendChild(li);
        });
    }

    executarAcao(acao) {
        if (this.faseConcluida) {
            return;
        }

        const jogadorAtual = this.jogadores[this.turnoJogadorIndex];
        const outroJogador = this.jogadores[1 - this.turnoJogadorIndex];
        const dueloFinal = !this.faseAtual.hasBoss();

        switch (acao) {
            case 'atacar': {
                this.processarAtaque(jogadorAtual, dueloFinal ? outroJogador : null);
                break;
            }
            case 'defender': {
                jogadorAtual.ativarDefesa();
                this.adicionarLog(jogadorAtual.nome, 'Levantou o escudo cósmico! Próximo dano será reduzido.');
                jogadorAtual.animarDefesa();
                break;
            }
            case 'sinergia': {
                jogadorAtual.prepararSinergia();
                this.adicionarLog(jogadorAtual.nome, 'Canalizou sinergia estelar. Próximo ataque ganha +8 de dano!');
                break;
            }
            default:
                return;
        }

        if (this.faseConcluida) {
            return;
        }

        if (this.bossAtivo()) {
            this.bossContraGolpe(outroJogador);
            if (this.faseConcluida) {
                return;
            }
        }

        this.avancarTurno();
    }

    processarAtaque(atacante, alvoJogador) {
        const golpe = this.faseAtual.obterGolpeAleatorio(atacante.classe);
        const variacao = Math.floor(Math.random() * 5);
        const bonusSinergia = atacante.sinergiaBonus > 0 ? atacante.consumirSinergia() : 0;
        const bonusTexto = bonusSinergia > 0 ? ` (+${bonusSinergia} de sinergia)` : '';

        if (this.bossAtivo()) {
            const danoBase = golpe.dano + variacao + bonusSinergia;
            const danoTotal = Math.max(0, Math.round(danoBase));
            this.boss.hp = Math.max(0, this.boss.hp - danoTotal);
            atacante.animarAtaque(golpe.efeito || 'impact');
            this.animarBossImpacto(golpe.efeito || 'impact');
            const detalhe = golpe.descricao ? ` ${golpe.descricao}` : '';
            this.adicionarLog(atacante.nome, `Atacou ${this.boss.nome} com ${golpe.nome} causando ${danoTotal} de dano${bonusTexto}.${detalhe}`);
            this.atualizarBossPainel();
            if (this.boss.hp === 0) {
                this.resolverBossDerrota(atacante);
            }
        } else if (alvoJogador) {
            const danoTotal = alvoJogador.receberDano(golpe.dano + variacao + bonusSinergia);
            atacante.animarAtaque(golpe.efeito || 'impact');
            alvoJogador.receberImpacto(golpe.efeito || 'impact');
            const detalhe = golpe.descricao ? ` ${golpe.descricao}` : '';
            this.adicionarLog(atacante.nome, `Desferiu ${golpe.nome} causando ${danoTotal} de dano${bonusTexto}.${detalhe}`);
            if (!alvoJogador.estaVivo()) {
                this.resolverDueloVitoria(atacante, alvoJogador);
            }
        }
    }

    bossAtivo() {
        return Boolean(this.boss && this.boss.hp > 0);
    }

    bossContraGolpe(alvo) {
        if (!this.bossAtivo() || !alvo) return;
        const ataque = this.faseAtual.obterAtaqueBoss();
        if (!ataque) return;
        const variacao = Math.floor(Math.random() * 6);
        const danoTotal = alvo.receberDano(ataque.dano + variacao);
        this.animarBossAtaque();
        alvo.receberImpacto(ataque.efeito || 'impact');
        const detalhe = ataque.descricao ? ` ${ataque.descricao}` : '';
        this.adicionarLog(this.boss.nome, `Golpeou ${alvo.nome} com ${ataque.nome} causando ${danoTotal} de dano.${detalhe}`);
        if (!alvo.estaVivo()) {
            this.resolverDerrotaEquipe(alvo);
        }
    }

    animarBossAtaque() {
        if (!this.bossSprite) return;
        this.bossSprite.classList.remove('boss-attack');
        void this.bossSprite.offsetWidth;
        this.bossSprite.classList.add('boss-attack');
    }

    animarBossImpacto(efeito) {
        if (!this.bossSprite) return;
        const classes = ['boss-hit', 'hit-impact', 'hit-slash', 'hit-tech', 'hit-shadow'];
        classes.forEach((classe) => this.bossSprite.classList.remove(classe));
        void this.bossSprite.offsetWidth;
        const classeBase = efeito ? `hit-${efeito}` : 'hit-impact';
        this.bossSprite.classList.add('boss-hit', classeBase);
        window.setTimeout(() => {
            this.bossSprite?.classList.remove('boss-hit');
            this.bossSprite?.classList.remove(classeBase);
        }, 500);
    }

    resolverBossDerrota(jogadorFinal) {
        this.faseConcluida = true;
        this.vencedorAtual = jogadorFinal;
        this.adicionarLog('Narrador', `${this.boss.nome} foi desmontado! Preparar próximo salto.`);
        this.mostrarBrutal('PLANETA LIBERADO!');
        this.nextPhaseBtn.disabled = false;
        this.nextPhaseBtn.textContent = this.faseIndex < this.fases.length - 1 ? 'Próximo salto planetário' : 'Destino final';
        this.actionButtons.forEach((btn) => {
            btn.disabled = true;
        });
    }

    resolverDerrotaEquipe(alvo) {
        this.faseConcluida = true;
        this.derrotaNaFase = true;
        this.adicionarLog('Narrador', `${alvo.nome} tombou diante de ${this.boss.nome}. Recalculem o drip!`);
        this.mostrarBrutal('DERROTA!');
        this.nextPhaseBtn.disabled = false;
        this.nextPhaseBtn.textContent = 'Reiniciar rota';
        this.actionButtons.forEach((btn) => {
            btn.disabled = true;
        });
    }

    resolverDueloVitoria(vencedor, derrotado) {
        this.faseConcluida = true;
        this.vencedorAtual = vencedor;
        this.campeonatoConcluido = true;
        this.adicionarLog('Narrador', `${vencedor.nome} traiu ${derrotado.nome} e tomou o título de Mogger Supremo!`);
        this.mostrarBrutal('TRAIÇÃO!');
        this.nextPhaseBtn.disabled = false;
        this.nextPhaseBtn.textContent = 'Reiniciar jornada';
        this.actionButtons.forEach((btn) => {
            btn.disabled = true;
        });
    }

    mostrarBrutal(texto) {
        this.brutalBanner.textContent = texto;
        this.brutalBanner.classList.add('visible');
    }

    ocultarBrutal() {
        this.brutalBanner.classList.remove('visible');
    }

    processarProximoSalto() {
        if (this.campeonatoConcluido) {
            this.reiniciarJogo();
            return;
        }

        if (this.derrotaNaFase) {
            this.reiniciarJogo();
            return;
        }

        if (!this.faseConcluida) {
            return;
        }

        if (this.faseIndex < this.fases.length - 1) {
            const proximoIndice = this.faseIndex + 1;
            const jogadorInicial = this.vencedorAtual || this.jogadores[this.turnoJogadorIndex];
            this.iniciarFase(proximoIndice, jogadorInicial);
        } else {
            this.reiniciarJogo();
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

    reiniciarJogo() {
        this.jogadores.forEach((jogador) => {
            jogador.vitorias = 0;
        });
        this.brutalBanner.classList.remove('visible');
        this.brutalBanner.textContent = 'BRUTAL!';
        this.iniciarFase(0, this.jogadores[0]);
    }
}
