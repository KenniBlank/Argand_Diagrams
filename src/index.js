const svg = document.getElementById("svg");
const equationInput = document.getElementById("equation");
const plot = document.getElementById("plot");

// Set SVG dimensions
svg.setAttribute("width", window.innerWidth);
svg.setAttribute("height", window.innerHeight);

const width = window.innerWidth;
const height = window.innerHeight;
const centerX = Math.floor(width / 2); // Center of SVG for x-axis
const centerY = Math.floor(height / 2); // Center of SVG for y-axis
const scale = 15; // 1 unit = 30 pixels

plot.addEventListener("click", () => {
  const equation = equationInput.value.trim();
  plotEquation(equation);
});

// Draw axes and grid
function drawAxesAndGrid() {
  // Clear SVG
  svg.innerHTML = "";

  // Draw grid
  drawGrid();

  // Draw axes
  const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
  xAxis.setAttribute("x1", 0);
  xAxis.setAttribute("y1", centerY);
  xAxis.setAttribute("x2", width);
  xAxis.setAttribute("y2", centerY);
  xAxis.setAttribute("stroke", "black");
  xAxis.setAttribute("stroke-width", 1.5);
  svg.appendChild(xAxis);

  const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
  yAxis.setAttribute("x1", centerX);
  yAxis.setAttribute("y1", 0);
  yAxis.setAttribute("x2", centerX);
  yAxis.setAttribute("y2", height);
  yAxis.setAttribute("stroke", "black");
  yAxis.setAttribute("stroke-width", 1.5);
  svg.appendChild(yAxis);
}

function drawGrid() {
  // Vertical grid lines
  for (let x = centerX % scale; x <= width; x += scale) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x);
    line.setAttribute("y1", 0);
    line.setAttribute("x2", x);
    line.setAttribute("y2", height);
    line.setAttribute("stroke", "#ddd");
    line.setAttribute("stroke-width", 0.5);
    svg.appendChild(line);
  }

  // Horizontal grid lines
  for (let y = centerY % scale; y <= height; y += scale) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", 0);
    line.setAttribute("y1", y);
    line.setAttribute("x2", width);
    line.setAttribute("y2", y);
    line.setAttribute("stroke", "#ddd");
    line.setAttribute("stroke-width", 0.5);
    svg.appendChild(line);
  }
}

// Plot equation
function plotEquation(equation) {
  try {
    const parsedEquation = math.compile(equation); // Parse equation
    drawAxesAndGrid();

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("stroke", "blue");
    path.setAttribute("stroke-width", 2);
    path.setAttribute("fill", "none");

    let pathData = "";

    for (let pixelX = 0; pixelX <= width; pixelX++) {
      const x = (pixelX - centerX) / scale; // Convert canvas x to math x
      const y = parsedEquation.evaluate({ x }); // Evaluate equation

      if (isNaN(y) || !isFinite(y)) continue; // Skip invalid points

      const canvasX = pixelX;
      const canvasY = centerY - y * scale; // Convert math y to canvas y

      if (pixelX === 0) {
        pathData += `M ${canvasX} ${canvasY}`;
      } else {
        pathData += ` L ${canvasX} ${canvasY}`;
      }
    }

    path.setAttribute("d", pathData);
    svg.appendChild(path);
  } catch (error) {
    alert(
      "Error plotting the equation. Ensure it's valid and uses 'x' as the variable.",
    );
  }
}

// Initial setup
drawAxesAndGrid();
