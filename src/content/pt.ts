import type { Dict } from "./en";

// Mesma regra do en.ts: todo fato vem do currículo, dos repositórios públicos
// ou dos sites appcrn.com.br e useagentoffice.com.

export const pt: Dict = {
  lang: "pt-BR",
  meta: {
    title: "Gabriel Moura · Engenheiro de Software Full Stack",
    description:
      "Engenheiro de software full stack (TypeScript, React, Node.js, PostgreSQL) com foco em SaaS, integrações com IA e apps em tempo real. Fundador do CRN e do AgentOffice. Aberto a vagas remotas.",
  },
  nav: {
    skip: "Pular para o conteúdo",
    items: [
      { href: "#agentoffice", label: "AgentOffice" },
      { href: "#crn", label: "CRN" },
      { href: "#projects", label: "Projetos" },
      { href: "#experience", label: "Experiência" },
      { href: "#contact", label: "Contato" },
    ],
    switchLabel: "English",
    switchShort: "EN",
    switchHref: "/",
  },
  hero: {
    eyebrow: "Gabriel Moura · Engenheiro de Software, Full Stack",
    title: "Engenheiro full stack para SaaS, integrações com IA e apps em tempo real.",
    lead: [
      "Fundei e construí o CRN, um ERP de varejo usado por lojistas pagantes, que processa cerca de R$ 2 milhões (~US$ 380 mil) em vendas e de 4.000 a 8.000 notas fiscais por mês.",
      "Também projetei e construí o AgentOffice, uma plataforma de agentes de IA com interface em tempo real, hoje em acesso antecipado.",
    ],
    facts: [
      { k: "Onde estou", v: "Lucas do Rio Verde, MT · UTC-3, 1 a 2 horas à frente do horário da costa leste dos EUA" },
      { k: "Procuro", v: "Vagas full stack, remotas ou com mudança" },
      { k: "Experiência", v: "Mais de 4 anos construindo aplicações web em produção" },
      { k: "Stack principal", v: "TypeScript, React, Next.js, Node.js, PostgreSQL" },
      { k: "Inglês", v: "Fluência profissional" },
    ],
    ctaEmail: "Mandar e-mail",
    shotAlt:
      "Escritório 2D do AgentOffice: mesas em pixel art onde os agentes de IA trabalham, com balões de status ao vivo como \"Lendo o Notion\" e \"Precisa de você\".",
    shotNote: "AgentOffice, tela real do produto",
  },
  agentoffice: {
    meta: ["01", "Projeto principal", "2023 até hoje", "Acesso antecipado"],
    title: "Agentes de IA que fazem o trabalho. Nada sai sem aprovação humana.",
    intro:
      "O AgentOffice é um SaaS de agentes de IA que pesquisam, escrevem e analisam com os documentos da própria empresa, o Notion e o Google Drive. Eu projetei e construí: o backend, os workers, a interface em tempo real, a cobrança e o monitoramento.",
    builtTitle: "O que eu construí",
    built: [
      { k: "Backend", v: "API em Node.js (Fastify). Workers BullMQ sobre Redis executam as tarefas dos agentes e a indexação de RAG." },
      { k: "Tempo real", v: "Socket.IO transmite o estado dos agentes para uma interface em Next.js, incluindo o escritório 2D onde cada agente mostra o que está fazendo." },
      { k: "Orquestração", v: "LangGraph com modelos da OpenAI e da Anthropic, e busca com pgvector sobre as fontes da empresa." },
      { k: "Cobrança", v: "Assinaturas e créditos pré-pagos no Stripe, com teto por tarefa e por dia." },
      { k: "Testes", v: "Cerca de 230 arquivos de teste no Vitest. E2E com Playwright para agentes, cobrança e onboarding." },
      { k: "Operação", v: "Prometheus, Grafana e Sentry." },
    ],
    diagramTitle: "Como uma tarefa passa pelo sistema, em versão simplificada",
    diagram: {
      ui: ["Interface Next.js", "escritório + aprovações"],
      api: ["API Fastify", "Socket.IO"],
      queue: ["BullMQ", "Redis"],
      worker: ["Workers", "tarefas + indexação RAG"],
      llm: ["LangGraph", "OpenAI · Anthropic"],
      vector: ["PostgreSQL", "pgvector"],
      approval: ["Fila de aprovação", "espera uma pessoa"],
      edgeTask: "tarefa",
      edgeState: "estado do agente",
      waiting: "aguardando aprovação",
    },
    rulesTitle: "Regras do produto que o sistema garante",
    rules: [
      "Publicações e qualquer mudança no Company Brain compartilhado esperam a decisão de uma pessoa.",
      "Cada tarefa e cada dia têm um teto de créditos.",
      "Credenciais de conexão são criptografadas com AES-256-GCM; os dados ficam separados por workspace.",
      "Arquivos enviados (PDF, DOCX, XLSX, CSV, TXT, PNG, JPG de até 10 MB) são conferidos pelo conteúdo real.",
      "O histórico de auditoria registra as ações sem expor senhas ou chaves.",
    ],
    notYetTitle: "Ainda não faz, como o site do produto informa",
    notYet: ["Workspaces com vários usuários", "Escrever de volta no Notion ou no Drive", "Modelos Gemini"],
    link: { href: "https://useagentoffice.com", label: "useagentoffice.com" },
    linkNote: "Site do produto",
  },
  crn: {
    meta: ["02", "Fundador, construído sozinho", "Clientes pagantes desde o fim de 2023"],
    title: "CRN: um ERP multi-tenant para o varejo físico, construído sozinho.",
    figure: "~R$ 2 milhões (~US$ 380 mil) em vendas e de 4.000 a 8.000 notas fiscais por mês",
    figureLabel: "Processados pelo CRN",
    onboarding: { from: "~3 h", to: "~45 min", label: "Onboarding com importação de dados por cliente novo, 75% mais rápido" },
    body: [
      "Ponto de venda, estoque, financeiro e emissão fiscal em um só produto, no lugar dos sistemas separados de nota fiscal e de gestão que os lojistas usavam.",
      "Redesenhei as áreas mais complexas (regras fiscais, cálculo de impostos, cálculo de margem) para que o próprio lojista conseguisse operar sem ajuda especializada, o que reduziu os pedidos de suporte.",
    ],
    stackTitle: "Stack",
    stack: [
      { k: "App", v: "React, TypeScript" },
      { k: "Dados", v: "Supabase/PostgreSQL com row-level security, Edge Functions" },
      { k: "Fiscal", v: "Serviço de processamento de notas em Docker na Oracle Cloud, integrado direto à SEFAZ" },
      { k: "Qualidade", v: "Vitest, Playwright, CI no GitHub Actions" },
    ],
    featuresTitle: "No produto",
    features: [
      "Emite, cancela e corrige NF-e e NFC-e",
      "Contingência quando a SEFAZ cai",
      "QR Code PIX dinâmico no ponto de venda",
      "Importação por planilha que não grava nada antes da conferência do lojista",
      "Portal para o contador da loja",
    ],
    link: { href: "https://www.appcrn.com.br", label: "appcrn.com.br" },
    linkNote: "Site do produto",
  },
  projects: {
    meta: ["03", "Projetos menores", "Código aberto"],
    title: "Dois projetos menores, com o código aberto.",
    emporio: {
      name: "Emporio Agent",
      summary:
        "Um agente de atendimento em Python para uma loja de música fictícia, feito para um desafio técnico de AI Engineer. Responde em português, consulta produtos, preços e pedidos e aplica o manual de políticas da loja.",
      rule: "A regra que guia o projeto: o modelo nunca produz um fato. Preços, datas, prazos e descontos são calculados por código; o modelo escolhe as ferramentas e escreve a resposta.",
      logTitle: "Registro de decisões, do README",
      cols: ["Decisão", "Por quê", "Evidência"],
      log: [
        {
          d: "Function calling com um loop escrito à mão, sem framework de agente",
          w: "As perguntas dos clientes cabem em poucas consultas bem definidas. Um framework acrescentaria abstração sem acrescentar capacidade nesse tamanho.",
          e: "O loop tem cerca de 60 linhas; cada consulta é uma função tipada e testável.",
        },
        {
          d: "Sem agente de SQL",
          w: "SQL escrito pelo modelo tornaria opcional a verificação de identidade exigida pela LGPD.",
          e: "`get_order_status` não devolve dados sem e-mail ou telefone correspondente, faça o modelo o que fizer.",
        },
        {
          d: "Sem RAG com embeddings para as políticas",
          w: "O manual tem 8 páginas e 10 seções com título. Escolher a seção por tópico é exato, barato e fácil de depurar.",
          e: "Com dezenas de documentos, o README diz que passaria para recuperação em trechos.",
        },
        {
          d: "Levar para o código as regras de prompt que falham",
          w: "A regra de mostrar preço original e desconto era seguida só cerca de metade das vezes nas respostas sobre PIX.",
          e: "Com a string `price_display` montada por código, 19 de 20 execuções passaram.",
        },
        {
          d: "Medir as correções em vez de supor",
          w: "O comportamento do agente foi rodado de 10 a 20 vezes antes e depois de cada correção.",
          e: "O fluxo de pedidos foi de 7/10 para 19/20.",
        },
      ],
      facts: ["133 testes pytest, sem rede", "CI: ruff e pytest a cada push", "Function calling da OpenAI, Python 3.11+"],
      repo: "https://github.com/GabrielMMoura/emporio-agent",
    },
    crm: {
      name: "Mini CRM SDR",
      summary:
        "Um CRM multi-workspace para equipes de SDR, feito como prova técnica: funil em Kanban, campanhas de abordagem e mensagens geradas por IA. React, TypeScript, Supabase (Auth, PostgreSQL, RLS, Edge Functions) e API da OpenAI.",
      points: [
        "Row-level security limita cada usuário aos workspaces de que ele é membro.",
        "A chave da OpenAI de cada usuário é criptografada com AES-GCM numa Edge Function; o navegador recebe só metadados seguros.",
        "A Edge Function valida JWT, lead, campanha, workspace e participação antes de gerar mensagens.",
        "Campos personalizados de lead ficam em JSONB, então um campo novo não exige migration.",
        "Se a geração por IA falhar, a mudança de etapa que a disparou não é desfeita.",
      ],
      repo: "https://github.com/GabrielMMoura/mini-crm-sdr-ai",
      demo: "https://mini-crm-sdr-ai-vercel.vercel.app",
    },
    repoLabel: "Código no GitHub",
    demoLabel: "Demo no ar",
  },
  experience: {
    meta: ["04", "Experiência"],
    title: "De aprendiz de desenvolvimento a fundador.",
    rows: [
      {
        when: "2023 até hoje",
        role: "Fundador e Engenheiro Full Stack",
        org: "CRN e AgentOffice",
        where: "Autônomo · Remoto",
        what: "Construí os dois produtos acima, entregando também projetos web como freelancer.",
      },
      {
        when: "Fev 2023 a set 2025",
        role: "Desenvolvedor Full Stack",
        org: "Naveo Engenharia Criativa",
        where: "Contrato · Lucas do Rio Verde (híbrido)",
        what: "Plataformas em produção para clientes de saúde e construção, entre elas o Cuidar Bem Card (telemedicina e rede de descontos) e o ObraSimples (orçamentos, custos de obra e pagamentos). Funções SQL, endpoints e regras de negócio em Xano e Supabase. Cresci de desenvolvedor júnior a líder de um time de três desenvolvedores: revisão de pull requests, mentoria e sprints curtas.",
      },
      {
        when: "Fev 2024 a abr 2025",
        role: "Desenvolvedor Júnior",
        org: "Binary XZ",
        where: "Contrato · Remoto",
        what: "Regras de negócio, SQL e integrações com APIs externas num fluxo de pull requests com code review e planejamento de sprint; correções em produção.",
      },
      {
        when: "Mar 2022 a fev 2023",
        role: "Aprendiz de Desenvolvimento",
        org: "UniLaSalle Lucas do Rio Verde",
        what: "Aplicações internas: modelagem de dados, fluxos, permissões e integrações com APIs, com requisitos definidos junto às áreas usuárias.",
      },
    ],
    eduTitle: "Formação e idiomas",
    edu: [
      "CS50x: Introduction to Computer Science, Harvard (online), em andamento",
      "Alura: formação em desenvolvimento de software, 2022 a 2024",
      "Português (nativo), inglês (fluência profissional)",
    ],
  },
  skills: {
    meta: ["05", "Habilidades"],
    title: "Habilidades técnicas",
    groups: [
      { k: "Linguagens e frontend", v: ["TypeScript", "JavaScript", "Python", "SQL", "React", "Next.js", "Tailwind CSS", "Zustand", "TanStack Query"] },
      { k: "Backend e dados", v: ["Node.js", "Fastify", "APIs REST", "WebSockets (Socket.IO)", "BullMQ", "PostgreSQL", "Prisma", "Supabase (Auth, RLS, Edge Functions)", "Redis", "pgvector"] },
      { k: "IA", v: ["APIs da OpenAI e da Anthropic", "Function calling", "LangGraph / LangChain", "Vercel AI SDK", "RAG"] },
      { k: "Plataforma", v: ["Stripe", "Clerk", "Docker", "GitHub Actions", "Vitest", "pytest", "Playwright", "Prometheus", "Grafana", "Sentry", "Oracle Cloud", "Railway"] },
    ],
  },
  contact: {
    meta: ["06", "Contato"],
    title: "Procurando um engenheiro full stack?",
    body: "Estou aberto a vagas remotas e a mudança. Escreva por e-mail ou fale comigo no LinkedIn.",
    email: "gabrielmouramendes@hotmail.com",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/gabrielmouram" },
      { label: "GitHub", href: "https://github.com/GabrielMMoura" },
    ],
    source: "Este site é um export estático de Next.js.",
    sourceLink: "Código no GitHub",
  },
};
