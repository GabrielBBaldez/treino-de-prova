import styles from './ProgressChart.module.css';

interface DataPoint {
  label: string;
  value: number;
}

interface ProgressChartProps {
  data: DataPoint[];
  height?: number;
}

export function ProgressChart({ data, height = 200 }: ProgressChartProps) {
  if (data.length === 0) return null;

  const padding = { top: 20, right: 20, bottom: 30, left: 40 };
  const width = 600;
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const minVal = 0;
  const maxVal = 100;

  const getX = (i: number) =>
    padding.left + (data.length === 1 ? chartW / 2 : (i / (data.length - 1)) * chartW);

  const getY = (val: number) =>
    padding.top + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;

  // Build polyline points
  const points = data.map((d, i) => `${getX(i)},${getY(d.value)}`).join(' ');

  // Build area polygon
  const areaPoints = [
    `${getX(0)},${getY(0)}`,
    ...data.map((d, i) => `${getX(i)},${getY(d.value)}`),
    `${getX(data.length - 1)},${getY(0)}`,
  ].join(' ');

  // Grid lines at 25%, 50%, 75%, 100%
  const gridLines = [0, 25, 50, 75, 100];

  return (
    <div className={styles.container}>
      <svg viewBox={`0 0 ${width} ${height}`} className={styles.svg} preserveAspectRatio="xMidYMid meet">
        {/* Grid lines */}
        {gridLines.map((val) => (
          <g key={val}>
            <line
              x1={padding.left}
              y1={getY(val)}
              x2={width - padding.right}
              y2={getY(val)}
              className={styles.gridLine}
            />
            <text
              x={padding.left - 8}
              y={getY(val) + 4}
              className={styles.axisLabel}
              textAnchor="end"
            >
              {val}%
            </text>
          </g>
        ))}

        {/* Area fill */}
        <polygon points={areaPoints} className={styles.area} />

        {/* Line */}
        <polyline points={points} className={styles.line} fill="none" />

        {/* Data points */}
        {data.map((d, i) => (
          <g key={i}>
            <circle cx={getX(i)} cy={getY(d.value)} r={5} className={styles.dot} />
            <text
              x={getX(i)}
              y={getY(d.value) - 12}
              className={styles.dotLabel}
              textAnchor="middle"
            >
              {d.value}%
            </text>
            {data.length <= 12 && (
              <text
                x={getX(i)}
                y={height - 6}
                className={styles.xLabel}
                textAnchor="middle"
              >
                {d.label}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
