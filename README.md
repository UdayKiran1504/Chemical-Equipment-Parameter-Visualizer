# Chemical-Equipment-Parameter-Visualizer
A hybrid full-stack application with one shared Django backend and two frontends (React Web + PyQt5 Desktop) for visualizing chemical equipment data.
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
Features

CSV Upload: Upload equipment data via both web and desktop interfaces
Data Analysis: Automatic calculation of averages and type distribution
Visualization: Interactive charts (Chart.js for web, Matplotlib for desktop)
History Management: Stores last 5 uploaded datasets
PDF Reports: Generate downloadable PDF reports using ReportLab
Authentication: Basic authentication for API security
#Setup Instructions
Prerequisites

Python 3.8+
Node.js 16+
npm or yarn
