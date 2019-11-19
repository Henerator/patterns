// outfile: script.js

const canvasDrawContainer = document.getElementById('canvas-draw-container');
const htmlDrawContainer = document.getElementById('html-draw-container');

class Point {
    constructor(public x: number, public y: number) {}
}

interface DrawVisitor {
    doForCircle: (shape: Circle) => void;
    doForRectangle: (shape: Rectangle) => void;
    doForSquare: (shape: Square) => void;
    doForTriangle: (shape: Triangle) => void;
    draw: Function;
}

class HTMLDrawVisitor implements DrawVisitor {
    constructor(private containerElement: HTMLElement) {}
    doForCircle = (shape: Circle) => {
        const element = this.createElement('Circle');
        element.classList.add('column-item_type_circle');
        this.containerElement.appendChild(element);
    };
    doForRectangle = (shape: Rectangle) => {
        const element = this.createElement('Rectangle');
        element.classList.add('column-item_type_rectangle');
        this.containerElement.appendChild(element);
    };
    doForSquare = (shape: Square) => {
        const element = this.createElement('Square');
        element.classList.add('column-item_type_square');
        this.containerElement.appendChild(element);
    };
    doForTriangle = (shape: Triangle) => {
        const element = this.createElement('');
        element.classList.add('column-item_type_triangle');

        const textElement = document.createElement('span');
        textElement.classList.add('text');
        textElement.innerText = 'Triangle';

        element.appendChild(textElement);
        this.containerElement.appendChild(element);
    };
    draw(shapes: Shape[]) {
        this.containerElement.innerHTML = '';
        shapes.forEach(shape => {
            shape.accept(this);
        });
    }
    private createElement(title: string): HTMLElement {
        const element = document.createElement('div');
        element.classList.add('column__item');
        element.innerText = title;
        return element;
    }
}

class CanvasDrawVisitor implements DrawVisitor {
    canvasElement: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    constructor(containerElement: HTMLElement) {
        this.canvasElement = <HTMLCanvasElement>containerElement;
        this.canvasElement.width = 300;
        this.canvasElement.height = 400;
        this.context = this.canvasElement.getContext('2d');
    }
    doForCircle = (circle: Circle) => {
        this.context.beginPath();
        this.context.arc(circle.center.x, circle.center.y, circle.radius, 0, 2 * Math.PI);
        this.context.fill();
    };
    doForRectangle = (rectangle: Rectangle) => {
        this.context.fillRect(
            rectangle.center.x - rectangle.width / 2,
            rectangle.center.y - rectangle.height / 2,
            rectangle.width,
            rectangle.height
        );
    };
    doForSquare = (square: Square) => {
        this.context.fillRect(
            square.center.x - square.width / 2,
            square.center.y - square.width / 2,
            square.width,
            square.width
        );
    };
    doForTriangle = (triangle: Triangle) => {
        this.context.beginPath();
        this.context.moveTo(triangle.center.x - 100, triangle.center.y);
        this.context.lineTo(triangle.center.x + 100, triangle.center.y);
        this.context.lineTo(triangle.center.x, triangle.center.y - triangle.height);
        this.context.fill();
    };
    draw(shapes: Shape[]) {
        this.clear();
        this.context.fillStyle = '#39C2D8';
        shapes.forEach(shape => {
            shape.accept(this);
        });
    }
    private clear() {
        this.context.fillStyle = '#333';
        this.context.fillRect(
            0,
            0,
            this.canvasElement.width,
            this.canvasElement.height
        );
    }
}

interface Shape {
    center: Point;
    accept: (visitor: DrawVisitor) => void;
}

class Circle implements Shape {
    constructor(public center: Point, public radius: number) {}
    accept(visitor: DrawVisitor) {
        visitor.doForCircle(this);
    }
}
class Rectangle implements Shape {
    constructor(
        public center: Point,
        public width: number,
        public height: number
    ) {}
    accept(visitor: DrawVisitor) {
        visitor.doForRectangle(this);
    }
}
class Square implements Shape {
    constructor(public center: Point, public width: number) {}
    accept(visitor: DrawVisitor) {
        visitor.doForSquare(this);
    }
}
class Triangle implements Shape {
    constructor(public center: Point, public height: number) {}
    accept(visitor: DrawVisitor) {
        visitor.doForTriangle(this);
    }
}

// using

const shapes = [
    new Triangle(new Point(150, 100), 100),
    new Rectangle(new Point(150, 140), 200, 50),
    new Square(new Point(150, 230), 100),
    new Circle(new Point(150, 340), 50)
];

const htmlDrawVisitor = new HTMLDrawVisitor(htmlDrawContainer);
htmlDrawVisitor.draw(shapes);

const canvasDrawVisitor = new CanvasDrawVisitor(canvasDrawContainer);
canvasDrawVisitor.draw(shapes);
