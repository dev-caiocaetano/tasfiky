function taskify() {
    const task = document.querySelector(".task__form"); //Seleciona o campo que usuário digita as tarefas
    const taskList = document.querySelector(".task__list"); //Seleciona a lista onde as tarefas serão exibidas
    const paragraph = document.querySelector(".text"); //Seleciona o paragrafo com mensagem a "Sua lista está vazia"
    const allTasks = []; //Cria uma lista para armazenar todas as tarefas.

    //Criando uma função que será executada quando o usuário adicionar uma nova tarefa
    function receiveTask(event) {
        event.preventDefault(); //Impede o carregamento da página ao enviar o formulário
        const input = task.querySelector(".task__input"); //Armazena em uma variável o input onde o usuário escreve a tarefa
        const userTask = task.querySelector(".task__input").value.trim(); //Armazena o valor digitado em uma variável

        if (userTask === "") {
            return;
        } //Se o campo estiver vazio, o programa não faz nada

        allTasks.push(userTask); //Adiciona a tarefa na lista de tarefas

        let newLi = document.createElement("li") //Cria um <li> no HTML para exibir a tarefa na tela

        let checkbox = document.createElement("input"); //Cria um novo <input> no HTML
        checkbox.type = "checkbox"; //Define o novo input como type=checkbox
        checkbox.classList.add("checkbox"); //Adiciona uma class=checkbox para estilizar no css

        let deleteButton = document.createElement("button"); //Cria um novo <button> para Excluir a tarefa
        deleteButton.type = "button"; //Define o novo botão como type=button (O padrão de criação é submit, pode dar conflito com o de botão de Adicionar)
        let textDeleteButton = document.createTextNode("Excluir"); //Define o texto do botão como "Excluir"
        deleteButton.appendChild(textDeleteButton); //Adiciona o texto criado para o botão dentro do botão deleteButton
        deleteButton.classList.add("delete__button") //Adiciona uma class=delete__button para estilizar no css

        let taskTextNode = document.createTextNode(userTask); //Adiciona a uma variável o conteúdo da tarefa em texto.
        newLi.appendChild(checkbox); //Adiciona o checkbox ao campo da lista
        newLi.appendChild(taskTextNode); //Adiciona a tarefa ao campo da lista
        newLi.appendChild(deleteButton); //Adiciona o botão de "Excluir" ao campo da lista

        taskList.appendChild(newLi); //Adiciona o <li> completo na lista de tarefas
        paragraph.remove(); //Remove o parágrafo "Sua lista está vazia" após adicionar uma tarefa
        input.value = ""; //Limpa o campo de input após adicionar uma tarefa

        const taskText = userTask; //Cria uma cópia do texto da tarefa para usar na função de excluir
        
        //Quando o botão de excluir for clicado, chamará uma função
        deleteButton.addEventListener("click", function deleteTask() {
            const index = allTasks.indexOf(taskText); //Encontra o índice da tarefa na lista e salva em uma variável

            // Caso o índice não seja encontrado, ele o indexOf retorna -1
            // Se o índice for diferente de -1, remove 1 item da lista a partir desse índice
            if (index !== -1) {
                allTasks.splice(index, 1);
            }
            newLi.remove(); //Remove o <li> da tela.

            //Adiciona um paragrafo com a mensagem "Sua lista está vazia" caso não tenha mais tarefas na lista
            if (allTasks.length === 0) {
                taskList.appendChild(paragraph);
                paragraph.innerHTML = "Sua lista está vazia"
            }
        });

        //Quando o checkbox estiver marcado ou desmarcado, chamará uma função
        checkbox.addEventListener("change", function () {
            if (checkbox.checked) {
                newLi.classList.add("completed"); //Adiciona uma class=completed ao <li> com css estilizado para "riscar" a tarefa
            } else {
                newLi.classList.remove("completed"); //Remove a class=completed do <li>, removendo o "risco" da tarefa
            }
        });
    }

    //Quando o botão de Adicionar for clicado, pega os dados do input e adiciona a função receiveTask.
    task.addEventListener("submit", receiveTask);
}

taskify(); //Chama a função para iniciar o gerenciador de tarefas



