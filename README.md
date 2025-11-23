# Chemical-Equipment-Parameter-Visualizer
Hybrid app (React web + PyQt5 desktop) with a Django REST backend that parses CSVs of chemical equipment, returns summary stats, stores the last 5 uploads, and shows visualizations (Chart.js on web, Matplotlib on desktop).
## 📂 Project Structure

```txt
chemical-equipment-visualizer/
│
├── backend/               # Django backend (API + PDF + history)
│   ├── api/
│   ├── config/
│   ├── media/
│   ├── manage.py
│   └── requirements.txt
│
├── desktop-app/           # PyQt5 desktop application
│   ├── venv/
│   ├── main.py
│   └── requirements.txt
│
├── fontened/              # React web app (your folder name)
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── Login.jsx
│   │   ├── main.jsx
│   │   ├── styles.css
│   │   ├── App.css
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
└── README.md 
##Features
CSV Upload: Upload equipment data via both web and desktop interfaces
Data Analysis: Automatic calculation of averages and type distribution
Visualization: Interactive charts (Chart.js for web, Matplotlib for desktop)
History Management: Stores last 5 uploaded datasets
PDF Reports: Generate downloadable PDF reports using ReportLab
Authentication: Basic authentication for API security
