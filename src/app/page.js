"use client";

import { useState } from "react";
import Link from "next/link";
import { LeftDrawer, RightDrawer, DrawerToggle } from "@/components/ui/drawer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowUpRightFromSquare,
  faBookOpen,
  faCheck,
  faCode,
  faCodeBranch,
  faCube,
  faDesktop,
  faLayerGroup,
  faPalette,
  faRocket,
  faServer,
  faTable,
  faTerminal,
} from "@fortawesome/free-solid-svg-icons";

const repository = "https://github.com/AtanaelMendes/Next-Material-UI";
const technologies = [
  { name: "Next.js 16", detail: "App Router", icon: faLayerGroup },
  { name: "React 19", detail: "Interfaces interativas", icon: faCode },
  {
    name: "Tailwind CSS 4",
    detail: "Estilização com utilitários",
    icon: faPalette,
  },
  { name: "Material Design", detail: "Componentes próprios", icon: faCube },
];
const collections = [
  {
    title: "Botões e ações",
    description: "Do botão essencial às ações flutuantes.",
    href: "/components#buttons",
    icon: faCube,
    examples: "Buttons · Toggles · Dropdowns",
  },
  {
    title: "Formulários",
    description: "Campos e seletores para construir seus fluxos.",
    href: "/components#inputs",
    icon: faCode,
    examples: "Inputs · Selects · Checkboxes",
  },
  {
    title: "Tabelas e dados",
    description: "Organize informações em interfaces claras.",
    href: "/components#tables",
    icon: faTable,
    examples: "DataTable · Ordenação · Paginação",
  },
  {
    title: "Navegação e layout",
    description: "Monte a estrutura da sua aplicação.",
    href: "/components#drawers",
    icon: faLayerGroup,
    examples: "Drawers · Tabs · Menus",
  },
];
const firstSteps = [
  {
    title: "Conheça os componentes",
    description:
      "Veja exemplos em funcionamento e o código de uso no catálogo.",
    href: "/components",
    action: "Abrir catálogo",
  },
  {
    title: "Monte sua primeira tela",
    description: "Combine botões, campos e cards com os estilos do template.",
    href: "/components#cards",
    action: "Explorar exemplos",
  },
  {
    title: "Faça o projeto ser seu",
    description:
      "Acesse o código, adapte ao seu produto e compartilhe melhorias.",
    href: repository,
    action: "Ver repositório",
    external: true,
  },
];

export default function DashboardPage() {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const [leftCompact, setLeftCompact] = useState(false);
  const navigation = [
    { label: "Visão geral", href: "/", icon: faDesktop },
    { label: "Comece por aqui", href: "#primeiros-passos", icon: faRocket },
    { label: "Componentes", href: "/components", icon: faCube },
    { label: "Sobre a stack", href: "#stack", icon: faLayerGroup },
  ];

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-surface-secondary font-sans text-content">
      <LeftDrawer
        open={leftOpen}
        onOpenChange={setLeftOpen}
        compact={leftCompact}
        onCompactChange={setLeftCompact}
        storageKey="app:dashboard:left-drawer"
        title="Next Material UI"
        subtitle="Template open source"
        footer={
          <button
            type="button"
            onClick={() => setLeftCompact((value) => !value)}
            className="w-full rounded-lg p-2 text-xs text-content-secondary hover:bg-hover"
          >
            {leftCompact ? "Expandir menu" : "Compactar menu"}
          </button>
        }
      >
        <nav aria-label="Navegação do template" className="space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setLeftOpen(false)}
              aria-current={item.href === "/" ? "page" : undefined}
              title={leftCompact ? item.label : undefined}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-colors ${item.href === "/" ? "bg-selected font-medium text-selected-content" : "text-content-secondary hover:bg-hover"}`}
            >
              <FontAwesomeIcon icon={item.icon} className="h-4 w-4 shrink-0" />
              {!leftCompact && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </LeftDrawer>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="relative z-50 flex h-18 shrink-0 items-center justify-between gap-3 border-b border-border bg-surface px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <DrawerToggle
              side="left"
              open={leftOpen}
              onToggle={() => setLeftOpen((value) => !value)}
            />
            <Link href="/" className="flex min-w-0 items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-sm text-primary-content">
                <FontAwesomeIcon icon={faLayerGroup} className="h-4 w-4" />
              </span>
              <span className="truncate text-sm font-semibold tracking-tight sm:text-base">
                Next Material UI
              </span>
            </Link>
            <span className="hidden rounded-md border border-border px-2 py-0.5 font-mono text-[10px] text-content-muted sm:inline-flex">
              v0.1.0
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <a
              href={repository}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 text-sm text-content-secondary hover:text-content sm:inline-flex"
            >
              GitHub{" "}
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="h-3 w-3"
              />
            </a>
            <Link
              href="/components"
              className="hidden rounded-lg bg-surface-muted px-3 py-2 text-xs font-medium transition-colors hover:bg-hover md:inline-flex"
            >
              Documentação
            </Link>
            <DrawerToggle
              side="right"
              open={rightOpen}
              onToggle={() => setRightOpen((value) => !value)}
              ariaLabel="Abrir ou fechar guia rápido"
            />
          </div>
        </header>

        <main
          data-testid="dashboard-main"
          className="min-h-0 flex-1 overflow-y-auto scroll-smooth p-4 sm:p-6 lg:p-8"
        >
          <div className="mx-auto max-w-7xl space-y-8 pb-12 sm:space-y-10">
            <section
              aria-labelledby="welcome-title"
              className="relative overflow-hidden rounded-3xl border border-border bg-surface p-6 sm:p-9 lg:p-10"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl"
              />
              <div className="relative grid items-center gap-10 xl:grid-cols-[1.15fr_1fr]">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-success-border bg-success-subtle px-3 py-1 text-xs font-medium text-success-subtle-content">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" />
                    Open source. Feito para construir.
                  </span>
                  <h1
                    id="welcome-title"
                    className="mt-5 max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
                  >
                    Sua próxima ideia
                    <br />
                    começa <span className="text-primary-text">aqui.</span>
                  </h1>
                  <p className="mt-5 max-w-xl text-sm leading-7 text-content-secondary sm:text-base">
                    Um template Next.js 16 com a linguagem visual do Material
                    Design e a flexibilidade do Tailwind CSS. Explore,
                    personalize e transforme componentes em aplicações.
                  </p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <Link
                      href="/components"
                      className="inline-flex items-center gap-3 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-content shadow-sm transition-colors hover:bg-primary-hover"
                    >
                      Explorar componentes{" "}
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="h-3.5 w-3.5"
                      />
                    </Link>
                    <a
                      href={repository}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-medium transition-colors hover:bg-hover"
                    >
                      <FontAwesomeIcon
                        icon={faCodeBranch}
                        className="h-3.5 w-3.5"
                      />
                      Ver no GitHub
                    </a>
                  </div>
                  <p className="mt-5 text-xs text-content-muted">
                    Componentes reutilizáveis · Temas claro e escuro · Layout
                    responsivo
                  </p>
                </div>
                <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 font-mono text-slate-300 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-800 px-5 py-3.5 text-[11px]">
                    <div aria-hidden="true" className="flex gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-rose-400/80" />
                      <span className="h-2 w-2 rounded-full bg-amber-400/80" />
                      <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
                    </div>
                    <span className="text-slate-400">seu próximo projeto</span>
                    <FontAwesomeIcon
                      icon={faTerminal}
                      className="h-3 w-3 text-slate-500"
                    />
                  </div>
                  <div className="space-y-5 p-5 text-xs leading-6 sm:p-6 sm:text-sm">
                    <p className="text-slate-400">
                      // Menos configuração. Mais criação.
                    </p>
                    <pre className="overflow-x-auto">
                      <code>
                        <span className="text-violet-300">import</span>
                        {" Button "}
                        <span className="text-violet-300">from</span>
                        {"\n  "}
                        <span className="text-emerald-300">
                          {"'@/components/ui/buttons/Button'"}
                        </span>
                        {";\n\n"}
                        <span className="text-violet-300">
                          export default function
                        </span>
                        {" MinhaPagina() {\n  "}
                        <span className="text-violet-300">return</span>
                        {" (\n    <"}
                        <span className="text-sky-300">Button</span>
                        {" buttonType="}
                        <span className="text-amber-200">{'"primary"'}</span>
                        {">\n      Vamos começar\n    </"}
                        <span className="text-sky-300">Button</span>
                        {">\n  );\n}"}
                      </code>
                    </pre>
                    <div className="flex items-center gap-2 border-t border-slate-800 pt-4 text-[11px] text-emerald-300">
                      <FontAwesomeIcon icon={faCheck} className="h-3 w-3" />
                      Uma base para você fazer do seu jeito.
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div
              aria-label="Tecnologias do template"
              className="grid grid-cols-2 gap-5 rounded-2xl border border-border bg-surface p-5 sm:p-6 lg:grid-cols-4"
            >
              {technologies.map((technology) => (
                <div key={technology.name} className="flex items-start gap-3">
                  <span className="mt-1 text-primary-text">
                    <FontAwesomeIcon
                      icon={technology.icon}
                      className="h-5 w-5"
                    />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{technology.name}</p>
                    <p className="mt-1 text-xs leading-5 text-content-muted">
                      {technology.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <section
              id="primeiros-passos"
              aria-labelledby="steps-title"
              className="scroll-mt-6"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-selected text-primary-text">
                  <FontAwesomeIcon icon={faRocket} className="h-3.5 w-3.5" />
                </span>
                <div>
                  <h2
                    id="steps-title"
                    className="text-lg font-semibold tracking-tight"
                  >
                    Primeira vez por aqui?
                  </h2>
                  <p className="mt-0.5 text-xs text-content-muted">
                    Três passos para sair da ideia e começar a construir.
                  </p>
                </div>
              </div>
              <div className="grid gap-4 lg:grid-cols-3">
                {firstSteps.map((step, index) => (
                  <article
                    key={step.title}
                    className="flex flex-col rounded-2xl border border-border bg-surface p-5 sm:p-6"
                  >
                    <span className="mb-5 font-mono text-xs text-primary-text">
                      0{index + 1}{" "}
                      <span
                        aria-hidden="true"
                        className="ml-2 text-content-muted"
                      >
                        /
                      </span>
                    </span>
                    <h3 className="text-sm font-semibold">{step.title}</h3>
                    <p className="mb-5 mt-2 flex-1 text-sm leading-6 text-content-secondary">
                      {step.description}
                    </p>
                    {step.external ? (
                      <a
                        href={step.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 self-start text-xs font-semibold text-primary-text hover:underline"
                      >
                        {step.action}
                        <FontAwesomeIcon
                          icon={faArrowUpRightFromSquare}
                          className="h-3 w-3"
                        />
                      </a>
                    ) : (
                      <Link
                        href={step.href}
                        className="inline-flex items-center gap-2 self-start text-xs font-semibold text-primary-text hover:underline"
                      >
                        {step.action}
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className="h-3 w-3"
                        />
                      </Link>
                    )}
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="collections-title">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2
                    id="collections-title"
                    className="text-lg font-semibold tracking-tight"
                  >
                    As peças para sua próxima tela
                  </h2>
                  <p className="mt-1 text-xs text-content-muted">
                    Exemplos interativos e código de uso em um só lugar.
                  </p>
                </div>
                <Link
                  href="/components"
                  className="inline-flex items-center gap-2 text-xs font-medium text-primary-text hover:underline"
                >
                  Ver todo o catálogo
                  <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {collections.map((collection) => (
                  <Link
                    key={collection.href}
                    href={collection.href}
                    className="group rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-primary hover:bg-hover"
                  >
                    <div className="mb-6 flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-muted text-primary-text">
                        <FontAwesomeIcon
                          icon={collection.icon}
                          className="h-4 w-4"
                        />
                      </span>
                      <FontAwesomeIcon
                        icon={faArrowUpRightFromSquare}
                        className="h-3 w-3 text-content-muted transition-colors group-hover:text-primary-text"
                      />
                    </div>
                    <h3 className="text-sm font-semibold">
                      {collection.title}
                    </h3>
                    <p className="mt-2 text-xs leading-6 text-content-secondary">
                      {collection.description}
                    </p>
                    <p className="mt-5 border-t border-border pt-4 text-[11px] leading-5 text-content-muted">
                      {collection.examples}
                    </p>
                  </Link>
                ))}
              </div>
            </section>

            <section
              id="stack"
              aria-labelledby="stack-title"
              className="scroll-mt-6 rounded-2xl border border-border bg-surface p-5 sm:p-7"
            >
              <h2
                id="stack-title"
                className="text-lg font-semibold tracking-tight"
              >
                SPA, SSR, PWA: o que vem no template?
              </h2>
              <p className="mt-1 text-xs leading-6 text-content-muted">
                Entenda a base antes de começar seu projeto.
              </p>
              <div className="mt-6 grid gap-6 lg:grid-cols-3">
                <div>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faDesktop}
                      className="h-4 w-4 text-primary-text"
                    />
                    <h3 className="text-sm font-semibold">Navegação SPA</h3>
                    <span className="ml-auto rounded-md bg-success-subtle px-2 py-1 text-[10px] font-medium text-success-subtle-content">
                      Disponível
                    </span>
                  </div>
                  <p className="mt-3 text-xs leading-6 text-content-secondary">
                    Transições entre páginas com o App Router e Link do Next.js,
                    sem recarregar todo o documento.
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faServer}
                      className="h-4 w-4 text-primary-text"
                    />
                    <h3 className="text-sm font-semibold">
                      Renderização no servidor
                    </h3>
                    <span className="ml-auto rounded-md bg-success-subtle px-2 py-1 text-[10px] font-medium text-success-subtle-content">
                      Suportada
                    </span>
                  </div>
                  <p className="mt-3 text-xs leading-6 text-content-secondary">
                    O Next.js combina HTML pré-renderizado e interatividade no
                    navegador. Use renderização estática ou dinâmica conforme a
                    sua página.
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faCube}
                      className="h-4 w-4 text-content-muted"
                    />
                    <h3 className="text-sm font-semibold">PWA</h3>
                    <span className="ml-auto rounded-md bg-surface-muted px-2 py-1 text-[10px] font-medium text-content-secondary">
                      Não configurado
                    </span>
                  </div>
                  <p className="mt-3 text-xs leading-6 text-content-secondary">
                    Instalação como app e uso offline precisam de configuração
                    adicional de manifest, service worker e estratégia de cache.
                  </p>
                </div>
              </div>
              <p className="mt-6 border-t border-border pt-4 text-xs leading-6 text-content-muted">
                Material Design é a inspiração visual. Os componentes são
                implementados no próprio projeto com Tailwind CSS.
              </p>
            </section>

            <section className="flex flex-col justify-between gap-5 rounded-2xl border border-border bg-surface p-6 sm:flex-row sm:items-center">
              <div className="flex items-start gap-4">
                <span className="mt-1 text-primary-text">
                  <FontAwesomeIcon icon={faCodeBranch} className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-sm font-semibold">
                    Construído para ser compartilhado.
                  </h2>
                  <p className="mt-2 max-w-2xl text-xs leading-6 text-content-secondary">
                    Encontrou algo que pode melhorar? Abra uma issue, proponha
                    um componente ou envie uma contribuição no GitHub.
                  </p>
                </div>
              </div>
              <a
                href={`${repository}/issues`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 self-start rounded-xl border border-border px-4 py-2.5 text-xs font-medium hover:bg-hover sm:self-auto"
              >
                Participar do projeto
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  className="h-3 w-3"
                />
              </a>
            </section>
            <footer className="flex flex-wrap justify-between gap-3 px-1 text-[11px] text-content-muted">
              <span>Next Material UI · Uma base aberta para suas ideias.</span>
              <span>Next.js 16 / React 19 / Tailwind CSS 4</span>
            </footer>
          </div>
        </main>
      </div>

      <RightDrawer
        open={rightOpen}
        onOpenChange={setRightOpen}
        storageKey="app:dashboard:right-drawer"
        title="Guia rápido"
        subtitle="Seu ponto de partida"
        footer={
          <button
            type="button"
            onClick={() => setRightOpen(false)}
            className="w-full rounded-lg border border-border px-3 py-2 text-xs font-medium hover:bg-hover"
          >
            Fechar guia
          </button>
        }
      >
        <div className="space-y-6 text-sm">
          <div className="rounded-xl border border-info-border bg-info-subtle p-4 text-info-subtle-content">
            <FontAwesomeIcon icon={faBookOpen} className="mb-3 h-5 w-5" />
            <h3 className="font-semibold">Explore antes de construir</h3>
            <p className="mt-2 text-xs leading-6">
              O catálogo reúne demonstrações e exemplos de uso para você
              escolher os componentes da sua tela.
            </p>
          </div>
          <Link
            href="/components"
            className="flex items-center justify-between rounded-xl bg-primary p-3 text-xs font-medium text-primary-content hover:bg-primary-hover"
          >
            Abrir catálogo
            <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
          </Link>
          <div>
            <h3 className="font-semibold">Experimente os temas</h3>
            <p className="mt-2 text-xs leading-6 text-content-secondary">
              Use o botão de sol ou lua no canto inferior direito. Sua
              preferência fica salva neste navegador.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Precisa de ajuda?</h3>
            <p className="mt-2 text-xs leading-6 text-content-secondary">
              Consulte o código e compartilhe dúvidas ou sugestões nas issues do
              projeto.
            </p>
            <a
              href={`${repository}/issues`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-primary-text hover:underline"
            >
              Acessar issues
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="h-3 w-3"
              />
            </a>
          </div>
        </div>
      </RightDrawer>
    </div>
  );
}
