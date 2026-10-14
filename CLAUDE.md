# Meu Caixa — contexto para o Claude Code

App de página única em `index.html` (sem build, sem framework). Idioma da interface e do código: português.

- Lógica pura de cálculo fica entre `/*PURE-START*/` e `/*PURE-END*/` (tipoDe, calcMes, salarioComp, projeta, investe, parseItau, dedupe…). Mantenha essas funções sem acesso ao DOM.
- Renderização: helper `h(tag, attrs, ...filhos)`; cada aba é uma função `vResumo`, `vProj`, `vLanc`, `vInvest`, `vRegras`, `vImportar`.
- Persistência: `claude.use('db')` — documentos `meses/AAAA-MM` (`{rows}`), `config/regras`, `config/plano`, `config/geral`. Localmente é simulado por `dev/claude-shim.js`.
- Regra de negócio importante: o salário creditado no último dia útil de um mês é receita da competência seguinte.
- Cores só via tokens CSS em `:root` (claro e escuro). Fonte Manrope.
- `data/` contém dados financeiros reais: nunca versionar nem publicar.
- Para publicar no claude.ai, republicar `index.html` no artefato https://claude.ai/artifact/GHYU9eVweFjPXfEogWHzq5 (capabilities: db, downloads).
