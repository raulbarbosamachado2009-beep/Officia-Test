"use client";

import { useCallback, useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  ReactFlow, Handle, Position, getBezierPath, applyNodeChanges, applyEdgeChanges, useNodesInitialized, useReactFlow,
  type Node, type Edge, type NodeProps, type EdgeProps, type Connection,
  type ReactFlowInstance, type NodeChange, type EdgeChange,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

export type WorkflowKind = "trigger" | "agent" | "integration" | "review" | "delivery";
export interface WorkflowAction extends Record< string, unknown> {
  label: string;
  detail: string;
  kind: WorkflowKind;
  tool?: string;
  /** Optional tool mark; it is decorative beside the text label. */
  logo?: string;
}
export interface WorkflowApp {
  id: string;
  name: string;
  logo?: string;
  actions: WorkflowAction[];
}
export type WorkflowNode = Node< WorkflowAction, "blueprint">;
export interface WorkflowGraph { nodes: WorkflowNode[]; edges: Edge[] }
export interface WorkflowBlueprintProps {
  /** Initial graph. Change the component's key to load a different document. */
  initialGraph: WorkflowGraph;
  apps: WorkflowApp[];
  title?: string;
  className?: string;
  style?: CSSProperties;
  animated?: boolean;
  /** Starting content for the Add agent button. The step can be edited in the demo. */
  agentTemplate?: WorkflowAction;
  /** Fires after edits and node moves. Persistence belongs to the host app. */
  onChange?: (graph: WorkflowGraph) => void;
  onBack?: () => void;
}

const labels: Record< WorkflowKind, string> = {
  trigger: "Trigger", agent: "AI agent", integration: "Integration", review: "Review", delivery: "Delivery",
};
const glyphs: Record< WorkflowKind, string> = {
  trigger: "M13 3 5 13h5l-1 8 9-12h-5z",
  agent: "M12 3l2.2 5.5L20 10l-5.8 1.5L12 17l-2.2-5.5L4 10l5.8-1.5z",
  integration: "M10.5 13.5a3.5 3.5 0 0 0 4.95 0l2.5-2.5a3.5 3.5 0 0 0-4.95-4.95l-1 1 M13.5 10.5a3.5 3.5 0 0 0-4.95 0l-2.5 2.5a3.5 3.5 0 0 0 4.95 4.95l1-1",
  review: "M12 3 4 7v5c0 5 3.4 8.2 8 9 4.6-.8 8-4 8-9V7z M9 12l2 2 4-5",
  delivery: "M5 12h12M13 6l6 6-6 6",
};

function BrandMark({ src, fallback }: { src?: string; fallback: ReactNode }) {
  const [failed, setFailed] = useState(false);
  return src && !failed ? <img src={src} alt="" onError={() => setFailed(true)} /> : fallback;
}

function BlueprintNode({ data, selected }: NodeProps< WorkflowNode>) {
  return <div className="wb-node" data-kind={data.kind} data-selected={selected}>
    <Handle type="target" position={Position.Left} aria-label={`Input for ${data.label}`} />
    <div className="wb-node-head">
      <span className="wb-glyph"><BrandMark key={data.logo} src={data.logo} fallback={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={glyphs[data.kind]} /></svg>} /></span>
      <div><strong>{data.label}</strong><small>{labels[data.kind]}</small></div>
    </div>
    <div className="wb-node-body"><p>{data.detail}</p>{data.tool && <span>{data.tool}</span>}</div>
    <Handle type="source" position={Position.Right} aria-label={`Output for ${data.label}`} />
  </div>;
}

function BlueprintEdge(props: EdgeProps) {
  const gradient = `wb-${useId().replace(/:/g, "")}`;
  const [path] = getBezierPath(props);
  return <>
    <defs><linearGradient id={gradient}><stop stopColor="var(--wb-primary)" /><stop offset="1" stopColor="var(--wb-secondary)" /></linearGradient></defs>
    <path d={path} className="wb-edge-halo" />
    <path d={path} className="wb-edge" style={{ stroke: `url(#${gradient})` }} />
    <path d={path} className="wb-edge-pulse" />
    <circle cx={props.sourceX} cy={props.sourceY} r="4" className="wb-port" />
    <circle cx={props.targetX} cy={props.targetY} r="4" className="wb-port" />
  </>;
}
const nodeTypes = { blueprint: BlueprintNode };
const edgeTypes = { blueprint: BlueprintEdge };

function InitialViewport({ width }: { width: number }) {
  const ready = useNodesInitialized();
  const flow = useReactFlow();
  const previousWidth = useRef(0);
  useEffect(() => {
    if (!ready || !width || previousWidth.current === width) return;
    let nextFrame = 0;
    const frame = requestAnimationFrame(() => {
      nextFrame = requestAnimationFrame(() => {
        previousWidth.current = width;
        if (width < 600) void flow.setViewport({ x: 24, y: 20, zoom: 0.9 });
        else void flow.fitView({ padding: 0.10, maxZoom: 1 });
      });
    });
    return () => { cancelAnimationFrame(frame); cancelAnimationFrame(nextFrame); };
  }, [ready, width, flow]);
  return null;
}

function canConnect(connection: Pick< Connection, "source" | "target">, graph: WorkflowGraph) {
  const { source, target } = connection;
  if (!source || !target || source === target || !graph.nodes.some(n => n.id === source) || !graph.nodes.some(n => n.id === target)) return false;
  if (graph.edges.some(e => e.source === source && e.target === target)) return false;
  const visited = new Set< string>();
  const reachesSource = (id: string): boolean => {
    if (id === source) return true;
    if (visited.has(id)) return false;
    visited.add(id);
    return graph.edges.filter(e => e.source === id).some(e => reachesSource(e.target));
  };
  return !reachesSource(target);
}

function normalizeGraph(graph: WorkflowGraph): WorkflowGraph {
  const ids = new Set(graph.nodes.map(n => n.id));
  return {
    nodes: graph.nodes.map(n => ({ ...n, type: "blueprint", ariaLabel: `${n.data.label}. ${labels[n.data.kind]}. ${n.data.detail}`, data: { ...n.data } })),
    edges: graph.edges.filter(e => ids.has(e.source) && ids.has(e.target)).map(e => ({ ...e, type: "blueprint", ariaLabel: `Connection from ${graph.nodes.find(n => n.id === e.source)?.data.label} to ${graph.nodes.find(n => n.id === e.target)?.data.label}` })),
  };
}

export function WorkflowBlueprint({ initialGraph, apps, title = "Workflow editor", className = "", style, animated = true, agentTemplate, onChange, onBack }: WorkflowBlueprintProps) {
  const [graph, setGraph] = useState(() => normalizeGraph(initialGraph));
  const [selected, setSelected] = useState(initialGraph.nodes[0]?.id ?? "");
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");
  const [message, setMessage] = useState("Selecione uma ação ou arraste um nó para começar.");
  const [history, setHistory] = useState< WorkflowGraph[]>([]);
  const [flow, setFlow] = useState< ReactFlowInstance< WorkflowNode> | null>(null);
  const [width, setWidth] = useState(0);
  const [motionPaused, setMotionPaused] = useState(false);
  const [editing, setEditing] = useState< { id: string; label: string; detail: string; tool: string } | null>(null);
  const canvasRef = useRef< HTMLDivElement>(null);
  const flowRef = useRef< ReactFlowInstance< WorkflowNode> | null>(null);
  const editLabelRef = useRef< HTMLInputElement>(null);
  const editButtonRef = useRef< HTMLButtonElement>(null);
  const selectedRef = useRef< HTMLSelectElement>(null);
  const initialRef = useRef(normalizeGraph(initialGraph));
  const sequence = useRef(0);
  const uid = useId().replace(/:/g, "");
  const changed = useRef(false);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    if (changed.current) onChangeRef.current?.(graph);
  }, [graph]);
  const editingId = editing?.id;
  useEffect(() => {
    if (editingId) editLabelRef.current?.focus();
  }, [editingId]);
  useEffect(() => {
    const element = canvasRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const commit = (next: WorkflowGraph, announcement: string) => {
    setHistory(h => [...h.slice(-19), graph]);
    changed.current = true;
    setGraph(normalizeGraph(next));
    setMessage(announcement);
  };
  const connect = (connection: Pick< Connection, "source" | "target">) => {
    if (!canConnect(connection, graph)) { setMessage("Escolha dois nós diferentes sem um vínculo existente."); return; }
    commit({ ...graph, edges: [...graph.edges, { id: `${uid}-edge-${++sequence.current}`, ...connection, type: "blueprint" }] }, "Conexão adicionada.");
  };
  const add = (action: WorkflowAction, editNow = false) => {
    if (graph.nodes.length >= 20) { setMessage("Este canvas suporta até 20 nós."); return; }
    const after = graph.nodes.find(n => n.id === selected);
    const id = `${uid}-node-${++sequence.current}`;
    const position = { x: after ? after.position.x + 260 : 30, y: after ? after.position.y : 80 };
    while (graph.nodes.some(n => Math.abs(n.position.x - position.x) < 212 && Math.abs(n.position.y - position.y) < 184)) position.y += 194;
    const node: WorkflowNode = { id, type: "blueprint", position, data: { ...action }, selected: true };
    const outgoing = graph.edges.filter(e => e.source === after?.id);
    let edges = graph.edges;
    if (after) {
      if (outgoing.length === 1) edges = edges.map(e => e.id === outgoing[0].id ? { ...e, source: id } : e);
      edges = [...edges, { id: `${uid}-edge-${++sequence.current}`, source: after.id, target: id, type: "blueprint" }];
    }
    commit({ nodes: [...graph.nodes.map(n => ({ ...n, selected: false })), node], edges }, `${action.label} adicionado.`);
    setSelected(id);
    setEditing(editNow ? { id, label: action.label, detail: action.detail, tool: action.tool ?? "" } : null);
    void flow?.setCenter(position.x + 98, position.y + 84, { zoom: width < 600 ? 0.9 : 1 });
  };
  const remove = () => {
    const node = graph.nodes.find(n => n.id === selected);
    if (!node) return;
    const incoming = graph.edges.filter(edge => edge.target === selected);
    const outgoing = graph.edges.filter(edge => edge.source === selected);
    const remaining = { nodes: graph.nodes.filter(n => n.id !== selected), edges: graph.edges.filter(e => e.source !== selected && e.target !== selected) };
    const bridge = incoming.length === 1 && outgoing.length === 1 ? { source: incoming[0].source, target: outgoing[0].target } : null;
    const reconnect = bridge && canConnect(bridge, remaining);
    if (reconnect) remaining.edges.push({ id: `${uid}-edge-${++sequence.current}`, ...bridge, type: "blueprint" });
    commit(remaining, `${node.data.label} removido.`);
    setSelected("");
    setEditing(null);
    selectedRef.current?.focus();
  };
  const onNodesChange = useCallback((changes: NodeChange< WorkflowNode>[]) => {
    changed.current = true;
    setGraph(g => {
      const viewport = flowRef.current?.getViewport();
      const canvas = canvasRef.current?.getBoundingClientRect();
      const boundedChanges = changes.map(change => {
        if (change.type !== "position" || !change.position || !viewport || !canvas) return change;
        const node = g.nodes.find(item => item.id === change.id);
        if (!node) return change;
        const inset = 4;
        const minX = (inset - viewport.x) / viewport.zoom;
        const minY = (inset - viewport.y) / viewport.zoom;
        const maxX = (canvas.width - inset - viewport.x) / viewport.zoom - (node.measured?.width ?? 196);
        const maxY = (canvas.height - inset - viewport.y) / viewport.zoom - (node.measured?.height ?? 166);
        return { ...change, position: {
          x: Math.max(minX, Math.min(change.position.x, Math.max(minX, maxX))),
          y: Math.max(minY, Math.min(change.position.y, Math.max(minY, maxY))),
        } };
      });
      return { ...g, nodes: applyNodeChanges(boundedChanges, g.nodes) };
    });
    const selection = changes.find(c => c.type === "select" && c.selected);
    if (selection && "id" in selection) setSelected(selection.id);
  }, []);
  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    changed.current = true;
    setGraph(g => ({ ...g, edges: applyEdgeChanges(changes, g.edges) }));
  }, []);
  const focusNode = (id: string) => {
    setSelected(id);
    setEditing(null);
    setGraph(g => ({ ...g, nodes: g.nodes.map(n => ({ ...n, selected: n.id === id })) }));
    const node = graph.nodes.find(n => n.id === id);
    if (node) void flow?.setCenter(node.position.x + 98, node.position.y + 84, { zoom: 1 });
  };
  const editSelected = () => {
    const node = graph.nodes.find(item => item.id === selected);
    if (node) setEditing({ id: node.id, label: node.data.label, detail: node.data.detail, tool: node.data.tool ?? "" });
  };
  const saveStep = () => {
    if (!editing || !editing.label.trim()) return;
    const name = editing.label.trim();
    commit({ ...graph, nodes: graph.nodes.map(node => node.id === editing.id
      ? { ...node, data: { ...node.data, label: name, detail: editing.detail.trim(), tool: editing.tool.trim() || undefined } }
      : node) }, `${name} atualizado.`);
    setEditing(null);
    editButtonRef.current?.focus();
  };
  const download = () => {
    const clean = { nodes: graph.nodes.map(({ id, position, data }) => ({ id, type: "blueprint", position, data })), edges: graph.edges.map(({ id, source, target }) => ({ id, source, target, type: "blueprint" })) };
    const url = URL.createObjectURL(new Blob([JSON.stringify(clean, null, 2)], { type: "application/json" }));
    const link = document.createElement("a"); link.href = url; link.download = "workflow.json"; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setMessage("Workflow exportado em formato JSON.");
  };

  return <section className={`wb-root ${className}`} style={style} aria-label={title} data-animated={animated && !motionPaused}>
    <style>{styles}</style>
    <header className="wb-header">
      {onBack && (
        <button type="button" onClick={onBack} className="mr-2 px-2 py-1 text-xs rounded-md bg-warm-mist/40 hover:bg-warm-mist text-ink">
          ← Voltar
        </button>
      )}
      <span className="wb-mark" aria-hidden="true">+</span>
      <div className="wb-heading"><h2>{title}</h2><span>Canvas de Automação Visual</span></div>
      <div className="wb-header-actions">
        <button type="button" onClick={() => add({ ...agentTemplate, label: agentTemplate?.label ?? "Novo Agente IA", detail: agentTemplate?.detail ?? "Executa lógica autônoma.", kind: "agent" }, true)} disabled={graph.nodes.length >= 20}>+ Agente</button>
        <button type="button" onClick={() => { const previous = history.at(-1); if (previous) { changed.current = true; setGraph(previous); setHistory(h => h.slice(0, -1)); setSelected(""); setEditing(null); setMessage("Última alteração desfeita."); } }} disabled={!history.length}>Desfazer</button>
        <button type="button" className="wb-primary" onClick={download}>Exportar JSON <span aria-hidden="true">↗</span></button>
      </div>
    </header>
    <div className="wb-workspace">
      <div className="wb-canvas-column">
        <div className="wb-canvas" ref={canvasRef}>
          <ReactFlow< WorkflowNode> nodes={graph.nodes} edges={graph.edges} nodeTypes={nodeTypes} edgeTypes={edgeTypes}
            onInit={instance => { flowRef.current = instance; setFlow(instance); }} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={connect}
            isValidConnection={connection => canConnect(connection, graph)}
            onNodeClick={(_, node) => { setSelected(node.id); setEditing(null); }}
            nodesFocusable edgesFocusable disableKeyboardA11y={false}
            minZoom={0.3} maxZoom={1.5} zoomOnScroll={false} zoomOnDoubleClick={false} autoPanOnNodeDrag={false} preventScrolling={false}
            deleteKeyCode={null} snapToGrid snapGrid={[10, 10]} aria-label={`${title} diagram`}
            >
            <InitialViewport width={width} />
          </ReactFlow>
          {!graph.nodes.length && <p className="wb-empty">Adicione uma ação da coluna lateral para iniciar.</p>}
          <div className="wb-tools" role="group" aria-label="Canvas controls">
            <button type="button" aria-label="Zoom out" onClick={() => void flow?.zoomOut()}>−</button>
            <button type="button" onClick={() => void flow?.fitView({ padding: 0.15, maxZoom: 1 })}>Enquadrar</button>
            <button type="button" aria-label="Zoom in" onClick={() => void flow?.zoomIn()}>+</button>
            {animated && <button type="button" onClick={() => setMotionPaused(p => !p)} aria-pressed={motionPaused}>{motionPaused ? "Retomar" : "Pausar"}</button>}
          </div>
        </div>
        <div className="wb-status"><span><i aria-hidden="true" /> {graph.nodes.length} nós · {graph.edges.length} conexões ativas</span><span>Officia Workflow Canvas</span></div>
        <div className="wb-editor">
          <div className="wb-edit-row"><label htmlFor={`${uid}-selected`}>Inserir após / nó selecionado</label><select ref={selectedRef} id={`${uid}-selected`} value={graph.nodes.some(n => n.id === selected) ? selected : ""} onChange={e => focusNode(e.target.value)}><option value="">Nó desconectado</option>{graph.nodes.map(n => <option key={n.id} value={n.id}>{n.data.label}</option>)}</select><button ref={editButtonRef} type="button" onClick={editSelected} disabled={!graph.nodes.some(n => n.id === selected)}>Editar nó</button><button type="button" onClick={remove} disabled={!graph.nodes.some(n => n.id === selected)}>Remover nó</button></div>
          {editing && <form className="wb-step-form" onSubmit={event => { event.preventDefault(); saveStep(); }}>
            <label>Nome do nó<input ref={editLabelRef} required maxLength={60} value={editing.label} onChange={event => setEditing({ ...editing, label: event.target.value })} /></label>
            <label>O que executa<textarea maxLength={160} rows={2} value={editing.detail} onChange={event => setEditing({ ...editing, detail: event.target.value })} /></label>
            <label>Ferramenta (opcional)<input maxLength={40} value={editing.tool} onChange={event => setEditing({ ...editing, tool: event.target.value })} /></label>
            <div><button type="submit" className="wb-primary">Salvar nó</button><button type="button" onClick={() => { setEditing(null); editButtonRef.current?.focus(); }}>Cancelar</button></div>
          </form>}
          <form className="wb-connect" onSubmit={e => { e.preventDefault(); connect({ source, target }); }}>
            <label>De<select value={source} onChange={e => setSource(e.target.value)}><option value="">Origem</option>{graph.nodes.map(n => <option key={n.id} value={n.id}>{n.data.label}</option>)}</select></label>
            <span aria-hidden="true">→</span>
            <label>Para<select value={target} onChange={e => setTarget(e.target.value)}><option value="">Destino</option>{graph.nodes.map(n => <option key={n.id} value={n.id}>{n.data.label}</option>)}</select></label>
            <button type="submit" disabled={!source || !target}>Conectar nós</button>
          </form>
          <p className="wb-message" role="status" aria-live="polite">{message}</p>
        </div>
      </div>
      <aside className="wb-stack" aria-label="Connection stack">
        <div className="wb-stack-heading"><h3>Ações & Integrações</h3><span aria-hidden="true">▱</span></div>
        <p>Escolha uma ação para conectar ao nó selecionado.</p>
        {apps.map((app, index) => <details key={app.id} open={index === 0} className="wb-app">
          <summary><span className="wb-app-mark" aria-hidden="true"><BrandMark key={app.logo} src={app.logo} fallback={app.name.slice(0, 1)} /></span><strong>{app.name}</strong><small>{app.actions.length}</small></summary>
          <div className="wb-actions">{app.actions.map((action, i) => <button key={`${app.id}-${i}`} type="button" onClick={() => add({ ...action, logo: action.logo ?? app.logo })} disabled={graph.nodes.length >= 20} aria-label={`Adicionar ${action.label}`}><span>{action.label}<small>{labels[action.kind]}</small></span><b aria-hidden="true">+</b></button>)}</div>
        </details>)}
      </aside>
    </div>
  </section>;
}

export default WorkflowBlueprint;

const styles = String.raw`
.wb-root{--wb-bg:var(--color-parchment,#faf8f5);--wb-fg:var(--color-ink,#1c1917);--wb-card:var(--color-soft-paper,#ffffff);--wb-muted:var(--color-graphite,#78716c);--wb-border:var(--color-warm-mist,#e7e5e4);--wb-primary:var(--color-deep-teal,#0d9488);--wb-on-primary:#ffffff;--wb-secondary:#0284c7;width:100%;min-width:0;border:1px solid var(--wb-border);border-radius:16px;overflow:hidden;background:var(--wb-bg);color:var(--wb-fg);font-size:14px;line-height:1.5;font-family:inherit;box-sizing:border-box;text-align:left;isolation:isolate}
.dark .wb-root{--wb-bg:#0f1115;--wb-fg:#f3f4f6;--wb-card:#181b21;--wb-muted:#9ca3af;--wb-border:#2e3440;--wb-primary:#14b8a6;--wb-on-primary:#000000;--wb-secondary:#38bdf8}
.wb-root *{box-sizing:border-box}.wb-root button,.wb-root select{font:inherit;color:inherit}.wb-root button{cursor:pointer}.wb-root button:disabled{opacity:.45;cursor:not-allowed}.wb-root button,.wb-root select{border:1px solid var(--wb-border);border-radius:8px;background:var(--wb-card);min-height:38px;padding:6px 12px}.wb-root button:hover:enabled{background:color-mix(in srgb,var(--wb-primary) 12%,var(--wb-card))}.wb-root :is(button,select,summary):focus-visible{outline:2px solid var(--wb-primary);outline-offset:2px}.wb-root .wb-primary{background:var(--wb-primary);color:var(--wb-on-primary);border-color:var(--wb-primary)}.wb-root .wb-primary:hover{background:var(--wb-primary);filter:brightness(1.08)}
.wb-header{display:flex;align-items:center;gap:12px;padding:14px 20px;border-bottom:1px solid var(--wb-border);background:var(--wb-card)}.wb-mark{display:grid;place-items:center;width:32px;height:32px;border-radius:8px;background:var(--wb-primary);color:var(--wb-on-primary);font:20px/1 system-ui}.wb-heading{flex:1;min-width:0}.wb-heading h2{font-size:15px;line-height:1.25;font-weight:600;margin:0}.wb-heading>span{font:10px/1.7 ui-monospace,monospace;letter-spacing:.13em;text-transform:uppercase;color:var(--wb-muted)}.wb-header-actions{display:flex;gap:8px;font-size:12px}.wb-workspace{display:grid;grid-template-columns:minmax(0,1fr) 260px}.wb-canvas-column{min-width:0}.wb-canvas{position:relative;height:520px;background-image:radial-gradient(color-mix(in srgb,var(--wb-muted) 30%,transparent) 1px,transparent 1px);background-size:20px 20px}.wb-root .react-flow{background:transparent;--xy-edge-stroke:var(--wb-primary);--xy-connectionline-stroke:var(--wb-primary)}.wb-root .react-flow__attribution a{color:var(--wb-muted);background:var(--wb-card)}.wb-root .react-flow__node:focus-visible{outline:2px solid var(--wb-primary);border-radius:14px}.wb-root .react-flow__node{background:none;border:none;padding:0}.wb-node{width:196px;min-height:140px;border:1px solid var(--wb-border);border-radius:14px;background:var(--wb-card);box-shadow:0 8px 24px -12px rgba(0,0,0,0.12);color:var(--wb-fg);position:relative}.wb-node[data-selected=true]{outline:2px solid var(--wb-primary);outline-offset:2px}.wb-node-head{padding:12px 12px 10px;display:flex;gap:8px;align-items:center}.wb-node-head strong{font-size:13px;line-height:1.2;display:block;font-weight:600}.wb-node-head small{font:9px ui-monospace,monospace;letter-spacing:.1em;text-transform:uppercase;color:var(--wb-muted);display:block;margin-top:2px}.wb-glyph{display:grid;place-items:center;flex:0 0 30px;height:30px;border:1px solid var(--wb-border);border-radius:8px;background:color-mix(in srgb,var(--wb-primary) 10%,var(--wb-card));color:var(--wb-primary)}.wb-glyph svg{width:18px;height:18px}.wb-node-body{padding:8px 12px 10px;border-top:1px solid var(--wb-border)}.wb-node-body p{font-size:11px;line-height:1.4;color:var(--wb-muted);margin:0 0 6px}.wb-node-body>span{display:inline-block;border:1px solid var(--wb-border);border-radius:4px;padding:2px 6px;color:var(--wb-muted);font:9px ui-monospace,monospace;text-transform:uppercase}.wb-root .react-flow__handle{width:10px;height:10px;min-width:10px;min-height:10px;border:2px solid var(--wb-card);background:var(--wb-primary)}.wb-edge-halo{fill:none;stroke:color-mix(in srgb,var(--wb-primary) 13%,transparent);stroke-width:8}.wb-edge{fill:none;stroke-width:2}.wb-edge-pulse{fill:none;stroke:var(--wb-fg);stroke-opacity:.4;stroke-width:2;stroke-dasharray:3 40;animation:wb-travel 6s linear infinite}.wb-port{fill:var(--wb-primary)}@keyframes wb-travel{to{stroke-dashoffset:-192}}.wb-tools{position:absolute;left:14px;bottom:14px;display:flex;gap:3px;padding:4px;border:1px solid var(--wb-border);border-radius:8px;background:var(--wb-card)}.wb-tools button{border:0;min-width:32px;padding:4px 8px;font-size:12px}.wb-status{display:flex;justify-content:space-between;gap:12px;border-top:1px solid var(--wb-border);padding:8px 16px;color:var(--wb-muted);font:10px ui-monospace,monospace}.wb-status i{display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--wb-primary);margin-right:5px}.wb-editor{padding:14px;border-top:1px solid var(--wb-border);background:var(--wb-card);font-size:12px}.wb-edit-row{display:flex;align-items:center;gap:8px;flex-wrap:wrap}.wb-edit-row select{flex:1;min-width:120px}.wb-connect{display:flex;gap:8px;align-items:end;margin-top:10px}.wb-connect label{flex:1;color:var(--wb-muted);display:grid;gap:4px}.wb-connect select{width:100%}.wb-step-form{display:grid;gap:8px;margin-top:10px;padding:12px;border:1px solid var(--wb-border);border-radius:8px;background:var(--wb-bg)}.wb-step-form input,.wb-step-form textarea{width:100%;padding:6px 8px;border:1px solid var(--wb-border);border-radius:6px;background:var(--wb-card);color:var(--wb-fg)}.wb-stack{border-left:1px solid var(--wb-border);background:var(--wb-card);padding:14px;overflow-y:auto;max-height:680px}.wb-stack-heading{display:flex;align-items:center;justify-content:space-between}.wb-stack h3{font-size:13px;margin:0;font-weight:600}.wb-stack>p{font-size:11px;color:var(--wb-muted);margin:4px 0 12px}.wb-app{border:1px solid var(--wb-border);border-radius:8px;background:var(--wb-bg);margin-top:8px;overflow:hidden}.wb-app summary{list-style:none;display:flex;gap:8px;align-items:center;padding:10px;cursor:pointer;font-size:12px}.wb-app-mark{display:grid;place-items:center;width:24px;height:24px;border-radius:6px;border:1px solid var(--wb-border);color:var(--wb-primary);font-size:11px;font-weight:700}.wb-actions{border-top:1px solid var(--wb-border);padding:4px}.wb-actions button{display:flex;align-items:center;gap:8px;width:100%;text-align:left;font-size:11px;border:0;border-radius:6px;padding:6px;background:none}.wb-actions button>span{flex:1}.wb-actions small{display:block;font:8px ui-monospace,monospace;text-transform:uppercase;color:var(--wb-muted)}
`;
