import { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Checkbox,
  DataTable,
  InputText,
  LeftDrawer,
  PageTabs,
  PieChart,
  PillsBadge,
  ProgressBar,
  Select,
  Title,
  Subtitle,
} from '@atanael/ui';

const options = [
  { value: 'sp', label: 'São Paulo' },
  { value: 'sc', label: 'Santa Catarina' },
  { value: 'pr', label: 'Paraná' },
];

const navItems = [
  { id: 'home', label: 'Visão geral', href: '#', active: true },
  { id: 'components', label: 'Componentes', href: '#' },
];

const tableData = [
  { nome: 'Ana Souza', perfil: 'Admin', status: 'Ativo' },
  { nome: 'Bruno Lima', perfil: 'Editor', status: 'Pendente' },
  { nome: 'Carla Perez', perfil: 'Viewer', status: 'Ativo' },
];

const pieData = [
  { label: 'Concluído', value: 62 },
  { label: 'Em andamento', value: 28 },
  { label: 'Pendente', value: 10 },
];

export default function App() {
  const [leftOpen, setLeftOpen] = useState(true);
  const [text, setText] = useState('Olá, @atanael/ui');
  const [selected, setSelected] = useState('sp');
  const [checked, setChecked] = useState(true);
  const [progress, setProgress] = useState(65);
  const [tab, setTab] = useState('geral');

  return (
    <div className="flex min-h-screen bg-background text-content">
      <LeftDrawer
        open={leftOpen}
        onOpenChange={setLeftOpen}
        items={navItems}
        title="@atanael/ui"
        subtitle="Vite playground"
        storageKey="playground:left-drawer"
      />

      <main className="flex-1 min-w-0 p-4 sm:p-8 space-y-6">
        <header className="flex items-center gap-3">
          <Button size="small" onClick={() => setLeftOpen((previous) => !previous)}>
            Alternar menu
          </Button>
          <div>
            <Title>Biblioteca de componentes</Title>
            <Subtitle>Integração fora do Next.js</Subtitle>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardTitle color="primary">Formulário</CardTitle>
            <CardBody>
              <div className="space-y-4 py-2">
                <InputText id="playground-text" label="Nome" value={text} onChange={(_id, value) => setText(value)} clearable />
                <Select id="playground-select" label="Estado" value={selected} options={options} onChange={(_id, value) => setSelected(value)} />
                <Checkbox id="playground-check" label="Receber novidades" checked={checked} onChange={(_id, value) => setChecked(value)} />
                <div>
                  <PillsBadge type="success">Ativo</PillsBadge>{' '}
                  <PillsBadge type="warning">Pendente</PillsBadge>
                </div>
                <ProgressBar value={progress} />
                <Button size="small" onClick={() => setProgress((previous) => Math.min(previous + 10, 100))}>
                  Incrementar progresso
                </Button>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardTitle color="primary">Gráfico e tabela</CardTitle>
            <CardBody>
              <PieChart data={pieData} height="200px" title="Tarefas" />
              <DataTable
                data={tableData}
                header={[
                  { label: 'Nome' },
                  { label: 'Perfil', align: 'center' },
                  { label: 'Status', align: 'right' },
                ]}
                mainText="Equipe"
                dense
              />
            </CardBody>
          </Card>
        </section>

        <section>
          <PageTabs
            pageTabs={[
              { id: 'geral', name: 'Geral', active: tab === 'geral' },
              { id: 'metricas', name: 'Métricas', active: tab === 'metricas' },
            ]}
            onClick={setTab}
            scrollable
          />
          <p className="mt-2 text-sm text-content-secondary">Aba ativa: {tab}</p>
        </section>
      </main>
    </div>
  );
}
