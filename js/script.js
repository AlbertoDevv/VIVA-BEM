/*
  VivaBem - funcionalidades do painel.
  Os dados são demonstrativos e ficam no navegador do usuário.
  Não armazenar informações pessoais ou dados médicos sensíveis.
*/

const CHAVE_ACOES = "vivabem_acoes";
const CHAVE_HISTORICO = "vivabem_historico";

document.addEventListener("DOMContentLoaded", iniciarPainel);

function iniciarPainel() {
  const formulario = document.querySelector("#formAcao");

  // A página inicial e a página de orientações não possuem este formulário.
  if (!formulario) return;

  definirDataAtual();
  formulario.addEventListener("submit", salvarAcao);
  document.querySelector("#botaoCancelar").addEventListener("click", cancelarEdicao);

  renderizarAcoes();
  renderizarHistorico();
  atualizarResumo();
}

function obterDados(chave) {
  try {
    const dados = localStorage.getItem(chave);
    return dados ? JSON.parse(dados) : [];
  } catch (erro) {
    console.error("Falha ao ler dados locais:", erro);
    mostrarMensagem("Não foi possível carregar os dados. Tente novamente.", false);
    return [];
  }
}

function salvarDados(chave, dados) {
  try {
    localStorage.setItem(chave, JSON.stringify(dados));
    return true;
  } catch (erro) {
    console.error("Falha ao salvar dados locais:", erro);
    mostrarMensagem("Não foi possível salvar os dados. Tente novamente.", false);
    return false;
  }
}

function definirDataAtual() {
  const campoData = document.querySelector("#dataAcao");
  if (campoData && !campoData.value) {
    const hoje = new Date();
    const dataLocal = new Date(hoje.getTime() - hoje.getTimezoneOffset() * 60000);
    campoData.value = dataLocal.toISOString().slice(0, 10);
  }
}

function salvarAcao(evento) {
  evento.preventDefault();

  const formulario = evento.currentTarget;
  formulario.classList.add("was-validated");

  if (!formulario.checkValidity() || !validarCampos()) {
    mostrarMensagem("Confira os campos destacados e tente novamente.", false);
    return;
  }

  const acaoId = document.querySelector("#acaoId").value;
  const acao = {
    id: acaoId || gerarId(),
    nome: document.querySelector("#nomeAcao").value.trim(),
    categoria: document.querySelector("#categoriaAcao").value,
    data: document.querySelector("#dataAcao").value,
    status: document.querySelector("#statusAcao").value,
    observacao: document.querySelector("#observacaoAcao").value.trim()
  };

  const acoes = obterDados(CHAVE_ACOES);

  if (acaoId) {
    const indice = acoes.findIndex(item => item.id === acaoId);
    if (indice === -1) {
      mostrarMensagem("Não foi possível localizar esse registro. Atualize a página.", false);
      return;
    }
    acoes[indice] = acao;
    if (!salvarDados(CHAVE_ACOES, acoes)) return;
    registrarAtividade("Registro editado", acao.nome);
    mostrarMensagem("Registro atualizado com sucesso.", true);
  } else {
    acoes.push(acao);
    if (!salvarDados(CHAVE_ACOES, acoes)) return;
    registrarAtividade("Registro adicionado", acao.nome);
    mostrarMensagem("Registro adicionado com sucesso.", true);
  }

  formulario.reset();
  formulario.classList.remove("was-validated");
  document.querySelector("#acaoId").value = "";
  document.querySelector("#tituloFormulario").textContent = "Adicionar ação";
  document.querySelector("#botaoSalvar").textContent = "Salvar registro";
  document.querySelector("#botaoCancelar").classList.add("d-none");
  definirDataAtual();
  atualizarTela();
}

function validarCampos() {
  const nome = document.querySelector("#nomeAcao").value.trim();
  const observacao = document.querySelector("#observacaoAcao").value.trim();
  const data = document.querySelector("#dataAcao").value;

  if (nome.length < 3 || nome.length > 60) return false;
  if (observacao.length > 160) return false;
  if (!data || Number.isNaN(Date.parse(`${data}T00:00:00`))) return false;
  return true;
}

function gerarId() {
  return `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

function renderizarAcoes() {
  const lista = document.querySelector("#listaAcoes");
  if (!lista) return;

  const acoes = obterDados(CHAVE_ACOES);
  lista.replaceChildren();

  if (acoes.length === 0) {
    const vazio = document.createElement("p");
    vazio.className = "empty-state";
    vazio.textContent = "Nenhuma ação registrada ainda. Use o formulário para começar.";
    lista.appendChild(vazio);
    return;
  }

  acoes.forEach(acao => {
    const item = document.createElement("article");
    item.className = "activity-item";

    const topo = document.createElement("div");
    topo.className = "activity-top";

    const conteudo = document.createElement("div");
    const titulo = document.createElement("h3");
    titulo.textContent = acao.nome;

    const meta = document.createElement("span");
    meta.className = "activity-meta";
    meta.textContent = `${acao.categoria} • ${formatarData(acao.data)}`;

    conteudo.append(titulo, meta);

    const status = document.createElement("span");
    status.className = acao.status === "Concluída" ? "status-pill" : "status-pill pending";
    status.textContent = acao.status;

    topo.append(conteudo, status);
    item.appendChild(topo);

    if (acao.observacao) {
      const observacao = document.createElement("p");
      observacao.className = "activity-observation";
      observacao.textContent = acao.observacao;
      item.appendChild(observacao);
    }

    const botoes = document.createElement("div");
    botoes.className = "item-actions";

    const editar = document.createElement("button");
    editar.type = "button";
    editar.textContent = "Editar";
    editar.addEventListener("click", () => prepararEdicao(acao.id));

    const remover = document.createElement("button");
    remover.type = "button";
    remover.className = "delete-button";
    remover.textContent = "Excluir";
    remover.addEventListener("click", () => removerAcao(acao.id));

    botoes.append(editar, remover);
    item.appendChild(botoes);
    lista.appendChild(item);
  });
}

function prepararEdicao(id) {
  const acao = obterDados(CHAVE_ACOES).find(item => item.id === id);
  if (!acao) {
    mostrarMensagem("Não foi possível localizar esse registro.", false);
    return;
  }

  document.querySelector("#acaoId").value = acao.id;
  document.querySelector("#nomeAcao").value = acao.nome;
  document.querySelector("#categoriaAcao").value = acao.categoria;
  document.querySelector("#dataAcao").value = acao.data;
  document.querySelector("#statusAcao").value = acao.status;
  document.querySelector("#observacaoAcao").value = acao.observacao;

  document.querySelector("#tituloFormulario").textContent = "Editar ação";
  document.querySelector("#botaoSalvar").textContent = "Salvar alterações";
  document.querySelector("#botaoCancelar").classList.remove("d-none");
  document.querySelector("#formulario").scrollIntoView({ behavior: "smooth" });
  mostrarMensagem("Edite os campos e salve as alterações.", true);
}

function cancelarEdicao() {
  const formulario = document.querySelector("#formAcao");
  formulario.reset();
  formulario.classList.remove("was-validated");
  document.querySelector("#acaoId").value = "";
  document.querySelector("#tituloFormulario").textContent = "Adicionar ação";
  document.querySelector("#botaoSalvar").textContent = "Salvar registro";
  document.querySelector("#botaoCancelar").classList.add("d-none");
  definirDataAtual();
  mostrarMensagem("", true);
}

function removerAcao(id) {
  const acoes = obterDados(CHAVE_ACOES);
  const acaoRemovida = acoes.find(item => item.id === id);
  if (!acaoRemovida) return;

  const novasAcoes = acoes.filter(item => item.id !== id);
  if (!salvarDados(CHAVE_ACOES, novasAcoes)) return;

  registrarAtividade("Registro removido", acaoRemovida.nome);
  mostrarMensagem("Registro removido com sucesso.", true);
  atualizarTela();
}

function atualizarResumo() {
  const acoes = obterDados(CHAVE_ACOES);
  const concluidos = acoes.filter(acao => acao.status === "Concluída").length;
  const andamento = acoes.filter(acao => acao.status === "Em andamento").length;

  document.querySelector("#totalRegistros").textContent = acoes.length;
  document.querySelector("#totalConcluidos").textContent = concluidos;
  document.querySelector("#totalAndamento").textContent = andamento;
}

function registrarAtividade(acao, nomeItem) {
  const historico = obterDados(CHAVE_HISTORICO);
  historico.unshift({
    dataHora: new Date().toISOString(),
    acao,
    item: nomeItem
  });

  // Mantém apenas as 30 atividades mais recentes.
  salvarDados(CHAVE_HISTORICO, historico.slice(0, 30));
  renderizarHistorico();
}

function renderizarHistorico() {
  const lista = document.querySelector("#historicoAtividades");
  if (!lista) return;

  const historico = obterDados(CHAVE_HISTORICO);
  lista.replaceChildren();

  if (historico.length === 0) {
    const vazio = document.createElement("li");
    vazio.className = "empty-state";
    vazio.textContent = "As operações realizadas aparecerão aqui.";
    lista.appendChild(vazio);
    return;
  }

  historico.forEach(registro => {
    const item = document.createElement("li");
    const texto = document.createElement("span");
    const acao = document.createElement("strong");
    acao.textContent = registro.acao;
    texto.append(acao, document.createTextNode(` — ${registro.item}`));

    const data = document.createElement("div");
    data.className = "activity-meta";
    data.textContent = formatarDataHora(registro.dataHora);

    item.append(texto, data);
    lista.appendChild(item);
  });
}

function atualizarTela() {
  renderizarAcoes();
  renderizarHistorico();
  atualizarResumo();
}

function mostrarMensagem(texto, sucesso) {
  const mensagem = document.querySelector("#mensagemFormulario");
  if (!mensagem) return;
  mensagem.textContent = texto;
  mensagem.classList.toggle("success", sucesso);
}

function formatarData(data) {
  if (!data) return "Data não informada";
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}

function formatarDataHora(dataHora) {
  const data = new Date(dataHora);
  return data.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
