var checkboxcontainer = document.getElementById("volume-checkboxes")
for (let i = 1;i<101;i++){
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "volume-checkbox";
    checkbox.onclick = () => {
        if (checkbox.checked){
            volume++;
        }
        else{
            volume--;
        }
        update();
    };
    checkboxcontainer.appendChild(checkbox);
    if (i % 10 == 0){
        checkboxcontainer.appendChild(document.createElement("br"));
    }
}

function resetCheckboxes(){
    volume = 0;
    let checkboxes = document.getElementsByClassName("volume-checkbox");
    for (let i = 0;i<checkboxes.length;i++){
        checkboxes[i].checked = false;
    }
    update();
}
function RandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
var volume = 0;
function update(){
    let outputs = document.getElementsByClassName("volume-output");
    for (let i = 0; i < outputs.length; i++){
        outputs[i].innerHTML = "Volume: " + volume;
    }
    let outputsBars = document.getElementsByClassName("volume-progressBar");
    for (let i = 0; i < outputsBars.length; i++){
        outputsBars[i].value = volume;
    }
}


var HoldDownIntervalId;
function startVolumeHoldDown(){
    volume = 0;
    HoldDownIntervalId = setInterval(()=>{
        if (volume < 100){
        volume++;
        update();
    }
    },100);
}
function stopVolumeHoldDown(){
    clearInterval(HoldDownIntervalId);
}