export class Jogador {
    constructor({ nome, classe, painel, spriteElement }) {
        this.nome = nome;
        this.classe = classe;
        this.maxHP = 120;
        this.hp = this.maxHP;
        this.defesaAtiva = false;
        this.vitorias = 0;
        this.painel = painel;
        this.spriteElement = spriteElement;
        this.speechBubble = null;
        this.bubbleTimeout = null;

        if (this.spriteElement) {
            this.spriteElement.dataset.classe = this.classe;
            this.speechBubble = document.createElement('div');
            this.speechBubble.className = 'speech-bubble';
            this.spriteElement.appendChild(this.speechBubble);
        }

        this.atualizarPainel();
    }

    atualizarPainel() {
        this.painel.nome.textContent = this.nome;
        this.painel.classe.textContent = this.formatarClasse();
        this.atualizarHP();
    }

    formatarClasse() {
        return this.classe.charAt(0).toUpperCase() + this.classe.slice(1);
    }

    atualizarHP() {
        const percentual = Math.max(0, (this.hp / this.maxHP) * 100);
        this.painel.hpFill.style.width = `${percentual}%`;
        this.painel.hpValue.textContent = `${this.hp} / ${this.maxHP}`;
        if (percentual <= 35) {
            this.painel.hpFill.classList.add('low');
        } else {
            this.painel.hpFill.classList.remove('low');
        }
    }

    resetarHP() {
        this.hp = this.maxHP;
        this.defesaAtiva = false;
        this.atualizarHP();
        this.marcarDefesa(false);
        this.limparProvocacao();
        this.limparEfeitosSprite();
    }

    ativarDefesa() {
        this.defesaAtiva = true;
        this.marcarDefesa(true);
    }

    receberDano(valorBase) {
        const dano = this.defesaAtiva ? Math.ceil(valorBase / 2) : valorBase;
        this.defesaAtiva = false;
        this.hp = Math.max(0, this.hp - dano);
        this.atualizarHP();
        this.marcarDefesa(false);
        return dano;
    }

    animarAtaque(efeito = 'impact') {
        if (!this.spriteElement) return;
        this.removerClassesTemporarias(['attack-animate', 'attack-slash', 'attack-impact', 'attack-tech', 'attack-shadow']);
        void this.spriteElement.offsetWidth;
        this.spriteElement.classList.add('attack-animate');
        const classeEfeito = `attack-${efeito}`;
        this.spriteElement.classList.add(classeEfeito);
        window.setTimeout(() => {
            this.spriteElement?.classList.remove(classeEfeito);
        }, 500);
    }

    animarDefesa() {
        if (!this.spriteElement) return;
        this.spriteElement.classList.add('guard-stance');
        window.setTimeout(() => {
            this.spriteElement?.classList.remove('guard-stance');
        }, 800);
    }

    animarProvocacao() {
        if (!this.spriteElement) return;
        this.spriteElement.classList.add('taunt-glow');
        window.setTimeout(() => {
            this.spriteElement?.classList.remove('taunt-glow');
        }, 1000);
    }

    receberImpacto(efeito = 'impact') {
        if (!this.spriteElement) return;
        this.removerClassesTemporarias(['damage-flash', 'hit-slash', 'hit-impact', 'hit-tech', 'hit-shadow']);
        void this.spriteElement.offsetWidth;
        this.spriteElement.classList.add('damage-flash');
        const classeEfeito = `hit-${efeito}`;
        this.spriteElement.classList.add(classeEfeito);
        window.setTimeout(() => {
            this.spriteElement?.classList.remove('damage-flash');
            this.spriteElement?.classList.remove(classeEfeito);
        }, 500);
    }

    mostrarProvocacao(frase) {
        if (!this.speechBubble) return;
        this.speechBubble.textContent = frase;
        this.speechBubble.classList.add('visible');
        if (this.bubbleTimeout) {
            window.clearTimeout(this.bubbleTimeout);
        }
        this.bubbleTimeout = window.setTimeout(() => this.limparProvocacao(), 1800);
    }

    limparProvocacao() {
        if (!this.speechBubble) return;
        this.speechBubble.classList.remove('visible');
    }

    marcarDefesa(ativo) {
        if (!this.painel?.container) return;
        this.painel.container.classList.toggle('defending', Boolean(ativo));
    }

    limparEfeitosSprite() {
        if (!this.spriteElement) return;
        const classes = [
            'attack-animate',
            'attack-slash',
            'attack-impact',
            'attack-tech',
            'attack-shadow',
            'damage-flash',
            'hit-slash',
            'hit-impact',
            'hit-tech',
            'hit-shadow',
            'guard-stance',
            'taunt-glow'
        ];
        classes.forEach((classe) => this.spriteElement.classList.remove(classe));
    }

    removerClassesTemporarias(classes) {
        if (!this.spriteElement) return;
        classes.forEach((classe) => this.spriteElement.classList.remove(classe));
    }

    estaVivo() {
        return this.hp > 0;
    }
}
