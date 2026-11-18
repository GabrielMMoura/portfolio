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

## Revisão de 17/11/2026: o kit da taste-skill
O Gabriel achou a primeira versão estática e sem o plugin. A camada visual foi refeita com o kit da
taste-skill (`public/assets`, copiado sem edição, licença MIT em `public/assets/LICENSE-taste-skill.txt`).
O conteúdo verificado e as regras de dados continuam os mesmos.

Sorteio (scripts da taste-skill, histórico em `.taste-skill/`, fora do git):
- tipo `software`; paleta `stone-blueprint`; par `plex` (IBM Plex Sans + Mono); raio `soft`
- hero `collage`: texto em span-5 e a tela real do AgentOffice numa janela sobre fundo iluminado (span-6 start-7).
  O primeiro sorteio foi `triptych`, que pedia de 3 a 5 peças por conjunto. Como só existe uma captura real, o sorteio foi refeito com `--has ui`.
- efeito `silk-folds` no fundo do hero (o único WebGL vivo), com botão de pausa do kit
- momentos `letters-assemble` em #statement ("Facts come from code.") e `line-carries-colour` em #crn (troca para o fundo escuro)
- nav-mega, close-word, footer-columns, ritmo dark-band, botões pill, marca dots, fundo sand

## Tokens
Os do `start.mjs`, sem alteração: `--p-bg #dfdedb`, `--p-surface #d3d2ce`, `--p-ink #26251e`,
`--p-muted #5a5850` (só rótulos), `--p-accent/--p-action #2456d6`, inverso `#26251e` / `#dfdedb`.
O kit deriva `--ink`, `--muted`, `--line`, `--surface` e a escala `--s-1…--s-10`. O `public/site.css` usa só esses tokens.

## Movimento (nível 3, com motivo)
- Entrada do hero (motion.js), uma vez por visita.
- Shader `silk-folds` atrás da janela do hero e loop de 3 passos no cartão de aprovação. Os dois mostram o fluxo que é o diferencial do produto: rascunho, espera, aprovação.
- Dois diagramas do kit com pulsos (bowtie de fontes e aprovação; lanes da fila de tarefas), com ícones reais.
- Dois momentos, cada um na sua seção. Nada mais se move com o scroll.
- Com prefers-reduced-motion, nada se move: os momentos ficam em `is-done`, os loops param e o conteúdo fica inteiro.

## Implementação
- O Next.js 16 com `output: "export"` renderiza o HTML. `scripts/strip-react.mjs` tira o runtime do React do `out/`,
  porque o JS do kit manipula o DOM e brigaria com a hidratação. O site não tem estado de cliente.
- Ícones reais via `icons.mjs` em `public/assets/icons` (logos CC0 e Simple Icons), com créditos em `icons-credits.json`.
- shadcn/ui e Tailwind foram removidos nessa revisão: o sistema de botões, cartões e grid é o do kit.

## Idiomas
- Inglês em `/` (principal) e português completo em `/pt`, mesmo conteúdo, `lang` correto em cada um e `hreflang` alternado.
- Os números são idênticos nas duas versões. A frase do CRN em inglês é exatamente "~BRL 2M (~US$380K) in sales and 4,000 to 8,000 tax invoices a month". O Gabriel confirmou em 17/11/2026 que os R$ 2M são mensais, que o fuso é UTC-4 (Cuiabá; o currículo diz UTC-3) e que pode ser contratado como contractor ou via EOR, sem visto de trabalho nos EUA.

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
