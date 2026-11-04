# Plano: Portfólio Pergaminho Encantado (Mapa do Maroto)

> Status: Pronto para Execução  
> Destino de Deploy: GitHub Pages  
> Stack: React 19 + Vite + Tailwind CSS + Framer Motion + Lucide React + Canvas Ink Effects

---

## 📋 Visão Geral
Criação de um portfólio web de alta qualidade técnica e visual. A experiência começa em um vazio escuro com um orbe pulsante de luz ("Clique para revelar"). Ao clicar, a página se desdobra como um mapa encantado em pergaminho clássico, revelando a frase *"Juro solenemente entregar um bom trabalho"* e guiando o visitante através de seções interativas com trilhas de tinta, pegadas animadas na rolagem e projetos destacados.

---

## 🛠️ Fases de Implementação

### Fase 1: Scaffold do Projeto e Git
- [ ] Inicializar repositório Git e criar branch `feature/magical-portfolio` conforme convenção de memória.
- [ ] Inicializar projeto React + TypeScript com Vite.
- [ ] Configurar Tailwind CSS, PostCSS e fontes do Google Fonts (`Cinzel`, `Cormorant Garamond`, `EB Garamond`, `Inter`).
- [ ] Instalar `framer-motion`, `lucide-react`, `canvas-confetti` (para partículas/faíscas).
- **Verificação:** `npm run dev` roda sem erros e fontes/Tailwind compilam perfeitamente.

### Fase 2: O Orbe de Revelação e Transição do Vazio
- [ ] Criar componente `VoidOverlay.tsx`: tela escura imersiva com partículas sutis flutuando.
- [ ] Criar o orbe místico central com brilho pulsante dourado/âmbar e legenda animada *"Clique para revelar"*.
- [ ] Implementar a transição de revelação: animação de expansão de tinta líquida em SVG/Canvas.
- [ ] Apresentar a frase solene com efeito de tinta fresca: *"Juro solenemente entregar um bom trabalho"*.
- **Verificação:** Clicar no orbe dispara a transição fluida sem engasgos, transicionando para a visão do pergaminho.

### Fase 3: Estrutura do Pergaminho e Jornada Guiada
- [ ] Criar background de pergaminho vintage com textura de alta fidelidade e bordas cartográficas ornamentadas.
- [ ] Implementar o componente `InkTrail`: linha guia pontilhada com animação de pegadas sutis que avançam conforme a rolagem do usuário.
- [ ] Adicionar botão flutuante e de rodapé *"Ocultar o Mapa"* (retorna ao estado misterioso inicial com sutileza).
- **Verificação:** Scroll da página ativa as pegadas e o botão de recolher mapa restaura o estado inicial.

### Fase 4: Seções do Portfólio
- [ ] **Hero Section ("O Mapa Revelado")**: Apresentação profissional elegante, título, mini-apresentação, botões de ação e bússola náutica decorativa.
- [ ] **Sobre Mim ("O Artífice")**: Trajetória profissional, princípios de engenharia de software e atenção a detalhes.
- [ ] **Grimório Técnico (Skills)**: Habilidades organizadas em categorias (Frontend, Backend, DevOps/Ferramentas, Arquitetura) com estilo de tomos arcanos e cards com borda dupla.
- [ ] **Projetos em Destaque ("Artefatos Criados")**: Cards com links para demo/código, badges de tecnologia, resumos objetivos e estados hover refinados.
- [ ] **Contato ("Mensageiro / Coruja")**: Formulário de envio / links diretos (GitHub, LinkedIn, E-mail) com estética de selo de cera lacrado.
- **Verificação:** Todas as seções preenchidas, responsivas (mobile, tablet, desktop) e estilizadas de acordo com o `DESIGN.md`.

### Fase 5: Configuração para GitHub Pages e Build de Produção
- [ ] Configurar `base` relativo em `vite.config.ts` para suporte automático ao GitHub Pages (`base: './'`).
- [ ] Configurar script de deploy e workflow GitHub Actions ou script estático `dist`.
- **Verificação:** `npm run build` gera os arquivos estáticos na pasta `dist` sem avisos de tipos ou assets quebrados.

### Fase 6: Auditoria de Qualidade e Verificação Final
- [ ] Executar script de validação de acessibilidade e contraste das cores sepia/pergaminho.
- [ ] Verificar performance e responsividade em diferentes viewports.
- [ ] Criar documentação clara de como publicar no GitHub Pages.
- **Verificação:** Build de produção aprovado, sem erros no console, pronto para deploy.

