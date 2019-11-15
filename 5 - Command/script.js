const statesContainerElement = document.getElementById('states-container');

const addActionElement = document.getElementById('action-add');
const subActionElement = document.getElementById('action-sub');
const mulActionElement = document.getElementById('action-mul');
const divActionElement = document.getElementById('action-div');
const undoActionElement = document.getElementById('action-undo');

function getRangeInteger(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

class Command {
  backup;
  calculator;
  commandText;
  constructor(calculator) {
    this.calculator = calculator;
  }
  saveBackup() {
    this.backup = this.calculator.value;
  }
  undo() {
    this.calculator.value = this.backup;
  }
  execute() {
    this.commandValue = getRangeInteger(1, 10);
    this.calculator.lastCommandText = `${this.commandText}${this.commandValue}`;
  }
}

class AddCommand extends Command {
  commandText = '+';
  execute() {
    super.execute();
    this.saveBackup();
    this.calculator.value += this.commandValue;
    console.log('Add: ', this.commandValue, ' Result: ', this.calculator.value);
    return true;
  }
}

class SubCommand extends Command {
  commandText = '−';
  execute() {
    super.execute();
    this.saveBackup();
    this.calculator.value -= this.commandValue;
    console.log('Sub: ', this.commandValue, ' Result: ', this.calculator.value);
    return true;
  }
}

class MulCommand extends Command {
  commandText = '×';
  execute() {
    super.execute();
    this.saveBackup();
    this.calculator.value *= this.commandValue;
    console.log('Mul: ', this.commandValue, ' Result: ', this.calculator.value);
    return true;
  }
}

class DivCommand extends Command {
  commandText = '∕';
  execute() {
    super.execute();
    this.saveBackup();
    this.calculator.value = Math.round(this.calculator.value / this.commandValue);
    console.log('Div: ', this.commandValue, ' Result: ', this.calculator.value);
    return true;
  }
}

class UndoCommand extends Command {
  execute() {
    this.calculator.undoCommand();
    console.log('Undo: ', this.calculator.value);
    return false;
  }
}

class Button {
  constructor(element, action) {
    this.element = element;
    this.action = action;

    this.element.addEventListener('click', () => this.action());
  }
}

class Calculator {
  history = [];
  lastCommandText;
  constructor(initialValue) {
    this.value = initialValue;
    this.addStateItem(null, initialValue);

    this.addButton = new Button(addActionElement, () => this.executeCommand(new AddCommand(this)));
    this.subButton = new Button(subActionElement, () => this.executeCommand(new SubCommand(this)));
    this.mulButton = new Button(mulActionElement, () => this.executeCommand(new MulCommand(this)));
    this.divButton = new Button(divActionElement, () => this.executeCommand(new DivCommand(this)));

    const undoAction = () => this.executeCommand(new UndoCommand(this));
    this.undoButton = new Button(undoActionElement, undoAction);
  }

  executeCommand(command) {
    if (command.execute()) {
      this.history.push(command);
      this.addStateItem(this.lastCommandText, this.value);
    }
  }

  undoCommand() {
    const lastCommand = this.history.pop();
    if (lastCommand) {
      lastCommand.undo();
      this.removeLastStateItem();
    }
  }

  addStateItem(lastCommandText, resultValue) {
    const stateElement = document.createElement('div');
    stateElement.className = 'state';

    const commandValueElement = document.createElement('span');
    commandValueElement.className = 'state__command-value';
    commandValueElement.innerText = lastCommandText;

    const resultValueElement = document.createElement('span');
    resultValueElement.className = 'state__result-value';
    resultValueElement.innerText = resultValue;

    stateElement.appendChild(commandValueElement);
    stateElement.appendChild(resultValueElement);
    statesContainerElement.appendChild(stateElement);
  }

  removeLastStateItem() {
    statesContainerElement.removeChild(statesContainerElement.lastChild);
  }
}

new Calculator(0);