// Constructor for a Complex Number
export class ComplexNumber {
  constructor(real, imaginary) {
    this.real = real;
    this.imaginary = imaginary;
  }

  // Getter for the string representation of the complex number
  get toString() {
    return `${this.real} + ${this.imaginary}i`; // Backticks for template literals
  }
}
