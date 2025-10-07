export class Fase {
    constructor({ nome, slug, golpes, boss, narrativa }) {
        this.nome = nome;
        this.slug = slug;
        this.golpes = golpes;
        this.boss = boss || null;
        this.narrativa = narrativa;
    }

    aplicarTema(rootElement, labelElement) {
        const classesParaRemover = Array.from(rootElement.classList).filter((classe) => classe.startsWith('planet-'));
        classesParaRemover.forEach((classe) => rootElement.classList.remove(classe));
        rootElement.classList.add(`planet-${this.slug}`);
        if (labelElement) {
            labelElement.textContent = this.nome;
        }
    }

    hasBoss() {
        return Boolean(this.boss);
    }

    obterGolpeAleatorio(classe) {
        const lista = this.golpes[classe] || this.golpes.comum || [];
        return lista[Math.floor(Math.random() * lista.length)];
    }

    listarHabilidades(classe) {
        const lista = this.golpes[classe] || this.golpes.comum || [];
        return lista.map((golpe) => {
            const descricao = golpe.descricao ? ` — ${golpe.descricao}` : '';
            return `${golpe.nome} — ${golpe.dano} de dano base${descricao}`;
        });
    }

    obterNarrativa() {
        return this.narrativa;
    }

    obterAtaqueBoss() {
        if (!this.boss) return null;
        const ataques = this.boss.ataques || [];
        return ataques[Math.floor(Math.random() * ataques.length)];
    }
}

export const FASES = [
    new Fase({
        nome: 'Aurora Prisma',
        slug: 'aurora',
        narrativa: 'No planeta Aurora Prisma, cristais cantores desafiam qualquer beta a provar seu brilho.',
        golpes: {
            cavaleiro: [
                { nome: 'Estocada Prismática', dano: 18, efeito: 'slash', descricao: 'Canaliza luz dos anéis do planeta.' },
                { nome: 'Escudo Boreal', dano: 20, efeito: 'impact', descricao: 'Um impacto reluzente que cega o alvo.' },
                { nome: 'Lança de Aurora', dano: 16, efeito: 'slash', descricao: 'Projeta feixes cintilantes.' },
                { nome: 'Corte Refletido', dano: 21, efeito: 'slash', descricao: 'Redireciona o brilho da galáxia.' },
                { nome: 'Golpe Estelar Nobre', dano: 19, efeito: 'impact', descricao: 'Golpeia com aura de constelações.' }
            ],
            bandido: [
                { nome: 'Adaga Nebulosa', dano: 17, efeito: 'shadow', descricao: 'Surge da névoa colorida.' },
                { nome: 'Roubo de Luz', dano: 15, efeito: 'tech', descricao: 'Suga a energia dos cristais do inimigo.' },
                { nome: 'Flecha Prisma', dano: 19, efeito: 'slash', descricao: 'Projétil facetado que ricocheteia.' },
                { nome: 'Golpe Eclipse', dano: 21, efeito: 'shadow', descricao: 'Desaparece antes de ferir pelas costas.' },
                { nome: 'Arremesso de Cristal', dano: 18, efeito: 'impact', descricao: 'Estilhaços orbitais atingem em cheio.' }
            ],
            ciborgue: [
                { nome: 'Pulso Lótico', dano: 19, efeito: 'tech', descricao: 'Desalinha os cristais cantores.' },
                { nome: 'Circuito Boreal', dano: 18, efeito: 'tech', descricao: 'Sobrecarga neon direto no alvo.' },
                { nome: 'Martelo Fotônico', dano: 20, efeito: 'impact', descricao: 'Golpe com projétil sólido de luz.' },
                { nome: 'Descarga Prisma', dano: 21, efeito: 'tech', descricao: 'Explosão de dados coloridos.' },
                { nome: 'Serra de Gravidade', dano: 22, efeito: 'slash', descricao: 'Curva o espaço ao cortar.' }
            ]
        },
        boss: {
            nome: 'Guardião Prisma',
            descricao: 'Holograma ancestral que protege a passagem estelar.',
            maxHP: 170,
            ataques: [
                { nome: 'Luz Fractal', dano: 18, efeito: 'tech', descricao: 'Quebra defesas com reflexos infinitos.' },
                { nome: 'Canhão Cintilante', dano: 22, efeito: 'impact', descricao: 'Explode em feixe contínuo.' },
                { nome: 'Rajada Espectral', dano: 20, efeito: 'slash', descricao: 'Atravessa quem ousa se aproximar.' },
                { nome: 'Eco Lumínico', dano: 24, efeito: 'tech', descricao: 'Rebate o último golpe recebido.' }
            ]
        }
    }),
    new Fase({
        nome: 'Sucata Abissal',
        slug: 'sucata',
        narrativa: 'Drifts de metal retorcido escondem o Colosso Sucateiro, mestre dos motores traidores.',
        golpes: {
            cavaleiro: [
                { nome: 'Lâmina de Ferrugem', dano: 20, efeito: 'slash', descricao: 'Espada coberta de faíscas.' },
                { nome: 'Escudo Turbinado', dano: 22, efeito: 'impact', descricao: 'Pega impulso com turbinas quebradas.' },
                { nome: 'Carga de Guincho', dano: 24, efeito: 'impact', descricao: 'Empurra com guincho gravitacional.' },
                { nome: 'Tempestade de Rebites', dano: 21, efeito: 'slash', descricao: 'Chuva de peças afiada.' },
                { nome: 'Golpe Forjado', dano: 23, efeito: 'impact', descricao: 'Martela metal líquido na armadura inimiga.' }
            ],
            bandido: [
                { nome: 'Arremesso de Chave Inglesa', dano: 21, efeito: 'impact', descricao: 'Ferramenta vira míssil surpresa.' },
                { nome: 'Explosivo Improvisado', dano: 23, efeito: 'shadow', descricao: 'Bomba feita com sucata radioativa.' },
                { nome: 'Cabo de Aço', dano: 20, efeito: 'slash', descricao: 'Puxa o alvo antes do golpe final.' },
                { nome: 'Salto entre Contêineres', dano: 22, efeito: 'shadow', descricao: 'Desaparece entre pilhas metálicas.' },
                { nome: 'Corrente de Plasma Velho', dano: 24, efeito: 'tech', descricao: 'Eletrocutada com cabos descascados.' }
            ],
            ciborgue: [
                { nome: 'Serrar e Soldar', dano: 23, efeito: 'slash', descricao: 'Substitui braço por lâmina giratória.' },
                { nome: 'Pulso de Sucata', dano: 25, efeito: 'tech', descricao: 'Descarga que recicla oponente.' },
                { nome: 'Perfuratriz Órbita', dano: 24, efeito: 'impact', descricao: 'Broca gigante arranca defesas.' },
                { nome: 'Vórtice Magnético', dano: 22, efeito: 'tech', descricao: 'Atrai e colide restos metálicos.' },
                { nome: 'Chute Hidráulico', dano: 26, efeito: 'impact', descricao: 'Pistões pesados esmagam com estilo.' }
            ]
        },
        boss: {
            nome: 'Colosso Sucateiro',
            descricao: 'Gigante automontado com motores abandonados.',
            maxHP: 210,
            ataques: [
                { nome: 'Pisada Sísmica', dano: 22, efeito: 'impact', descricao: 'Ondas metálicas pelo campo inteiro.' },
                { nome: 'Guindaste Giratório', dano: 24, efeito: 'slash', descricao: 'Braços giram como lâminas.' },
                { nome: 'Forja Ardente', dano: 26, efeito: 'tech', descricao: 'Expele metal derretido sobre o alvo.' },
                { nome: 'Prensa Traidora', dano: 28, efeito: 'impact', descricao: 'Tenta esmagar um beta de cada vez.' }
            ]
        }
    }),
    new Fase({
        nome: 'Lua da Perfidia',
        slug: 'lua',
        narrativa: 'Após derrotarem todos os chefes, os betas encaram a lua onde apenas um será Mogger Supremo.',
        golpes: {
            cavaleiro: [
                { nome: 'Juramento Quebrado', dano: 25, efeito: 'slash', descricao: 'Um último voto convertido em lâmina.' },
                { nome: 'Impacto da Coroa', dano: 27, efeito: 'impact', descricao: 'Canaliza toda a honra traída.' },
                { nome: 'Sabre Lunar', dano: 24, efeito: 'slash', descricao: 'Brilho prateado corta expectativas.' },
                { nome: 'Investida do Traidor', dano: 28, efeito: 'impact', descricao: 'Corre como se fugisse da culpa.' },
                { nome: 'Dilacerar Constelar', dano: 26, efeito: 'slash', descricao: 'Constelações se partem no golpe.' }
            ],
            bandido: [
                { nome: 'Punhal da Traição', dano: 24, efeito: 'shadow', descricao: 'Golpe sussurrado entre amigos.' },
                { nome: 'Sombra Inescapável', dano: 26, efeito: 'shadow', descricao: 'A lua projeta o rival contra si.' },
                { nome: 'Arco Obscuro', dano: 25, efeito: 'slash', descricao: 'Flechas orbitais cercam o alvo.' },
                { nome: 'Golpe do Acerto', dano: 27, efeito: 'impact', descricao: 'Corta antes mesmo do rival perceber.' },
                { nome: 'Olhar que Apunhala', dano: 29, efeito: 'shadow', descricao: 'Intimida antes do golpe fatal.' }
            ],
            ciborgue: [
                { nome: 'Reset Final', dano: 26, efeito: 'tech', descricao: 'Apaga memórias compartilhadas.' },
                { nome: 'Exploit da Amizade', dano: 28, efeito: 'tech', descricao: 'Usa confiança acumulada como vírus.' },
                { nome: 'Chute de Antimatéria', dano: 30, efeito: 'impact', descricao: 'Remove o colega do plano físico.' },
                { nome: 'Pulso Desleal', dano: 27, efeito: 'tech', descricao: 'Estouro elétrico na última hora.' },
                { nome: 'Fio da Perdição', dano: 29, efeito: 'slash', descricao: 'Lâmina energética que corta laços.' }
            ]
        }
    })
];
