from __future__ import absolute_import, print_function

from bson import json_util, objectid
from flask import request, jsonify, send_file
from . import products
from app import db


@products.route('/', methods=['GET'])
def get_products():
  products=db['products'].find()

  p_list = []

  for p in products:
    o = {}
    o['id'] = p['_id']
    o['name'] = p['name']
    if p['regular_price'] > 100:
        o['price_per_alcohol'] = (p['total_volume']*p['alcohol_content'])/(p['regular_price'])
        #o['price_per_alcohol'] = ((p['package_volume']*p['package_units'])*p['alcohol_content'])/(p['regular_price']/100)
    else:
        o['price_per_alcohol'] = 0
    o['cat'] = p['cat1']
    p_list.append(o)

  p_list.sort(key=lambda p: p['price_per_alcohol'], reverse=True)

  return json_util.dumps({
    'status': 200,
    'error': None,
    'result': {
      'message': 'Product List Successfully Returned',
      'data':p_list
    }
  }), 200

@products.route('/<p_id>', methods=['GET'])
def get_product(p_id=None):
  if p_id==None:
    return jsonify({
      'status':400,
      'error':'No product ID supplied',
      'result':{
        'message':'No product ID supplied'
        }
      }),400

  product=db['products'].find_one({'_id':objectid.ObjectId(p_id)})
  if product is None:
    return json_util.dumps({
      'status':404,
      'error':'Product not found!',
      'result':{
        'message':'Product not found',
        }
      }),404

  return json_util.dumps({
    'status':200,
    'error':None,
    'result':{
      'message':'Successfully returned product',
      'data':product
      }
    }),200
