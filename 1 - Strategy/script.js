class Strategy {
    className = '';

    condition(item) {
        // default strategy
        return true;
    }

    search(items) {
        return items.reduce((acc, item, index) => {
            if (this.condition(item)) {
                acc.push(index);
            }
            return acc;
        }, []);
    }
}

class EvenStrategy extends Strategy {
    className = 'item_blue';

    condition(item) {
        return item % 2 === 0;
    }
}

class OddStrategy extends Strategy {
    className = 'item_green';

    condition(item) {
        return item % 2 !== 0;
    }
}

class LessStrategy extends Strategy {
    className = 'item_orange';

    condition(item) {
        return item < 50;
    }
}

const containerElement = document.getElementById('items-container');

const count = 10;
const items = new Array(count).fill(0).map(() => getRangeInteger(1, 99));
const itemElements = [];

const strategies = {
    evenStrategy: new EvenStrategy(),
    oddStrategy: new OddStrategy(),
    lessStrategy: new LessStrategy(),
};

items.forEach(item => {
    const numberElement = document.createTextNode(item);
    const itemElement = document.createElement('div');
    itemElement.classList.add('item');
    itemElement.appendChild(numberElement);
    containerElement.appendChild(itemElement);

    itemElements.push(itemElement);
});

function updateSearch(strategy) {
    const indexes = strategy.search(items);
    highlightItems(indexes, strategy.className);
}

function highlightItems(indexes, strategyClassName) {
    itemElements.forEach(item => {
        item.classList = ['item'];
    });
    indexes.forEach(index => itemElements[index].classList.add(strategyClassName));
}

function getRangeInteger(min, max) {
    return min + Math.floor(Math.random() * (max - min));
}