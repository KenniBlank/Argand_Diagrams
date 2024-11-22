const argandDiagrams = document.getElementsByClassName("ArgandDiagram");

for (const diagram of argandDiagrams) {
  const svg = diagram.querySelector("svg");
  const equationInputs = diagram.querySelectorAll("input[type='text']");

  // Set SVG dimensions
  svg.setAttribute("width", window.innerWidth / argandDiagrams.length);
  svg.setAttribute("height", window.innerHeight);

  const width = svg.getAttribute("width");
  const height = svg.getAttribute("height");
  const centerX = Math.floor(width / 2); // Center of SVG for x-axis
  const centerY = Math.floor(height / 2); // Center of SVG for y-axis
  const scale = 12; // 1 unit = 15 pixels

  function addInputEventListener(inputField) {
    inputField.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        const equation = inputField.value.trim();
        plotComplexNumber(equation, svg, centerX, centerY, scale);

        // Create a new input field
        const newInputField = document.createElement("input");
        newInputField.type = "text";
        newInputField.placeholder = "Z = a + ib";
        newInputField.classList.add("equations");

        // Add the same event listener to the new input field
        addInputEventListener(newInputField);

        // Insert a <br> and the new input field after the current input
        const br = document.createElement("br");
        inputField.parentNode.insertBefore(br, inputField.nextSibling);
        inputField.parentNode.insertBefore(newInputField, br.nextSibling);
      }
    });
  }

  // Attach event listener to all initial input fields
  equationInputs.forEach((inputField) => {
    addInputEventListener(inputField);
  });

  // Draw axes and grid
  function drawAxesAndGrid(svg, centerX, centerY) {
    // Clear SVG
    svg.innerHTML = "";

    // Draw grid
    drawGrid(svg, centerX, centerY, scale);

    // Draw axes
    const xAxis = createLine(0, centerY, width, centerY, "black", 1.5);
    svg.appendChild(xAxis);

    const yAxis = createLine(centerX, 0, centerX, height, "black", 1.5);
    svg.appendChild(yAxis);
  }

  function drawGrid(svg, centerX, centerY, scale) {
    // Vertical grid lines
    for (let x = centerX % scale; x <= width; x += scale) {
      const line = createLine(x, 0, x, height, "#ddd", 0.5);
      svg.appendChild(line);
    }

    // Horizontal grid lines
    for (let y = centerY % scale; y <= height; y += scale) {
      const line = createLine(0, y, width, y, "#ddd", 0.5);
      svg.appendChild(line);
    }
  }

  function createLine(x1, y1, x2, y2, color, strokeWidth) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", color);
    line.setAttribute("stroke-width", strokeWidth);
    return line;
  }

  // Plot a complex number
  function plotComplexNumber(equation, svg, centerX, centerY, scale) {
    // Parse the complex number
    let match = equation.match(/Z\s*=\s*([\d.-]+)\s*\+\s*\s*([\d.-]+i)/);

    if (!match)
      throw new Error("Invalid format. Use Z = a + ib or Z = (a, b).");

    const [real, imaginary] = [parseFloat(match[1]), parseFloat(match[2])];

    // Convert to canvas coordinates
    const canvasX = centerX + real * scale;
    const canvasY = centerY - imaginary * scale;

    // Draw the point
    const point = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle",
    );

    point.setAttribute("cx", canvasX);
    point.setAttribute("cy", canvasY);
    point.setAttribute("r", 2);
    point.setAttribute("fill", "blue");
    svg.appendChild(point);

    // Draw the line from origin to point
    // const line = createLine(centerX, centerY, canvasX, canvasY, "blue", 1.5);
    // svg.appendChild(line);
  }

  // Initial setup
  drawAxesAndGrid(svg, centerX, centerY);
}
