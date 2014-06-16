from __future__ import absolute_import, print_function
import requests
from pymongo import MongoClient

db_conn=MongoClient(host='mongodb://localhost')
db=db_conn['lickur']
db['products'].drop()

r=requests.get('http://lcboapi.com/products', params={'per_page':100})
print(r.json()['result'].__len__())

product_list = r.json()['result']
page = r.json()['pager']['current_page']
last_page = r.json()['pager']['final_page']

for i in range(page, last_page):
  #
  r=requests.get('http://lcboapi.com/products', params={'per_page':100, 'page':i})
  product_list.extend(r.json()['result'])

print(product_list.__len__())

for p in product_list:
  if p['is_dead']==True or p['is_discontinued']==True:
      continue
  prod = {}
  prod['name'] = p['name']
  prod['sale_price'] = p['price_in_cents']
  prod['regular_price'] = p['regular_price_in_cents']
  prod['bonus_miles'] = p['bonus_reward_miles']
  prod['cat1'] = p['primary_category']
  prod['cat2'] = p['secondary_category']
  prod['cat3'] = p['tertiary_category']
  prod['package_type'] = p['package_unit_type']
  prod['package_volume'] = p['package_unit_volume_in_milliliters']
  prod['package_units'] = p['total_package_units']
  prod['alcohol_content'] = p['alcohol_content']
  prod['price_per_alcohol'] = p['price_per_liter_of_alcohol_in_cents']
  prod['has_sale'] = p['has_clearance_sale']
  prod['image'] = p['image_thumb_url']
  prod['product_number'] = p['product_no']
  prod['total_volume'] = p['volume_in_milliliters']

  db['products'].insert(prod)


if __name__ == "__main__":
  pass
