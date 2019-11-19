var canvasDrawContainer = document.getElementById('canvas-draw-container');
var htmlDrawContainer = document.getElementById('html-draw-container');
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
var HTMLDrawVisitor = (function () {
    function HTMLDrawVisitor(containerElement) {
        var _this = this;
        this.containerElement = containerElement;
        this.doForCircle = function (shape) {
            var element = _this.createElement('Circle');
            element.classList.add('column-item_type_circle');
            _this.containerElement.appendChild(element);
        };
        this.doForRectangle = function (shape) {
            var element = _this.createElement('Rectangle');
            element.classList.add('column-item_type_rectangle');
            _this.containerElement.appendChild(element);
        };
        this.doForSquare = function (shape) {
            var element = _this.createElement('Square');
            element.classList.add('column-item_type_square');
            _this.containerElement.appendChild(element);
        };
        this.doForTriangle = function (shape) {
            var element = _this.createElement('');
            element.classList.add('column-item_type_triangle');
            var textElement = document.createElement('span');
            textElement.classList.add('text');
            textElement.innerText = 'Triangle';
            element.appendChild(textElement);
            _this.containerElement.appendChild(element);
        };
    }
    HTMLDrawVisitor.prototype.draw = function (shapes) {
        var _this = this;
        this.containerElement.innerHTML = '';
        shapes.forEach(function (shape) {
            shape.accept(_this);
        });
    };
    HTMLDrawVisitor.prototype.createElement = function (title) {
        var element = document.createElement('div');
        element.classList.add('column__item');
        element.innerText = title;
        return element;
    };
    return HTMLDrawVisitor;
}());
var CanvasDrawVisitor = (function () {
    function CanvasDrawVisitor(containerElement) {
        var _this = this;
        this.doForCircle = function (circle) {
            _this.context.beginPath();
            _this.context.arc(circle.center.x, circle.center.y, circle.radius, 0, 2 * Math.PI);
            _this.context.fill();
        };
        this.doForRectangle = function (rectangle) {
            _this.context.fillRect(rectangle.center.x - rectangle.width / 2, rectangle.center.y - rectangle.height / 2, rectangle.width, rectangle.height);
        };
        this.doForSquare = function (square) {
            _this.context.fillRect(square.center.x - square.width / 2, square.center.y - square.width / 2, square.width, square.width);
        };
        this.doForTriangle = function (triangle) {
            _this.context.beginPath();
            _this.context.moveTo(triangle.center.x - 100, triangle.center.y);
            _this.context.lineTo(triangle.center.x + 100, triangle.center.y);
            _this.context.lineTo(triangle.center.x, triangle.center.y - triangle.height);
            _this.context.fill();
        };
        this.canvasElement = containerElement;
        this.canvasElement.width = 300;
        this.canvasElement.height = 400;
        this.context = this.canvasElement.getContext('2d');
    }
    CanvasDrawVisitor.prototype.draw = function (shapes) {
        var _this = this;
        this.clear();
        this.context.fillStyle = '#39C2D8';
        shapes.forEach(function (shape) {
            shape.accept(_this);
        });
    };
    CanvasDrawVisitor.prototype.clear = function () {
        this.context.fillStyle = '#333';
        this.context.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    };
    return CanvasDrawVisitor;
}());
var Circle = (function () {
    function Circle(center, radius) {
        this.center = center;
        this.radius = radius;
    }
    Circle.prototype.accept = function (visitor) {
        visitor.doForCircle(this);
    };
    return Circle;
}());
var Rectangle = (function () {
    function Rectangle(center, width, height) {
        this.center = center;
        this.width = width;
        this.height = height;
    }
    Rectangle.prototype.accept = function (visitor) {
        visitor.doForRectangle(this);
    };
    return Rectangle;
}());
var Square = (function () {
    function Square(center, width) {
        this.center = center;
        this.width = width;
    }
    Square.prototype.accept = function (visitor) {
        visitor.doForSquare(this);
    };
    return Square;
}());
var Triangle = (function () {
    function Triangle(center, height) {
        this.center = center;
        this.height = height;
    }
    Triangle.prototype.accept = function (visitor) {
        visitor.doForTriangle(this);
    };
    return Triangle;
}());
var shapes = [
    new Triangle(new Point(150, 100), 100),
    new Rectangle(new Point(150, 140), 200, 50),
    new Square(new Point(150, 230), 100),
    new Circle(new Point(150, 340), 50)
];
var htmlDrawVisitor = new HTMLDrawVisitor(htmlDrawContainer);
htmlDrawVisitor.draw(shapes);
var canvasDrawVisitor = new CanvasDrawVisitor(canvasDrawContainer);
canvasDrawVisitor.draw(shapes);
