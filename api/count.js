const PLACES = 6;

let counter = 0;

function getCountImage(count) {
  // This is not the greatest way for generating an SVG but it'll do for now
  const countArray = count.toString().padStart(PLACES, "0").split("");

  const parts = countArray.reduce(
    (acc, next, index) => `
          ${acc}
          <rect id="Rectangle" fill="midnightblue" x="${
            index * 32
          }" y="0.5" width="29" height="29"></rect>
          <text id="0" font-family="Courier" font-size="24" font-weight="bold" fill="fuchsia">
              <tspan x="${index * 32 + 7}" y="22">${next}</tspan>
          </text>
  `,
    ""
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
  <svg width="${
    PLACES * 32
  }px" height="30px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <title>Count</title>
      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        ${parts}
      </g>
  </svg>
  `;
}

module.exports = (req, res) => {
  counter++;

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader(
    "Cache-Control",
    "max-age=0, no-cache, no-store, must-revalidate"
  );

  // Send the generated SVG as the result
  res.status(200).send(getCountImage(counter));
};
