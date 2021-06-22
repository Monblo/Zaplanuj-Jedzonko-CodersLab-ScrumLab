const hideItem = (selectorsList) => {
    const addListener = (selector) => {
        const clickTarget = document.querySelector(`[data-id=${selector}]`);
        const toHide = document.getElementById(selector);
        clickTarget.addEventListener('click', e => toHide.classList.add('hidden'));
    }
    selectorsList.forEach(e => addListener(e));
}

hideItem(["info", "exclamation", "success"]);