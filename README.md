# Meu Caixa

Controle de caixa pessoal (receitas, despesas, projeção, investimentos, regras de categorização e importação de extratos Itaú / Mercado Pago).

Origem: artefato do claude.ai — https://claude.ai/artifact/GHYU9eVweFjPXfEogWHzq5

## Estrutura

| Arquivo | O que é |
|---|---|
| `index.html` | O app inteiro (HTML + CSS + JS), igual ao artefato publicado, mais uma linha que carrega o shim |
| `dev/claude-shim.js` | Simula `window.claude.use('db' / 'downloads')` para rodar fora do claude.ai (banco no `localStorage`) |
| `data/seed.json` | (opcional, fora do git) dados reais exportados do banco do artefato |

## Rodando no VS Code

```bash
git clone https://github.com/Daniel-Cardoso-Controladoria/meu-caixa.git
cd meu-caixa
code .
npx serve .          # ou a extensão "Live Server" do VS Code
```

Abra http://localhost:3000. Sem `data/seed.json` o app começa vazio — importe um extrato pela aba **Importar**.

No console do navegador, `exportaBanco()` baixa o banco local como `seed.json`.

## Usando com o Claude Code

No terminal integrado do VS Code (ou pela extensão Claude Code):

```bash
claude
```

O arquivo `CLAUDE.md` dá o contexto do projeto ao Claude.

## Publicando de volta no artefato

Peça ao Claude Code: *"publique o index.html no artefato https://claude.ai/artifact/GHYU9eVweFjPXfEogWHzq5"*.
O shim é ignorado dentro do claude.ai (lá o `window.claude` real já existe).
