class Mediator {
    elements = [];
    containerElement = document.getElementById('container');

    addElement(element) {
        this.elements.push(element);
        this.containerElement.appendChild(element.getBlock());
        return this;
    }

    notify(element) {
        const elementIndex = this.elements.findIndex(el => el === element);
        switch (elementIndex) {
            case 0:
                this.updateElementState(1, false);
                break;
            case 2:
                this.updateElementState(1, true);
                break;
            case 3:
                this.updateElementState(0, false);
                this.updateElementState(1, false);
                this.updateElementState(2, false);
                break;
            case 4:
                this.updateElementState(0, true);
                this.updateElementState(1, true);
                this.updateElementState(2, true);
                break;

            default:
                break;
        }
    }

    updateElementState(index, state) {
        this.elements[index].setState(state);
        const block = this.elements[index].block;
        if(state) {
            block.classList.remove('element_state_disabled')
        } else {
            block.classList.add('element_state_disabled');
        }
    }
}

class Element {
    active = true;
    className = '';
    text = '';
    block = null;
    constructor(mediator) {
        this.mediator = mediator;
    }
    setState(state) {
        this.active = state;
    }
    action() {
        if (this.active) {
            this.mediator.notify(this);
        }
    }
    getBlock() {
        const block = document.createElement('div');
        block.classList.add('element');
        block.classList.add(this.className);
        block.innerText = this.text;
        block.addEventListener('click', () => { this.action(); })
        this.block = block;
        return block;
    }
}

class FirstElement extends Element {
    className = 'element_first';
    text = 'Disable Second Element';
}
class SecondElement extends Element {
    className = 'element_second';
    text = 'Second Element';
}
class ThirdElement extends Element {
    className = 'element_third';
    text = 'Enable Second Element';
}
class ForthElement extends Element {
    className = 'element_forth';
    text = 'Disable All Elements';
}
class FifthElement extends Element {
    className = 'element_forth';
    text = 'Enable All Elements';
}

const mediator = new Mediator();

const firstElement = new FirstElement(mediator);
const secondElement = new SecondElement(mediator);
const thirdElement = new ThirdElement(mediator);
const forthElement = new ForthElement(mediator);
const fifthElement = new FifthElement(mediator);

mediator.addElement(firstElement)
    .addElement(secondElement)
    .addElement(thirdElement)
    .addElement(forthElement)
    .addElement(fifthElement);
