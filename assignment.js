const fs = require("fs");

function decodeYValue(base, number) {
  return parseInt(number, base);
}

function calculateSecretC(points) {
  let constantTerm = 0;
  const k = points.length;

  for (let i = 0; i < k; i++) {
    let term = points[i].y;
    for (let j = 0; j < k; j++) {
      if (i !== j) {
        term *= -points[j].x / (points[i].x - points[j].x);
      }
    }
    constantTerm += term;
  }

  return constantTerm;
}

function mainFunc() {
  const data = fs.readFileSync("input.json", "utf8");
  const inputJson = JSON.parse(data);
  for (let i = 0; i < inputJson.length; i++) {
    const inJson = inputJson[i];
    const k = inJson.keys.k;

    const pairs = [];

    for (const key in inJson) {
      if (key === "keys") continue;

      const x = parseInt(key);
      const base = parseInt(inJson[key].base);
      const number = inJson[key].value;
      const y = decodeYValue(base, number);
      pairs.push({ x, y });
      if (pairs.length === k) break;
    }
    const secret = calculateSecretC(pairs);
    console.log(secret);
  }
}

mainFunc();
