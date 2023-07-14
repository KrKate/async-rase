
const Buttons = [
    {
        id: 'garage-page',
        text: 'TO GARAGE',
    },

    {
        id: 'winners-page',
        text: 'TO WINNERS',
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
