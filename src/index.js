const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const equationInput = document.getElementById("equation");
const plot = document.getElementById("plot");

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const width = canvas.width;
const height = canvas.height;
const centerX = Math.floor(width / 2); // Center of canvas for x-axis
const centerY = Math.floor(height / 2); // Center of canvas for y-axis
const scale = 15; // 1 unit = 30 pixels

plot.addEventListener("click", () => {
  const equation = equationInput.value.trim();
  plotEquation(equation);
});

// Draw axes and grid
function drawAxesAndGrid() {
  ctx.clearRect(0, 0, width, height);
  drawGrid();
  ctx.beginPath();

  // X-axis
  ctx.moveTo(0, centerY);
  ctx.lineTo(width, centerY);

  // Y-axis
  ctx.moveTo(centerX, 0);
  ctx.lineTo(centerX, height);

  ctx.strokeStyle = "black";
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

function drawGrid() {
  ctx.strokeStyle = "#ddd";
  ctx.lineWidth = 0.5;

  // Vertical grid lines
  for (let x = centerX % scale; x <= width; x += scale) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // Horizontal grid lines
  for (let y = centerY % scale; y <= height; y += scale) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}

// Plot equation
function plotEquation(equation) {
  try {
    const parsedEquation = math.compile(equation); // Parse equation
    drawAxesAndGrid();
    ctx.beginPath();

    for (let pixelX = 0; pixelX <= width; pixelX++) {
      const x = (pixelX - centerX) / scale; // Convert canvas x to math x
      const y = parsedEquation.evaluate({ x }); // Evaluate equation

      if (isNaN(y) || !isFinite(y)) continue; // Skip invalid points

      const canvasX = pixelX;
      const canvasY = centerY - y * scale; // Convert math y to canvas y

      if (pixelX === 0) {
        ctx.moveTo(canvasX, canvasY);
      } else {
        ctx.lineTo(canvasX, canvasY);
      }
    }

    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.stroke();
  } catch (error) {
    alert(
      "Error plotting the equation. Ensure it's valid and uses 'x' as the variable.",
    );
  }
}

// Initial setup
drawAxesAndGrid();
