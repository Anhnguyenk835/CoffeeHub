import pandas as pd
import logging
from datetime import datetime
from typing import Dict, List, Tuple, Optional

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class Tranformer:
  def __init__(self):

    self.coffee_shop_columns = [
      'id', 'name', 'address', 'latitude', 'longitude',
      'rating', 'total_ratings', 'phone', 'website',
      'opening_hours', 'created_at', 'updated_at'
    ]
    
    self.shop_extensions_columns = [
      'shop_id', 'category', 'value', 'created_at', 'updated_at'
    ]

  def transform_coffee_shop_data(self, place_data: Dict) -> pd.DataFrame:
    try:
      coffee_shop_df = pd.DataFrame([{
          'place_id': place_data['place_results'].get('place_id'),
          'place_url': place_data['search_metadata'].get('google_maps_url'),
          'place_name': place_data['place_results'].get('title'),
          'place_address': place_data['place_results'].get('address'),
          'latitude': place_data['place_results'].get('gps_coordinates', {}).get("latitude"),
          'longitude': place_data['place_results'].get('gps_coordinates', {}).get("longitude"),
          'type': place_data['place_results'].get('type', []),
          'price_range': place_data['place_results'].get('price'),
          'website': place_data['place_results'].get('website'),
          'phone': place_data['place_results'].get('phone'),
          'rating': place_data['place_results'].get('rating'),
          'online_order_link': place_data['place_results'].get('order_online_link'),
          'thumbnail': place_data['place_results'].get('thumbnail'),
      }])

      return coffee_shop_df

    except Exception as e:
      logger.error(f'Error transforming coffee shop data: {e}')
      raise

  def transform_shop_extensions_data(self, place_data: Dict) -> pd.DataFrame:
    try:
      place_extensions = []
      for ext in place_data['place_results'].get('extensions', []):
        for ext_type, ext_value in ext.items():
          place_extensions.append({
              'place_id': place_data['place_results'].get('place_id'),
              'category': ext_type,
              'values': ext_value
          })
      return pd.DataFrame(place_extensions)

    except Exception as e:
      logger.error(f'Error transforming shop extensions data: {e}')
      raise

  def transform_shop_image(self, place_data: Dict) -> pd.DataFrame:
    try:
      images = []
      for img in place_data["place_results"].get("images", []):
        images.append({
            "place_id": place_data["place_results"].get("place_id"),
            "img_title": img.get("title"),
            "img_url": img.get("thumbnail"),
        })
      return pd.DataFrame(images)

    except Exception as e:
      logger.error(f"Error transforming shop images: {e}")
      raise

  def transform_shop_rating(self, place_data: Dict) -> pd.DataFrame:
    try:
      ratings = []
      for rating in place_data["place_results"].get("rating_summary", []):
        ratings.append({
            "place_id": place_data["place_results"].get("place_id"),
            "stars": rating.get("stars"),
            "amount": rating.get("amount")
        })
      return pd.DataFrame(ratings)

    except Exception as e:
      logger.error(f"Error transforming shop ratings: {e}")
      raise

  def transform_shop_hours(self, place_data: Dict) -> pd.DataFrame:
    try:
      hours = []
      for hr in place_data['place_results'].get('hours', []):
        for day, time in hr.items():
          hours.append({
              'place_id': place_data['place_results'].get('place_id'),
              'day': day,
              'time': time
          })

      return pd.DataFrame(hours)

    except Exception as e:
      logger.error


  def transform_all(self, places_data: List[Dict]) -> Tuple[pd.DataFrame, pd.DataFrame, pd.DataFrame, pd.DataFrame, pd.DataFrame]:
    # print(places_data)
    try:
      coffee_shop_dfs = [self.transform_coffee_shop_data(place) for place in places_data]
      coffee_shop_df = pd.concat(coffee_shop_dfs, ignore_index=True)

      coffee_shop_ext_dfs = [self.transform_shop_extensions_data(place) for place in places_data]
      coffee_shop_ext_df = pd.concat(coffee_shop_ext_dfs, ignore_index=True)

      coffee_shop_image_dfs = [self.transform_shop_image(place) for place in places_data]
      coffee_shop_image_df = pd.concat(coffee_shop_image_dfs, ignore_index=True)

      coffee_shop_rating_dfs = [self.transform_shop_rating(place) for place in places_data]
      coffee_shop_rating_df = pd.concat(coffee_shop_rating_dfs, ignore_index=True)

      coffee_shop_hours_dfs = [self.transform_shop_hours(place) for place in places_data]
      coffee_shop_hours_df = pd.concat(coffee_shop_hours_dfs, ignore_index=True)

      return coffee_shop_df, coffee_shop_ext_df, coffee_shop_image_df, coffee_shop_rating_df, coffee_shop_hours_df

    except Exception as e:
      logger.error(f'Error transforming all data: {e}')
      raise

