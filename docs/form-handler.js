/**
 * form-handler.js
 * Cadastro, login, logout e gerenciamento de estado de autenticação.
 * Protótipo sem back-end — dados em localStorage.
 */

const USERS_KEY   = 'usuarios_cadastrados';
const SESSION_KEY = 'usuario_logado';

// =====================================================================
// UTILITÁRIOS
// =====================================================================

function carregarUsuarios() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

function salvarUsuarios(lista) {
  localStorage.setItem(USERS_KEY, JSON.stringify(lista));
}

function obterSessao() {
  return JSON.parse(localStorage.getItem(SESSION_KEY)) || null;
}

function salvarSessao(usuario) {
  // Nunca salva a senha na sessão
  const { senha, ...seguro } = usuario;
  localStorage.setItem(SESSION_KEY, JSON.stringify(seguro));
}

function encerrarSessao() {
  localStorage.removeItem(SESSION_KEY);
}

function validarSenha(senha) {
  return (
    senha.length >= 6 &&
    /\d/.test(senha) &&
    /[A-Z]/.test(senha) &&
    /[a-z]/.test(senha)
  );
}

// =====================================================================
// ESTADO DE AUTENTICAÇÃO — atualiza toda a UI
// =====================================================================

function atualizarUI() {
  const sessao = obterSessao();
  const logado = !!sessao;

  // Navbar
  const authGuest = document.getElementById('auth-guest');
  const authUser  = document.getElementById('auth-user');
  const greeting  = document.getElementById('user-greeting');
  const avatar    = document.getElementById('user-avatar');

  if (authGuest) authGuest.style.display = logado ? 'none' : 'flex';
  if (authUser)  authUser.style.display  = logado ? 'flex' : 'none';
  if (logado && greeting) {
    const primeiroNome = sessao.nome.split(' ')[0];
    greeting.textContent = `Olá, ${primeiroNome}`;
  }
  if (logado && avatar) {
    avatar.textContent = sessao.nome.charAt(0).toUpperCase();
  }

  // Hero
  const heroGuest = document.getElementById('hero-guest-actions');
  const heroUser  = document.getElementById('hero-user-actions');
  if (heroGuest) heroGuest.style.display = logado ? 'none' : 'flex';
  if (heroUser)  heroUser.style.display  = logado ? 'flex' : 'none';

  // CTA
  const ctaGuest = document.getElementById('cta-guest');
  const ctaUser  = document.getElementById('cta-user');
  if (ctaGuest) ctaGuest.style.display = logado ? 'none' : 'flex';
  if (ctaUser)  ctaUser.style.display  = logado ? 'flex' : 'none';

  // Botão "Deletar todos" no modal de consulta — só para logados
  const btnDeletar = document.getElementById('btn-deletar-area');
  if (btnDeletar) btnDeletar.style.display = logado ? 'block' : 'none';
}

// =====================================================================
// LOGOUT
// =====================================================================

window.fazerLogout = function () {
  encerrarSessao();
  atualizarUI();
  mostrarToast('Você saiu da sua conta. Até logo! 👋');
};

// =====================================================================
// TOAST (feedback visual leve)
// =====================================================================

function mostrarToast(msg, tipo = 'sucesso') {
  // Remove toast anterior se existir
  document.querySelectorAll('.toast').forEach(t => t.remove());

  const toast = document.createElement('div');
  toast.className = `toast toast-${tipo}`;
  toast.textContent = msg;
  document.body.appendChild(toast);

  // Anima entrada
  requestAnimationFrame(() => toast.classList.add('toast-visible'));

  setTimeout(() => {
    toast.classList.remove('toast-visible');
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}

// =====================================================================
// CADASTRO DE USUÁRIO (US01 — doador / US02 — receptor)
// =====================================================================

function inicializarFormCadastro() {
  const form = document.getElementById('form-cadastro-usuario');
  if (!form) return;

  const radioReceptor = document.getElementById('tipo-receptor');
  const radioDoador   = document.getElementById('tipo-doador');
  const campoEndereco = document.getElementById('campo-endereco');
  const inputEndereco = document.getElementById('endereco');

  function toggleEndereco() {
    const isReceptor = radioReceptor?.checked;
    if (campoEndereco) campoEndereco.style.display = isReceptor ? 'flex' : 'none';
    if (inputEndereco) inputEndereco.required = !!isReceptor;
  }

  radioDoador?.addEventListener('change', toggleEndereco);
  radioReceptor?.addEventListener('change', toggleEndereco);
  toggleEndereco();

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const tipo     = document.querySelector('input[name="tipo-usuario"]:checked')?.value || 'doador';
    const nome     = form.querySelector('#nome').value.trim();
    const telefone = form.querySelector('#telefone').value.trim();
    const email    = form.querySelector('#email-cadastro').value.trim().toLowerCase();
    const endereco = form.querySelector('#endereco')?.value.trim() || '';
    const senha    = form.querySelector('#password-cadastro').value;
    const confirm  = form.querySelector('#password-confirm-cadastro').value;

    // Validações
    if (!nome || !email || !senha) {
      mostrarToast('Preencha todos os campos obrigatórios.', 'erro');
      return;
    }
    if (tipo === 'receptor' && !endereco) {
      mostrarToast('Receptores precisam informar o endereço.', 'erro');
      return;
    }
    if (!validarSenha(senha)) {
      mostrarToast('Senha fraca: mínimo 6 caracteres, número, maiúscula e minúscula.', 'erro');
      return;
    }
    if (senha !== confirm) {
      mostrarToast('As senhas não coincidem.', 'erro');
      return;
    }

    const usuarios = carregarUsuarios();
    if (usuarios.some(u => u.email === email)) {
      mostrarToast('Este e-mail já está cadastrado. Tente fazer login.', 'erro');
      return;
    }

    const novoUsuario = { id: Date.now(), tipo, nome, telefone, email, endereco, senha };
    usuarios.push(novoUsuario);
    salvarUsuarios(usuarios);

    // Faz login automático após cadastro
    salvarSessao(novoUsuario);
    atualizarUI();

    form.reset();
    document.getElementById('modal-cadastro').checked = false;
    if (campoEndereco) campoEndereco.style.display = 'none';
    if (inputEndereco) inputEndereco.required = false;

    mostrarToast(`Bem-vindo(a), ${nome.split(' ')[0]}! ✅ Conta criada com sucesso.`);
  });
}

// =====================================================================
// LOGIN (US01 / US02)
// =====================================================================

function inicializarFormLogin() {
  const form = document.getElementById('form-login');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = form.querySelector('#userEmail').value.trim().toLowerCase();
    const senha = form.querySelector('#userSenha').value;

    if (!email || !senha) {
      mostrarToast('Informe e-mail e senha.', 'erro');
      return;
    }

    const usuarios = carregarUsuarios();
    const usuario  = usuarios.find(u => u.email === email && u.senha === senha);

    if (!usuario) {
      mostrarToast('E-mail ou senha incorretos.', 'erro');
      return;
    }

    salvarSessao(usuario);
    atualizarUI();

    form.reset();
    document.getElementById('modal-login').checked = false;

    mostrarToast(`Olá, ${usuario.nome.split(' ')[0]}! Bem-vindo(a) de volta 👋`);
  });
}

// =====================================================================
// INICIALIZAÇÃO
// =====================================================================

document.addEventListener('DOMContentLoaded', () => {
  inicializarFormCadastro();
  inicializarFormLogin();
  atualizarUI(); // aplica estado de sessão ao carregar a página
});
