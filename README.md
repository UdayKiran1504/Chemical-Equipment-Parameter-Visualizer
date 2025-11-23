# Chemical-Equipment-Parameter-Visualizer
Hybrid app (React web + PyQt5 desktop) with a Django REST backend that parses CSVs of chemical equipment, returns summary stats, stores the last 5 uploads, and shows visualizations (Chart.js on web, Matplotlib on desktop).
#Project Structure
'''txt
chemical-equipment-visualizer/
├── backend/                    # Django REST API
│   ├── chemical_api/          # Django project
│   ├── equipment/             # Main app
│   ├── manage.py
│   └── requirements.txt
├── web-frontend/              # React + Chart.js
│   ├── src/
│   ├── public/
│   └── package.json
├── desktop-frontend/          # PyQt5 + Matplotlib
│   ├── main.py
│   └── requirements.txt
└── README.md
