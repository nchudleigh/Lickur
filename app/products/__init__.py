from __future__ import absolute_import, print_function

from flask import Blueprint

products = Blueprint('products', __name__)

from . import views
