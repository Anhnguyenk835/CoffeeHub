import logging
from extract import Extractor
from transform import Tranformer
from load import DataLoader
import argparse


logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

class Pipeline:
    def __init__(self, data_path: str):
        self.data_path = data_path
        self.extractor = Extractor(data_path)
        self.transformer = Tranformer()
        # self.loader = DataLoader()

    def run(self, query: str = None, location: str = None):
        try:
            # Extract
            logger.info("Starting extraction...")
            data = self.extractor.get_all_places()
            logger.info("Extraction completed.")

            # Transform
            logger.info("Starting transformation...")
            coffee_shop_df, extension_df, image_df, rating_df, type_df, hour_df = self.transformer.transform_all(data)
            logger.info("Transformation completed.")

            # Load
            # logger.info("Starting loading...")
            # self.loader.load_coffee_shop(coffee_shop_df)
            # # self.loader.load_shop_extensions(shop_extensions_df)
            # # self.loader.load_shop_image(shop_image_df)
            # logger.info("Loading completed.")

        except Exception as e:
            logger.error(f"Pipeline failed: {e}")

if __name__ == "__main__":
    # parser = argparse.ArgumentParser(description="Data Processing Pipeline")
    # parser.add_argument('--query', help="Path to the query file")
    # parser.add_argument('--location', help='Location to search in')
    # parser.add_argument('--data-file', default='serpapi_results.json',
    #                     help='Path to test data JSON file')

    # args = parser.parse_args()

    # elt = Pipeline(args.data_file)
    # elt.run(args.query, args.location)

    # For testing purposes
    extractor = Extractor('serpapi_results.json')
    data = extractor.load_data()
    transformer = Tranformer()
    coffee_shop_df, extension_df, image_df, rating_df, hour_df = transformer.transform_all(data)
    # print(coffee_shop_df)
    dataloader = DataLoader()
    # dataloader.load_coffee_shop(coffee_shop_df)
    # dataloader.load_shop_extensions(extension_df)
    dataloader.load_cf_shop_image(image_df)
    dataloader.load_cf_shop_rating(rating_df)
    dataloader.load_cf_shop_hours(hour_df)
