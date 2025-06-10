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