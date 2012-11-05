from server import *
import unittest
import json

class TestAPI(unittest.TestCase):
    def test_returns_json(self):
        index_json_response = EarthquakeAPI().index()
        index_response = json.loads(index_json_response)

        self.assertIsInstance(index_response, list)
        self.assertTrue(len(index_response) > 0)

if __name__ == '__main__':
    unittest.main()
