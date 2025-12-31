
const algListDiv = document.getElementById("algList");
const methodSelect = document.getElementById("methodSelect");
const randomBtn = document.getElementById("randomBtn");
let algsData = {};

async function loadAlgs() {
  const response = await fetch("algs.json");
  algsData = await response.json();
  populateMethods();
  showAlgorithms();
}

function populateMethods() {
  for (const key in algsData) {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = `${key} (${algsData[key].length})`;
    methodSelect.appendChild(option);
  }
}

function showAlgorithms() {
  const method = methodSelect.value;
  algListDiv.innerHTML = "";
  const items = method === "all" ? Object.values(algsData).flat() : algsData[method] || [];
  items.forEach(item => {
    const div = document.createElement("div");
    div.className = "algItem";

    const img = document.createElement("img");
    img.className = "alg-image";
    img.src = generateCaseImage(item.grid);

    div.innerHTML = `<span class="case-name">${item.case}</span><span class="alg-code">${item.alg}</span>`;
    div.appendChild(img);
    algListDiv.appendChild(div);
  });
}

function generateCaseImage(grid) {
  const canvas = document.createElement("canvas");
  const size = 150;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, size, size);

  const rows = grid.length;
  const cols = grid[0].length;
  const cellSize = size / cols;

  const colorMap = {
    "W": "#ffffff",
    "Y": "#ffff00",
    "R": "#ff0000",
    "O": "#ff6600",
    "B": "#0000ff",
    "G": "#00ff00"
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      ctx.fillStyle = colorMap[grid[r][c]] || "#000";
      ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
      ctx.strokeStyle = "#000";
      ctx.strokeRect(c * cellSize, r * cellSize, cellSize, cellSize);
    }
  }

  return canvas.toDataURL();
}

function showRandom() {
  const items = methodSelect.value === "all" ? Object.values(algsData).flat() : algsData[methodSelect.value] || [];
  if (items.length === 0) return;
  const rand = items[Math.floor(Math.random() * items.length)];
  alert(`Random Case Practice:\n\n${rand.case}\nAlgorithm: ${rand.alg}`);
}

methodSelect.addEventListener("change", showAlgorithms);
randomBtn.addEventListener("click", showRandom);

loadAlgs();
