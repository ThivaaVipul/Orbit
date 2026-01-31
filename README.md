# Orbit 🌍 - Lost & Found System

Orbit is a modern, reliable, and user-friendly Lost & Found application designed to help communities (like university campuses) track and recover lost items efficiently. Built with a robust **Spring Boot** backend and a dynamic **React** frontend.



---

## ✨ Features

- **🔍 Smart Search & Filtering**: Quickly find lost or found items by keyword, category, or status.
- **📝 Easy Reporting**: Simple, step-by-step form to report lost or found items with photo uploads.
- **📸 Image Support**: Upload/View actual photos of items for better identification.
- **🔐 Secure Authentication**: User registration and login system.
- **📱 Responsive Design**: Fully optimized for desktops, tablets, and mobile devices.
- **🎨 Modern UI**: Built with TailwindCSS v4 and Framer Motion for smooth animations and a premium look.
- **🛡️ Data Privacy**: Contact details and management features are protected.

---

## 🛠️ Tech Stack

### **Backend** (Server)
- **Framework**: Spring Boot 3+ (Java 17/21)
- **Database**: MySQL (Hibernate/JPA)
- **API**: RESTful Architecture
- **Security**: Custom Basic Auth Implementation

### **Frontend** (Client)
- **Framework**: React 19 (Vite)
- **Styling**: TailwindCSS v4
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Routing**: React Router DOM v6

---

## 🚀 Getting Started

### Prerequisites
- **Java JDK 17** or higher
- **Node.js 18** or higher
- **MySQL Server** running locally

### 1. Database Setup
1. Open your MySQL Client (Workbench, Command Line, etc.).
2. The application is configured to create the database automatically if it doesn't exist (`createDatabaseIfNotExist=true`).
3. Ensure your MySQL user is `root` with **no password** (or update `backend/src/main/resources/application.properties`).

### 2. Backend Setup
Navigate to the backend directory and run the Spring Boot application.

```bash
cd backend

# On macOS/Linux
./mvnw spring-boot:run

# On Windows
mvnw.cmd spring-boot:run
```
*The server will start at `http://localhost:8081`*

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, install dependencies, and start the dev server.

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```
*The app will be accessible at `http://localhost:5173`*

---

## 📂 Project Structure

```
Orbit/
├── backend/            # Spring Boot Application
│   ├── src/main/java   # Backend Logic
│   │   ├── config/     # Web/CORS configuration
│   │   ├── controller/ # API Controllers (REST endpoints)
│   │   ├── dto/        # Data Transfer Objects
│   │   ├── entity/     # Database Models/Entities
│   │   ├── repository/ # Database Access Layer (JPA)
│   │   └── service/    # Business Logic Layer
│   └── src/main/resources # Application properties
│
└── frontend/           # React Application
    ├── src/
    │   ├── components/ # Reusable UI components
    │   ├── pages/      # Main application pages
    │   ├── services/   # API configuration (Axios)
    │   └── assets/     # Static assets
    └── public/
```

---

## 🔧 API Endpoints

### Authentication
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user account | Public |
| `POST` | `/api/auth/login` | Login & receive Auth Token | Public |

### Item Management
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/items` | Get all items (optional `?type=LOST/FOUND`) | **Authenticated** |
| `GET` | `/api/items/{id}` | Get specific item details | **Authenticated** |
| `POST` | `/api/items` | Report a new item (Multipart) | **Authenticated** |
| `PUT` | `/api/items/{id}` | Update item details (Multipart) | **Owner/Admin** |
| `DELETE` | `/api/items/{id}` | Delete an item | **Owner/Admin** |
| `GET` | `/api/items/search` | Search items (`?q=keyword&type=...`) | **Authenticated** |
| `GET` | `/api/items/{id}/image`| Retrieve item image file | **Authenticated** |

---

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Made with ❤️ by the Orbit Team
