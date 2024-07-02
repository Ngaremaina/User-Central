from server import app, route
from flask import render_template


@app.route("/", methods = ["GET"])
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
