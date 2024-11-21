export class ComplexNumber {
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
          "Correct argument: [[real, imaginery], [real, imaginery], ...]",
        );
      }
    });
  }

  // Method to get the string representation
  get toString() {
    return this.complexNumbers
      .map((complexNumber) => {
        return `${complexNumber.real} ${complexNumber.imaginary >= 0 ? "+" : "-"} ${Math.abs(complexNumber.imaginary)}i`;
      })
      .join(", ");
  }

  // Method to append a new complex number
  append(newComplexNumbers) {
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
}
