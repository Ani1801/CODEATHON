from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

# Function to connect to SQLite
def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row  # Return rows as dictionaries
    return conn

# Initialize database and create users table if not exists
def init_db():
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS users (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name TEXT NOT NULL,
                        email TEXT NOT NULL UNIQUE,
                        age INTEGER NOT NULL)''')
    connection.commit()
    connection.close()

# Initialize the database before starting the app
init_db()

# Test route
@app.route('/')
def home():
    return "Backend is working!"

# Test database connection
@app.route('/test-db')
def test_db():
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute('SELECT sqlite_version();')  # Test query
        sqlite_version = cursor.fetchone()
        connection.close()
        return f"SQLite Version: {sqlite_version[0]}"
    except Exception as e:
        return f"Error connecting to database: {str(e)}", 500

# Route to add a user
@app.route('/add-user', methods=['POST'])
def add_user():
    data = request.json  # Get JSON data from request
    name = data.get('name')
    email = data.get('email')
    age = data.get('age')

    if not (name and email and age):
        return jsonify({"error": "Name, email, and age are required"}), 400

    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute(
            "INSERT INTO users (name, email, age) VALUES (?, ?, ?)",
            (name, email, age)
        )
        connection.commit()
        connection.close()
        return jsonify({"message": "User added successfully!"}), 201
    except sqlite3.IntegrityError as e:
        return jsonify({"error": "Email already exists"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
