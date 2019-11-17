const buttons = {
  create: document.getElementById("btn-create"),
  render: document.getElementById("btn-render"),
  change: document.getElementById("btn-change"),
  update: document.getElementById("btn-update"),
  remove: document.getElementById("btn-remove")
};
const observers = {
  created: document.getElementById("observer-created"),
  rendered: document.getElementById("observer-rendered"),
  changed: document.getElementById("observer-changed"),
  updated: document.getElementById("observer-updated"),
  removed: document.getElementById("observer-removed")
};

class Subject {
  observers = [];
  subscribe(eventName, observer) {
    this.observers.push({ eventName, observer });
  }
  unsubscribe(eventName, observer) {
    this.observers = this.observers.filter(
      item => item.eventName !== eventName && item.observer !== observer
    );
  }
  notify(eventName) {
    this.observers.filter(item => item.eventName === eventName)
      .forEach(item => item.observer.update());
  }
}

class Observer {
  timerId = null;
  constructor(element) {
    this.element = element;
  }
  update() {
    this.element.classList.add('column-item_active');
    clearTimeout(this.timerId);
    this.timerId = setTimeout(() => {
      this.element.classList.remove('column-item_active');
    }, 2000);
  }
}

const subject = new Subject();

const createdObserver = new Observer(observers.created);
subject.subscribe('created', createdObserver);

const renderedObserver = new Observer(observers.rendered);
subject.subscribe('rendered', renderedObserver);

const changedObserver = new Observer(observers.changed);
subject.subscribe('changed', changedObserver);

const updatedObserver = new Observer(observers.updated);
subject.subscribe('updated', updatedObserver);

const removedObserver = new Observer(observers.removed);
subject.subscribe('removed', removedObserver);

buttons.create.addEventListener('click', () => subject.notify('created'));
buttons.render.addEventListener('click', () => subject.notify('rendered'));
buttons.change.addEventListener('click', () => subject.notify('changed'));
buttons.update.addEventListener('click', () => subject.notify('updated'));
buttons.remove.addEventListener('click', () => subject.notify('removed'));