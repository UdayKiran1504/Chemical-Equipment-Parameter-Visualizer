export default function SummaryCards({ summary }) {
  if (!summary) return null;
  const a = summary.averages || {};

  return (
    <div className="summary-wrapper">

      <h3 className="summary-title">Summary</h3>

      <div className="summary-grid">

        <div className="summary-card summary-center">
          <b>Total Rows</b>
          <div>{summary.total_count}</div>
        </div>

        <div className="summary-card summary-center">
          <b>Avg Flowrate</b>
          <div>{a.Flowrate?.toFixed(2)}</div>
        </div>

        <div className="summary-card summary-center">
          <b>Avg Pressure</b>
          <div>{a.Pressure?.toFixed(2)}</div>
        </div>

        <div className="summary-card summary-center">
          <b>Avg Temperature</b>
          <div>{a.Temperature?.toFixed(2)}</div>
        </div>

      </div>
    </div>
  );
}
