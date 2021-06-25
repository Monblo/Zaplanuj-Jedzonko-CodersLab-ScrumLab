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
const addToList = (e) => {
    if (e.target === form.addInstruction) {
        if(form.instruction.value.length > 50 || form.instruction.value.length < 5) {
            showWarning('recipe-instruction-warning');
        } else {
            const listElement = document.createElement('li');
            listElement.innerHTML = form.instruction.value + ' <i class="fas fa-edit"></i> <i class="fas fa-trash-alt"></i>';
            form.instructionsList.appendChild(listElement);
            form.instruction.value = '';
            form.instruction.setAttribute('placeholder', 'Jaki jest następny krok?');
        }
    } else if (e.target === form.addIngredient) {
        if(form.ingredient.value.length > 150 || form.ingredient.value.length < 5) {
            showWarning('recipe-ingredient-warning');
        } else {
            const listElement = document.createElement('li');
            listElement.innerHTML = form.ingredient.value + ' <i class="fas fa-edit"></i> <i class="fas fa-trash-alt"></i>';
            form.ingredientsList.appendChild(listElement);
            form.ingredient.value = '';
            form.ingredient.setAttribute('placeholder', 'Jaki jest następny składnik?');
        }
    } else {
        console.log('something went wrong');
    }
}
//Usuwanie ostrzeżeń dotyczących długości danych wprowadzonych w formularzu
document.querySelectorAll('.warning').forEach(el => el.addEventListener('click', e => e.target.classList.add('hidden')));
//Ukrywanie formularza
const hideRecipeForm = () => form.form.classList.add('hidden');
//Dodawanie elementów do list
form.addInstruction.addEventListener('click', addToList);
form.addIngredient.addEventListener('click', addToList);
//Anulowanie wypełniania formularza
form.cancel.addEventListener('click', () => {
    form.form.reset;
    hideRecipeForm();
});
//Zapisanie przepisu
const showWarning = (id) => {
    document.getElementById(id).classList.remove('hidden');
}
const save = (e) => {
    e.preventDefault();
    if (form.name.value.length > 50 || form.name.value.length < 2) {
        showWarning('recipe-name-warning');
    }
    if (form.description.value.length > 360 || form.description.value.length < 10) {
        showWarning('recipe-description-warning');
    } else {
        let recipes = JSON.parse(localStorage.getItem('localRecipes'));
        if (!recipes) {
            recipes = [];
        }
        const instructions = document.querySelectorAll('#instructions-list li');
        const inst = [];
        instructions.forEach(el => inst.push(el.innerText.slice(0, -2)));
        const ingredients = document.querySelectorAll('#ingredients-list li');
        const ingr = [];
        ingredients.forEach(el => ingr.push(el.innerText.slice(0, -2)));
        const recipe = {
            name: form.name.value,
            description: form.description.value,
            instructions: inst,
            ingredients: ingr
        }

        recipes.push(recipe);
        localStorage.setItem('localRecipes', JSON.stringify(recipes));
        console.log(JSON.parse(localStorage.getItem('localRecipes')));
        hideRecipeForm();
        counterUpdate();
    }
}
//Uaktualnienie licznika przepisów
const counterUpdate = () => {
    const l = JSON.parse(localStorage.getItem('localRecipes'));
    document.getElementById('recipes-lenght').innerText = l.length;
}
form.save.addEventListener('click', save);

window.addEventListener('DOMContentLoaded', () => counterUpdate());

document.getElementById('widget-add-recipe').addEventListener('click', () => form.form.classList.remove('hidden'));

const check = document.querySelectorAll('#instructions-list li');


const firstTime = localStorage.getItem("userName");
const form = document.querySelector(".app__form");
const getName = document.querySelector(".userName")
const formBtn = document.querySelector(".form__button");

if (!firstTime){
    formBtn.addEventListener('click', function (){
        const userName = getName.value;
        localStorage.setItem('userName', `${userName}`);
        document.getElementById('user__name').innerHTML = `${localStorage.getItem("userName")}`;
    })

} else {
    form.className = "hidden";
    document.getElementById("user__name").innerHTML = `${localStorage.getItem("userName")}`;
}

