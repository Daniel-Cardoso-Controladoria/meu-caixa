/* Simula o runtime de artefatos do claude.ai (window.claude.use) para rodar o app localmente.
   - 'db': banco de documentos guardado no localStorage do navegador (chave "caixa-db").
     Na primeira carga, tenta ler data/seed.json (export do banco do artefato; fica fora do git).
   - 'downloads': salva o arquivo pelo navegador.
   Dentro do claude.ai o objeto real já existe e este arquivo não faz nada. */
(function(){
  if (window.claude && window.claude.use) return;
  const KEY = 'caixa-db';
  let store = {};
  try { store = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch(e) {}
  const persist = () => { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch(e) {} };
  const subs = [];
  const clone = v => v == null ? v : JSON.parse(JSON.stringify(v));
  const docSnap = path => ({ id: path.split('/').pop(), exists: path in store, data: () => clone(store[path]) });
  const colSnap = col => {
    const docs = Object.keys(store).filter(p => p.startsWith(col + '/') && p.split('/').length === 2).sort().map(docSnap);
    return { docs, size: docs.length, metadata: { fromCache: true } };
  };
  const notify = () => subs.forEach(s => s());
  const db = {
    doc: path => ({
      get: async () => docSnap(path),
      set: async data => { store[path] = clone(data); persist(); notify(); },
      onSnapshot(cb){ const f = () => cb(docSnap(path)); subs.push(f); setTimeout(f); return () => subs.splice(subs.indexOf(f), 1); }
    }),
    collection: col => ({
      onSnapshot(cb){ const f = () => cb(colSnap(col)); subs.push(f); setTimeout(f); return () => subs.splice(subs.indexOf(f), 1); }
    })
  };
  const downloads = {
    save: async ({ filename, data }) => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([data]));
      a.download = filename; a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    }
  };
  const pronto = Object.keys(store).length ? Promise.resolve() :
    fetch('data/seed.json').then(r => r.ok ? r.json() : {}).then(s => { store = s || {}; persist(); }).catch(() => {});
  window.claude = { use: async nome => { await pronto; return { db, downloads }[nome] || null; } };
  /* utilitário no console: exportaBanco() baixa o banco local como JSON */
  window.exportaBanco = () => downloads.save({ filename: 'seed.json', data: JSON.stringify(store, null, 2) });
})();
