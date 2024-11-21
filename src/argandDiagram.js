import { ComplexNumber } from "./constructors.js";
import { greet, magnitude } from "./functions.js";

const Argand_Diagram = {
  version: "1.0.0",
  greet,
  magnitude,
  ComplexNumber,
};

console.log("Welcome to the Argand Diagram module!\n");

// Export the object
export default Argand_Diagram;
