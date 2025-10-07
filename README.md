# Betas Through Time: The Mogging Chronicles

## Visão geral
Jogo de luta em turnos para dois jogadores humanos que atravessam três eras —
Medieval, Moderna e Futurista — para descobrir quem se torna o "Chad Supremo".
O projeto foi desenvolvido apenas com HTML, CSS e JavaScript puros, mantendo a
separação total entre marcação, estilos e lógica.

## Funcionalidades atuais
- **Duas páginas dedicadas**: tela inicial (`index.html`) para configurar nomes e
  classes, e a arena (`game.html`) onde a partida acontece.
- **Classes JavaScript** para representar jogadores, fases e o controlador do
  jogo, com gerenciamento de turnos, HP, defesas, provocações e viagens no
  tempo.
- **Interface dinâmica** com placar reativo, tabela de log de ações,
  atualização da lista de habilidades por era, animações de ataque/impacto e
  troca de temas visuais.
- **Fluxo de eras**: vitória mostra o banner "BRUTAL", libera viagem temporal,
  reseta o log e aplica o novo tema. Ao vencer a última era o jogo pode ser
  reiniciado.

Com esses elementos o jogo está funcional para partidas locais entre dois
jogadores na mesma tela.

> **Escopo atual:** não há modo online nem persistência em disco/localStorage —
> todo o foco está em partidas presenciais na mesma máquina.

## Como executar localmente
1. Abra um terminal na pasta do projeto.
2. Inicie um servidor estático simples, por exemplo com Python:
   ```bash
   python -m http.server 8000
   ```
3. Acesse `http://localhost:8000/index.html` no navegador, configure jogadores e
   clique em **Iniciar Jogo**.

## Como jogar
1. Os jogadores alternam turnos clicando nos botões **Atacar**, **Defender** ou
   **Provocar**.
2. Após zerar o HP do adversário, clique em **Viajar no Tempo** para avançar de
   era com o vencedor da rodada.
3. Repita até alguém vencer a Era Futurista e conquistar o título de Chad
   Supremo. Utilize o mesmo botão para reiniciar o ciclo de eras.

## Próximos passos sugeridos
- Substituir os placeholders por sprites e sons reais usando as recomendações
  abaixo.
- Ajustar valores de dano/defesa conforme feedback das partidas para manter o
  equilíbrio entre classes.
- Criar uma camada de feedback adicional (ex.: flashes na arena ou variações de
  iluminação) sincronizada com os golpes mais fortes.

## Estrutura de pastas
```
assets/   # diretórios reservados para sprites e artes das eras
css/      # estilos globais e temas específicos de cada era
js/       # classes Jogador, Fase e controlador Jogo + eventos da UI
sounds/   # efeitos sonoros (reservados)
```

## Recomendações de sprites e sons
Para facilitar a troca dos placeholders, abaixo estão sugestões de arquivos,
pasta de destino e o momento em que cada mídia é utilizada. Os nomes seguem o
formato esperado pelo código; basta substituir os arquivos `README.txt` nos
diretórios de sprites quando tiver os assets reais.

### Sprites sugeridos
| Pasta de destino | Arquivo sugerido | Uso recomendado |
| --- | --- | --- |
| `assets/medieval/` | `cavaleiro-medieval.png` | Sprite base do cavaleiro durante a Era Medieval. |
| `assets/medieval/` | `bandido-medieval.png` | Sprite do bandido com trajes camponeses/malandros. |
| `assets/medieval/` | `ciborgue-medieval.png` | Visual improvisado do ciborgue fora de época. |
| `assets/moderna/` | `cavaleiro-moderna.png` | Evolução moderna do cavaleiro (street knight). |
| `assets/moderna/` | `bandido-moderna.png` | Bandido urbano com grafites e acessórios neon. |
| `assets/moderna/` | `ciborgue-moderna.png` | Corpo com upgrades RGB e gadgets atuais. |
| `assets/futurista/` | `cavaleiro-futurista.png` | Armadura fotônica do cavaleiro na era final. |
| `assets/futurista/` | `bandido-futurista.png` | Ladrão dimensional com capa digital. |
| `assets/futurista/` | `ciborgue-futurista.png` | Design final com silhueta high-tech. |

> Dica: utilize sprites com fundo transparente (PNG) e proporção aproximada de
> 3:4 para encaixar bem nos contêineres das lutas.

### Sons sugeridos
| Pasta de destino | Arquivo sugerido | Evento no jogo |
| --- | --- | --- |
| `sounds/` | `attack-slash.mp3` | Tocado quando golpes com efeito `slash` são sorteados. |
| `sounds/` | `attack-impact.mp3` | Usado para golpes de impacto (escudos, investidas, quedas). |
| `sounds/` | `attack-tech.mp3` | Associado aos ataques tecnológicos/energéticos. |
| `sounds/` | `attack-shadow.mp3` | Sugestão para golpes furtivos dos bandidos. |
| `sounds/` | `defense-guard.mp3` | Ao acionar o botão **Defender**. |
| `sounds/` | `taunt-meme.mp3` | Ao acionar **Provocar** (pode ser um efeito rápido de voz ou meme). |
| `sounds/` | `era-transition.mp3` | Ao clicar em **Viajar no Tempo** e trocar a era. |
| `sounds/` | `brutal.mp3` | Já reservado para o banner “BRUTAL!” — substitua pelo áudio final. |
| `sounds/` | `victory.mp3` | Tema curto quando alguém vira Chad Supremo. |
| `sounds/` | `teleport.mp3` | Efeito de portal usado junto do botão de viagem temporal. |

Ao adicionar os arquivos, lembre-se de referenciá-los no código JavaScript em um
futuro passo (por exemplo, disparando `Audio` específico conforme o `efeito` do
golpe).
