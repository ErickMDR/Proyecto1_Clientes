document.addEventListener("DOMContentLoaded", () => {
    const matrixSizeSelect = document.getElementById("matrixSize");

    matrixSizeSelect.addEventListener("change", () => {
        createMatrixInputs("A");
        createMatrixInputs("B");
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