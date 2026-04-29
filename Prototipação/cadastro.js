/**
 * cadastro.js
 * Gerencia cadastro, consulta, filtragem e exclusão de móveis.
 * RF01, RF02, RF03, RF04 | US03, US04
 */

const STORAGE_KEY  = 'moveis_doacao';
const TIPOS_MOVEIS = ['todos','sofa','mesa','cama','cadeira','armario','estante'];

// =====================================================================
// ARMAZENAMENTO
// =====================================================================

function carregarMoveisDoLocalStorage() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function salvarMovelNoBD(movel) {
  const lista = carregarMoveisDoLocalStorage();
  movel.id = Date.now();
  lista.push(movel);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
  return movel;
}

function deletarMovelDoBD(id) {
  const lista = carregarMoveisDoLocalStorage().filter(m => m.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
}

function deletarTodosMoveisDoLocalStorage() {
  if (!confirm('Tem certeza que quer deletar TODOS os móveis? Ação irreversível!')) return false;
  localStorage.removeItem(STORAGE_KEY);
  const lista = document.querySelector('.lista-moveis');
  if (lista) lista.innerHTML = '';
  mostrarToastCadastro('Todos os móveis foram removidos.');
  return true;
}

function pesquisarMoveisPorCampo(campo, valor) {
  return carregarMoveisDoLocalStorage().filter(m =>
    String(m[campo]).toLowerCase().includes(valor.toLowerCase())
  );
}

// =====================================================================
// RENDERIZAÇÃO
// =====================================================================

const ESTADO_LABELS = { novo:'Novo', otimo:'Ótimo', bom:'Bom', regular:'Regular' };
const TIPO_LABELS   = { sofa:'Sofá', mesa:'Mesa', cama:'Cama', cadeira:'Cadeira', armario:'Armário', estante:'Estante' };

function criarHTMLMovel(movel) {
  const tipo   = TIPO_LABELS[movel.tipo]   || movel.tipo;
  const estado = ESTADO_LABELS[movel.estado] || movel.estado;
  return `
    <h4>${tipo}</h4>
    <p><strong>Estado:</strong> ${estado}</p>
    <p><strong>Descrição:</strong> ${movel.descricao}</p>
    <p><strong>Contato:</strong> ${movel.contato}</p>
    <button onclick="deletarMovel(${movel.id})">🗑️ Remover</button>
  `;
}

function adicionarMovelAoDOM(movel) {
  const lista = document.querySelector('.lista-moveis');
  if (!lista) return;
  const div = document.createElement('div');
  div.className = `movel ${movel.tipo}`;
  div.style.display = 'block';
  div.dataset.id = movel.id;
  div.innerHTML = criarHTMLMovel(movel);
  lista.appendChild(div);
}

// Fallback: reutiliza o toast de form-handler se disponível
function mostrarToastCadastro(msg, tipo = 'sucesso') {
  if (typeof mostrarToast === 'function') {
    mostrarToast(msg, tipo);
  } else {
    alert(msg);
  }
}

// =====================================================================
// FILTROS (RF04)
// =====================================================================

function configurarFiltros() {
  const lista = document.querySelector('.lista-moveis');
  if (!lista) return;

  TIPOS_MOVEIS.forEach(tipo => {
    const el = document.getElementById(tipo === 'todos' ? 'todos' : tipo);
    if (!el) return;

    // Clona para limpar listeners anteriores
    const novo = el.cloneNode(true);
    el.parentNode.replaceChild(novo, el);

    novo.addEventListener('change', () => {
      lista.querySelectorAll('.movel').forEach(m => {
        m.style.display = (tipo === 'todos' || m.classList.contains(tipo)) ? 'block' : 'none';
      });
    });
  });
}

// =====================================================================
// INICIALIZAÇÃO
// =====================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Carrega móveis persistidos (RF02 / RF03)
  carregarMoveisDoLocalStorage().forEach(adicionarMovelAoDOM);
  configurarFiltros();

  // Formulário de cadastro de móvel (RF01 / US03)
  const formMovel = document.getElementById('form-cadastro-movel');
  if (formMovel) {
    formMovel.addEventListener('submit', (e) => {
      e.preventDefault();

      const tipo      = formMovel.querySelector('#tipo-movel').value;
      const descricao = formMovel.querySelector('#descricao').value.trim();
      const estado    = formMovel.querySelector('#estado').value;
      const contato   = formMovel.querySelector('#contato').value.trim();

      if (!tipo || !descricao || !estado || !contato) {
        mostrarToastCadastro('Preencha todos os campos.', 'erro');
        return;
      }

      const movel = salvarMovelNoBD({ tipo, descricao, estado, contato });
      adicionarMovelAoDOM(movel);
      configurarFiltros();
      formMovel.reset();

      document.getElementById('modal-cadastro-movel').checked = false;
      mostrarToastCadastro('Móvel cadastrado com sucesso! ✅');

      // Reativa filtro "Todos"
      const todos = document.getElementById('todos');
      if (todos) todos.checked = true;
    });
  }

  // Abre modal consulta → garante filtro "Todos" ativo (RF03)
  const modalConsulta = document.getElementById('modal-consulta');
  if (modalConsulta) {
    modalConsulta.addEventListener('change', (e) => {
      if (e.target.checked) {
        document.querySelectorAll('.lista-moveis .movel').forEach(m => m.style.display = 'block');
        const todos = document.getElementById('todos');
        if (todos) todos.checked = true;
      }
    });
  }
});

// =====================================================================
// FUNÇÕES GLOBAIS
// =====================================================================

window.deletarMovel = function (id) {
  if (!confirm('Remover este móvel?')) return;
  deletarMovelDoBD(id);
  document.querySelector(`[data-id="${id}"]`)?.remove();
  mostrarToastCadastro('Móvel removido com sucesso.');
};

window.deletarTodos = deletarTodosMoveisDoLocalStorage;

window.executarPesquisa = function () {
  const campo = document.getElementById('campo-pesquisa').value;
  const valor = document.getElementById('valor-pesquisa').value.trim();

  if (!valor) { mostrarToastCadastro('Digite um valor para pesquisar.', 'erro'); return; }

  const resultado = pesquisarMoveisPorCampo(campo, valor);
  const lista = document.querySelector('.lista-moveis');
  lista.innerHTML = '';

  if (resultado.length === 0) {
    lista.innerHTML = `<p style="color:var(--ink-muted);padding:20px 0;">Nenhum móvel encontrado para "<strong>${valor}</strong>".</p>`;
    return;
  }

  resultado.forEach(adicionarMovelAoDOM);
};

window.limparPesquisa = function () {
  const campoEl = document.getElementById('campo-pesquisa');
  const valorEl = document.getElementById('valor-pesquisa');
  if (campoEl) campoEl.value = 'tipo';
  if (valorEl) valorEl.value = '';

  const lista = document.querySelector('.lista-moveis');
  if (lista) {
    lista.innerHTML = '';
    carregarMoveisDoLocalStorage().forEach(adicionarMovelAoDOM);
  }

  const todos = document.getElementById('todos');
  if (todos) todos.checked = true;
};
