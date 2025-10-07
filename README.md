# Betas Through Space: The Mogging Chronicles

## Visão geral
Dois betinhas perdidos no espaço saltam de planeta em planeta atrás do drip
supremo. Eles começam como parceiros contra sentinelas colossais, mas a jornada
culmina na Lua da Perfidia, onde um precisará trair o outro para se tornar o
Mogger Supremo. O projeto usa apenas HTML, CSS e JavaScript puros, com
organização modular entre marcação, estilos e lógica.

## Funcionalidades atuais
- **Duas páginas dedicadas**: tela inicial (`index.html`) para coletar nomes e
  classes dos jogadores, e a arena (`game.html`) onde a partida acontece.
- **Introdução estilo Star Wars**: um "crawl" com a lore do universo abre o
  jogo e pode ser pulado a qualquer momento.
- **Boss fights cooperativas**: nas duas primeiras fases, os jogadores
  alternam turnos para derrubar um chefe planetário que devolve golpes
  automáticos.
- **Duelo final obrigatório**: ao chegar à Lua da Perfidia não há mais chefes —
  os betas se enfrentam até restar apenas um.
- **Classes JavaScript** (`Jogador`, `Fase` e `Jogo`) controlam HP, turnos,
  lista de habilidades, sinergia e temas visuais por planeta.
- **Interface dinâmica**: placares com barras de HP reativas, tabela de log,
  lista de habilidades atualizada por fase, tema visual que muda entre planetas
  e sprites estilizados inteiramente em CSS (sem depender de imagens externas).
- **Ação "Sinergizar"**: canaliza energia estelar para turbinar o próximo
  ataque com +8 de dano, incentivando a cooperação antes da traição.

> **Escopo atual:** sem modo online, sem persistência e sem uso de áudio
> externo. Toda a experiência ocorre localmente em uma única tela.

## Como executar localmente
1. Abra um terminal na pasta do projeto.
2. Inicie um servidor estático simples, por exemplo com Python:
   ```bash
   python -m http.server 8000
   ```
3. Acesse `http://localhost:8000/index.html` no navegador, configure jogadores e
   clique em **Iniciar Jogo**.

## Como jogar
1. Escolha as classes e inicie a partida. Os jogadores se alternam clicando em
   **Atacar**, **Defender** ou **Sinergizar**.
2. Nos planetas **Aurora Prisma** e **Sucata Abissal**, cada ataque mira o
   chefe local. Depois de um turno de jogador, o boss contra-ataca
   automaticamente.
3. Quando o HP do boss chegar a zero, o banner "PLANETA LIBERADO!" aparece e o
   botão **Próximo salto planetário** é liberado.
4. Caso um dos betas seja derrotado por um boss, o jogo mostra "DERROTA!" e
   oferece **Reiniciar rota** para tentar novamente desde o primeiro planeta.
5. Após vencer os dois planetas cooperativos, os betas aterrissam na **Lua da
   Perfidia**, onde lutam entre si até que um vença com o banner "TRAIÇÃO!". O
   botão **Reiniciar jornada** reinicia toda a rota.

## Visual e assets
- Os sprites dos jogadores e dos chefes são gerados via CSS (`.sprite-avatar` e
  `.boss-sprite`), garantindo que o jogo funcione mesmo sem imagens externas.
- As classes `planet-aurora`, `planet-sucata` e `planet-lua` aplicam temas
  cromáticos diferentes a cada fase.
- Caso deseje substituir as artes, basta trocar o conteúdo dos diretórios dentro
  de `assets/` e adaptar os estilos em `css/main.css`.
- O diretório `sounds/` permanece apenas como placeholder — nenhuma trilha é
  carregada pelo código.

## Estrutura de pastas
```
assets/   # reservado para artes opcionais de planetas e interface
css/      # estilos globais e temas específicos dos planetas
js/       # classes Jogador, Fase, Jogo e inicialização de eventos
sounds/   # reservado para efeitos sonoros (não utilizados nesta versão)
```

## Próximas ideias
- Ajustar o balanceamento de dano/defesa para que cada classe brilhe em fases
  diferentes.
- Criar animações extras (partículas, impactos no cenário) sincronizadas com os
  golpes mais fortes.
- Acrescentar novos planetas e bosses intermediários antes do duelo final.
- Explorar uma versão online futura usando websockets, mantendo a base local.
