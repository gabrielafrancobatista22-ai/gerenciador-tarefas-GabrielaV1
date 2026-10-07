class Tarefa { 
 
    #concluida; 
 
    constructor(descricao) { 
 
        descricao = descricao.trim(); 
 
        if (descricao === "") { 
            throw new Error("Digite uma tarefa."); 
        } 
 
        this.descricao = descricao; 
        this.#concluida = false; 
    } 
 
    get concluida() { 
        return this.#concluida; 
    } 
 
    alternarConclusao() { 
        this.#concluida = !this.#concluida; 
    } 
} 

const horario = document.getElementById("horario"); 
 
function atualizarHorario() { 
    const agora = new Date(); 
 
    const horas = String(agora.getHours()).padStart(2, "0"); 
    const minutos = String(agora.getMinutes()).padStart(2, "0"); 
    const segundos = String(agora.getSeconds()).padStart(2, "0"); 
 
    horario.textContent = `${horas}:${minutos}:${segundos}`; 
} 
 
atualizarHorario(); 
setInterval(atualizarHorario, 1000); 
 
 
  
const listaDeTarefas = []; 
const campoTarefas = document.getElementById("campo-tarefas"); 
const listaTarefas = document.getElementById("lista-tarefas"); 
const contadorTarefas = document.getElementById("contador-tarefas"); 
const botaoAdicionar = document.querySelector(".botao-principal"); 
 
const botaoTema = document.getElementById("botao-alternar-tema"); 


function salvarTarefas() {

    const tarefas = listaDeTarefas.map(function(tarefa) {

        return {
            descricao: tarefa.descricao,
            concluida: tarefa.concluida
        };

    });

    localStorage.setItem("tarefas", JSON.stringify(tarefas));

}


function carregarTarefas() {

    const tarefasSalvas = localStorage.getItem("tarefas");

    if (tarefasSalvas === null) {
        return;
    }

    const tarefas = JSON.parse(tarefasSalvas);

    tarefas.forEach(function(tarefaSalva) {

        const novaTarefa = new Tarefa(tarefaSalva.descricao);

        if (tarefaSalva.concluida) {
            novaTarefa.alternarConclusao();
        }

        listaDeTarefas.push(novaTarefa);

    });

    renderizarTarefas();

}


botaoAdicionar.addEventListener("click", function () { 
 
    try { 
 
        const descricao = campoTarefas.value; 
 
        const novaTarefa = new Tarefa(descricao); 
 
        listaDeTarefas.push(novaTarefa); 

        salvarTarefas();
 
        renderizarTarefas(); 
 
        campoTarefas.value = ""; 
 
        campoTarefas.focus(); 
 
    } catch (erro) { 
 
        alert(erro.message); 
 
    } 
 
}); 
 
 
 
campoTarefas.addEventListener("keydown", function (event) { 
 
    if (event.key === "Enter") { 
        botaoAdicionar.click(); 
    } 
 
}); 
 
 
function renderizarTarefas() { 
 
    listaTarefas.innerHTML = ""; 
 
    listaDeTarefas.forEach(function (tarefa, index) { 
 
        const item = document.createElement("li"); 
 
        item.classList.add("item-tarefa"); 
 
 
        const texto = document.createElement("span"); 
 
        texto.textContent = tarefa.descricao; 
 
 
        if (tarefa.concluida) { 
 
            texto.style.textDecoration = "line-through"; 
            texto.style.opacity = "0.5"; 
 
        } 
 
 
 
        const botaoConcluir = document.createElement("button"); 
 
        botaoConcluir.classList.add("botao-acao"); 
 
        botaoConcluir.innerHTML = ` 
            <i class="fa-regular fa-clock"></i> 
        `; 
 
 
        botaoConcluir.addEventListener("click", function () { 
 
            tarefa.alternarConclusao(); 

            salvarTarefas();
 
            renderizarTarefas(); 
 
        }); 
 
 
 
        const botaoExcluir = document.createElement("button"); 
 
        botaoExcluir.classList.add("botao-acao"); 
        botaoExcluir.classList.add("excluir"); 
 
        botaoExcluir.innerHTML = ` 
            <i class="fa-solid fa-trash"></i> 
        `; 
 
 
        botaoExcluir.addEventListener("click", function () { 
 
            listaDeTarefas.splice(index, 1); 

            salvarTarefas();
 
            renderizarTarefas(); 
 
        }); 
 
 
 
        const acoes = document.createElement("div"); 
 
        acoes.classList.add("acoes-tarefa"); 
 
        acoes.appendChild(botaoConcluir); 
        acoes.appendChild(botaoExcluir); 
 
 
        item.appendChild(texto); 
        item.appendChild(acoes); 
 
        listaTarefas.appendChild(item); 
 
    }); 
 
 
    atualizarContador(); 
 
} 
 
 
function atualizarContador() { 
 
    const quantidade = listaDeTarefas.length; 
 
    if (quantidade === 0) { 
 
        contadorTarefas.textContent = "0 tarefas na lista"; 
 
    } else if (quantidade === 1) { 
 
        contadorTarefas.textContent = "1 tarefa na lista"; 
 
    } else { 
 
        contadorTarefas.textContent = 
            `${quantidade} tarefas na lista`; 
 
    } 
 
} 

const elementoDataAtual = document.getElementById("data-atual"); 
 
function atualizarDataBonita() { 
    const agora = new Date(); 
 
    const dataFormatada = agora.toLocaleDateString("pt-BR", { 
        weekday: "long", 
        day: "2-digit", 
        month: "long", 
        year: "numeric" 
    }); 
 
    elementoDataAtual.textContent = 
        dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1); 
} 
 
atualizarDataBonita(); 
setInterval(atualizarDataBonita, 60000); 
 
botaoTema.addEventListener("click", function () { 
 
    document.body.classList.toggle("modo-escuro"); 
 
    const icone = botaoTema.querySelector("i"); 
 
 
    if (document.body.classList.contains("modo-escuro")) { 
 
        icone.classList.remove("fa-moon"); 
        icone.classList.add("fa-sun"); 
 
    } else { 
        icone.classList.remove("fa-sun"); 
        icone.classList.add("fa-moon"); 
 
    } 
 
}); 


carregarTarefas();