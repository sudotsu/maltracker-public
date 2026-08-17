export function FigureBlock({
  value,
  label,
  sub,
}: {
  value: string;
  label: string;
  sub?: string;
}) {
  return (
    <div className="figure">
      <strong className="figure-value">{value}</strong>
      <span className="figure-label">{label}</span>
      {sub ? <small className="figure-sub">{sub}</small> : null}
    </div>
  );
}
