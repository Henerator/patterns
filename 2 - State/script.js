class State {
    className;

    constructor(system) {
        this.system = system;
    }
}

class EvenState extends State {
    className = 'action_even';
    action() {
        this.system.value += 3;
        this.system.updateState();
    }
}

class OddState extends State {
    className = 'action_odd';
    action() {
        this.system.value *= 2;
        this.system.updateState();
    }
}

class TenModState extends State {
    className = 'action_ten-mod';
    action() {
        this.system.value -= 10;
        this.system.updateState();
    }
}

class ZeroState extends State {
    className = 'action_zero';
    action() {
        this.system.value += 1;
        this.system.updateState();
    }
}

class System {
    states = [];
    currentState = null;
    value = 0;
    valueElement = null;
    actionElement = null;

    constructor() {
        this.valueElement = document.getElementById('value');
        this.actionElement = document.getElementById('action');
        this.value = parseInt(this.valueElement.innerText);

        this.states = {
            evenState: new EvenState(this),
            oddState: new OddState(this),
            tenModeState: new TenModState(this),
            zeroState: new ZeroState(this),
        };

        this.updateState();
        this.render();
    }

    updateState() {
        switch (true) {
            case this.value === 0:
                this.currentState = this.states.zeroState;
                break;
            case this.value % 10 === 0:
                this.currentState = this.states.tenModeState;
                break;
            case this.value % 2 === 0:
                this.currentState = this.states.evenState;
                break;
            case this.value % 2 !== 0:
                this.currentState = this.states.oddState;
                break;

            default:
                break;
        }
    }

    render() {
        this.valueElement.innerText = this.value;
        this.actionElement.className = `action ${this.currentState.className}`;
    }

    action() {
        this.currentState.action();
        this.render();
    }
}

const system = new System();