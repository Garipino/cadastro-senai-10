
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
console.logs(user);
function Adicionar(){
    let cep = document.getElementById("cep").value.trim();
    let name = document.getElementById("nome").value.trim();
    let date = document.getElementById("data-nasc").value.trim();
    let email = document.getElementById("email").value.trim();
    let num = document.getElementById("numero-casa").value.trim();
    let complemento = document.getElementById("complemento").value.trim();
    let setor = document.getElementById("turma-setor").value.trim();
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
        CEP: cep,
        rua: rua,
        bairro: bairro,
        uf: uf,
        idade: date,
        numero: num,
        complemento: complemento,
        turma: setor, 
        unidade: unidadesenai,  
        vinculo: vinculo
    }

    let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    listaUsuarios.push(user);

    localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));

    console.log(listaUsuarios);

    let divpai = document.getElementById("extender1");

    divpai.innerHTML = "";

    listaUsuarios.forEach(function(user){
        divpai.innerHTML += `
        <table class="tables">
                            <tbody>
                                <tr>
                                    <td class="gray"> ${user.nome}</td>
                                    <td class="gray"> ${user.email}</td>
                                    <td class="gray">${user.uf}</td>
                                    <td class="gray">${user.cidade}</td>
                                    <td>
                                        <!--onclick-->
                                        <button type="button" class="edit" title="Editar">
                                            <i class="fa-solid fa-pen"></i>
                                        </button>
                                    </td>
                                    <td>
                                        <!--onclick-->
                                        <button type="button" class="delete" title="Excluir">
                                            <i class="fa-solid fa-trash-can"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

        `
    });
}   

function extender(){
    console.log(extender);
    var extender1 = document.getElementById("extender1");
    if(extender1.hidden == false){
        extender1.hidden = true
    } else{
        extender1.hidden = false
    }
    

}