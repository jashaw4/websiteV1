function buildCurvePath(fn, xMin, xMax, samples, mapX, mapY, xOffset = 0, yOffset = 0) {
  const points = [];

  for (let i = 0; i <= samples; i += 1) {
    const t = i / samples;
    const x = xMin + (xMax - xMin) * t;
    const y = fn(x);

    if (Number.isFinite(y)) {
      points.push([mapX(x + xOffset), mapY(y + yOffset)]);
    }
  }

  return points
    .map(([x, y], index) => `${index === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(' ');
}

const curveDefinitions = [
  {
    //stroke: '#2f4e87',
    stroke: '#af0000',
    d: (mapX, mapY) =>
      buildCurvePath((x) => 0.05*(x + 10)**2 - 2, -100, 100, 200, mapX, mapY, 0, 0)
  },
  {
    //stroke: '#995634',
    stroke: '#005f00',
    d: (mapX, mapY) =>
      buildCurvePath((x) => 0.003*(x - 10)**3, -10, 100, 200, mapX, mapY, 0, 0)
  },
  {
    //stroke: '#7858a0',
    stroke: '#00009f',
    d: (mapX, mapY) =>
      buildCurvePath((x) => Math.atan(x * 0.25) * -3, -100, 100, 200, mapX, mapY, 0, 0)
  },
  {
    //stroke: '#ab7c2d',
    stroke: '#bfaf4f',
    d: (mapX, mapY) =>
      buildCurvePath((x) => Math.exp(-0.01 * x**2) * 12 - 6, -50, 50, 500, mapX, mapY, 0, 0)
  },
];

export function buildMathBackdrop() {
  const width = 3840;
  const height = 2160;
  const mapX = (x) => ((x + 24) / 48) * width;
  const mapY = (y) => height - ((y + 9) / 18) * height;

  const curves = curveDefinitions.map((curve) => ({
    d: curve.d(mapX, mapY),
    stroke: curve.stroke
  }));

  return encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <pattern id="grid" width="88" height="88" patternUnits="userSpaceOnUse">
          <path d="M 88 0 L 0 0 0 88" fill="none" stroke="rgba(1,0,87,0.1)" stroke-width="2"/>
          <path d="M 44 0 L 44 88 M 0 44 L 88 44" fill="none" stroke="rgba(1,0,87,0.1)" stroke-width="2"/>
        </pattern>
        <filter id="soften">
          <feGaussianBlur stdDeviation="0.18" />
        </filter>
      </defs>

      <rect width="3840" height="2160" fill="rgba(255,255,255,0.12)"/>
      <rect width="3840" height="2160" fill="url(#grid)"/>

      ${curves
        .map(
          (curve) => `
            <path
              d="${curve.d}"
              fill="none"
              stroke="${curve.stroke}"
              stroke-width="5"
              stroke-linecap="round"
              stroke-linejoin="round"
              filter="url(#soften)"
            />
          `
        )
        .join('')}
    </svg>
  `);
}
