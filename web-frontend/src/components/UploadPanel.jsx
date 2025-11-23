import { useState } from "react";

export default function UploadPanel({ onUpload }) {
  const [file, setFile] = useState(null);

  const handleSelect = (e) => {
    const selected = e.target.files[0];
    setFile(selected);    // store file ONLY
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please choose a CSV file first.");
      return;
    }
    onUpload(file);       // upload only when clicking button
  };

  return (
    <div>
      <h2>Upload your dataset</h2>
      <p className="hint">
        Expected columns: Equipment Name, Type, Flowrate, Pressure, Temperature
      </p>

      <div className="upload-box">
        <input
          type="file"
          accept=".csv"
          className="file-input"
          onChange={handleSelect}
        />

        <button className="upload-btn" onClick={handleUpload}>
          Upload
        </button>
      </div>
    </div>
  );
}
