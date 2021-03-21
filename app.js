//variables
const tileGrid = document.createElement('grid');
const dinoCompare = document.getElementById('dino-compare');
const button = document.getElementById('btn');

function jurassic_park (species, weight, height, diet, where, when, fact){ 
    this.species=species;
    this.weight=weight;
    this.height = height;
    this.diet=diet;
    this.where=where; 
    this.when=when;
    this.fact=fact; 
    this.image= "images/" + species.toLowerCase() + ".png";
}

// Create Human Object
function human(name, 
                weight, 
                height, 
                diet){
    this.name=name; 
    this.weight=weight; 
    this.height=height; 
    this.diet=diet;
    this.image= "images/human.png";
}

// Use IIFE to get human data from form
function getHumanData(){
    //Name
    const name = document.getElementById("name").value;
    //height (feet & inches)
    const feet = document.getElementById("feet").value;
    const inches = document.getElementById("inches").value;
    //Convert Height to all inches 
    const height = (feet *12) + inches; 
    //Weight
    const weight = document.getElementById("weight").value;
    //Diet (Herbavor, Omnivor, Carnivor)
    const diet = document.getElementById("diet").value;

    return new human(name, weight,height,diet);
}

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches. 
function compare1(currentHumanData, dino){
    //Compare Height
    if(currentHumanData.height < dino.height){
        return `${dino.species} is taller then you!`;
    }
    else if (dino.weight < 1) {
        //Pigeon has only one fact
        return `All birds are dinosaurs.`;
    } else {
        return `You are taller then ${dino.species}!`;
    }

}

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
function compare2(currentHumanData, dino){
    //Compare Weight
    if(currentHumanData.weight < dino.weight){
        return `${dino.species} weighs more then you!`;
    } else if (dino.weight < 1) {
        //Pigeon has only one fact
        return `All birds are dinosaurs.`;
    } else {
        return `You weight more then ${dino.species}!`;
    }
}

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
function compare3(currentHumanData, dino){
    const message = "";
    
    if (dino.weight < 1) {
        //Pigeon has only one fact
        return "All birds are dinosaurs.";
    }
    else
    {
        //Compare Diet 
        switch(currentHumanData.diet){
            case "carnivor":
                message = `${dino.species} has the same diet(${dino.diet}) as you! Yikes!!`;
                break;
            case "herbavor":
                message = `${dino.species} has the same diet(${dino.diet}) as you! Yay vegetarianism!! :)` ;
                break;
            case "omnivor":
                message = `${dino.species} has the same diet(${dino.diet}) as you!`;
                break;
        }
    }
    return message;
}

//Compile fact list and get random fact 
function getRandomFacts(human, dino){
    const fact1 = `${dino.species} lived in ${dino.where}`;
    const fact2 = `${dino.species} lived in the ${dino.when}`;
    const fact3 = `${dino.fact}`;

    var fact_list = [compare1(human,dino), compare2(human,dino), compare3(human,dino), fact1, fact2, fact3];
    var random_fact = fact_list[Math.floor(Math.random() * fact_list.length)];
    
    return random_fact;
}

// On button click, prepare and display infographic
button.addEventListener("click", function(){    

    let dinoData = [];
    let humanData = [];

    //Dino Data
    fetch('dino.json')
    .then(response => response.json())
    .then(json_data => {
        // Do something with your data
        dinoData = json_data.Dinos.map(currDino => jurassic_park(currDino.species, currDino.weight, currDino.height, currDino.diet, currDino.where, currDino.when, currDino.fact));
        console.log(json_data); // for debugging need to remove later
    });
    
    //Human Data
    humanData = getHumanData();

    //Make Tiles
    makeTiles(dinoData, humanData); 
    
    // Remove form from screen
    dinoCompare.style.display = "none";

    //Display Tile Grid
    tileGrid.style.display = "flex";
    
});

function makeTiles(dinoData, humanData){
    //Make the Tiles
    // Add tiles to DOM
    for(index=0; index<dinoData.length; index++) {
        let currDino = dinoData[index];
        let fact = getRandomFacts(humanData, currDino);
        let dinoTile = getDinoItem(currDino.image, currDino.species, fact);
        tileGrid.appendChild(dinoTile);

        if(index == 3){
            //Put human title in middle of grid
            let humanTile = getHumanItem(humanData.name, humanData.image);
            tileGrid.appendChild(humanTile);
        }
    }
    return tileGrid;
}

function getHumanItem(name,image){
    let divElement = document.createElement('div');
    divElement.classList.add('grid-item');

    let imageElement = document.createElement('img');
    imageElement.src = image;
    divElement.appendChild(imageElement);

    let nameElement = document.createElement('h3');
    nameElement.innerText = name;
    divElement.appendChild(nameElement);

    return divElement;
}

function getDinoItem(image,species,fact){
    let divElement = document.createElement('div');
    divElement.classList.add('grid-item');

    let speciesElement = document.createElement('h3');
    speciesElement.innerText = species;
    divElement.appendChild(speciesElement);

    let imageElement = document.createElement('img');
    imageElement.src = image;
    divElement.appendChild(imageElement);

    let factElement = document.createElement('p');
    factElement.innerText = fact; 
    divElement.appendChild(factElement);

    return divElement;
}