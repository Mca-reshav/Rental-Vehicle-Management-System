# Rental Vehicle Management System (RVMS)

## Overview

The **Rental Vehicle Management System (RVMS)** is a backend API built using **Node.js**, **Express.js**, **MongoDB**, and **Multer** for handling file uploads. It follows a role-based access control system to manage users, vehicles, and rentals efficiently.

---

## Project Setup

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Multer](https://github.com/expressjs/multer)

### Installation Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Mca-reshav/Rental-Vehicle-Management-System.git
   cd rental-vehicle-management
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure the environment:**

   - Create a `.env` file and set up the following variables:
     ```
     DB_URI=mongodb://localhost:27017/rvms
     JWT_SECRET=your_secret_key
     PORT=6001
     ```

4. **Start the server:**

   ```bash
   npm start
   ```

   Server runs on `http://localhost:6001/`.

---

## API Documentation

### 1. User Management

#### **User Login**

- **Endpoint:** `POST /web/user/login`
- **Description:** Logs in a user and returns a JWT token.

#### **User Registration**

- **Endpoint:** `POST /web/user/register`
- **Description:** Registers a new user.

#### **User Profile**

- **Endpoint:** `GET /web/user/profile`
- **Description:** Retrieves user profile details.
- **Authorization:** Bearer Token required.

#### **Toggle Role**

- **Endpoint:** `PUT /web/user/toggleRole`
- **Description:** Updates user role (Admin, Renter, Owner).
- **Authorization:** Bearer Token required.

#### **User List**

- **Endpoint:** `GET /web/user/list`
- **Description:** Retrieves all registered users.
- **Authorization:** Bearer Token required.

---

### 2. Vehicle Management

#### **Add Vehicle**

- **Endpoint:** `POST /web/vehicle/add`
- **Description:** Adds a new vehicle listing.
- **Authorization:** Bearer Token required.

#### **Edit Vehicle**

- **Endpoint:** `PUT /web/vehicle/edit`
- **Description:** Updates an existing vehicle listing.
- **Authorization:** Bearer Token required.

#### **Remove Vehicle**

- **Endpoint:** `DELETE /web/vehicle/remove`
- **Description:** Deletes a vehicle listing.
- **Authorization:** Bearer Token required.

#### **List All Vehicles**

- **Endpoint:** `GET /web/vehicle/listAll`
- **Description:** Retrieves all available vehicles.

#### **Toggle Vehicle Status**

- **Endpoint:** `GET /web/vehicle/toggleStatus`
- **Description:** Updates the availability status of a vehicle.
- **Authorization:** Bearer Token required.

---

## Authorization

All secured endpoints require **JWT Bearer Token** authentication.
Include the following header:

```plaintext
Authorization: Bearer <token>
```

---

## Additional Features

- **Multer for Image Uploads**: Handles vehicle image uploads securely.
- **Role-Based Access Control**: Ensures different privileges for Admins, Renters, and Owners.
- **MongoDB with Mongoose**: Provides a structured and flexible database schema.
- **RESTful API Design**: Follows best practices for API structuring and endpoint organization.
- **Scalable Architecture**: Supports future enhancements like payment integration and booking history.

---

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Backend framework
- **MongoDB** - NoSQL database
- **Multer** - File upload handling
- **JWT** - Authentication and authorization

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## License

This project is licensed under the MIT License.

