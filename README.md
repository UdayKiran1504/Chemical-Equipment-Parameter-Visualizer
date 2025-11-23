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
   ```
# Features
```txt
CSV Upload: Upload equipment data via both web and desktop interfaces
Data Analysis: Automatic calculation of averages and type distribution
Visualization: Interactive charts (Chart.js for web, Matplotlib for desktop)
History Management: Stores last 5 uploaded datasets
PDF Reports: Generate downloadable PDF reports using ReportLab
Authentication: Basic authentication for API security
  ```
# Tech stack
```txt
Backend: Python 3.10+, Django, Django REST Framework
Web frontend: React.js, Chart.js, Axios (API calls)
Desktop frontend: PyQt5, Matplotlib
Data: pandas for CSV parsing/analytics
DB: SQLite (stores last 5 uploads + metadata)
Version control: Git / GitHub
  ```
# Setup Instructions
```txt
Prerequisites

Python 3.8+
Node.js 16+
npm or yarn
  ```
# Backend Setup
```txt
1.Navigate to backend directory:
cd backend
2.Create virtual environment:
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
3.Install dependencies:
pip install -r requirements.txt
4.Run migrations:
python manage.py makemigrations equipment
python manage.py migrate
5.Create superuser (for authentication):
python manage.py createsuperuser
# Username: Every User
# Password: Any Password
6.Run development server:
python manage.py runserver
  ```
# Web Frontend Setup
```txt
1.Navigate to web frontend directory:
cd web-frontend
2.Install dependencies:
npm install
3.Start development server:
npm run dev
 ```
# Desktop Frontend Setup
```txt
1.Navigate to desktop frontend directory:
cd desktop-client
2.Create virtual environment (or use backend's):
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
3.Install dependencies:
pip install -r requirements.txt
4.Run the application:
python main.py
```
# API Endpoints
<img width="840" height="226" alt="image" src="https://github.com/user-attachments/assets/d727e203-e00e-4671-aedf-14c87fa0dc4e" />

# Authentication
```txt
Both frontends use Basic Authentication with these default credentials:
Username: For Every New User
Password: For Every New Password
⚠️ Important: Change these credentials in production!
```
# CSV Data Format
```txt
The CSV file must contain these columns:

Equipment Name
Type
Flowrate
Pressure
Temperature
```
# License
This project is for educational purposes as part of an internship screening task.





