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
