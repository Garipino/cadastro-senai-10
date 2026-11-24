

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
                            <button type="button" class="edit" title="Editar" onclick="BtnEdit(${index})">
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

        let divAdd = document.getElementById("coluna1");

        if (cep == "" || name == "" || date == "" || email == "" || num == "" || turma == "" || unidadesenai == "" || vinculo == "" || rua == "" || bairro == "" || uf == "" || cidade == "") {
            // Só adiciona a mensagem se ela ainda não estiver na tela
            if (!document.getElementById("erro")) {
                divAdd.insertAdjacentHTML("beforeend", `<p id="erro" style="color: red">Preencha todos os campos obrigatórios.</p>`);
            }
        } else {
            // O "?" evita erro caso a mensagem não exista na tela
            document.getElementById("erro")?.remove();

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
            Limpar();
        }
    }

    let indexParaExcluir = null;

    function abrirPopupedit(){
        const edit = document.getElementById("popupedit");
        edit.showModal();
    }

    function fecharEdit() {
        const edit=document.getElementById("popupedit");
        edit.close();
    }

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
        
    });
    const btnCancelar = document. getElementById("btnCancelar");

    function cancelar(){
        fecharPopup(); 
    }

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

    let indexParaEditar = null;

    function BtnEdit(index) {
        abrirPopupedit();

        let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const user = listaUsuarios[index];

        

        document.getElementById("name").value = user.nome;
        document.getElementById("data-edit").value = user.data;
        document.getElementById("email-edit").value = user.email;
        document.getElementById("cep-edit").value = user.cep;
        document.getElementById("rua-edit").value = user.rua;
        document.getElementById("bairro-edit").value = user.bairro;
        document.getElementById("UF-edit").value = user.uf;
        document.getElementById("cidade-edit").value = user.cidade;
        document.getElementById("Num-casa").value = user.numero;
        document.getElementById("complemento-edit").value = user.complemento;
        document.getElementById("turma-setor-edit").value = user.turma;
        document.getElementById("unidade-edit").value = user.unidade;
        document.getElementById("vinculo-edit").value = user.vinculo
        indexParaEditar = index;
        

    }

    function ConfirmarEdit() {
        let nome = document.getElementById("name").value.trim();
        let data = document.getElementById("data-edit").value.trim();
        let email = document.getElementById("email-edit").value.trim();
        let cep = document.getElementById("cep-edit").value.trim();
        let rua = document.getElementById("rua-edit").value.trim();
        let bairro = document.getElementById("bairro-edit").value.trim();
        let uf = document.getElementById("UF-edit").value.trim();
        let cidade = document.getElementById("cidade-edit").value.trim();
        let numero = document.getElementById("Num-casa").value.trim();
        let complemento = document.getElementById("complemento-edit").value.trim();
        let turma = document.getElementById("turma-setor-edit").value.trim();
        let unidade = document.getElementById("unidade-edit").value.trim();
        let vinculo = document.getElementById("vinculo-edit").value.trim();

        const user = {
            nome: nome,
            data: data,
            email: email,
            cep: cep,
            rua: rua,
            bairro: bairro,
            uf: uf,
            numero: numero,
            complemento: complemento,
            turma: turma,
            unidade: unidade,
            vinculo: vinculo,
            cidade: cidade
        };

        let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        if (indexParaEditar !== null) {
            listaUsuarios[indexParaEditar] = user;
            indexParaEditar = null;
            document.querySelector(".botao-add").textContent = "ADICIONAR";
        } else {
            
            listaUsuarios.push(user);
        }

        localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));
        renderizarLista();
        fecharEdit();
    }

    function cancelarEdit(){
        fecharEdit();
    }

    function Limpar() {
        document.getElementById("nome").value = "";
        document.getElementById("data-nasc").value = "";
        document.getElementById("email").value = "";
        document.getElementById("cep").value = "";
        document.getElementById("rua").value = "";
        document.getElementById("bairro").value = "";
        document.getElementById("uf").value = "";
        document.getElementById("cidade").value = "";
        document.getElementById("numero-casa").value = "";
        document.getElementById("complemento").value = "";
        document.getElementById("turma-setor").value = "";
        document.getElementById("unidade-senai").value = "";
        document.getElementById("vinculo").value = "";

    }

    function extender(){
        console.log(extender);
        var extender1 = document.getElementById("extender1");
        let estender = document.getElementById("estender");

        
        if(extender1.hidden == false){
            extender1.hidden = true
            estender.innerHTML = `<i class="fa-solid fa-angle-right"></i>`
        } else{
            extender1.hidden = false
            estender.innerHTML =  `<i class="fa-solid fa-angle-down"></i>`
        }
    }
