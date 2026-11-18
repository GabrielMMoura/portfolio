// Every fact here comes from the resume PDF (Nov 2026), the public repos
// GabrielMMoura/emporio-agent and GabrielMMoura/mini-crm-sdr-ai,
// appcrn.com.br or useagentoffice.com, or from Gabriel's answers on 17 Nov 2026
// (monthly CRN figures, UTC-4, contractor or EOR). See DESIGN.md before adding anything.

export const en = {
  lang: "en",
  meta: {
    title: "Gabriel Moura: full stack engineer for SaaS and AI products",
    description:
      "Founder of CRN, a retail ERP used by paying merchants, and AgentOffice, a real-time AI agent platform. TypeScript, React, Node.js and PostgreSQL. Open to remote roles.",
  },
  nav: {
    skip: "Skip to content",
    items: [
      { href: "#experience", label: "Experience" },
      { href: "#skills", label: "Skills" },
    ],
    switchLabel: "Português",
    switchShort: "PT",
    switchHref: "/pt",
  },
  hero: {
    title: "Full stack engineer for SaaS and AI products",
    stack: "4+ years in production · TypeScript, React, Node.js, PostgreSQL",
    lead: "I founded and built CRN, a retail ERP used by paying merchants that handles ~BRL 2M (~US$380K) in sales and 4,000 to 8,000 tax invoices a month, and AgentOffice, a real-time AI agent platform.",
    ctaEmail: "Email me",
    ctaWork: "See AgentOffice",
    proof: "Lucas do Rio Verde, Brazil · UTC-4, on US Eastern hours in summer · Remote, as a contractor or through an EOR",
  },
  agentoffice: {
    title: "AgentOffice, an AI agent platform I designed and built.",
    titleMuted: "In early access.",
    intro:
      "Agents research, write and analyze with a company's documents, Notion and Google Drive, and nothing is published without human approval. I built the backend, the workers, the real-time UI, billing and monitoring.",
    link: { href: "https://useagentoffice.com", label: "useagentoffice.com (in Portuguese)" },
    builtTitle: "What I built",
    built: [
      { k: "Backend", v: "Node.js (Fastify) API; BullMQ workers on Redis run agent tasks and RAG indexing" },
      { k: "Real time", v: "Socket.IO streams agent state to a Next.js UI, including the 2D office" },
      { k: "Orchestration", v: "LangGraph across OpenAI and Anthropic models, with pgvector retrieval" },
      { k: "Billing", v: "Stripe subscriptions and prepaid credits, with per-task and daily caps" },
      { k: "Tests", v: "~230 Vitest test files; Playwright E2E for agents, billing and onboarding" },
      { k: "Operations", v: "Prometheus, Grafana and Sentry" },
    ],
  },
  guarantees: {
    title: "What AgentOffice guarantees, and what it does not do yet.",
    rules: [
      { k: "Approval", v: "Publishing, and any change to the shared Company Brain, waits for a person" },
      { k: "Cost", v: "Every task and every day has a credit ceiling" },
      { k: "Credentials", v: "Connection credentials are encrypted with AES-256-GCM; data is separated by workspace" },
      { k: "Uploads", v: "PDF, DOCX, XLSX, CSV, TXT, PNG and JPG up to 10 MB, checked by their real content" },
      { k: "Audit", v: "The history records actions without exposing passwords or keys" },
    ],
    notYetTitle: "Not built yet, as the product site states",
    notYet: "Multi-user workspaces, writing back to Notion or Drive, and Gemini models.",
  },
  crn: {
    title: "CRN, a retail ERP I built solo.",
    titleMuted: "Paying customers since late 2023.",
    figureLabel: "Handled by CRN",
    figure: "~BRL 2M (~US$380K) in sales and 4,000 to 8,000 tax invoices a month",
    onboardingLabel: "Onboarding plus data import per new customer",
    onboardingFrom: "~3 h",
    onboardingTo: "~45 min",
    onboardingSr: "from about 3 hours to about 45 minutes, 75% faster",
    body: "A multi-tenant ERP for brick-and-mortar retailers: point of sale, inventory, finance and tax invoicing in one product, replacing the separate tax-invoicing and management systems merchants used. I redesigned tax rules, tax calculation and margin calculation so store owners run them without specialist help, which reduced support requests.",
    stack: [
      { k: "App", v: "React, TypeScript" },
      { k: "Data", v: "Supabase/PostgreSQL with row-level security, Edge Functions" },
      { k: "Tax", v: "Dockerized invoice service on Oracle Cloud, integrated directly with SEFAZ, Brazil's tax authority" },
      { k: "Quality", v: "Vitest, Playwright, GitHub Actions CI" },
    ],
    featuresLabel: "In the product",
    features: "NF-e and NFC-e issuing, cancellation and correction; contingency mode when SEFAZ is down; dynamic PIX QR codes at the till; spreadsheet import that writes nothing before the owner reviews it; a portal for the store's accountant.",
    link: { href: "https://www.appcrn.com.br", label: "appcrn.com.br (in Portuguese)" },
  },
  statement: {
    title: "Facts come from code.",
    sub: "The rule behind Emporio Agent: prices, dates, deadlines and discounts are computed by code; the model only picks tools and writes the reply.",
  },
  emporio: {
    title: "Emporio Agent, in Python.",
    titleMuted: "An AI Engineer challenge: a support agent for a fictional store.",
    lead: "A text agent that answers customers in Brazilian Portuguese: products, prices, orders and the store's policy manual, through OpenAI function calling over typed tools.",
    transcriptLabel: "A real transcript from the repository: the agent asks for an e-mail or phone before it shows an order.",
    cols: ["Decision", "Why, from the README", "Evidence"],
    log: [
      {
        d: "Function calling, no framework",
        w: "Customer questions map to a handful of lookups; a framework adds abstractions without adding capability at this size.",
        e: "A loop of about 60 lines; every lookup a typed, tested function.",
      },
      {
        d: "No SQL agent",
        w: "Model-written SQL would make the LGPD identity check optional.",
        e: "`get_order_status` returns nothing without a matching e-mail or phone.",
      },
      {
        d: "No embeddings for the policies",
        w: "An 8-page manual with 10 titled sections: picking a section is exact, cheap and debuggable.",
        e: "With dozens of documents, it would move to chunked retrieval.",
      },
      {
        d: "Prompt rules that fail move into code",
        w: "“Show original price and discount” was followed about half the time in PIX answers.",
        e: "A code-built `price_display` string: 19/20 runs passed.",
      },
      {
        d: "Measure each fix",
        w: "Behaviors were rerun 10 to 20 times before and after a change.",
        e: "The order flow went from 7/10 to 19/20.",
      },
    ],
    facts: ["133 pytest tests, no network", "CI: ruff and pytest on every push", "OpenAI function calling, Python 3.11+"],
    repo: "https://github.com/GabrielMMoura/emporio-agent",
  },
  crm: {
    title: "Mini CRM SDR, a multi-workspace CRM.",
    titleMuted: "A technical assessment with a Kanban pipeline and AI-written outreach.",
    stack: "React, TypeScript, Supabase (Auth, PostgreSQL, RLS, Edge Functions), OpenAI API",
    points: [
      { k: "Isolation", v: "Row-level security limits every user to the workspaces they belong to" },
      { k: "Keys", v: "Each user's OpenAI key is encrypted with AES-GCM in an Edge Function; the browser only gets safe metadata" },
      { k: "Checks", v: "The Edge Function validates the JWT, lead, campaign, workspace and membership before generating" },
      { k: "Schema", v: "Custom lead fields live in JSONB, so a new field needs no migration" },
      { k: "Failure", v: "If AI generation fails, the stage move that triggered it is not undone" },
    ],
    repo: "https://github.com/GabrielMMoura/mini-crm-sdr-ai",
    demo: "https://mini-crm-sdr-ai-vercel.vercel.app",
  },
  world: {
    eyebrow: "Full stack engineer · Remote from Brazil",
    floors: {
      street: "Street",
      agentoffice: "3F · AgentOffice",
      crn: "2F · CRN",
      elevator: "Elevator",
      emporio: "1F · Emporio Agent",
      crm: "M · Mini CRM",
      lobby: "Lobby",
    },
    coffee: {
      counter: "Coffee cups found",
      mug: "Hidden coffee cup",
      hint: "Ten coffee cups are hidden in this building. Click one to pick it up.",
      found: "Coffee cup found",
      done: "All ten. That is a normal workday for me.",
      doneCta: "Email me",
    },
    gabriel: {
      label: "Talk to pixel Gabriel",
      lines: [
        "Hi, I'm Gabriel. I build the whole product: UI, API, workers and billing.",
        "I work from Lucas do Rio Verde, Brazil, on UTC-4.",
        "Every agent draft here waits for a person before it goes out.",
        "Ten coffee cups are hidden in this building.",
      ],
    },
    alt: {
      facade:
        "Pixel-art night street. A brick office building turns its windows on one by one, a lit sign on the roof reads Gabriel Moura, and a pixel Gabriel walks to the door.",
      office:
        "Pixel-art office floor: three AI agents work at desks with status bubbles, a task ticket travels along a pipe, and pixel Gabriel stamps a draft before it leaves through the window.",
      store:
        "Pixel-art shop floor: a customer pays by PIX at the counter, the point of sale prints a tax invoice, and a lamp shows the link to SEFAZ.",
      elevator: "Pixel-art elevator whose doors open on pixel Gabriel riding between floors.",
      emporio:
        "Pixel-art workbench: a laptop runs the test suite, a board shows ruff and pytest passing, and a phone shows the support chat.",
      crm: "Pixel-art whiteboard with a Kanban pipeline; a sticky note moves to the next column and gets an AI-written message.",
      lobby:
        "Pixel-art lobby at night: a reception desk with pixel Gabriel and three doors marked Email, LinkedIn and GitHub.",
    },
    agents: [
      ["Reading Notion", "Writing the LinkedIn draft"],
      ["Searching Drive", "Mapping 20 accounts"],
      ["Needs you", "Draft ready"],
    ],
    floorsMenu: "Floors",
    emailShort: "Email",
    screenTag: "Real screenshot · useagentoffice.com",
    talkHint: "Click me",
    approved: "Approved",
    screenLabel: "Open useagentoffice.com, the real AgentOffice office",
    nfe: "NF-e",
    sefaz: "SEFAZ",
    ci: ["ruff", "pytest · 133"],
    directory: "Directory",
    doors: { email: "Email", linkedin: "LinkedIn", github: "GitHub" },
    copy: "Copy email",
    copied: "Copied",
  },
  repoLabel: "Code on GitHub",
  demoLabel: "Live demo",
  experience: {
    title: "Experience",
    titleMuted: "From developer apprentice to founder.",
    rows: [
      {
        when: "2023 to present",
        role: "Founder & Full Stack Engineer",
        org: "CRN and AgentOffice · Self-employed, remote",
        what: "Built both products above; also delivering freelance web projects.",
      },
      {
        when: "Feb 2023 to Sep 2025",
        role: "Full Stack Developer",
        org: "Naveo Engenharia Criativa · Contract, hybrid",
        what: "Production platforms for health and construction clients, including Cuidar Bem Card (telemedicine and a discount network) and ObraSimples (quotes, job costing, payments). Grew from junior developer to leading a three-developer team.",
      },
      {
        when: "Feb 2024 to Apr 2025",
        role: "Junior Developer",
        org: "Binary XZ · Contract, remote",
        what: "Business logic, SQL and API integrations in a pull-request workflow with code review and sprint planning.",
      },
      {
        when: "Mar 2022 to Feb 2023",
        role: "Developer Apprentice",
        org: "UniLaSalle Lucas do Rio Verde",
        what: "Internal applications: data modeling, workflows, permissions and API integrations.",
      },
    ],
    edu: "CS50x, Harvard (online), in progress · Alura software development coursework, 2022 to 2024 · Portuguese (native), English (professional working proficiency)",
  },
  skills: {
    title: "Technical skills",
    titleMuted: "The tools behind the projects above.",
    groups: [
      { k: "Frontend", icons: ["typescript", "react", "nextjs", "tailwindcss"], extra: "JavaScript, Zustand, TanStack Query" },
      { k: "Backend and data", icons: ["nodejs", "fastify", "postgres", "redis", "supabase", "socket.io"], extra: "REST APIs, BullMQ, Prisma, pgvector, SQL" },
      { k: "AI", icons: ["openai", "anthropic", "langchain", "python"], extra: "Function calling, LangGraph, Vercel AI SDK, RAG" },
      { k: "Platform", icons: ["stripe", "docker", "github-actions", "playwright", "vitest", "sentry", "grafana", "prometheus"], extra: "Oracle Cloud, Clerk, pytest, Railway" },
    ],
  },
  contact: {
    title: "Email me about a full stack role",
    lead: "Remote, as a contractor or through an EOR, or relocation. No US work visa.",
    lede: "Full stack engineer: SaaS, AI integrations and real-time apps.",
    email: "gabrielmouramendes@hotmail.com",
    emailLabel: "Email",
    linkedin: "https://www.linkedin.com/in/gabrielmouram",
    github: "https://github.com/GabrielMMoura",
    source: "Source of this site",
    trademarks: "Product names and logos are trademarks of their owners.",
  },
};

export type Dict = typeof en;
