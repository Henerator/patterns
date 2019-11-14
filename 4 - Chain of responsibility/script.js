function getRangeInteger(min, max) {
    return min + Math.floor(Math.random() * (max - min));
}

class Handler {
    next = null;
    constructor(condition, operation, conditionText, operationText) {
        this.operation = operation;
        this.condition = condition;

        this.element = document.createElement('div');
        this.element.className='item item_handler';
        const operationTextElement = document.createElement('span');
        operationTextElement.className = 'item__operation';
        operationTextElement.innerText = operationText;

        const conditionTextElement = document.createElement('span');
        conditionTextElement.className = 'item__condition';
        conditionTextElement.innerText = conditionText;

        const handlingTextElement = document.createElement('span');
        handlingTextElement.className = 'item__handling';
        this.handlingTextElement = handlingTextElement;

        this.element.appendChild(operationTextElement);
        this.element.appendChild(conditionTextElement);
        this.element.appendChild(handlingTextElement);
    }
    setNext(handler) {
        this.next = handler;
    }
    handle(value) {
        const handledValue = this.condition(value)
            ? this.operation(value)
            : value;
        console.log(this.condition, ': ', handledValue);
        this.handlingTextElement.innerText = `${value} → ${handledValue}`;
        if (this.next !== null) {
            return this.next.handle(handledValue);
        }
        return handledValue;
    }
}

const handlers = [
    new Handler(
        (value) => value < 10,
        (value) => value + 2,
        'less than 10', '+2'
    ),
    new Handler(
        (value) => value % 2 === 0,
        (value) => value * 2 + 1,
        'even number', '×2 + 1'
    ),
    new Handler(
        (value) => value % 2 !== 0,
        (value) => value * 10,
        'odd number', '×10'
    ),
    new Handler(
        (value) => value > 100,
        (value) => value - 50,
        'more than 100', '−50'
    ),
];

const containerElement = document.getElementById('container');
const initialValueElement = document.getElementById('first-item');
const resultValuElement = document.getElementById('last-item');

const itemElements = document.getElementsByClassName('item');
const lastItem = itemElements[itemElements.length - 1];

handlers.forEach((handler, index, arr) => {
    containerElement.insertBefore(handler.element, lastItem);

    const nextHandlerIndex = index + 1;
    if (nextHandlerIndex < arr.length) {
        handler.setNext(arr[nextHandlerIndex]);
    }
});

const value = getRangeInteger(1, 50);
const result = handlers[0].handle(value);
initialValueElement.innerText = value;
resultValuElement.innerText = result;
