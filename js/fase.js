export class Fase {
    constructor({ nome, slug, golpes, provocacoes }) {
        this.nome = nome;
        this.slug = slug;
        this.golpes = golpes;
        this.provocacoes = provocacoes;
    }

    aplicarTema(rootElement, labelElement) {
        rootElement.classList.remove('era-medieval', 'era-moderna', 'era-futurista');
        rootElement.classList.add(`era-${this.slug}`);
        if (labelElement) {
            labelElement.textContent = this.nome;
        }
    }

    obterGolpeAleatorio(classe) {
        const lista = this.golpes[classe] || this.golpes.comum;
        return lista[Math.floor(Math.random() * lista.length)];
    }

    listarHabilidades(classe) {
        const lista = this.golpes[classe] || this.golpes.comum;
        return lista.map((golpe) => {
            const descricao = golpe.descricao ? ` — ${golpe.descricao}` : '';
            return `${golpe.nome} — ${golpe.dano} de dano base${descricao}`;
        });
    }

    obterProvocacao() {
        return this.provocacoes[Math.floor(Math.random() * this.provocacoes.length)];
    }
}

export const FASES = [
    new Fase({
        nome: 'Era Medieval',
        slug: 'medieval',
        golpes: {
            cavaleiro: [
                { nome: 'Espadada Virtuosa', dano: 18, efeito: 'slash', descricao: 'Corta com honra ancestral.' },
                { nome: 'Investida Nobre', dano: 20, efeito: 'impact', descricao: 'Empurra o rival com armadura reluzente.' },
                { nome: 'Lança Memética', dano: 16, efeito: 'slash', descricao: 'Uma estocada que viraliza na taverna.' },
                { nome: 'Giro do Graal', dano: 22, efeito: 'slash', descricao: 'Gira a espada em arco cintilante.' },
                { nome: 'Trombetada Chad', dano: 19, efeito: 'impact', descricao: 'Abala o campo com um estrondo cavaleiresco.' }
            ],
            bandido: [
                { nome: 'Adaga do Backstab', dano: 17, efeito: 'shadow', descricao: 'Corta pelas costas sem avisar.' },
                { nome: 'Bomba de Fumaça', dano: 15, efeito: 'impact', descricao: 'Confunde o alvo com explosão estilosa.' },
                { nome: 'Mãos Leves do Ladrão', dano: 14, efeito: 'shadow', descricao: 'Rouba a confiança do oponente.' },
                { nome: 'Flecha com Meme', dano: 19, efeito: 'slash', descricao: 'Projétil com bilhete “cope” grudado.' },
                { nome: 'Virote Fantasma', dano: 21, efeito: 'shadow', descricao: 'Atinge por onde ninguém esperava.' }
            ],
            ciborgue: [
                { nome: 'Bug da Linha do Tempo', dano: 19, efeito: 'tech', descricao: 'Glitch temporal que distorce o alvo.' },
                { nome: 'Laser Improvisado', dano: 18, efeito: 'tech', descricao: 'Raio montado com sucata medieval.' },
                { nome: 'Chip da Era Errada', dano: 17, efeito: 'impact', descricao: 'Atualização forçada no cérebro rival.' },
                { nome: 'Descarga Crono', dano: 21, efeito: 'tech', descricao: 'Curto circuito em toda a armadura.' },
                { nome: 'Punho de Engrenagens', dano: 20, efeito: 'impact', descricao: 'Soco pesado com pistões a vapor.' }
            ]
        },
        provocacoes: [
            'cope harder, camponês!',
            'seu drip é de saco de batata!',
            'vou te mandar de volta para a taverna, beta!'
        ]
    }),
    new Fase({
        nome: 'Era Moderna',
        slug: 'moderna',
        golpes: {
            cavaleiro: [
                { nome: 'Taco de Beisebol do Chad', dano: 20, efeito: 'impact', descricao: 'Rebate com força e estilo urbano.' },
                { nome: 'Crossfit Excalibur', dano: 22, efeito: 'impact', descricao: 'WOD inteiro na cara do oponente.' },
                { nome: 'Estocada Parkour', dano: 21, efeito: 'slash', descricao: 'Pulo na parede antes de perfurar.' },
                { nome: 'Combo Influencer', dano: 19, efeito: 'slash', descricao: 'Golpe enquanto grava vlog.' },
                { nome: 'Escudo Pop-up', dano: 24, efeito: 'impact', descricao: 'Barra o caminho com um food truck blindado.' }
            ],
            bandido: [
                { nome: 'Roubo de Wi-Fi', dano: 19, efeito: 'tech', descricao: 'Suga banda larga e energia vital.' },
                { nome: 'Spray de Grafite', dano: 18, efeito: 'impact', descricao: 'Cega o inimigo com tinta neon.' },
                { nome: 'Drift de Patinete', dano: 22, efeito: 'impact', descricao: 'Chega deslizando e atropela a autoestima.' },
                { nome: 'Golpe de Pix', dano: 23, efeito: 'tech', descricao: 'Transferência instantânea de dano.' },
                { nome: 'Sarrafo Streetwear', dano: 20, efeito: 'slash', descricao: 'Corta usando corrente de ouro falsa.' }
            ],
            ciborgue: [
                { nome: 'Drone Improvisado', dano: 23, efeito: 'tech', descricao: 'Explode com eletrodos reciclados.' },
                { nome: 'Overclock Gamer', dano: 20, efeito: 'tech', descricao: 'Libera RGB e FPS na cara do rival.' },
                { nome: 'Spam de Notificações', dano: 18, efeito: 'impact', descricao: 'Bombardeio mental de alertas tóxicos.' },
                { nome: 'Luva de Impressora 3D', dano: 24, efeito: 'impact', descricao: 'Punho feito em PLA quente.' },
                { nome: 'Chute de Jetpack', dano: 26, efeito: 'tech', descricao: 'Impulso a jato direto na cara.' }
            ]
        },
        provocacoes: [
            'meu meme já te cancelou no twitter!',
            'teu mogging tá preso em 2009!',
            'vai treinar antes de tentar me soltar um golpe, beta!'
        ]
    }),
    new Fase({
        nome: 'Era Futurista',
        slug: 'futurista',
        golpes: {
            cavaleiro: [
                { nome: 'Espada de Luz Sigma', dano: 24, efeito: 'slash', descricao: 'Lâmina fotônica que deixa trilha neon.' },
                { nome: 'Investida Cibernética', dano: 26, efeito: 'impact', descricao: 'Arremetida com propulsores gravitacionais.' },
                { nome: 'Escudo Holográfico Explosivo', dano: 23, efeito: 'tech', descricao: 'O escudo se projeta e implode na volta.' },
                { nome: 'Queda de Satélite', dano: 28, efeito: 'impact', descricao: 'Chama um mini satélite direto no alvo.' },
                { nome: 'Golpe Quantum Drip', dano: 25, efeito: 'slash', descricao: 'Fratura a realidade enquanto desfila.' }
            ],
            bandido: [
                { nome: 'Hack do Multiverso', dano: 25, efeito: 'tech', descricao: 'Invade timelines alternativas do rival.' },
                { nome: 'Teleporte de Carteiras', dano: 24, efeito: 'shadow', descricao: 'Roubo instantâneo da coragem alheia.' },
                { nome: 'Balestra de Plasma', dano: 27, efeito: 'slash', descricao: 'Projeta setas de energia pura.' },
                { nome: 'Chuva de Bitcoins', dano: 26, efeito: 'impact', descricao: 'Moedas pesadas caem como meteoros.' },
                { nome: 'Sombra Nanite', dano: 29, efeito: 'shadow', descricao: 'Enxame de nanobots devora o drip adversário.' }
            ],
            ciborgue: [
                { nome: 'Pulso Quantizado', dano: 28, efeito: 'tech', descricao: 'Onda que desintegra bits de autoestima.' },
                { nome: 'Míssil de Dados', dano: 27, efeito: 'tech', descricao: 'Pacote de informações supersônico.' },
                { nome: 'Firewall Ofensivo', dano: 26, efeito: 'impact', descricao: 'Barreira que empurra com chamas digitais.' },
                { nome: 'Exploit Final', dano: 29, efeito: 'tech', descricao: 'Abre vulnerabilidade direto no ego.' },
                { nome: 'Chute Antimatéria', dano: 30, efeito: 'impact', descricao: 'Desfaz moléculas com uma bicuda.' }
            ]
        },
        provocacoes: [
            'no futuro nem lembram do teu nome, beta!',
            'tua linhagem foi nerfada pelo meta!',
            'vou te deletar da timeline!'
        ]
    })
];
