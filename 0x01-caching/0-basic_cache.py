#!/usr/bin/env python3
""" BasicCache inherits from BaseCaching """

from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """ class BasicCache implements a basic caching system
    without any limit on the number of items stored """

    def __init__(self):
        """ Init """
        super().__init__()
        self.order = []

    def put(self, key, item):
        """ setter """
        if key and item:
            self.cache_data[key] = item

    def get(self, key):
        """ getter """
        if key in self.cache_data:
            return self.cache_data[key]
        return None
