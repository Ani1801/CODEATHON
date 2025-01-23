from flask import Flask, request, jsonify
import sqlite3
import re  # For email validation

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

# Validation functions
def is_valid_email(email):
    """Validate email format using regex."""
    email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(email_regex, email) is not None

def is_valid_age(age):
    """Validate age is a positive integer."""
    return isinstance(age, int) and age > 0

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
        return f"SQLite Version: {sqlite_version[0]}"
    except Exception as e:
        return f"Error connecting to database: {str(e)}", 500
    finally:
        connection.close()

# Route to add a user
@app.route('/add-user', methods=['POST'])
def add_user():
    data = request.json  # Get JSON data from request
    name = data.get('name')
    email = data.get('email')
    age = data.get('age')

    # Input validation
    if not name or not email or not age:
        return jsonify({"error": "Name, email, and age are required"}), 400
    if not is_valid_email(email):
        return jsonify({"error": "Invalid email format"}), 400
    if not is_valid_age(age):
        return jsonify({"error": "Age must be a positive integer"}), 400

    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute(
            "INSERT INTO users (name, email, age) VALUES (?, ?, ?)",
            (name, email, age)
        )
        connection.commit()
        return jsonify({"message": "User added successfully!"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"error": "Email already exists"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        connection.close()

# Route to get all users
@app.route('/get-users', methods=['GET'])
def get_users():
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM users")
        users = cursor.fetchall()

        if not users:
            return jsonify({"message": "No users found"}), 404

        # Format the data into a list of dictionaries
        user_list = [
            {"id": user["id"], "name": user["name"], "email": user["email"], "age": user["age"]}
            for user in users
        ]
        return jsonify({"users": user_list}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        connection.close()

# Route to update user details
@app.route('/update-user/<int:id>', methods=['PUT'])
def update_user(id):
    data = request.json  # Get JSON data from request
    name = data.get('name')
    email = data.get('email')
    age = data.get('age')

    if not (name or email or age):  # At least one field is required
        return jsonify({"error": "At least one field (name, email, or age) is required to update"}), 400
    if email and not is_valid_email(email):
        return jsonify({"error": "Invalid email format"}), 400
    if age and not is_valid_age(age):
        return jsonify({"error": "Age must be a positive integer"}), 400

    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        # Build the update query dynamically
        update_query = "UPDATE users SET "
        update_values = []
        if name:
            update_query += "name = ?, "
            update_values.append(name)
        if email:
            update_query += "email = ?, "
            update_values.append(email)
        if age:
            update_query += "age = ?, "
            update_values.append(age)
        
        update_query = update_query.rstrip(", ") + " WHERE id = ?"
        update_values.append(id)

        cursor.execute(update_query, tuple(update_values))
        connection.commit()

        if cursor.rowcount == 0:
            return jsonify({"error": "User not found"}), 404

        return jsonify({"message": "User updated successfully!"}), 200
    except sqlite3.IntegrityError:
        return jsonify({"error": "Email already exists"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        connection.close()

if __name__ == '__main__':
    app.run(debug=True)
