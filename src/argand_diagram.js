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

  draw() {}
}
