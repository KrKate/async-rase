import '../../styles.css'

class ErrorPage {
    private container: HTMLElement;

    private errorType: string;

    static TextObject: { [prop: string]: string } = {
        '404': 'Error! The page was not found'
    }

    constructor(id: string, errorType: string) {
        this.container = document.createElement('div');
        this.container.id = id;
        this.errorType = errorType;
    }

    private createHeaderTitle(text: string) {
        const headerTitle = document.createElement('h1');
        headerTitle.innerText = text;
        return headerTitle;
    }

    render() {
        const title = this.createHeaderTitle(ErrorPage.TextObject[this.errorType]);
        this.container.append(title);
        return this.container;
    }
}

export default ErrorPage;
