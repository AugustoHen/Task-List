const form = document.querySelector(".main-form");
const task = form.querySelector(".task");
const priority = form.querySelector(".priority");
const today = form.querySelector(".today");
const time = form.querySelector(".time");
const buttSave = form.querySelector(".save");
const tableResult = document.querySelector(".result");

form.addEventListener("submit", e => e.preventDefault());

function saveTable(){

    const linesOftable = document.querySelectorAll("tr");
    const allTasks = [];
        
    for (let tr of linesOftable ){
    const tds = tr.querySelectorAll("td");

    const tarefa = {
    name: tds[0].textContent,
    priority: tds[1].textContent,
    date: tds[2].textContent,
    conclusion:tds[3].textContent,
    }

    allTasks.push(tarefa);

    localStorage.setItem("tasks", JSON.stringify(allTasks));
    }
}

function recoveryTable(){
    const table = localStorage.getItem("tasks");

    if (table === "") {
        const convertTable = [];
    }
    else{
       const convertTable = JSON.parse(table);
    }
    ///////////////////////////////////////// Continuar função
}

buttSave.addEventListener("click", () => {
    const newTr = document.createElement("tr");
    tableResult.appendChild(newTr);

    const novaTaskTd = document.createElement("td"); 
    newTr.appendChild(novaTaskTd);
    novaTaskTd.classList.add("new-td-task");
    novaTaskTd.innerHTML = task.value;

    const novaPriorityTd = document.createElement("td"); 
    newTr.appendChild(novaPriorityTd);
    novaPriorityTd.innerHTML = priority.value;

    const newTodayTd = document.createElement("td"); 
    newTr.appendChild(newTodayTd);
    let rawDate = new Date(today.value);
    newTodayTd.innerHTML = rawDate.toLocaleString("pt-BR", {day: "2-digit", month:"2-digit", year:"numeric", hour: "2-digit",minute:"2-digit"});

    const newDateTd = document.createElement("td"); 
    newTr.appendChild(newDateTd);
    let rawConclusionDate = new Date(time.value);
    newDateTd.innerHTML = rawConclusionDate.toLocaleString("pt-BR",{day:"2-digit",month:"2-digit", year:"numeric", hour:"2-digit", minute:"2-digit"} );

    const newDelButt = document.createElement("button");
    newTr.appendChild(newDelButt);
    newDelButt.innerHTML = '<i class="fa-solid fa-trash"></i>';
    newDelButt.classList.add("del-button");
    newDelButt.addEventListener("click", () => newTr.remove());


    const newEditButt = document.createElement("button");
    newTr.appendChild(newEditButt);
    newEditButt.innerHTML = '<i class="fa-solid fa-pen"></i>';
    
    newEditButt.addEventListener("click", () => {

            const valueTask = novaTaskTd.textContent;
            novaTaskTd.innerText = "";            
            const newInputTask = document.createElement("input");
            novaTaskTd.appendChild(newInputTask);
            newInputTask.placeholder = valueTask;

            const valuePriority = novaPriorityTd.textContent;
            novaPriorityTd.innerText = "";            
            const newInputPriority = document.createElement("input");
            novaPriorityTd.appendChild(newInputPriority);
            newInputPriority.placeholder = valuePriority;
            
            const valueConclusion = newDateTd.textContent;
            newDateTd.innerText = "";            
            const newInputConclusion = document.createElement("input");
            newDateTd.appendChild(newInputConclusion);
            newInputConclusion.placeholder = valueConclusion;     
            
            newInputTask.addEventListener("blur", () => {
                if (newInputTask.value === "") novaTaskTd.innerText = valueTask;
                else novaTaskTd.innerText = newInputTask.value;
            });
            
            newInputPriority.addEventListener("blur", () => {
                if (newInputPriority.value === "") novaPriorityTd.innerText = valuePriority;
                else novaPriorityTd.innerText = newInputPriority.value;
            });

            newInputConclusion.addEventListener("blur", () => {
                if (newInputConclusion.value === "") newDateTd.innerText = valueConclusion;
                else newDateTd.innerText = newInputConclusion.value;
            });  
                
    });


    task.value = "";
    priority.value = "";
    today.value= "";
    time.value = "";

    saveTable();




  



});







