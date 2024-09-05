// Clase base para todas las figuras
class Figura {
    constructor() {
        if (new.target === Figura) {
            throw new TypeError("No se puede instanciar una clase abstracta.");
        }
    }

    calcularArea() {
        throw new Error("Este método debe ser implementado por las subclases.");
    }
}

// Círculo
class Circulo extends Figura {
    constructor(radio) {
        super();
        this.radio = radio;
    }

    calcularArea() {
        if (this.radio > 0) {
            return Math.PI * Math.pow(this.radio, 2);
        }
        return null;
    }
}

// Cuadrado
class Cuadrado extends Figura {
    constructor(lado) {
        super();
        this.lado = lado;
    }

    calcularArea() {
        if (this.lado > 0) {
            return Math.pow(this.lado, 2);
        }
        return null;
    }
}

// Rectángulo
class Rectangulo extends Figura {
    constructor(longitud, ancho) {
        super();
        this.longitud = longitud;
        this.ancho = ancho;
    }

    calcularArea() {
        if (this.longitud > 0 && this.ancho > 0) {
            return this.longitud * this.ancho;
        }
        return null;
    }
}

// Triángulo
class Triangulo extends Figura {
    constructor(base, altura) {
        super();
        this.base = base;
        this.altura = altura;
    }

    calcularArea() {
        if (this.base > 0 && this.altura > 0) {
            return 0.5 * this.base * this.altura;
        }
        return null;
    }
}

// Manejo de eventos y lógica principal
document.getElementById('shape').addEventListener('change', function () {
    const shape = this.value;
    const inputs = document.getElementById('inputs');
    inputs.innerHTML = ''; // Limpiar los campos anteriores

    switch (shape) {
        case 'circle':
            inputs.innerHTML = `
                <label for="radius">Radio del círculo:</label>
                <input type="number" id="radius" name="radius" placeholder="Introduce el radio" min="0" step="any" required>
            `;
            break;
        case 'square':
            inputs.innerHTML = `
                <label for="side">Lado del cuadrado:</label>
                <input type="number" id="side" name="side" placeholder="Introduce el lado" min="0" step="any" required>
            `;
            break;
        case 'rectangle':
            inputs.innerHTML = `
                <label for="length">Longitud del rectángulo:</label>
                <input type="number" id="length" name="length" placeholder="Introduce la longitud" min="0" step="any" required>
                <label for="width">Ancho del rectángulo:</label>
                <input type="number" id="width" name="width" placeholder="Introduce el ancho" min="0" step="any" required>
            `;
            break;
        case 'triangle':
            inputs.innerHTML = `
                <label for="base">Base del triángulo:</label>
                <input type="number" id="base" name="base" placeholder="Introduce la base" min="0" step="any" required>
                <label for="height">Altura del triángulo:</label>
                <input type="number" id="height" name="height" placeholder="Introduce la altura" min="0" step="any" required>
            `;
            break;
    }
});

document.getElementById('areaForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const shape = document.getElementById('shape').value;
    let area = null;
    let figura = null;

    switch (shape) {
        case 'circle':
            const radio = parseFloat(document.getElementById('radius').value);
            figura = new Circulo(radio);
            break;
        case 'square':
            const lado = parseFloat(document.getElementById('side').value);
            figura = new Cuadrado(lado);
            break;
        case 'rectangle':
            const longitud = parseFloat(document.getElementById('length').value);
            const ancho = parseFloat(document.getElementById('width').value);
            figura = new Rectangulo(longitud, ancho);
            break;
        case 'triangle':
            const base = parseFloat(document.getElementById('base').value);
            const altura = parseFloat(document.getElementById('height').value);
            figura = new Triangulo(base, altura);
            break;
    }

    if (figura) {
        area = figura.calcularArea();
    }

    const result = document.getElementById('result');
    if (area !== null) {
        result.textContent = `El área es: ${area.toFixed(2)}`;
    } else {
        result.textContent = 'Por favor, introduce valores positivos válidos.';
    }
});
