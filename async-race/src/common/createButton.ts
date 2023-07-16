function createButton(text: string, className: string) {
    const button = document.createElement('button');
    button.innerText = text;
    button.className = className;
    return button;
}

export default createButton;
