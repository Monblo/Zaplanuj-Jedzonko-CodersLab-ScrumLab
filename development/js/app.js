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

//Tworzenie przepisu
const ingredients = [];
const instructions = [];
const form = {
    form: document.getElementById('recipe-form'),
    cancel: document.getElementById('cancel-recipe'),
    save: document.getElementById('save-recipe'),
    name: document.getElementById('recipe-name'),
    description: document.getElementById('recipe-description'),
    instruction: document.getElementById('recipe-instruction'),
    addInstruction: document.getElementById('recipe-instruction-add'),
    instructionsList: document.getElementById('instructions-list'),
    ingredient: document.getElementById('recipe-ingredients'),
    addIngredient: document.getElementById('recipe-ingredients-add'),
    ingredientsList: document.getElementById('ingredients-list'),
}
//Dodanie składnika lub instrukcji
const addIn = [form.addInstruction, form.addIngredient];
addIn.forEach(el => el.addEventListener('click', (e) => {
        if (e.target === form.addInstruction) {
            const listElement = document.createElement('li');
            listElement.innerHTML = form.instruction.value + ' <i class="fas fa-edit"></i> <i class="fas fa-trash-alt"></i>';
            form.instructionsList.appendChild(listElement);
            instructions.push(form.instruction.value);
            form.instruction.value = 'Jaki jest następny krok?';
        } else if (e.target === form.addIngredient) {
            const listElement = document.createElement('li');
            listElement.innerHTML = form.ingredient.value + ' <i class="fas fa-edit"></i> <i class="fas fa-trash-alt"></i>';
            form.ingredientsList.appendChild(listElement);
            ingredients.push(form.ingredient.value);
            form.ingredient.value = 'Jaki jest następny krok?';
        } else {
            console.log('something went wrong');
        }
    }
));
//Anulowanie wypełniania formularza
form.cancel.addEventListener('click', () => {
    form.form.reset;
    form.form.classList.add('hidden');
});
//Zapisanie przepisu
form.save.addEventListener('click', (e) => {
    e.preventDefault();
    let recipes = JSON.parse(localStorage.getItem('localRecipes'));
    if(!recipes) {
        recipes = [];
    }
    const recipe = {
        name: form.name.value,
        description: form.description.value,
        instructions: instructions,
        ingredients: ingredients
    }
    recipes.push(recipe);
    localStorage.setItem('localRecipes', JSON.stringify(recipes));
    console.log(JSON.parse(localStorage.getItem('localRecipes')));
   form.form.classList.add('hidden');
    counterUpdate();
});
const counterUpdate = () => {
    const l = JSON.parse(localStorage.getItem('localRecipes'));
    document.getElementById('recipes-lenght').innerText = l.length;
}
window.addEventListener('DOMContentLoaded',() => counterUpdate());

document.getElementById('widget-add-recipe').addEventListener('click', () => form.form.classList.remove('hidden'));