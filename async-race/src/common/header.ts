
const Buttons = [
    {
        id: 'garage-page',
        text: 'to Garage',
    },

    {
        id: 'winners-page',
        text: 'to Winners',
    }
];

class Header {
    container: HTMLElement;

    constructor(tagName: string, className: string) {
        this.container = document.createElement(tagName);
        this.container.className = className;
    }

    renderPageButtons() {
        const pageButtons = document.createElement('div');
        Buttons.forEach((button) => {
            const buttonHTML = document.createElement('a');
            buttonHTML.href = `#${button.id}`;
            buttonHTML.innerText = button.text;
            pageButtons.append(buttonHTML);
        });
        this.container.append(pageButtons);
    }


    render() {
        this.renderPageButtons();
        return this.container;
    }
}

export default Header;
