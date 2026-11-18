// Every fact here comes from the resume PDF (Nov 2026), the public repos
// GabrielMMoura/emporio-agent and GabrielMMoura/mini-crm-sdr-ai,
// appcrn.com.br or useagentoffice.com. See DESIGN.md before adding anything.

export const en = {
  lang: "en",
  meta: {
    title: "Gabriel Moura · Full Stack Software Engineer",
    description:
      "Full stack software engineer (TypeScript, React, Node.js, PostgreSQL) focused on SaaS, AI integrations and real-time apps. Founder of CRN and AgentOffice. Open to remote roles.",
  },
  nav: {
    skip: "Skip to content",
    items: [
      { href: "#agentoffice", label: "AgentOffice" },
      { href: "#crn", label: "CRN" },
      { href: "#projects", label: "Projects" },
      { href: "#experience", label: "Experience" },
      { href: "#contact", label: "Contact" },
    ],
    switchLabel: "Português",
    switchShort: "PT",
    switchHref: "/pt",
  },
  hero: {
    eyebrow: "Gabriel Moura · Software Engineer, Full Stack",
    title: "Full stack engineer for SaaS, AI integrations and real-time apps.",
    lead: [
      "I founded and built CRN, a retail ERP used by paying merchants that handles ~BRL 2M (~US$380K) in sales and 4,000 to 8,000 tax invoices a month.",
      "I also designed and built AgentOffice, an AI agent platform with a real-time UI, now in early access.",
    ],
    facts: [
      { k: "Based in", v: "Lucas do Rio Verde, Brazil · UTC-3, 1 to 2 hours ahead of US Eastern" },
      { k: "Looking for", v: "Full stack roles, remote or relocation" },
      { k: "Experience", v: "4+ years building production web applications" },
      { k: "Core stack", v: "TypeScript, React, Next.js, Node.js, PostgreSQL" },
      { k: "English", v: "Professional working proficiency" },
    ],
    ctaEmail: "Email me",
    shotAlt:
      "AgentOffice's 2D office: pixel-art desks where AI agents work, with status bubbles such as “Lendo o Notion” and “Precisa de você”.",
    shotNote: "AgentOffice, real product screen",
  },
  agentoffice: {
    meta: ["01", "Main project", "2023 to present", "Early access"],
    title: "AI agents that do the work. Nothing goes out without human approval.",
    intro:
      "AgentOffice is an AI agent SaaS where agents research, write and analyze with a company's own documents, Notion and Google Drive. I designed and built it: the backend, the workers, the real-time UI, billing and monitoring.",
    builtTitle: "What I built",
    built: [
      { k: "Backend", v: "Node.js (Fastify) API. BullMQ workers on Redis run agent tasks and RAG indexing." },
      { k: "Real time", v: "Socket.IO streams agent state to a Next.js UI, including the 2D office where each agent shows what it is doing." },
      { k: "Orchestration", v: "LangGraph across OpenAI and Anthropic models, with pgvector retrieval over the company's sources." },
      { k: "Billing", v: "Stripe subscriptions and prepaid credits, with per-task and daily caps." },
      { k: "Tests", v: "~230 Vitest test files. Playwright E2E for agents, billing and onboarding." },
      { k: "Operations", v: "Prometheus, Grafana and Sentry." },
    ],
    diagramTitle: "How a task moves through the system, simplified",
    diagram: {
      ui: ["Next.js UI", "office + approvals"],
      api: ["Fastify API", "Socket.IO"],
      queue: ["BullMQ", "Redis"],
      worker: ["Workers", "tasks + RAG indexing"],
      llm: ["LangGraph", "OpenAI · Anthropic"],
      vector: ["PostgreSQL", "pgvector"],
      approval: ["Approval queue", "waits for a person"],
      edgeTask: "task",
      edgeState: "agent state",
      waiting: "waiting for approval",
      pause: "Pause animation",
      play: "Play animation",
    },
    rulesTitle: "Product rules the system enforces",
    rules: [
      "Publishing, and any change to the shared Company Brain, waits for a human decision.",
      "Every task and every day has a credit ceiling.",
      "Connection credentials are encrypted with AES-256-GCM; data is separated by workspace.",
      "Uploads (PDF, DOCX, XLSX, CSV, TXT, PNG, JPG up to 10 MB) are checked by their real content.",
      "The audit history records actions without exposing passwords or keys.",
    ],
    notYetTitle: "Not built yet, as the product site states",
    notYet: ["Multi-user workspaces", "Writing back to Notion or Drive", "Gemini models"],
    link: { href: "https://useagentoffice.com", label: "useagentoffice.com" },
    linkNote: "Product site in Portuguese",
  },
  crn: {
    meta: ["02", "Founder, built solo", "Paying customers since late 2023"],
    title: "CRN: a multi-tenant ERP for brick-and-mortar retailers, built solo.",
    figure: "~BRL 2M (~US$380K) in sales and 4,000 to 8,000 tax invoices a month",
    figureLabel: "Handled by CRN",
    onboarding: { from: "~3 h", to: "~45 min", label: "Onboarding plus data import per new customer, 75% faster" },
    body: [
      "Point of sale, inventory, finance and tax invoicing in one product, replacing the separate tax-invoicing and management systems merchants were using.",
      "I redesigned the most complex areas (tax rules, tax calculation, margin calculation) so store owners could run them without specialist help, which reduced support requests.",
    ],
    stackTitle: "Stack",
    stack: [
      { k: "App", v: "React, TypeScript" },
      { k: "Data", v: "Supabase/PostgreSQL with row-level security, Edge Functions" },
      { k: "Tax", v: "Dockerized invoice-processing service on Oracle Cloud, integrated directly with Brazil's tax authority (SEFAZ)" },
      { k: "Quality", v: "Vitest, Playwright, GitHub Actions CI" },
    ],
    featuresTitle: "In the product",
    features: [
      "Issues, cancels and corrects NF-e and NFC-e tax invoices",
      "Contingency mode when SEFAZ is down",
      "Dynamic PIX QR code at the point of sale",
      "Spreadsheet import that writes nothing before the owner reviews it",
      "Portal for the store's accountant",
    ],
    link: { href: "https://www.appcrn.com.br", label: "appcrn.com.br" },
    linkNote: "Product site in Portuguese",
  },
  projects: {
    meta: ["03", "Smaller projects", "Public code"],
    title: "Two smaller builds, with the code open.",
    emporio: {
      name: "Emporio Agent",
      summary:
        "A Python customer-service agent for a fictional music store, built for an AI Engineer technical challenge. It answers in Brazilian Portuguese, looks up products, prices and orders, and applies the store's policy manual.",
      rule: "The rule that drives the design: the model never produces a fact. Prices, dates, deadlines and discounts are computed by code; the model chooses tools and writes the reply.",
      logTitle: "Decision log, from the README",
      cols: ["Decision", "Why", "Evidence"],
      log: [
        {
          d: "Function calling with a hand-written loop, no agent framework",
          w: "Customer questions map to a handful of well-defined lookups. A framework would add abstractions without adding capability at this size.",
          e: "The loop is about 60 lines; every lookup is a typed, testable function.",
        },
        {
          d: "No SQL agent",
          w: "Model-written SQL would make the LGPD identity check optional.",
          e: "`get_order_status` cannot return data without a matching e-mail or phone, whatever the model does.",
        },
        {
          d: "No embeddings RAG for the policies",
          w: "The manual has 8 pages and 10 titled sections. Picking a section by topic is exact, cheap and debuggable.",
          e: "With dozens of documents, the README says it would move to chunked retrieval.",
        },
        {
          d: "Move unreliable prompt rules into code",
          w: "The rule to show original price and discount was followed only about half the time in PIX answers.",
          e: "A code-built `price_display` string: 19/20 runs passed.",
        },
        {
          d: "Measure fixes instead of assuming them",
          w: "Agent behavior was rerun 10 to 20 times before and after each fix.",
          e: "Order flow went from 7/10 to 19/20.",
        },
      ],
      facts: ["133 pytest tests, no network", "CI: ruff and pytest on every push", "OpenAI function calling, Python 3.11+"],
      repo: "https://github.com/GabrielMMoura/emporio-agent",
    },
    crm: {
      name: "Mini CRM SDR",
      summary:
        "A multi-workspace CRM for SDR teams, built as a technical assessment: Kanban pipeline, outreach campaigns and AI-generated messages. React, TypeScript, Supabase (Auth, PostgreSQL, RLS, Edge Functions) and the OpenAI API.",
      points: [
        "Row-level security limits every user to the workspaces they belong to.",
        "Each user's own OpenAI key is encrypted with AES-GCM in an Edge Function; the browser only gets safe metadata.",
        "The Edge Function validates the JWT, lead, campaign, workspace and membership before generating messages.",
        "Custom lead fields live in JSONB, so a new field does not need a migration.",
        "If AI generation fails, the stage move that triggered it is not undone.",
      ],
      repo: "https://github.com/GabrielMMoura/mini-crm-sdr-ai",
      demo: "https://mini-crm-sdr-ai-vercel.vercel.app",
    },
    repoLabel: "Code on GitHub",
    demoLabel: "Live demo",
  },
  experience: {
    meta: ["04", "Experience"],
    title: "From developer apprentice to founder.",
    rows: [
      {
        when: "2023 to present",
        role: "Founder & Full Stack Engineer",
        org: "CRN and AgentOffice",
        where: "Self-employed · Remote",
        what: "Built both products above, also delivering freelance web projects.",
      },
      {
        when: "Feb 2023 to Sep 2025",
        role: "Full Stack Developer",
        org: "Naveo Engenharia Criativa",
        where: "Contract · Lucas do Rio Verde, Brazil (hybrid)",
        what: "Production platforms for health and construction clients, including Cuidar Bem Card (telemedicine and a discount network) and ObraSimples (quotes, job costing and payments). SQL functions, endpoints and business logic in Xano and Supabase. Grew from junior developer to leading a three-developer team: pull request reviews, mentoring, short sprints.",
      },
      {
        when: "Feb 2024 to Apr 2025",
        role: "Junior Developer",
        org: "Binary XZ",
        where: "Contract · Remote",
        what: "Business logic, SQL and external API integrations in a pull-request workflow with code review and sprint planning; production fixes.",
      },
      {
        when: "Mar 2022 to Feb 2023",
        role: "Developer Apprentice",
        org: "UniLaSalle Lucas do Rio Verde",
        what: "Internal applications: data modeling, workflows, permissions and API integrations, with requirements defined alongside stakeholders.",
      },
    ],
    eduTitle: "Education and languages",
    edu: [
      "CS50x: Introduction to Computer Science, Harvard (online), in progress",
      "Alura: software development coursework, 2022 to 2024",
      "Portuguese (native), English (professional working proficiency)",
    ],
  },
  skills: {
    meta: ["05", "Skills"],
    title: "Technical skills",
    groups: [
      { k: "Languages & frontend", v: ["TypeScript", "JavaScript", "Python", "SQL", "React", "Next.js", "Tailwind CSS", "Zustand", "TanStack Query"] },
      { k: "Backend & data", v: ["Node.js", "Fastify", "REST APIs", "WebSockets (Socket.IO)", "BullMQ", "PostgreSQL", "Prisma", "Supabase (Auth, RLS, Edge Functions)", "Redis", "pgvector"] },
      { k: "AI", v: ["OpenAI and Anthropic APIs", "Function calling", "LangGraph / LangChain", "Vercel AI SDK", "RAG"] },
      { k: "Platform", v: ["Stripe", "Clerk", "Docker", "GitHub Actions", "Vitest", "pytest", "Playwright", "Prometheus", "Grafana", "Sentry", "Oracle Cloud", "Railway"] },
    ],
  },
  contact: {
    meta: ["06", "Contact"],
    title: "Hiring a full stack engineer?",
    body: "I'm open to remote roles and to relocation. Write to me by email or reach me on LinkedIn.",
    email: "gabrielmouramendes@hotmail.com",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/gabrielmouram" },
      { label: "GitHub", href: "https://github.com/GabrielMMoura" },
    ],
    source: "This site is a Next.js static export.",
    sourceLink: "Source on GitHub",
  },
};

export type Dict = typeof en;
