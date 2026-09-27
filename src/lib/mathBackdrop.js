function buildCurvePath(fn, mapX, mapY, width, height, reverse = false) {
  const xMin = -24;
  const xMax = 24;
  const collectSegments = (sampleCount) => {
    const segments = [[]];

    for (let i = 0; i <= sampleCount; i += 1) {
      const t = reverse ? 1 - i / sampleCount : i / sampleCount;
      const x = xMin + (xMax - xMin) * t;
      const screenX = mapX(x);
      const screenY = mapY(fn(x));

      if (
        Number.isFinite(screenX) &&
        Number.isFinite(screenY) &&
        screenX >= 0 &&
        screenX <= width &&
        screenY >= 0 &&
        screenY <= height
      ) {
        segments.at(-1).push([screenX, screenY]);
      } else if (segments.at(-1).length > 0) {
        segments.push([]);
      }
    }

    return segments.filter((segment) => segment.length > 0);
  };

  const estimate = collectSegments(2000);
  const visibleLength = estimate.reduce(
    (total, segment) =>
      total + segment.slice(1).reduce((length, [x, y], index) => {
        const [previousX, previousY] = segment[index];
        return length + Math.hypot(x - previousX, y - previousY);
      }, 0),
    0
  );
  const sampleCount = Math.max(40, Math.min(12000, Math.ceil(visibleLength / 3)));
  const segments = collectSegments(sampleCount);

  const d = segments
    .map((segment) =>
      segment
        .map(([x, y], index) => `${index === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`)
        .join(' ')
    )
    .join(' ');

  return { d, length: visibleLength };
}

function buildCoordinateGrid(mapX, mapY) {
  const verticalLines = [];
  const horizontalLines = [];

  for (let x = -24; x <= 24; x += 1) {
    const screenX = mapX(x).toFixed(1);
    const isAxis = x === 0;
    verticalLines.push(
      `<path d="M ${screenX} 0 V 2160" stroke="${isAxis ? 'rgba(1,0,87,0.24)' : 'rgba(1,0,87,0.1)'}" stroke-width="${isAxis ? 3 : 2}"/>`
    );
  }

  for (let y = -13; y <= 13; y += 1) {
    const screenY = mapY(y).toFixed(1);
    const isAxis = y === 0;
    horizontalLines.push(
      `<path d="M 0 ${screenY} H 3840" stroke="${isAxis ? 'rgba(1,0,87,0.24)' : 'rgba(1,0,87,0.1)'}" stroke-width="${isAxis ? 3 : 2}"/>`
    );
  }

  return [...verticalLines, ...horizontalLines].join('');
}

const curveDefinitions = [
  {
    //stroke: '#2f4e87',
    stroke: '#af0000',
    d: (mapX, mapY, width, height, reverse) =>
      buildCurvePath((x) => 0.05*(x + 10)**2 - 2, mapX, mapY, width, height, reverse)
  },
  {
    //stroke: '#995634',
    stroke: '#005f00',
    reverse: true,
    d: (mapX, mapY, width, height, reverse) =>
      buildCurvePath((x) => 0.003*(x - 10)**3, mapX, mapY, width, height, reverse)
  },
  {
    //stroke: '#7858a0',
    stroke: '#00009f',
    reverse: true,
    d: (mapX, mapY, width, height, reverse) =>
      buildCurvePath((x) => (x-24)*(x+24)*x/500, mapX, mapY, width, height, reverse)
  },
  {
    //stroke: '#ab7c2d',
    stroke: '#bfaf4f',
    d: (mapX, mapY, width, height, reverse) =>
      buildCurvePath((x) => Math.exp(-0.01 * x**2) * 12 - 6, mapX, mapY, width, height, reverse)
  },
];

export function buildMathBackdrop() {
  const width = 3840;
  const height = 2160;
  const unitsToPixels = width / 48;
  const mapX = (x) => ((x + 24) / 48) * width;
  const mapY = (y) => height / 2 - y * unitsToPixels;
  const coordinateGrid = buildCoordinateGrid(mapX, mapY);

  const curves = curveDefinitions.map((curve) => {
    const path = curve.d(mapX, mapY, width, height, curve.reverse);

    return {
      d: path.d,
      length: path.length,
      stroke: curve.stroke
    };
  });

  return encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid slice">
      <defs>
        <clipPath id="plot-area">
          <rect x="3" y="3" width="3834" height="2154" />
        </clipPath>
      </defs>

      <rect width="3840" height="2160" fill="rgba(255,255,255,0.12)"/>
      <g>
        ${coordinateGrid}
      </g>

      ${curves
        .map(
          (curve, index) => `
            <path
              d="${curve.d}"
              fill="none"
              stroke="${curve.stroke}"
              stroke-width="5"
              stroke-linecap="round"
              stroke-linejoin="round"
              clip-path="url(#plot-area)"
              pathLength="1"
              stroke-dasharray="1"
              stroke-dashoffset="1"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="1"
                to="0"
                dur="${Math.max(0.8, curve.length / 2000).toFixed(2)}s"
                begin="indefinite"
                fill="freeze"
              />
            </path>
          `
        )
        .join('')}
    </svg>
  `);
}

export function startMathBackdrop(root) {
  const animations = [...(root?.querySelectorAll('animate') ?? [])];
  const durations = animations.map((animation) => parseFloat(animation.getAttribute('dur')));
  const finishTime = Math.max(...durations);

  animations.forEach((animation, index) => {
    const delay = (finishTime - durations[index]) * 1000;
    window.setTimeout(() => animation.beginElement(), delay);
  });
}
