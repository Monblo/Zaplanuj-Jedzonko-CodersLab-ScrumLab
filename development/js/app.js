const widgetMessagesList = ["info", "exclamation", "success"]; //list of closing elements

class ItemToHide {
    constructor(id) {
        this.clickTarget = document.getElementById(id);
    }
    showMe(text) { // shows hidden message + adds custom text to it
        this.clickTarget.parentElement.classList.remove('hidden');
        this.clickTarget.parentElement.querySelector('.app__widget--message--text').innerHTML = text;

    }
    addListener() { //after click parent of element is hidden
        this.clickTarget.addEventListener('click', (e) => e.target.parentElement.classList.add('hidden'));
    }
}

//construct elements to hide, then add listener
const widgetMessages = widgetMessagesList.map(el => new ItemToHide(el));
widgetMessages.forEach(el => el.addListener());


//-------------wyświetalnie przepisów -----------
const allRecipesContainer = document.getElementById("allRecipes"); //tbody tablicy

function renderAllRecipes() {
    allRecipesContainer.innerHTML = "";
    const allRecipes = JSON.parse(localStorage.getItem("recipes")); //konwersja danych
    let i=1;

    allRecipes.forEach(function() {
            const newRow = document.createElement("tr");

            const newTdId = document.createElement("td"); //dodanie ID
            newTdId.innerHTML = toString(i);
            newRow.appendChild(newTdId);
            i++;

            const newTdName = document.createElement("td"); //dodanie NAME
            newTdName.innerHTML=this.name;
            newRow.appendChild(newTdName);

            const newTdDescription = document.createElement("td"); //dodanie DESCRIPTION
            newTdDescription.innerHTML=this.description;
            newRow.appendChild(newTdDescription);

            const newTdIcons = document.createElement("td"); //dodanie ikon
            newRow.appendChild(newTdIcons);
            const newIconEdit = document.createElement("i");
            newIconEdit.classList.add("fas fa-edit recipe__edit");
            newTdIcons.appendChild(newIconEdit);
            const newIconRemove = document.createElement("i");
            newIconRemove.classList.add("far fa-trash-alt recipe__remove")
            newTdIcons.appendChild(newIconRemove);

        allRecipesContainer.appendChild(newRow); //dodanie ROW do TBODY
    });
}

renderAllRecipes();

