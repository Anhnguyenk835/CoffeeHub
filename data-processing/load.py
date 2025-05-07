import os
import logging
import pandas as pd
from dotenv import load_dotenv
from supabase import create_client, Client
from sqlalchemy import create_engine
from sqlalchemy.engine import Engine
from typing import Optional

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables from .env file
load_dotenv()
SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY")
SUPABASE_URL = os.getenv("SUPABASE_URL")
DATABASE_URL = os.getenv("DATABASE_URL")

class DataLoader():
  def __init__(self):
    self.SUPABASE_ANON_KEY = SUPABASE_ANON_KEY
    self.SUPABASE_URL = SUPABASE_URL
    self.DATABASE_URL = DATABASE_URL

    if not self.SUPABASE_ANON_KEY or not self.SUPABASE_URL:
      raise ValueError("Need supabase credentials")
    
    self.client = create_client(self.SUPABASE_URL, self.SUPABASE_ANON_KEY)
    self.engine = self._create_engine()
    
  def _create_engine(self) -> Engine:
    try:
      # create engine
      engine = create_engine(
          self.DATABASE_URL,
          connect_args = {
              'sslmode': 'require',
              'options': f'-c search_path=public'
          }
      )
      return engine
    except Exception as e:
      logger.error(f'Error creating database engine: {e}')
      raise
  
  def load_coffee_shop(self, cf_shop_df: pd.DataFrame) -> Optional[pd.DataFrame]:
    """
    Load coffee shop data from cleaned dataframe to database
    """
    try:
      if cf_shop_df.empty:
        logger.info('No data to load')
        return None

      with self.engine.begin() as connection:
        cf_shop_df.to_sql(
            'Coffee_Shop',
            con = connection,
            if_exists = 'append',
            index = False,
            method = 'multi',
        )
      logger.info(f"load successfully {len(cf_shop_df)} coffee shops to database")
      return cf_shop_df
    
    except Exception as e:
      logger.error(f'Error loading coffee shop data: {e}')
      raise

  def load_shop_extensions(self, shop_extensions_df: pd.DataFrame) -> Optional[pd.DataFrame]:
    """
    Load coffee shop extensions data from cleaned dataframe to database
    """
    try:
      if shop_extensions_df.empty:
        logger.info('No data to load')
        return None

      with self.engine.begin() as connection:
        shop_extensions_df.to_sql(
            'Coffee_Extension',
            con = connection,
            if_exists = 'append',
            index = False,
            method = 'multi',
        )
      logger.info(f"load successfully {len(shop_extensions_df)} coffee shop extensions to database")
      return shop_extensions_df
    
    except Exception as e:
      logger.error(f'Error loading coffee shop extensions data: {e}')
      raise

  def load_cf_shop_image(self, shop_image_df: pd.DataFrame) -> Optional[pd.DataFrame]:
    """
    Load coffee shop image data from cleaned dataframe to database
    """
    try:
      if shop_image_df.empty:
        logger.info('No data to load')
        return None

      with self.engine.begin() as connection:
        shop_image_df.to_sql(
            'Coffee_Image',
            con = connection,
            if_exists = 'append',
            index = False,
            method = 'multi',
        )
      logger.info(f"load successfully {len(shop_image_df)} coffee shop images to database")
      return shop_image_df
    
    except Exception as e:
      logger.error(f'Error loading coffee shop image data: {e}')
      raise

  def load_cf_shop_rating(self, shop_rating_df: pd.DataFrame) -> Optional[pd.DataFrame]:
    """
    Load coffee shop rating data from cleaned dataframe to database
    """
    try:
      if shop_rating_df.empty:
        logger.info('No data to load')
        return None

      with self.engine.begin() as connection:
        shop_rating_df.to_sql(
            'Coffee_Rating',
            con = connection,
            if_exists = 'append',
            index = False,
            method = 'multi',
        )
      logger.info(f"load successfully {len(shop_rating_df)} coffee shop ratings to database")
      return shop_rating_df
    
    except Exception as e:
      logger.error(f'Error loading coffee shop rating data: {e}')
      raise

  def load_cf_shop_hours(self, shop_hours_df: pd.DataFrame) -> Optional[pd.DataFrame]:
    """
    Load coffee shop hours data from cleaned dataframe to database
    """
    try:
      if shop_hours_df.empty:
        logger.info('No data to load')
        return None

      with self.engine.begin() as connection:
        shop_hours_df.to_sql(
            'Coffee_Opening_Hours',
            con = connection,
            if_exists = 'append',
            index = False,
            method = 'multi',
        )
      logger.info(f"load successfully {len(shop_hours_df)} coffee shop hours to database")
      return shop_hours_df
    
    except Exception as e:
      logger.error(f'Error loading coffee shop hours data: {e}')
      raise
      



