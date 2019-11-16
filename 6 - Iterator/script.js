const originContainer = document.getElementById("iterator-origin");
const forwardContainer = document.getElementById("iterator-forward");
const backwardContainer = document.getElementById("iterator-backward");
const randomContainer = document.getElementById("iterator-random");

function getRangeInteger(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

class Collection extends Array {
  constructor(length) {
    super();
    while (length > 0) {
      this.push(getRangeInteger(1, 100));
      length--;
    }
  }
}

class Iterator {
  constructor(collection) {
    this.collection = collection;
  }
}

class ForwardIterator extends Iterator {
  constructor(collection) {
    super(collection);
    this.currentIndex = 0;
  }
  next() {
    if (this.currentIndex < this.collection.length) {
      return { item: this.collection[this.currentIndex++], done: false }
    } else {
      this.currentIndex = 0;
      return { done: true };
    }
  }
}

class BackwardIterator extends Iterator {
  constructor(collection) {
    super(collection);
    this.currentIndex = collection.length - 1;
  }
  next() {
    if (this.currentIndex >= 0) {
      return { item: this.collection[this.currentIndex--], done: false }
    } else {
      this.currentIndex = this.collection.length - 1;
      return { done: true };
    }
  }
}

class RandomIterator extends Iterator {
  constructor(collection) {
    super(collection);
    this.currentIndex = 0;
    this.randomIndexes = [];

    const indexes = new Array(collection.length)
      .fill()
      .map((_, index) => index);
    while (indexes.length > 0) {
      const randomIndex = getRangeInteger(0, indexes.length);
      this.randomIndexes.push(indexes.splice(randomIndex, 1));
    }
  }
  next() {
    if (this.currentIndex < this.collection.length) {
      const collectionIndex = this.randomIndexes[this.currentIndex++];
      return { item: this.collection[collectionIndex], done: false }
    } else {
      this.currentIndex = 0;
      return { done: true };
    }
  }
}

function drawIterator(containerElement, iterator) {
  containerElement.innerHTML = "";
  let data = iterator.next();
  while (!data.done) {
    const itemElement = document.createElement("div");
    itemElement.className = "column__item";
    itemElement.innerText = data.item;
    containerElement.appendChild(itemElement);
    data = iterator.next();
  }
}

const originCollection = new Collection(7);

const forwardIterator = new ForwardIterator(originCollection);
const backwardIterator = new BackwardIterator(originCollection);
const randomIterator = new RandomIterator(originCollection);

drawIterator(originContainer, forwardIterator);
drawIterator(forwardContainer, forwardIterator);
drawIterator(backwardContainer, backwardIterator);
drawIterator(randomContainer, randomIterator);
