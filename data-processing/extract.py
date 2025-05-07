import json
import os
import logging
from typing import Dict, List, Optional, Tuple

# config logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class Extractor:
  def __init__(self, data_path: str):
    self.data_path = data_path

  def load_data(self):
    try: 
      with open(self.data_path, 'r') as f:
        data = json.load(f)
      logger.info('Data loaded successfully')
      return data
    except Exception as e:
      logger.error(f'Error loading data: {e}')
      raise

  def get_all_places(self) -> List[Dict]:
    try:
      all_data = []
      data = self.load_data()
      for place in data:
        all_data.append(place)
      return all_data
    except Exception as e:
      logger.error(f'Error getting all places: {e}')
      raise