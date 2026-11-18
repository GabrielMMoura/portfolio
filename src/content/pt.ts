import type { Dict } from "./en";

// Mesma regra do en.ts: todo fato vem do currículo, dos repositórios públicos,
// dos sites appcrn.com.br e useagentoffice.com ou das respostas do Gabriel (17/11/2026).

export const pt: Dict = {
  lang: "pt-BR",
  meta: {
    title: "Gabriel Moura: engenheiro full stack para SaaS e produtos de IA",
    description:
      "Fundador do CRN, um ERP de varejo usado por lojistas pagantes, e do AgentOffice, uma plataforma de agentes de IA em tempo real. TypeScript, React, Node.js e PostgreSQL. Aberto a vagas remotas.",
  },
  nav: {
    skip: "Pular para o conteúdo",
    menu: "Menu",
    work: "Projetos",
    workGroups: [
      {
        label: "Produtos que construí",
        items: [
          { href: "#agentoffice", name: "AgentOffice", line: "Agentes de IA com aprovação humana" },
          { href: "#crn", name: "CRN", line: "ERP de varejo, lojistas pagantes" },
        ],
      },
      {
        label: "Código aberto",
        items: [
          { href: "#emporio", name: "Emporio Agent", line: "Agente em Python, 133 testes" },
          { href: "#crm", name: "Mini CRM SDR", line: "CRM multi-workspace com IA" },
        ],
      },
    ],
    card: { title: "AgentOffice", line: "O escritório onde cada agente mostra seu status" },
    items: [
      { href: "#experience", label: "Experiência" },
      { href: "#skills", label: "Habilidades" },
    ],
    switchLabel: "English",
    switchShort: "EN",
    switchHref: "/",
  },
  hero: {
    title: "Engenheiro full stack para SaaS e produtos de IA",
    lead: "Fundei e construí o CRN, um ERP de varejo usado por lojistas pagantes, que processa cerca de R$ 2 milhões (~US$ 380 mil) em vendas e de 4.000 a 8.000 notas fiscais por mês, e o AgentOffice, uma plataforma de agentes de IA em tempo real.",
    ctaEmail: "Mandar e-mail",
    ctaWork: "Ver o AgentOffice",
    proof: "Lucas do Rio Verde, MT · UTC-4, no horário da costa leste dos EUA no verão de lá · Remoto, como contractor ou via EOR",
    windowTitle: "AgentOffice · escritório",
    artLabel:
      "Tela real do escritório do AgentOffice: mesas em pixel art onde os agentes de IA trabalham, com balões de status como “Lendo o Notion” e “Precisa de você”, e um rascunho esperando aprovação.",
    note: {
      title: "Post no LinkedIn",
      chip: "Aprovado",
      steps: ["Rascunho escrito por um agente", "Esperando a sua aprovação", "Você aprovou, então ele sai"],
    },
  },
  agentoffice: {
    title: "AgentOffice, uma plataforma de agentes de IA que projetei e construí.",
    titleMuted: "Em acesso antecipado.",
    intro:
      "Os agentes pesquisam, escrevem e analisam com os documentos da empresa, o Notion e o Google Drive, e nada é publicado sem aprovação humana. Construí o backend, os workers, a interface em tempo real, a cobrança e o monitoramento.",
    link: { href: "https://useagentoffice.com", label: "useagentoffice.com" },
    builtTitle: "O que eu construí",
    built: [
      { k: "Backend", v: "API em Node.js (Fastify); workers BullMQ sobre Redis executam as tarefas e a indexação de RAG" },
      { k: "Tempo real", v: "Socket.IO transmite o estado dos agentes para a interface em Next.js, incluindo o escritório 2D" },
      { k: "Orquestração", v: "LangGraph com modelos da OpenAI e da Anthropic, e busca com pgvector" },
      { k: "Cobrança", v: "Assinaturas e créditos pré-pagos no Stripe, com teto por tarefa e por dia" },
      { k: "Testes", v: "Cerca de 230 arquivos de teste no Vitest; E2E com Playwright para agentes, cobrança e onboarding" },
      { k: "Operação", v: "Prometheus, Grafana e Sentry" },
    ],
    cardProduct: {
      title: "Fontes do AgentOffice e fila de aprovação",
      line: "Os agentes leem Notion, Drive e arquivos; todo rascunho espera uma pessoa.",
    },
    cardSystem: {
      title: "Pipeline de tarefas do AgentOffice",
      line: "Workers pegam cada tarefa; o Socket.IO devolve o estado do agente.",
    },
    diagramProduct: {
      alt: "Notion, Google Drive e arquivos enviados alimentam os agentes, que pesquisam, analisam e escrevem um rascunho para o LinkedIn que espera aprovação.",
      sources: ["Notion", "Google Drive", "Seus arquivos"],
      core: "Agentes",
      targets: [
        { label: "Pesquisa", sub: "Das suas fontes" },
        { label: "Análise", sub: "Das suas fontes" },
        { label: "Rascunho LinkedIn", sub: "Espera você" },
      ],
    },
    diagramSystem: {
      alt: "Uma tarefa da interface Next.js vai para os workers BullMQ sobre Redis, que rodam o LangGraph com OpenAI e Anthropic, indexam e buscam com pgvector e transmitem o estado do agente por Socket.IO.",
      input: { label: "Tarefa", sub: "Interface Next.js" },
      core: "Workers BullMQ",
      lanes: [
        { label: "Execução LangGraph", sub: "OpenAI · Anthropic" },
        { label: "Índice RAG", sub: "pgvector" },
        { label: "Estado do agente", sub: "Socket.IO" },
      ],
    },
  },
  guarantees: {
    title: "O que o AgentOffice garante, e o que ainda não faz.",
    rules: [
      { k: "Aprovação", v: "Publicações e qualquer mudança no Company Brain compartilhado esperam uma pessoa" },
      { k: "Custo", v: "Cada tarefa e cada dia têm um teto de créditos" },
      { k: "Credenciais", v: "Credenciais de conexão criptografadas com AES-256-GCM; dados separados por workspace" },
      { k: "Arquivos", v: "PDF, DOCX, XLSX, CSV, TXT, PNG e JPG de até 10 MB, conferidos pelo conteúdo real" },
      { k: "Auditoria", v: "O histórico registra as ações sem expor senhas ou chaves" },
    ],
    notYetTitle: "Ainda não faz, como o site do produto informa",
    notYet: "Workspaces com vários usuários, escrever de volta no Notion ou no Drive e modelos Gemini.",
    shotAlt: "O escritório inteiro do AgentOffice: seis agentes nas mesas, quatro com balões de status, um marcado “Precisa de você”.",
  },
  crn: {
    title: "CRN, um ERP de varejo que construí sozinho.",
    titleMuted: "Clientes pagantes desde o fim de 2023.",
    figureLabel: "Processado pelo CRN",
    figure: "~R$ 2 milhões (~US$ 380 mil) em vendas e de 4.000 a 8.000 notas fiscais por mês",
    onboardingLabel: "Onboarding com importação de dados por cliente novo",
    onboardingFrom: "~3 h",
    onboardingTo: "~45 min",
    onboardingSr: "de cerca de 3 horas para cerca de 45 minutos, 75% mais rápido",
    body: "Um ERP multi-tenant para o varejo físico: ponto de venda, estoque, financeiro e emissão fiscal em um só produto, no lugar dos sistemas separados de nota fiscal e de gestão que os lojistas usavam. Redesenhei regras fiscais, cálculo de impostos e cálculo de margem para o próprio lojista operar sem ajuda especializada, o que reduziu os pedidos de suporte.",
    stack: [
      { k: "App", v: "React, TypeScript" },
      { k: "Dados", v: "Supabase/PostgreSQL com row-level security, Edge Functions" },
      { k: "Fiscal", v: "Serviço de notas em Docker na Oracle Cloud, integrado direto à SEFAZ" },
      { k: "Qualidade", v: "Vitest, Playwright, CI no GitHub Actions" },
    ],
    featuresLabel: "No produto",
    features: "Emissão, cancelamento e correção de NF-e e NFC-e; contingência quando a SEFAZ cai; QR Code PIX dinâmico no caixa; importação por planilha que não grava nada antes da conferência do lojista; portal para o contador da loja.",
    link: { href: "https://www.appcrn.com.br", label: "appcrn.com.br" },
  },
  statement: {
    title: "Fatos vêm do código.",
    sub: "A regra do Emporio Agent: preços, datas, prazos e descontos são calculados por código; o modelo só escolhe as ferramentas e escreve a resposta.",
  },
  emporio: {
    title: "Emporio Agent, em Python.",
    titleMuted: "Um desafio de AI Engineer: agente de atendimento de uma loja fictícia.",
    lead: "Um agente de texto que atende clientes em português: produtos, preços, pedidos e o manual de políticas da loja, com function calling da OpenAI sobre ferramentas tipadas.",
    transcriptLabel: "Uma conversa real do repositório: o agente pede e-mail ou telefone antes de mostrar um pedido.",
    cols: ["Decisão", "Por quê, segundo o README", "Evidência"],
    log: [
      {
        d: "Function calling, sem framework",
        w: "As perguntas cabem em poucas consultas; um framework acrescentaria abstração sem acrescentar capacidade nesse tamanho.",
        e: "Um loop de cerca de 60 linhas; cada consulta é uma função tipada e testada.",
      },
      {
        d: "Sem agente de SQL",
        w: "SQL escrito pelo modelo tornaria opcional a verificação de identidade da LGPD.",
        e: "`get_order_status` não devolve nada sem e-mail ou telefone correspondente.",
      },
      {
        d: "Sem embeddings para as políticas",
        w: "Um manual de 8 páginas com 10 seções: escolher a seção é exato, barato e fácil de depurar.",
        e: "Com dezenas de documentos, passaria para recuperação em trechos.",
      },
      {
        d: "Regras de prompt que falham viram código",
        w: "“Mostrar preço original e desconto” era seguido cerca de metade das vezes nas respostas sobre PIX.",
        e: "Com a string `price_display` montada por código, 19 de 20 execuções passaram.",
      },
      {
        d: "Medir cada correção",
        w: "Os comportamentos foram rodados de 10 a 20 vezes antes e depois de cada mudança.",
        e: "O fluxo de pedidos foi de 7/10 para 19/20.",
      },
    ],
    facts: ["133 testes pytest, sem rede", "CI: ruff e pytest a cada push", "Function calling da OpenAI, Python 3.11+"],
    repo: "https://github.com/GabrielMMoura/emporio-agent",
  },
  crm: {
    title: "Mini CRM SDR, um CRM multi-workspace.",
    titleMuted: "Uma prova técnica com funil em Kanban e abordagem escrita por IA.",
    stack: "React, TypeScript, Supabase (Auth, PostgreSQL, RLS, Edge Functions), API da OpenAI",
    points: [
      { k: "Isolamento", v: "Row-level security limita cada usuário aos workspaces de que ele é membro" },
      { k: "Chaves", v: "A chave da OpenAI de cada usuário é criptografada com AES-GCM numa Edge Function; o navegador recebe só metadados seguros" },
      { k: "Validação", v: "A Edge Function valida JWT, lead, campanha, workspace e participação antes de gerar" },
      { k: "Esquema", v: "Campos personalizados ficam em JSONB, então um campo novo não exige migration" },
      { k: "Falha", v: "Se a geração por IA falhar, a mudança de etapa que a disparou não é desfeita" },
    ],
    repo: "https://github.com/GabrielMMoura/mini-crm-sdr-ai",
    demo: "https://mini-crm-sdr-ai-vercel.vercel.app",
  },
  repoLabel: "Código no GitHub",
  demoLabel: "Demo no ar",
  experience: {
    title: "Experiência",
    titleMuted: "De aprendiz de desenvolvimento a fundador.",
    rows: [
      {
        when: "2023 até hoje",
        role: "Fundador e Engenheiro Full Stack",
        org: "CRN e AgentOffice · Autônomo, remoto",
        what: "Construí os dois produtos acima; também entrego projetos web como freelancer.",
      },
      {
        when: "Fev 2023 a set 2025",
        role: "Desenvolvedor Full Stack",
        org: "Naveo Engenharia Criativa · Contrato, híbrido",
        what: "Plataformas em produção para clientes de saúde e construção, entre elas o Cuidar Bem Card (telemedicina e rede de descontos) e o ObraSimples (orçamentos, custos de obra, pagamentos). Cresci de desenvolvedor júnior a líder de um time de três desenvolvedores.",
      },
      {
        when: "Fev 2024 a abr 2025",
        role: "Desenvolvedor Júnior",
        org: "Binary XZ · Contrato, remoto",
        what: "Regras de negócio, SQL e integrações com APIs num fluxo de pull requests com code review e planejamento de sprint.",
      },
      {
        when: "Mar 2022 a fev 2023",
        role: "Aprendiz de Desenvolvimento",
        org: "UniLaSalle Lucas do Rio Verde",
        what: "Aplicações internas: modelagem de dados, fluxos, permissões e integrações com APIs.",
      },
    ],
    edu: "CS50x, Harvard (online), em andamento · Alura, formação em desenvolvimento de software, 2022 a 2024 · Português (nativo), inglês (fluência profissional)",
  },
  skills: {
    title: "Habilidades técnicas",
    titleMuted: "As ferramentas por trás dos projetos acima.",
    groups: [
      { k: "Frontend", icons: ["typescript", "react", "nextjs", "tailwindcss"], extra: "JavaScript, Zustand, TanStack Query" },
      { k: "Backend e dados", icons: ["nodejs", "fastify", "postgres", "redis", "supabase", "socket.io"], extra: "APIs REST, BullMQ, Prisma, pgvector, SQL" },
      { k: "IA", icons: ["openai", "anthropic", "langchain", "python"], extra: "Function calling, LangGraph, Vercel AI SDK, RAG" },
      { k: "Plataforma", icons: ["stripe", "docker", "github-actions", "playwright", "vitest", "sentry", "grafana", "prometheus"], extra: "Oracle Cloud, Clerk, pytest, Railway" },
    ],
  },
  contact: {
    title: "Fale comigo sobre uma vaga full stack",
    lead: "Remoto, como contractor ou via EOR, ou com mudança. Sem visto de trabalho nos EUA.",
    word: "Gabriel Moura",
    lede: "Engenheiro full stack: SaaS, integrações com IA e apps em tempo real.",
    email: "gabrielmouramendes@hotmail.com",
    emailLabel: "E-mail",
    linkedin: "https://www.linkedin.com/in/gabrielmouram",
    github: "https://github.com/GabrielMMoura",
    colWork: "Projetos",
    colAbout: "Sobre",
    colContact: "Contato",
    source: "Código deste site",
    trademarks: "Nomes e logotipos de produtos são marcas de seus donos.",
  },
};
