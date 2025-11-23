import { useEffect, useState } from "react";
import "./styles.css";
import { api } from "./api";
import UploadPanel from "./components/UploadPanel";
import SummaryCards from "./components/SummaryCards";
import PreviewTable from "./components/PreviewTable";
import TypeBarChart from "./components/TypeBarChart";
import Login from "./Login";

export default function App() {

  // ------------------ LOGIN ------------------
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [client, setClient] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ------------------ DASHBOARD ------------------
  const [history, setHistory] = useState([]);
  const [active, setActive] = useState(null);

  // After login create API client
  useEffect(() => {
    if (isLoggedIn) {
      setClient(api(username, password));
    }
  }, [isLoggedIn]);

  // Load history after client loads
  useEffect(() => {
    if (client) refreshHistory();
  }, [client]);

  const refreshHistory = async () => {
    try {
      const h = await client.history();
      setHistory(h);
    } catch (e) {
      console.log("History error:", e);
    }
  };

  const selectDataset = async (id) => {
    try {
      const s = await client.summary(id);
      setActive({
        id,
        summary: s.summary,
        columns: s.columns,
        rows: s.preview_rows
      });
    } catch (err) {
      console.log("Summary load failed:", err);
    }
  };

  const onUpload = async (file) => {
    try {
      const res = await client.upload(file);
      setActive({
        id: res.id,
        summary: res.summary,
        columns: res.columns,
        rows: res.preview_rows
      });
      refreshHistory();
    } catch (err) {
      alert("Upload failed. Check file format.");
    }
  };

  const reportUrl = active ? client?.reportUrl(active.id) : "#";

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActive(null);
    setHistory([]);
    setUsername("");
    setPassword("");
  };

  // ------------------ SHOW LOGIN FIRST ------------------
  if (!isLoggedIn) {
    return (
      <>
        <Login
          onLogin={(u, p) => {
            setUsername(u);
            setPassword(p);
            setIsLoggedIn(true);
          }}
        />
        <footer className="footer">© 2025 Chemical Equipment Visualizer</footer>
      </>
    );
  }

  // ------------------ MAIN DASHBOARD ------------------
  return (
    <>
      <div className="page-bg">

        <div className="top-header">
          <h1>Chemical Equipment Parameter Visualizer</h1>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>

        <div className="data-icons">
          <div className="icon-bubble"><span>🔧</span><p>Type</p></div>
          <div className="icon-bubble"><span>💧</span><p>Flowrate</p></div>
          <div className="icon-bubble"><span>🧱</span><p>Pressure</p></div>
          <div className="icon-bubble"><span>🌡️</span><p>Temperature</p></div>
        </div>

        <div className="layout">

          <div className="left-body">
            <div className="glass left-block">
              <UploadPanel onUpload={onUpload} />
              {!active && <p className="empty-msg">No dataset loaded. Upload a CSV to begin.</p>}
            </div>

            {active && (
              <>
                <div className="glass left-block">
                  <SummaryCards summary={active.summary} />
                </div>

                <div className="dual-panels">

                  <div className="glass dual-item">
                    <TypeBarChart summary={active.summary} />
                  </div>

                  <div className="glass dual-item">
                    <PreviewTable columns={active.columns} rows={active.rows} />
                  </div>

                </div>

                <div className="glass left-block center">
                  <a className="download-btn" href={reportUrl} target="_blank">
                    Download PDF Report
                  </a>
                </div>
              </>
            )}
          </div>

          <div className="right-box glass">
            <h2>Recent uploads</h2>
            <ul className="history-list">
              {history.slice(0, 5).map((h) => (
                <li key={h.id}>
                  <button className="history-item" onClick={() => selectDataset(h.id)}>
                    #{h.id} — {h.original_filename}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <footer className="footer">© 2025 Chemical Equipment Visualizer</footer>
    </>
  );
}
