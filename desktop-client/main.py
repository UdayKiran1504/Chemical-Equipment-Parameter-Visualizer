import sys
import requests
import pandas as pd
from PyQt5 import QtWidgets, QtCore
from PyQt5.QtWidgets import (
    QApplication, QWidget, QVBoxLayout, QHBoxLayout, QPushButton,
    QLabel, QFileDialog, QTableWidget, QTableWidgetItem, QListWidget
)
from matplotlib.backends.backend_qt5agg import FigureCanvasQTAgg as FigureCanvas
from matplotlib.figure import Figure


API_BASE = "http://127.0.0.1:8000/api"


class ChartCanvas(FigureCanvas):
    def __init__(self, parent=None):
        self.fig = Figure()
        super().__init__(self.fig)
        self.axes = self.fig.add_subplot(111)

    def plot_bar(self, labels, values):
        self.axes.clear()
        self.axes.bar(labels, values)
        self.axes.set_title("Equipment Type Distribution")
        self.axes.set_xlabel("Type")
        self.axes.set_ylabel("Count")
        self.fig.tight_layout()
        self.draw()


class App(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Chemical Equipment Visualizer (Desktop)")
        self.resize(1100, 700)

        self.build_ui()
        self.load_history()

    def build_ui(self):
        layout = QVBoxLayout(self)

        # Controls row
        controls = QHBoxLayout()

        self.upload_btn = QPushButton("Upload CSV")
        self.upload_btn.clicked.connect(self.upload_csv)
        self.report_btn = QPushButton("Download PDF Report")
        self.report_btn.clicked.connect(self.download_report)

        controls.addWidget(self.upload_btn)
        controls.addWidget(self.report_btn)
        layout.addLayout(controls)

        # Middle section layout
        mid = QHBoxLayout()

        # Left side (summary, chart, table)
        left = QVBoxLayout()

        self.summary_label = QLabel("Summary: (upload or select from history)")
        left.addWidget(self.summary_label)

        self.chart = ChartCanvas(self)
        left.addWidget(self.chart, stretch=2)

        self.table = QTableWidget()
        left.addWidget(self.table, stretch=3)

        # Right side (history)
        right = QVBoxLayout()
        right.addWidget(QLabel("History (last 5)"))
        self.history_list = QListWidget()
        self.history_list.itemClicked.connect(self.select_history_item)
        right.addWidget(self.history_list)

        mid.addLayout(left, stretch=3)
        mid.addLayout(right, stretch=1)
        layout.addLayout(mid)

        self.active_id = None
        self.columns = []
        self.rows = []

    # --- API functions (no auth needed) ---
    def api_get(self, path):
        r = requests.get(API_BASE + path)
        r.raise_for_status()
        return r.json()

    def api_post_file(self, path, file_path):
        with open(file_path, "rb") as f:
            files = {"file": (file_path.split("/")[-1], f, "text/csv")}
            r = requests.post(API_BASE + path, files=files)
        r.raise_for_status()
        return r.json()

    # --- UI Actions ---
    def load_history(self):
        try:
            items = self.api_get("/history/")
        except Exception as e:
            QtWidgets.QMessageBox.critical(self, "Error", str(e))
            return

        self.history_list.clear()
        for it in items:
            self.history_list.addItem(f'#{it["id"]} — {it["original_filename"]}')

        if items:
            self.load_summary(items[0]["id"])

    def select_history_item(self, item):
        id_str = item.text().split("—")[0].replace("#", "").strip()
        self.load_summary(int(id_str))

    def load_summary(self, dataset_id):
        try:
            res = self.api_get(f"/summary/{dataset_id}/")
        except Exception as e:
            QtWidgets.QMessageBox.critical(self, "Error", str(e))
            return

        self.active_id = res["id"]
        self.columns = res["columns"]
        self.rows = res["preview_rows"]

        s = res["summary"]
        avg = s["averages"]

        self.summary_label.setText(
            f"Summary — Rows: {s['total_count']}, "
            f"Avg Flowrate: {avg['Flowrate']:.2f}, "
            f"Avg Pressure: {avg['Pressure']:.2f}, "
            f"Avg Temperature: {avg['Temperature']:.2f}"
        )

        labels = [d["type"] for d in s["type_distribution"]]
        values = [d["count"] for d in s["type_distribution"]]
        self.chart.plot_bar(labels, values)

        self.table.clear()
        self.table.setColumnCount(len(self.columns))
        self.table.setRowCount(len(self.rows))
        self.table.setHorizontalHeaderLabels(self.columns)

        for r_idx, row in enumerate(self.rows):
            for c_idx, col in enumerate(self.columns):
                self.table.setItem(r_idx, c_idx, QTableWidgetItem(str(row.get(col, ""))))

        self.table.resizeColumnsToContents()

    def upload_csv(self):
        file_path, _ = QFileDialog.getOpenFileName(self, "Choose CSV", filter="CSV Files (*.csv)")
        if not file_path:
            return

        try:
            res = self.api_post_file("/upload/", file_path)
        except Exception as e:
            QtWidgets.QMessageBox.critical(self, "Upload Error", str(e))
            return

        self.load_history()
        self.load_summary(res["id"])

    def download_report(self):
        if not self.active_id:
            QtWidgets.QMessageBox.information(self, "Info", "No dataset selected.")
            return

        save_path, _ = QFileDialog.getSaveFileName(self, "Save Report", f"dataset_{self.active_id}_report.pdf", "PDF (*.pdf)")
        if not save_path:
            return

        url = f"{API_BASE}/report/{self.active_id}/"
        try:
            r = requests.get(url, stream=True)
            r.raise_for_status()
            with open(save_path, "wb") as f:
                for chunk in r.iter_content(chunk_size=8192):
                    f.write(chunk)
            QtWidgets.QMessageBox.information(self, "Saved", f"Report saved to:\n{save_path}")
        except Exception as e:
            QtWidgets.QMessageBox.critical(self, "Error", str(e))


if __name__ == "__main__":
    app = QApplication(sys.argv)
    win = App()
    win.show()
    sys.exit(app.exec_())
