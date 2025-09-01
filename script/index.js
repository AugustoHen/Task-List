const form = document.querySelector(".main-form");
const task = form.querySelector(".task");
const priority = form.querySelector(".priority");
const today = form.querySelector(".today");
const time = form.querySelector(".time");
const buttSave = form.querySelector(".save");
const tableResult = document.querySelector(".result");

form.addEventListener("submit", e => e.preventDefault());

window.onload = () =>{
    recoveryTable();
    atualDate();
}
function atualDate(){
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth()).padStart(2,0);
    const day = String(now.getDay()).padStart(2,0);
    const hour = String(now.getHours()).padStart(2, 0);
    const minute = String(now.getMinutes()).padStart(2, 0);

    today.value = `${year}-${month}-${day}T${hour}:${minute}`;
    //"yyyy-MM-ddThh:mm
}

function saveTable(){
    const allTr = document.querySelectorAll("tr");

    for(item of allTr){
        if(item.classList.contains("content")){
            const linesOftable = document.querySelectorAll(".content");
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
            }
            localStorage.setItem("tasks", JSON.stringify(allTasks));

        }else{
            localStorage.clear("tasks");
        }
    }
     

}

function delButton(tr){
    const newDelButt = document.createElement("button");
    tr.appendChild(newDelButt);
    newDelButt.innerHTML = '<i class="fa-solid fa-trash"></i>';
    newDelButt.classList.add("del-button");
    newDelButt.addEventListener("click", () =>{
        tr.remove();
        saveTable();
    });  
}

function editButton(tr,td1,td2,td3){
    const newEditButt = document.createElement("button");
    tr.appendChild(newEditButt);
    newEditButt.classList.add("edit-button");
    newEditButt.innerHTML = '<i class="fa-solid fa-pen"></i>';
    
    newEditButt.addEventListener("click", () => {

            const valueTask = td1.textContent;
            td1.innerText = "";            
            const newInputTask = document.createElement("input");
            td1.appendChild(newInputTask);
            newInputTask.placeholder = valueTask;

            const valuePriority = td2.textContent;
            td2.innerText = "";            
            const newInputPriority = document.createElement("input");
            td2.appendChild(newInputPriority);
            newInputPriority.placeholder = valuePriority;
            
            const valueConclusion = td3.textContent;
            td3.innerText = "";            
            const newInputConclusion = document.createElement("input");
            td3.appendChild(newInputConclusion);
            newInputConclusion.placeholder = valueConclusion;     
            
            newInputTask.addEventListener("blur", () => {
                if (newInputTask.value === "") td1.innerText = valueTask;
                else td1.innerText = newInputTask.value;
            });
            
            newInputPriority.addEventListener("blur", () => {
                if (newInputPriority.value === "") td2.innerText = valuePriority;
                else td2.innerText = newInputPriority.value;
            });

            newInputConclusion.addEventListener("blur", () => {
                if (newInputConclusion.value === "") td3.innerText = valueConclusion;
                else td3.innerText = newInputConclusion.value;
            });  
                
    });
}

function recoveryTable(){
    const table = localStorage.getItem("tasks");
    
    if(table){
        const convertedTable = JSON.parse(table);

        for( item of convertedTable){

        const tr = document.createElement("tr");
        tr.classList.add("content");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");
        const td4 = document.createElement("td");

        tableResult.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);      

        

        td1.innerText = item.name;
        td2.innerText = item.priority;
        td3.innerText = item.date;
        td4.innerText = item.conclusion;

        delButton(tr);
        editButton(tr, td1,td2,td4);       
        }
    }else{
        const convertedTable = [];
    }   
}

buttSave.addEventListener("click", () => {
    const newTr = document.createElement("tr");
    newTr.classList.add("content");
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

    delButton(newTr);
    editButton(newTr, novaTaskTd, novaPriorityTd, newDateTd);   

    task.value = "";
    priority.value = "";
    today.value= "";
    time.value = "";

    saveTable();
});







