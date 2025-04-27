
# **HumanChain AI Safety Incident Log API**

This project provides a RESTful API for managing AI safety incidents. The API allows you to track, create, retrieve, and delete incidents related to AI systems.



## **📂 Project Structure**

```
src/
├── models/
│   └── incident.ts         # Mongoose model for incidents
├── routes/
│   └── incidentRoutes.ts   # API route handlers
├── app.ts                  # Main application setup and configuration
.env                         # Environment variables file
package.json                # Project dependencies
tsconfig.json               # TypeScript configuration
```

---



## **🛠 Technologies Used**

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express.js**: Web framework for building RESTful APIs.
- **TypeScript**: Superset of JavaScript that provides static types.
- **MongoDB**: NoSQL database for storing incident data.
- **Mongoose ORM**: MongoDB object modeling tool for Node.js.

---

## **📋 API Endpoints**

### **1. GET /incidents**
Fetch all incidents.

- **Method**: `GET`
- **URL**: `/incidents`
- **Description**: Fetches all incidents from the database.

**Response Example:**
```json
[
  {
    "_id": "680d4aff9dc0cb0cd5e87d84",
    "title": "Server Down",
    "description": "Main server crashed due to overload.",
    "severity": "High",
    "reportedAt": "2025-04-26T21:07:11.315Z",
    "__v": 0
  },
  {
    "_id": "680e1c35857cef37e2add78a",
    "title": "Ayush Title",
    "description": "This is the title of Ayush",
    "severity": "Medium",
    "reportedAt": "2025-04-27T11:59:49.137Z",
    "__v": 0
  }
]
```

### **2. POST /incidents**
Create a new incident.

- **Method**: `POST`
- **URL**: `/incidents`
- **Description**: Creates a new incident with provided details.

**Request Body Example:**
```json
{
  "title": "Server Downtime",
  "description": "The main server is down due to a network issue.",
  "severity": "High"
}
```

**Response Example:**
```json
{
  "_id": "680e1c35857cef37e2add78a",
  "title": "Server Downtime",
  "description": "The main server is down due to a network issue.",
  "severity": "High",
  "reportedAt": "2025-04-27T12:00:00.000Z",
  "__v": 0
}
```

### **3. GET /incidents/:id**
Fetch a single incident by its ID.

- **Method**: `GET`
- **URL**: `/incidents/:id`
- **Description**: Fetches the incident with the specified ID.

**Response Example:**
```json
{
  "_id": "680d4aff9dc0cb0cd5e87d84",
  "title": "Server Down",
  "description": "Main server crashed due to overload.",
  "severity": "High",
  "reportedAt": "2025-04-26T21:07:11.315Z",
  "__v": 0
}
```

### **4. DELETE /incidents/:id**
Delete a single incident by its ID.

- **Method**: `DELETE`
- **URL**: `/incidents/:id`
- **Description**: Deletes the incident with the specified ID.

**Response Example:**
```json
{
  "message": "Incident 680d4aff9dc0cb0cd5e87d84 deleted successfully"
}
```

---

## **🛠 Installation and Setup**

### **1. Clone the repository**
```bash
git clone https://github.com/Ayushkr77/Sparklehood_Project.git

```

### **2. Install dependencies**
```bash
npm install
```

### **3. Setup environment variables**
Create a `.env` file in the root directory and add your MongoDB connection string and port:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### **4. Build and Run the project**

#### For Development:
```bash
npm run dev
```

#### For Production:
```bash
npm run build
npm start
```

### **5. Server URL**
The server will be available at:
```
http://localhost:5000
```

![](/public/1.png)
![](/public/get.png)