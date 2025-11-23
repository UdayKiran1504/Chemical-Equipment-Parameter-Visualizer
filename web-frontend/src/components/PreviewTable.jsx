export default function PreviewTable({ columns = [], rows = [] }) {
  if (!columns.length || !rows.length) return null;

  return (
    <div className="preview-card">
      <h3 className="section-title">Data Preview (first 20 rows)</h3>

      <div className="table-wrapper">
        <table className="preview-table">
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <th key={idx}>{col}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <td key={colIndex}>{row[col]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
