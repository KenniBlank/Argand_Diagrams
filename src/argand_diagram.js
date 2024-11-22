class ComplexNumbers {
  constructor(complexNumbers) {
    this.module_version = "1.0.0";
    this.complexNumbers = complexNumbers.map((complexNumber) => {
      if (
        Array.isArray(complexNumber) &&
        complexNumber.length == 2 &&
        typeof complexNumber[0] == "number" &&
        typeof complexNumber[1] == "number"
      ) {
        return {
          real: complexNumber[0],
          imaginary: complexNumber[1],
        };
      } else {
        throw new Error(
          `Correct argument: [[real number, imaginary number], [real number, imaginary number], ...]
        Correct Use Example: ComplexNumbers([[1, 2], [2, 3]]);
        `,
        );
      }
    });
  }

  get AllPoints() {
    return this.complexNumbers.map((complexNumber) => [
      complexNumber.real,
      complexNumber.imaginary,
    ]);
  }

  // Method to append a new complex number
  appendComplexNumbers(newComplexNumbers) {
    if (!Array.isArray(newComplexNumbers)) {
      throw new Error("Input must be an array of complex numbers.");
    }

    newComplexNumbers.forEach((newComplexNumber) => {
      if (!Array.isArray(newComplexNumber) || newComplexNumber.length !== 2) {
        throw new Error("Each complex number must be an array of two numbers.");
      }

      if (
        typeof newComplexNumber[0] !== "number" ||
        typeof newComplexNumber[1] !== "number"
      ) {
        throw new Error("Both real and imaginary parts must be numbers.");
      }

      this.complexNumbers.push({
        real: newComplexNumber[0],
        imaginary: newComplexNumber[1],
      });
    });
  }

  // Method to calculate the absolute value
  absolute() {
    return this.complexNumbers.map((complexNumber) => {
      return Math.sqrt(complexNumber.real ** 2 + complexNumber.imaginary ** 2);
    });
  }

  // Getter to get the string representation
  get ComplexNumbersInStringFormat() {
    return this.complexNumbers
      .map((complexNumber) => {
        return `${complexNumber.real} + ${complexNumber.imaginary}i`;
      })
      .join(", ");
  }
}

class ArgandDiagram extends ComplexNumbers {
  constructor(arrayOfComplexNumbers) {
    super(arrayOfComplexNumbers);
  }

  draw() {
    const svg = document.getElementById("cartesian-plane");
    const width = svg.getAttribute("width");
    const height = svg.getAttribute("height");
    const originX = width / 2;
    const originY = height / 2;
    const step = 20; // Step size for grid lines

    // Draw axes
    const xAxis = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line",
    );
    xAxis.setAttribute("x1", 0);
    xAxis.setAttribute("y1", originY);
    xAxis.setAttribute("x2", width);
    xAxis.setAttribute("y2", originY);
    xAxis.setAttribute("stroke", "black");
    svg.appendChild(xAxis);

    const yAxis = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line",
    );
    yAxis.setAttribute("x1", originX);
    yAxis.setAttribute("y1", 0);
    yAxis.setAttribute("x2", originX);
    yAxis.setAttribute("y2", height);
    yAxis.setAttribute("stroke", "black");
    svg.appendChild(yAxis);

    // Draw grid lines
    for (let i = 0; i <= width; i += step) {
      const gridLine = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line",
      );
      gridLine.setAttribute("x1", i);
      gridLine.setAttribute("y1", 0);
      gridLine.setAttribute("x2", i);
      gridLine.setAttribute("y2", height);
      gridLine.setAttribute("stroke", "#e0e0e0");
      svg.appendChild(gridLine);
    }

    for (let i = 0; i <= height; i += step) {
      const gridLine = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line",
      );
      gridLine.setAttribute("x1", 0);
      gridLine.setAttribute("y1", i);
      gridLine.setAttribute("x2", width);
      gridLine.setAttribute("y2", i);
      gridLine.setAttribute("stroke", "#e0e0e0");
      svg.appendChild(gridLine);
    }

    // Optional: Add labels for axes
    const xLabel = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text",
    );
    xLabel.setAttribute("x", width - 10);
    xLabel.setAttribute("y", originY - 5);
    xLabel.textContent = "X";
    svg.appendChild(xLabel);

    const yLabel = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text",
    );
    yLabel.setAttribute("x", originX + 5);
    yLabel.setAttribute("y", 10);
    yLabel.textContent = "Y";
    svg.appendChild(yLabel);
  }
}
