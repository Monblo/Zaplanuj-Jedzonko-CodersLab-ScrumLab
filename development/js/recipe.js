//-------------wyświetalnie przepisów -----------
const allRecipesContainer = document.getElementById("allRecipes"); //tbody tablicy

function renderAllRecipes() {
    allRecipesContainer.innerHTML = "";
    const allRecipes = JSON.parse(localStorage.getItem("localRecipes")); //konwersja danych
    let i=1;

    allRecipes.forEach(function(el, index) {
        const newRow = document.createElement("tr");

        const newTdId = document.createElement("td"); //dodanie ID
        newTdId.innerText = index + 1;
        newRow.appendChild(newTdId);

        const newTdName = document.createElement("td"); //dodanie NAME
        newTdName.innerHTML=el.name;
        newRow.appendChild(newTdName);

        const newTdDescription = document.createElement("td"); //dodanie DESCRIPTION
        newTdDescription.innerHTML=el.description;
        newRow.appendChild(newTdDescription);

        const newTdIcons = document.createElement("td"); //dodanie ikon
        newRow.appendChild(newTdIcons);
        const newIconEdit = document.createElement("i");
        newIconEdit.classList.add("fas", "fa-edit", "recipe__edit");
        newTdIcons.appendChild(newIconEdit);
        const newIconRemove = document.createElement("i");
        newIconRemove.classList.add("far", "fa-trash-alt", "recipe__remove")
        newTdIcons.appendChild(newIconRemove);

        allRecipesContainer.appendChild(newRow); //dodanie ROW do TBODY
    });
}

renderAllRecipes();

