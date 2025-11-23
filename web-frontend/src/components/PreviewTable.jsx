export default function PreviewTable({ columns, rows }) {
  if (!columns?.length || !rows?.length) return null;
  return (
    <div className="card">
      <h3>Data Preview (first 20 rows)</h3>

      {/* FIX: make width expand to full 50% panel */}
      <div style={{ overflowX: "auto", width: "100%" }}>
        <table className="table">
          <thead>
            <tr>{columns.map(c => <th key={c}>{c}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((r, i) =>
              <tr key={i}>
                {columns.map(c => <td key={c}>{r[c]}</td>)}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
