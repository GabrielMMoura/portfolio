# DESIGN.md: Gabriel Moura, portfolio

## Classificação
- **Tipo**: portfólio pessoal de engenheiro (serviço profissional: uma pessoa sendo contratada), com conteúdo técnico de software. Para a taste-skill: page type `software`, trade `devtool`.
- **Público e contexto de uso**:
  1. Recrutadores técnicos e não técnicos de empresas dos EUA, que leem por cerca de 30 segundos, quase sempre no desktop, vindos do LinkedIn ou de um ATS. Precisam saber cargo, senioridade, fuso, inglês, stack e provas, e ter um contato a um clique.
  2. Engenheiros que vão entrevistar. Leem com calma e querem ver decisões técnicas, tradeoffs e evidência (testes, CI, limitações assumidas).
- **Posicionamento visual (uma frase)**: o site é o prédio onde o Gabriel trabalha à noite. Cada andar é um produto real funcionando em pixel art, com os fatos em texto legível ao lado da cena. Não parece template de dev nem vitrine de agência.

## Conteúdo real disponível
- Currículo (Downloads, versão de 2/nov/2026): única fonte de números de tração (CRN e AgentOffice).
- `useagentoffice.com`: tagline, recursos, aprovação humana, limites, AES-256-GCM e a captura real do escritório (`office-real.png`, 2592×1458).
- `appcrn.com.br`: recursos (NFC-e, contingência SEFAZ, PIX, portal do contador). O site **não** traz números de uso.
- `github.com/GabrielMMoura/emporio-agent`: decisões com motivo no README, 133 testes pytest, CI, confiabilidade medida (7/10 → 19/20).
- `github.com/GabrielMMoura/mini-crm-sdr-ai`: RLS por workspace, chave OpenAI por usuário cifrada com AES-GCM, Edge Functions. Sem testes nem CI (não afirmar o contrário).
- Sem depoimentos, sem logos de clientes, sem foto pessoal fornecida.
- O repositório `gabrielmouradev` (portfólio antigo) **não** é fonte.

## Referências
| Referência | Princípio aproveitado | Não copiar |
|---|---|---|
| Oxide RFDs (rfd.shared.oxide.computer) | Metadados em linhas rotuladas (autor, estado, data) acima do texto; o documento como forma | O tema escuro e verde e a navegação lateral de documentação |
| Linear Method (linear.app/method) | Uma afirmação grande com muito espaço; texto de apoio curto e centrado no método | A serifa e o fundo preto do hero |
| Stripe Sessions (stripesessions.com) | Título em duas linhas, alinhado à esquerda, com metadados ao lado em corpo pequeno | A arte 3D e o gradiente pastel |
| rauno.me | Contenção: quase nenhum ornamento, interação sutil e precisa | A navegação experimental e a ausência de texto |
| ADRs (Architecture Decision Records, Nygard) | Decisão → contexto → consequência como estrutura de leitura para engenheiros | Formato burocrático completo |
| ofelipemart.gevia.co (enviada pelo Gabriel em 18/11) | Um mundo com uma metáfora só, cenas em vez de seções, personagem pixel, colecionáveis e wordmark gigante | O tema greco-romano, o bronze, os personagens, as fontes e a paleta dele |
| useagentoffice.com (do próprio Gabriel) | Mostrar o produto real em vez de mockup inventado | A paleta azul/roxa e as fontes do produto. O portfólio usa o pixel art do produto como linguagem, com a paleta própria de tijolo e âmbar |

## Revisão de 18/11/2026: o prédio (direção atual)
O Gabriel achou a versão do kit da taste-skill sem cor, sem vida, sem identidade e sem fluidez. Ele mandou como referência
ofelipemart.gevia.co: um mundo ilustrado com uma metáfora só (o escultor), cenas, personagens em pixel art e um contador de
colecionáveis. Daquele site aproveitamos os princípios: uma metáfora do começo ao fim, cada seção é uma cena, um personagem,
um jogo discreto e um wordmark gigante. **Não** copiamos o tema grego, o bronze, as colunas, os gladiadores nem as fontes dele.

**Metáfora (escolhida pelo Gabriel em 18/11/2026): o escritório.** Vem do AgentOffice, que já é um escritório em pixel art.
O site é um prédio de tijolo à noite, visto em corte lateral, com um andar por seção:
- Fachada (hero): céu noturno, prédio de tijolo, janelas acendendo uma a uma e o letreiro GABRIEL MOURA no topo.
- 3º andar, AgentOffice: agentes nas mesas com balões de status. Uma tarefa sai da fila e vai até a bandeja de aprovação,
  onde o Gabriel aprova. A captura real do produto aparece num monitor grande.
- 2º andar, CRN: balcão de loja, impressora soltando NF-e, QR do PIX e um relógio indo de 3 h para 45 min.
- Fosso do elevador: "Facts come from code." nas portas do elevador.
- 1º andar, Emporio: chat no balcão e as decisões como fichas num quadro de cortiça.
- Mezanino, Mini CRM: quadro kanban com post-its que mudam de coluna.
- Portaria: experiência num quadro de letras de recepção, skills nas prateleiras do almoxarifado e contato em três portas.
- Personagem: o Gabriel em pixel art (aprovado por ele em 18/11/2026). É genérico (óculos, camiseta) e não tenta ser um retrato.
- Jogo: 10 xícaras de café escondidas nas cenas, com o contador no cabeçalho (não cobre o texto). São botões de verdade, alcançáveis por teclado, com o número de cada uma no nome.

## Tokens
- Noite: `--night #10222b`, `--night-2 #183540`. Tijolo: `--brick #a8482f`, `--brick-dark #7a321f`.
- Luz de janela e ação no escuro: `--amber #ffbe5c`. Rótulos e ação no claro: `--terracotta #a63c22` (5,3:1 sobre a parede; o #b8452a inicial dava 4,49:1).
- Interior: `--wall #f4ead7`, `--wall-2 #e9dcc2`, `--wood #b9784a`, `--wood-dark #7d4c2c`. Plantas: `--leaf #4f8a4b`.
- Texto: `--ink #221a15`, `--ink-soft #5b4a3d` (AA sobre `--wall`). Papel: `--paper #fffaf0`.
- Tipos: Big Shoulders Display (letreiro e títulos, como os de prédio), Instrument Sans (texto, portas e a etiqueta da captura) e
  Pixelify Sans (placas, números de andar, rótulos curtos, balões das cenas e o contador; nunca texto corrido).
- Cada andar claro tem um tom de parede: AgentOffice creme, CRN pêssego `#f6e4cf`, Emporio sálvia `#eef0dd`, Mini CRM frio `#e7eef0`.
- A paleta do AgentOffice (azul-marinho e roxo) só aparece dentro da captura real do produto.

## Movimento (nível 3, com motivo)
- O motor é próprio (`public/world.js`, JS puro, canvas com `image-rendering: pixelated` a ~12 quadros por segundo,
  passo de pixel art). Cada cena só anima quando está na tela (IntersectionObserver).
- Hero: as janelas acendem uma a uma (os agentes entrando no ar) e o personagem atravessa a rua. As camadas do céu têm
  um parallax leve.
- Andares: loops curtos que mostram o que cada produto faz (aprovação, NF-e saindo, post-it mudando de coluna).
- Elevador: no desktop, um elevador desce pelo fosso na lateral conforme o scroll e mostra o andar atual.
- Com prefers-reduced-motion, cada cena é desenhada parada no quadro mais explicativo, sem parallax e sem elevador animado.
  O jogo continua funcionando.

## Implementação
- O Next.js 16 com `output: "export"` renderiza o HTML a partir de `src/content/en.ts` e `pt.ts`.
  `scripts/strip-react.mjs` tira o runtime do React; quem anima é só o `public/world.js`.
- O kit da taste-skill continua em `public/assets`, sem edição, mas a página não carrega mais o CSS nem o JS dele.
  Da pasta, só os ícones SVG das skills são usados.
- Todo o texto é HTML. Os canvases são `role="img"` com descrição; o jogo e o personagem são `<button>`.

## Idiomas
- Inglês em `/` (principal) e português completo em `/pt`, mesmo conteúdo, `lang` correto em cada um e `hreflang` alternado.
- Os números são idênticos nas duas versões. A frase do CRN em inglês é exatamente "~BRL 2M (~US$380K) in sales and 4,000 to 8,000 tax invoices a month". O Gabriel confirmou em 17/11/2026 que os R$ 2M são mensais, que o fuso é UTC-4 (Cuiabá; o currículo diz UTC-3) e que pode ser contratado como contractor ou via EOR, sem visto de trabalho nos EUA.

## Proibições deste projeto
- Nenhum número, cliente, projeto ou tecnologia fora das fontes listadas. Nada de "10x", "+N clientes", porcentagens de habilidade ou barras de skill.
- Sem depoimentos, logos de clientes ou foto de banco de imagem. O único avatar é o personagem pixel aprovado em 18/11/2026.
- Sem telefone e sem link para o PDF do currículo (ele contém o telefone).
- Sem gradiente roxo/azul, glassmorphism, fundo de grid/pontos/aurora, bento grid. O brilho âmbar das janelas é luz da cena, não glow decorativo.
- Sem ícone decorativo ao lado de cada bloco de texto, sem cards idênticos em grade de três.
- Sem copy genérica: "passionate", "crafting digital experiences", "turning ideas into reality", "revolucione", "solução completa".
- Sem dark mode com preto puro; o site é de tema claro único.
- Não usar as cores nem as fontes das landings do CRN e do AgentOffice como identidade do portfólio.

## Decisões em aberto (do dono)
- Domínio próprio: fora do escopo agora (só preview na Vercel).
- Foto pessoal: não incluída, porque não foi fornecida.
