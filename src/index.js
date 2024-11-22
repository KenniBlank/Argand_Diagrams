const argandDiagrams = document.getElementsByClassName("ArgandDiagram");

for (const diagram of argandDiagrams) {
  const svg = diagram.querySelector(".ArgandDiagram > svg");
  const equationInputs = diagram.querySelectorAll("input[type='text']");

  const toggleMenu = diagram.querySelector("div#hideInputs");

  toggleMenu.addEventListener("click", () => {
    const equationInputsTemp = diagram.querySelectorAll(
      "div#AllInputs input[type='text'",
    );
    equationInputsTemp.forEach((input) => {
      input.style.display = input.style.display === "none" ? "block" : "none";
    });
  });

  // Set SVG dimensions
  svg.setAttribute("width", window.innerWidth / argandDiagrams.length);
  svg.setAttribute("height", window.innerHeight);

  const width = svg.getAttribute("width");
  const height = svg.getAttribute("height");
  const centerX = Math.floor(width / 2); // Center of SVG for x-axis
  const centerY = Math.floor(height / 2); // Center of SVG for y-axis
  const scale = 15; // 1 unit = 15 pixels

  const allInputs = diagram.querySelectorAll("#inputs input");

  function addInputEventListener(inputField) {
    function handleKeyPress(event) {
      if (event.key === "Enter") {
        // Create a new input field
        const newInputField = document.createElement("input");
        newInputField.type = "text";
        newInputField.placeholder = "(a, b)";
        newInputField.classList.add("equations");

        // Add the same event listener to the new input field
        addInputEventListener(newInputField);

        // Insert a <br> and the new input field after the current input
        const br = document.createElement("br");
        inputField.parentNode.insertBefore(br, inputField.nextSibling);
        inputField.parentNode.insertBefore(newInputField, br.nextSibling);
        newInputField.focus();

        // Remove the event listener
        inputField.removeEventListener("keypress", handleKeyPress);
      }
    }

    inputField.addEventListener("keypress", handleKeyPress);
    inputField.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        drawAxesAndGrid(svg, centerX, centerY);

        const equationInputsTemp = diagram.querySelectorAll(
          "div#AllInputs input[type='text']",
        );

        equationInputsTemp.forEach((inputFields) => {
          const equation = inputFields.value.trim();
          plotComplexNumber(equation, svg, centerX, centerY, scale);
        });
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

    // Catesian Center
    const point = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle",
    );
    point.setAttribute("cx", centerX);
    point.setAttribute("cy", centerY);
    point.setAttribute("r", 4);
    point.setAttribute("fill", "black");
    svg.appendChild(point);
    pointsOnThePlot(svg, centerX, centerY, 0, 0); // Center of the screen

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
      const line = createLine(x, 0, x, height, "#a0b0c0", 0.5);
      svg.appendChild(line);
    }

    // Horizontal grid lines
    for (let y = centerY % scale; y <= height; y += scale) {
      const line = createLine(0, y, width, y, "#a0b0c0", 0.5);
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
    let regexPattern = /\(\s*(-?\d*\.?\d+)\s*,\s*(-?\d*\.?\d+)\s*\)/;
    let match = equation.match(regexPattern);

    let real, imaginary;
    try {
      // Ensure match is not null or undefined before accessing it
      if (match && match.length > 2) {
        real = parseFloat(match[1]);
        imaginary = parseFloat(match[2]);
      } else {
        // Continue if match error
        return;
      }
    } catch (error) {
      console.error("Error parsing match values:", error);
    }

    // Convert to canvas coordinates
    const canvasX = centerX + real * scale;
    const canvasY = centerY - imaginary * scale;

    console.log(real, imaginary);
    pointsOnThePlot(svg, canvasX, canvasY, real, imaginary); // Draw the point's location on the plane

    // Draw the point
    const point = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle",
    );

    point.setAttribute("cx", canvasX);
    point.setAttribute("cy", canvasY);
    point.setAttribute("r", 3);
    point.setAttribute("fill", "blue");
    svg.appendChild(point);

    // Draw the line from origin to point
    const line = createLine(centerX, centerY, canvasX, canvasY, "black", 1.5);
    svg.appendChild(line);
  }

  function pointsOnThePlot(svg, X, Y, displayX, displayY) {
    // Create an SVG <text> element
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");

    // Set attributes for the text element
    text.setAttribute("x", X); // X position
    text.setAttribute("y", Y); // Y position
    text.setAttribute("font-style", "italic"); // Font style (italic)
    text.setAttribute("font-size", "21"); // Font size
    text.setAttribute("fill", "red"); // Text color
    text.textContent = `(${displayX}, ${displayY})`; // Initial text content

    // Initially hide the text
    text.style.display = "none";

    // Append the text element to the SVG container
    svg.appendChild(text);

    // Show/hide text based on mouse position
    svg.addEventListener("mousemove", function (event) {
      const rect = svg.getBoundingClientRect(); // Get the SVG's position
      const mouseX = event.clientX - rect.left; // Mouse X relative to SVG
      const mouseY = event.clientY - rect.top; // Mouse Y relative to SVG

      // Check if mouse is near (centerX, centerY) within a tolerance
      const tolerance = 5; // Tolerance distance
      if (
        Math.abs(mouseX - X) <= tolerance &&
        Math.abs(mouseY - Y) <= tolerance
      ) {
        // Update text content dynamically to show the mouse coordinates
        // text.textContent = `(${mouseX}, ${mouseY})`;

        // Center the text above the mouse cursor
        text.setAttribute("x", mouseX - text.getBBox().width / 2); // Center horizontally
        text.setAttribute("y", mouseY - 10); // 10px above the mouse

        text.style.display = "block"; // Show the text
      } else {
        text.style.display = "none"; // Hide the text
      }
    });
  }

  // Initial setup
  drawAxesAndGrid(svg, centerX, centerY);
}
