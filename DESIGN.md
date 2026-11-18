# DESIGN.md: Gabriel Moura, portfolio

## Classificação
- **Tipo**: portfólio pessoal de engenheiro (serviço profissional: uma pessoa sendo contratada), com conteúdo técnico de software. Para a taste-skill: page type `software`, trade `devtool`.
- **Público e contexto de uso**:
  1. Recrutadores técnicos e não técnicos de empresas dos EUA, que leem por cerca de 30 segundos, quase sempre no desktop, vindos do LinkedIn ou de um ATS. Precisam saber cargo, senioridade, fuso, inglês, stack e provas, e ter um contato a um clique.
  2. Engenheiros que vão entrevistar. Leem com calma e querem ver decisões técnicas, tradeoffs e evidência (testes, CI, limitações assumidas).
- **Posicionamento visual (uma frase)**: o site parece um documento de design bem escrito, com fatos em tabela, decisões com motivo e o produto real na tela. Não parece vitrine de agência nem template de dev.

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
| useagentoffice.com (do próprio Gabriel) | Mostrar o produto real em vez de mockup inventado | A paleta azul/roxa e as fontes do produto, para o portfólio não parecer a landing dele |

## Tokens
Ponto de partida: taste-skill `start.mjs` → paleta `stone-blueprint`, par `plex`, raio `soft`.

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#dfdedb` | fundo de pedra |
| `--surface` | `#d3d2ce` | blocos de dados, linhas de tabela alternadas |
| `--paper` | `#ecebe7` | moldura do screenshot e painéis de decisão (o único acréscimo à paleta sorteada) |
| `--ink` | `#26251e` | texto |
| `--muted` | `#5a5850` | texto suave (contraste ≈ 5.3:1 sobre `--bg`) |
| `--line` | `#bdbbb5` | bordas de 1px e divisórias (não é texto) |
| `--accent` | `#2456d6` | links, foco, pulsos do diagrama (≈ 4.9:1 sobre `--bg`; branco sobre ele ≈ 6.5:1) |
| `--inv-bg` / `--inv-ink` | `#26251e` / `#dfdedb` | rodapé de contato e bloco de números do CRN |
| `--ok` | `#2f6b3a` | estado "aprovado" no diagrama |
| `--warn` | `#9a5b00` | estado "aguardando aprovação" no diagrama |

- Contraste: texto/fundo ≥ 4.5:1 conferido nos pares acima. `--line` só em borda.
- Espaçamento: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- Raio: 6px (botões, molduras). Tabelas e linhas sem raio.
- Sombra: nenhuma. Separação por borda de 1px e por mudança de superfície.

## Tipografia
- **IBM Plex Sans** (títulos 500, texto 400): grotesca de engenharia, sóbria, desenhada para interfaces técnicas. Combina com a ideia de documento de design e não é a Inter das landings de SaaS.
- **IBM Plex Mono** (400/500): rótulos de metadados, números de seção, nomes de tecnologia em tabela, legendas do diagrama. Nunca em parágrafo.
- Escala: 14 / 16 / 18 / 22 / 28 / 40 / 56 (hero 56 no desktop, 36 no mobile). Tracking −0.025em em ≥ 28.
- Texto corrido com no máximo 68ch. Títulos em sentence case.

## Layout
- Largura máxima 1200px, 12 colunas, margem lateral de 24px (16px no mobile). Bordas esquerda e direita iguais em todas as seções.
- Cada seção abre com uma linha de metadados em mono (`02 · Main project · 2023 to present`), ao estilo dos RFDs.
- Ritmo (cada seção tem forma própria, nenhuma repete "título + 3 cards"):
  1. **Hero**: duas colunas. À esquerda, nome, cargo, frase de posicionamento, tabela de fatos e três contatos. À direita, a captura real do AgentOffice em moldura `--paper`.
  2. **AgentOffice** (projeto principal, a seção mais longa): texto do que é e do que foi construído; diagrama de arquitetura animado (o momento da página); lista de decisões e restrições em linhas; o que ainda não faz.
  3. **CRN**: bloco invertido escuro com os números do currículo em tabela grande, depois stack e integrações em duas colunas.
  4. **Projetos menores**: Emporio Agent em formato de registro de decisões (decisão / motivo / evidência, citando o README); Mini CRM SDR em uma linha de resumo e uma lista curta.
  5. **Experiência**: tabela cronológica (período, cargo, empresa, uma linha).
  6. **Skills**: lista agrupada, como no currículo, sem ícones.
  7. **Contato**: rodapé invertido com e-mail, LinkedIn e GitHub.
- Mobile 390: tudo em uma coluna; tabelas viram listas de pares rótulo/valor; o diagrama vira vertical.

## Movimento
- **Nível 2**: entrada única do hero no carregamento, revelações pontuais no scroll e um momento animado, o diagrama de arquitetura do AgentOffice com pulsos indo da UI aos workers e voltando por Socket.IO, parando na fila de aprovação. Motivo: "tempo real" é parte do posicionamento, e o diagrama mostra o fluxo em vez de dizer "real-time". Nível 3 (3D/WebGL) descartado: não há objeto físico nem cena que acrescente informação, e pesaria no carregamento para recrutador.
- Biblioteca: CSS (keyframes e `offset-path`/SVG) + IntersectionObserver. Sem GSAP, sem three.js. `motion` só se alguma interação precisar de física, o que não é o caso.
- Durações: 180ms para hover e foco; 500ms para revelação, `cubic-bezier(0.2, 0.7, 0.2, 1)`; ciclo do diagrama de cerca de 6s.
- `prefers-reduced-motion`: sem entrada, sem revelação, diagrama estático com todos os estados visíveis.
- Hover: links sublinham ao passar o mouse, botões mudam de superfície (sem pulo), linhas de tabela clicáveis ganham `--surface`.

## Componentes
- Base: shadcn/ui (`base-nova`), só `button`. O resto é HTML semântico (tabelas, `dl`, `ol`) estilizado com Tailwind e tokens.
- Registries externos: nenhum. Nada de componentes "da moda" (marquee, shimmer, beam, bento).
- Componentes de destaque: `ArchitectureDiagram` (SVG próprio), `FactTable`, `DecisionLog`, `LangSwitch`.

## Idiomas
- Inglês em `/` (principal) e português completo em `/pt`, mesmo conteúdo, `lang` correto em cada um e `hreflang` alternado.
- Os números são idênticos nas duas versões. A frase do CRN em inglês é exatamente "~BRL 2M (~US$380K) in sales and 4,000 to 8,000 tax invoices a month". O Gabriel confirmou em 17/11/2026 que os R$ 2M são mensais.

## Proibições deste projeto
- Nenhum número, cliente, projeto ou tecnologia fora das fontes listadas. Nada de "10x", "+N clientes", porcentagens de habilidade ou barras de skill.
- Sem depoimentos, logos de clientes, foto de banco de imagem ou avatar gerado.
- Sem telefone e sem link para o PDF do currículo (ele contém o telefone).
- Sem gradiente roxo/azul, glow, glassmorphism, fundo de grid/pontos/aurora, bento grid.
- Sem ícone decorativo ao lado de cada bloco de texto, sem cards idênticos em grade de três.
- Sem copy genérica: "passionate", "crafting digital experiences", "turning ideas into reality", "revolucione", "solução completa".
- Sem dark mode com preto puro; o site é de tema claro único.
- Não usar as cores nem as fontes das landings do CRN e do AgentOffice como identidade do portfólio.

## Decisões em aberto (do dono)
- Domínio próprio: fora do escopo agora (só preview na Vercel).
- Foto pessoal: não incluída, porque não foi fornecida.
