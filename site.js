

async function buscarCep() {
    let cep = document.getElementById('cep').value;
    cep = cep.replace(/\D/g, '');
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const dados = await resposta.json();

    if (dados.erro) {
        resultado.innerHTML = '<p style="color: red;">CEP não encontrado </p>';

    } else {
        let rua = document.getElementById("rua");
        let bairro = document.getElementById("bairro");
        let uf = document.getElementById("uf");
        let cidade = document.getElementById("cidade");
            
        rua.value = dados.logradouro;
        bairro.value = dados.bairro;
        uf.value = dados.uf;
        cidade.value = dados.localidade;
    }
}
function renderizarLista() {
    let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const divpai = document.getElementById("extender1");

    divpai.innerHTML = "";

    listaUsuarios.forEach(function (user, index) {
        divpai.innerHTML += `
        <table class="tables">
            <tbody>
                <tr>
                    <td><div class="gray">${user.nome}</div></td>
                    <td><div class="gray">${user.email}</div></td>
                    <td><div class="gray">${user.data}</div></td>
                    <td><div class="gray">${user.vinculo}</div></td>
                    <td><div class="gray">${user.turma}</div></td>
                    <td><div class="gray">${user.uf}</div></td>
                    <td><div class="gray">${user.cidade}</div></td>
                    <td><div class="gray">${user.numero}</div></td>
                    <td><div class="gray">${user.complemento}</div></td>
                    <td><div class="gray">${user.cep}</div></td>
                    <td>
                        <button type="button" class="edit" title="Editar">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                    </td>
                    <td>
                        <button type="button" class="delete" title="Excluir" onclick="pedirConfirmacao(${index})">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        `;
    });
}

function Adicionar() {
    let cep = document.getElementById('cep').value.trim();
    let name = document.getElementById("nome").value.trim();
    let date = document.getElementById("data-nasc").value;
    let email = document.getElementById("email").value.trim();
    let num = document.getElementById("numero-casa").value.trim();
    let complemento = document.getElementById("complemento").value.trim();
    let turma = document.getElementById("turma-setor").value.trim();
    let unidadesenai = document.getElementById("unidade-senai").value.trim();
    let vinculo = document.getElementById("vinculo").value.trim();
    let rua = document.getElementById("rua").value.trim();
    let bairro = document.getElementById("bairro").value.trim();
    let uf = document.getElementById("uf").value.trim();
    let cidade = document.getElementById("cidade").value.trim();

    const user = {
        nome: name,
        data: date,
        email: email,
        cep: cep,
        rua: rua,
        bairro: bairro,
        uf: uf,
        numero: num,
        complemento: complemento,
        turma: turma,
        unidade: unidadesenai,
        vinculo: vinculo,
        cidade: cidade
    };

    let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    listaUsuarios.push(user);

    localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));
    renderizarLista();
}

let indexParaExcluir = null;

function abrirPopup() {
    const deletepopup = document.getElementById("popupdelete");
    deletepopup.showModal();
}
    

function fecharPopup() {
    const deletepopup = document.getElementById("popupdelete");
    deletepopup.close();
  
}

function pedirConfirmacao(index) {
    indexParaExcluir = index;
    abrirPopup();
}

function excluir(index) {
    fecharPopup();
    let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    listaUsuarios.splice(index, 1);

    localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));
    renderizarLista();
    
}

window.addEventListener("DOMContentLoaded", function () {
    renderizarLista();

    const btnConfirmar = document.getElementById("btnConfirmar");
    if (btnConfirmar) {
        btnConfirmar.addEventListener("click", function () {
            if (indexParaExcluir !== null) {
                excluir(indexParaExcluir);
                indexParaExcluir = null;
                fecharPopup();
            }
        });
    }
});


function extender(){
    console.log(extender);
    var extender1 = document.getElementById("extender1");
    if(extender1.hidden == false){
        extender1.hidden = true
    } else{
        extender1.hidden = false
    }
    

}

