CREATE TABLE Users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Packages (
    package_id INTEGER PRIMARY KEY AUTOINCREMENT,
    weight REAL NOT NULL,
    priority TEXT CHECK(priority IN ('High', 'Medium', 'Low')) NOT NULL,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Containers (
    container_id INTEGER PRIMARY KEY AUTOINCREMENT,
    capacity REAL NOT NULL,
    remaining_capacity REAL NOT NULL,
    created_by INTEGER,
    FOREIGN KEY (created_by) REFERENCES Users(user_id)
);

CREATE TABLE PackageAssignments (
    assignment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    package_id INTEGER,
    container_id INTEGER,
    status TEXT CHECK(status IN ('Assigned', 'Unshipped')) NOT NULL DEFAULT 'Unshipped',
    reason TEXT,
    FOREIGN KEY (package_id) REFERENCES Packages(package_id),
    FOREIGN KEY (container_id) REFERENCES Containers(container_id)
);

CREATE TABLE ContactMessages (
    message_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- List all tables
.tables

-- Check Users table
SELECT * FROM Users;

-- Check Packages table
SELECT * FROM Packages;

INSERT INTO Users (name, email, password) VALUES ('Alice', 'alice@example.com', 'password123');
