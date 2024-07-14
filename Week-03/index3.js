

const input = document.getElementById("input");
const output = document.getElementById("output");
const button = document.getElementById("mybtn");

button.addEventListener("click",event =>{

    let task = input.value.trim()
    if(task !== ""){

    let para = document.createElement("p");
    para.classList.add("parag")

    let spann = document.createElement("span")
    spann.innerText = task

    para.appendChild(spann)
    

    let del = document.createElement("button")
    del.innerText = "Delete"
    del.classList.add("spacing")

    del.addEventListener("click",event =>{
        output.removeChild(para)
    })

    para.addEventListener("dblclick",event =>{
        event.target.style.textDecoration = "line-through"
    })

    para.appendChild(del)
    output.appendChild(para)

    input.value = " ";
    }
    else{
        alert("Please enter the Task")
    }
    
})
