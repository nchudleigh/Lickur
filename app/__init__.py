from __future__ import absolute_import, print_function

from pymongo import Connection
from flask import Flask, render_template, g, request


# Create app
app = Flask(__name__, static_folder='static/dev', static_url_path='')

# Connect to then select database
db_conn = Connection(host="mongodb://localhost")
db = db_conn['lickur']

# Import blueprints from app
from app.products import products

# Register all blueprints to the main app
app.register_blueprint(products, url_prefix="/api/products")

# Import main views from app
from app import views
