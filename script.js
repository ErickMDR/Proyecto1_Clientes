document.addEventListener("DOMContentLoaded", () => {
    const matrixSizeSelect = document.getElementById("matrixSize");

    matrixSizeSelect.addEventListener("change", () => {
        createMatrixInputs("A");
        createMatrixInputs("B");
        clearResult();
    });

    createMatrixInputs("A");
    createMatrixInputs("B");
});

function createMatrixInputs(matrixId) {
    const size = parseInt(document.getElementById("matrixSize").value);
    const matrixContainer = document.getElementById(`matrix${matrixId}`);
    matrixContainer.innerHTML = "";
    matrixContainer.style.gridTemplateColumns = `repeat(${size}, 50px)`;

    for (let i = 0; i < size * size; i++) {
        const input = document.createElement("input");
        input.type = "number";
        input.classList.add("matrix-input");
        input.style.width = "40px";
        input.style.height = "40px";
        input.style.textAlign = "center";
        matrixContainer.appendChild(input);
    }
}

function clearResult() {
    document.getElementById("resultMatrix").innerHTML = "";
    document.getElementById("resultMessage").textContent = "";
}

function generateRandomMatrix(matrixId) {
    const size = parseInt(document.getElementById("matrixSize").value);
    const matrixContainer = document.getElementById(`matrix${matrixId}`);
    const inputs = matrixContainer.querySelectorAll("input");

    inputs.forEach(input => {
        input.value = Math.floor(Math.random() * 21) - 10;
    });
}

function clearMatrix(matrixId) {
    const matrixContainer = document.getElementById(`matrix${matrixId}`);
    const inputs = matrixContainer.querySelectorAll("input");
    inputs.forEach(input => input.value = "");
}

function fillExampleMatrix(matrixId) {
    const examples = {
        2: [[1, 2], [3, 4]],
        3: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
        4: [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]
    };

    const size = parseInt(document.getElementById("matrixSize").value);
    const matrixContainer = document.getElementById(`matrix${matrixId}`);
    const inputs = matrixContainer.querySelectorAll("input");

    if (!examples[size]) {
        alert("No hay ejemplo disponible para este tamaño.");
        return;
    }

    const example = examples[size].flat();

    inputs.forEach((input, i) => {
        input.value = example[i] !== undefined ? example[i] : 0;
    });
}

function getMatrixValues(matrixId) {
    const size = parseInt(document.getElementById("matrixSize").value);
    const inputs = document.getElementById(`matrix${matrixId}`).querySelectorAll("input");
    const matrix = [];

    for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) {
            const value = parseFloat(inputs[i * size + j].value);
            row.push(isNaN(value) ? 0 : value);
        }
        matrix.push(row);
    }

    return matrix;
}

function performOperation(operation) {
    const A = getMatrixValues("A");
    const B = getMatrixValues("B");
    const size = A.length;

    if (!matrixA || !matrixB) {
        showMessage("Error: Matrices incompletas o inválidas.", true);
        return;
    }

    let result = [];

    switch (operation) {
        case "add":
            result = A.map((row, i) => row.map((val, j) => val + B[i][j]));
            break;
        case "subtract":
            result = A.map((row, i) => row.map((val, j) => val - B[i][j]));
            break;
        case "inverseSubtract":
            result = B.map((row, i) => row.map((val, j) => val - A[i][j]));
            break; 
        case "multiply":
            result = Array(size).fill().map(() => Array(size).fill(0));
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    for (let k = 0; k < size; k++) {
                        result[i][j] += A[i][k] * B[k][j];
                    }
                }
            }
            break;
    }

    displayResult(result);
}

function displayResult(matrix) {
    const resultContainer = document.getElementById("resultMatrix");
    resultContainer.innerHTML = "";
    const size = matrix.length;
    resultContainer.style.gridTemplateColumns = `repeat(${size}, 50px)`;

    matrix.flat().forEach(val => {
        const cell = document.createElement("div");
        cell.textContent = val;
        cell.style.width = "50px";
        cell.style.height = "40px";
        cell.style.display = "flex";
        cell.style.alignItems = "center";
        cell.style.justifyContent = "center";
        cell.style.border = "1px solid #ced4da";
        resultContainer.appendChild(cell);
    });
}