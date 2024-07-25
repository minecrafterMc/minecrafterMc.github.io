const colors = document.getElementById("colors");
var colorId = 0;
const shapes = document.getElementById("blocks");
var blockId = 0;
var sBlockId = 0;
var shapeText = "rotation 1";
var json = {};
var mods = false;
var codeNames = ["name", "shapecolor", "emptycolor", "trailcolor", "fallencolor", "textcolor"];
const infoBlocks = {"name":["Name","The name of your custom mode"],"author":["Author","The name of this mode's creator"],"desc":["Description","A description of your custom mode"],"time":["Time limit","The time limit. Set to 0 or less for infinite time"],"speed":["Speed","How often the game updates. The game ticks (updates) every 1000 ms. / speed."],"lives":["Lives","How many times the player needs to fail to loose. Set 0 or less for infinite lives"],"ppenalty":["Point penalty","How many points should the player loose if they loose a live"],"tpenalty":["Time penalty","How much time should be substracted from the timer if the player looses a life"],"multi":["Point multiplier","By how much should the player's points be multiplied whenever they get them"]}
const defaultBlocks = [
        [
            false, false, false, false, false, true, false, false, false, true, true, false, false, true, false, false, 1, 2, 1, 3
        ],
        [
            false, false, false, false, false, true, false, false, false, true, true, false, false, true, false, false, 1, 2, 1, 3
        ],
        [
            false, false, false, false, false, true, false, false, true, true, true, false, false, false, false, false, 0, 2, 1, 2
        ],
        [
            false, false, false, false, false, true, false, false, true, true, false, false, false, true, false, false, 0, 1, 1, 3
        ],
        [
            false, false, false, false, false, false, false, false, true, true, true, false, false, true, false, false, 0, 2, 2, 3
        ],
        [
            false, false, false, false, false, false, false, false, false, true, true, false, true, true, false, false, 0, 2, 2, 3
        ],
        [
            false, false, false, false, true, false, false, false, true, true, false, false, false, true, false, false, 0, 1, 1, 3
        ],
        [
            false, false, false, false, false, false, false, false, false, true, true, false, true, true, false, false, 0, 2, 2, 3
        ],
        [
            false, false, false, false, true, false, false, false, true, true, false, false, false, true, false, false, 0, 1, 1, 3
        ],
         [
            true, true, false, false, true, true, false, false, false, false, false, false, false, false, false, false, 0, 1, 0, 1
        ],
        [
            true, true, false, false, true, true, false, false, false, false, false, false, false, false, false, false, 0, 1, 0, 1
        ],
        [
            true, true, false, false, true, true, false, false, false, false, false, false, false, false, false, false, 0, 1, 0, 1
        ],
        [
            true, true, false, false, true, true, false, false, false, false, false, false, false, false, false, false, 0, 1, 0, 1
        ],
        [
            true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, 0, 0, 0, 3
        ],
        [
            false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, 0, 3, 3, 3
        ],
        [
            true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false, 0, 0, 0, 3
        ],
        [
            false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, 0, 3, 3, 3
        ],
        [
            true, false, false, false, true, true, true, false, false, false, false, false, false, false, false, false, 0, 2, 0, 1
        ],
        [
            false, true, true, false, false, true, false, false, false, true, false, false, false, false, false, false, 1, 2, 0, 2
        ],
        [
            true, true, true, false, false, false, true, false, false, false, false, false, false, false, false, false, 0, 2, 0, 1
        ],
        [
            false, true, false, false, false, true, false, false, true, true, false, false, false, false, false, false, 0, 1, 0, 2
        ],
        [
            true, true, false, false, false, true, true, false, false, false, false, false, false, false, false, false, 0, 2, 0, 1
        ],
        [
            false, true, false, false, true, true, false, false, true, false, false, false, false, false, false, false, 0, 1, 0, 2
        ],
        [
            true, true, false, false, false, true, true, false, false, false, false, false, false, false, false, false, 0, 2, 0, 1
        ],
        [
            false, true, false, false, true, true, false, false, true, false, false, false, false, false, false, false, 0, 1, 0, 2
        ],
        [
            false, false, true, false, true, true, true, false, false, false, false, false, false, false, false, false, 0, 2, 0, 1
        ],
        [
            true, false, false, false, true, false, false, false, true, true, false, false, false, false, false, false, 0, 1, 0, 2
        ],
        [
            true, true, true, false, true, false, false, false, false, false, false, false, false, false, false, false, 0, 2, 0, 1
        ],
        [
            true, true, false, false, false, true, false, false, false, true, false, false, false, false, false, false, 0, 1, 0, 2
        ]
    ]
function create(element) {
	return document.createElement(element);
}

function getE(id) {
	return document.getElementById(id);
}
function standardize_color(str){
    var ctx = document.createElement("canvas").getContext("2d");
    ctx.fillStyle = str;
    return ctx.fillStyle;
}
function addNewColor() {
	let div = create("div");
	div.id = "colorMaster-" + colorId;
	let inputs = [];
	let names = ["Color Name", "Shape color", "Background color", "Trail color", "Fallen color", "Text color"];
	let defaultValues = ["default", "#fc0303", "#039dfc", "#0877ff", "#ababab", "white"]
	if (colorId == 0) {
		let namedata = create("p");
		namedata.innerHTML = JSON.stringify(codeNames);
		namedata.style.display = "none";
		namedata.id = "colorStorage";
		colors.appendChild(namedata);
	}
	let i = 0;
	while (i != names.length) {
		inputs[i] = create("input");
		inputs[i].id = "color-" + colorId + "-" + i;
		if (i != 0) { inputs[i].type = "color"; }
		else {
			inputs[i].type = "text";
			inputs[i].placeholder = names[0];
		}
		let text = create("p");
		text.innerHTML = names[i];
		if (colorId === 0) {
			inputs[i].value = defaultValues[i];
		}
		if (i != 0) {
			div.appendChild(text);
		}
		div.appendChild(inputs[i]);
		i++;
	}
	if (colorId % 2 == 0) {
		div.style.backgroundColor = "#a6a4a4"
		//div.style.width = "100%";
	}
	else {
		div.style.backgroundColor = "#c4bebe";
	}
	div.style.marginBottom = "20px";
	//div.appendChild(create("hr").style.height = "");
	colors.appendChild(div);
	colorId++;
}

function removeColor() {
	if (colorId > 1) {
		let div = getE("colorMaster-" + (colorId - 1));
		div.remove();
		colorId--;
	}
}

function addCompleteShape() {
	let mDiv = create("div");
	mDiv.id = "blockMaster-" + blockId;
	let mCent = create("center");
	shapeText = "shape " + (blockId + 1) + " rotation 1";
	mCent.appendChild(addNewShape());
	shapeText = "shape " + (blockId + 1) + " rotation 2";
	mCent.appendChild(addNewShape());
	shapeText = "shape " + (blockId + 1) + " rotation 3";
	mCent.appendChild(addNewShape());
	shapeText = "shape " + (blockId + 1) + " rotation 4";
	mCent.appendChild(addNewShape());
	if (blockId % 2 == 0) {
		mDiv.style.backgroundColor = "#a6a4a4"
		//div.style.width = "100%";
	}
	else {
		mDiv.style.backgroundColor = "#c4bebe";
	}
	mDiv.style.marginBottom = "20px";
	mDiv.appendChild(mCent);
	shapes.appendChild(mDiv);
	blockId++;
}

function addNewShape() {
	let div = create("div");
	let text = create("p");
	text.innerHTML = shapeText;
	div.appendChild(text);
	let inputs = [];
	let i = 0;
	while (i != 16) {
		inputs[i] = create("input");
		inputs[i].id = "block-" + sBlockId + "-" + i;
		inputs[i].type = "checkbox";
		div.appendChild(inputs[i]);
		if ((i + 1) % 4 == 0) {
			div.appendChild(create("br"))
		}
		i++;
	}
	sBlockId++;
	div.style.marginBottom = "10px";
	div.style.padding = "5px";
	return div;
}

function removeShape() {
	if (blockId > 1) {
		let div = getE("blockMaster-" + (blockId - 1));
		div.remove();
		blockId--;
		sBlockId -= 4;
	}
}

function getMinMax(arr) {
	let i = 0;
	let tempArr = [3, 0, 3, 0]
	while (i < arr.length) {
		if (arr[i]) {
			if (i % 4 < tempArr[0]) {
				tempArr[0] = i % 4;
			}
			if (i % 4 > tempArr[1]) {
				tempArr[1] = i % 4;
			}
		}
		i++
	}
	let splitArr = [[arr[0], arr[1], arr[2], arr[3]], [arr[4], arr[5], arr[6], arr[7]], [arr[8], arr[9], arr[10], arr[11]], [arr[12], arr[13], arr[14], arr[15]]];
	let flippedArr = [splitArr[0][0], splitArr[1][0], splitArr[2][0], splitArr[3][0], splitArr[0][1], splitArr[1][1], splitArr[2][1], splitArr[3][1], splitArr[0][2], splitArr[1][2], splitArr[2][2], splitArr[3][2], splitArr[0][3], splitArr[1][3], splitArr[2][3], splitArr[3][3]];
	i = 0;
	while (i < flippedArr.length) {
		if (flippedArr[i]) {
			if (i % 4 < tempArr[2]) {
				tempArr[2] = i % 4;
			}
			if (i % 4 > tempArr[3]) {
				tempArr[3] = i % 4;
			}
		}
		i++
	}
	return tempArr;
}

function compile() {
  json.version = "1.0";
	json.name = getE("name").value;
	json.desc = getE("desc").value;
	json.author = getE("author").value;
	json.time = getE("time").value;
	json.updateTimer = 1000 / getE("speed").value;
	json.lives = getE("lives").value;
	json.multi = getE("multi").value;
	json.ppenalty = getE("ppenalty").value;
	json.tpenalty = getE("tpenalty").value;
	json.colors = []
	let cNames = JSON.parse(getE("colorStorage").innerHTML);
	let i = 0;
	while (i < colorId) {
		json.colors[i] = {}
		let j = 0;
		while (j < cNames.length) {
			json.colors[i][cNames[j]] = getE("color-" + i + "-" + j).value;
			j++;
		}
		i++;
	}
	i = 0;
	json.blocks = [];
	while (i < sBlockId) {
		json.blocks[i] = []
		let j = 0;
		while (j < 16) {
			json.blocks[i][j] = getE("block-" + i + "-" + j).checked;
			j++;
		}
		json.blocks[i] = json.blocks[i].concat(getMinMax(json.blocks[i]));
		i++;
	}
	if (mods) {

	}
	json.enableMods = mods;
	json.onLoad = getE("onLoad").value;
	json.tick = getE("tick").value;
	json.onBlockFall = getE("onBlockFall").value;
	json.onLineCleared = getE("onLineCleared").value;
	json.onDeath = getE("onDeath").value;
	json.onLooseLife = getE("onLooseLife").value;
	json.blocks.splice(0, 0, [
         false,
         false,
         false,
         false,
         false,
         true,
         true,
         false,
         false,
         false,
         false,
         false,
         false,
         false,
         false,
         false,
         1,
         2,
         1,
         1
      ]);
	console.log(json);
	let Outputfile = JSON.stringify(json, null, 3);
	let link = document.createElement("a");
	let file = new Blob([Outputfile], { type: 'json/plain' });
	link.href = URL.createObjectURL(file);
	link.download = document.getElementById("name").value + ".json";
	link.click();
	URL.revokeObjectURL(link.href);
}

function toggleMods() {
	if (mods) {
		mods = !mods;
		getE("mods").style.display = "none";
		getE("mod").style.backgroundColor = "#ff2626";
	}
	else {
		mods = !mods;
		getE("mods").style.display = "block";
		getE("mod").style.backgroundColor = "#27db66";
	}
}

function openFile()
{
	let input = document.createElement('input');
	input.type = 'file';
	input.onchange = e => {
		let file = e.target.files[0];
		var reader = new FileReader();
		reader.readAsText(file, 'UTF-8');
		reader.onload = readerEvent => {
			let content = readerEvent.target.result;
			getE("loading").style.display = "block";
			loadf(content);
		}

	}
	input.click();
}
function addDefaultShapes(){
	let answer = prompt("WARNING: this will replace all of your shapes with default ones. if you want to continue, type 'yes'");
	if (answer == "yes"){
		let b = blockId;
		for(let a = 0;a < b;a++){
			removeShape();
		}
		let i = 0;
		console.log((defaultBlocks.length - 1) / 4 );
		while (i < (defaultBlocks.length - 1) / 4 - 1){
			addCompleteShape();
			i++;
		}
		i = 0;
		while (i < sBlockId + 1){
			for(let j = 0;j < 16;j++){
				getE("block-"+i+"-"+j).checked = defaultBlocks[i+1][j];
			}
			i++;
		}
	}
}
function loadf(jsonf) {
	jsonf = JSON.parse(jsonf);

	getE("name").value = jsonf.name;
	getE("author").value = jsonf.author;
	getE("time").value = jsonf.time;
	getE("desc").value = jsonf.desc;
	getE("speed").value = 1000 / jsonf.updateTimer;
	getE("lives").value = jsonf.lives;
	getE("ppenalty").value = jsonf.ppenalty;
	getE("tpenalty").value = jsonf.tpenalty;
	getE("multi").value = jsonf.multi;
	if (jsonf.enableMods){
	  getE("onLoad").value = jsonf.onLoad;
	  getE("tick").value = jsonf.tick;
	  getE("onLoad").value = jsonf.onBlockFall;
	  getE("onLoad").value = jsonf.onLineCleared;
	  getE("onLoad").value = jsonf.onDeath;
	  getE("onLooseLife").value = jsonf.onLooseLife;
	  if (!mods){
	    toggleMods();
	  }
	}
	let i = 0;
	while (i < jsonf.colors.length - 1) {
		addNewColor();
		i++;
	}
	i = 0;
	while (i < (jsonf.blocks.length - 1) / 4 - 1) {
		addCompleteShape();
		i++;
	}
	i = 0;
	let j = 0;
	while (i < jsonf.colors.length) {
		j = 0;
		console.log(i + " " + JSON.stringify(jsonf.colors[i]))
		while (j < codeNames.length) {
			getE("color-" + i + "-" + j).value = standardize_color(jsonf.colors[i][codeNames[j]]);
			j++;
		}
		i++;
	}
	i = 0;
	j = 0;
	while (i < sBlockId){
	  j = 0;
	  while (j < 15){
	    getE("block-"+i+"-"+j).checked = jsonf.blocks[i][j];
	    j++;
	  }
	  i++;
	}
	getE("loading").style.display = "none";
}
function displayInfo(info) {
  getE("guide").style.display = "block";
  getE("guide-title").innerHTML = infoBlocks[info][0];
  getE("guide-desc").innerHTML = infoBlocks[info][1];
}
addNewColor();
addCompleteShape();
toggleMods();
toggleMods();