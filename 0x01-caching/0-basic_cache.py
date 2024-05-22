#!/usr/bin/python3
""" BasicCache inherits from BaseCaching """

Base = __import__('base_caching').BaseCaching


class BasicCache(Base):
    """ class BasicCache """

    def put(self, key, item):
        """ setter """
        if key and item:
            self.cache_data[key] = item

    def get(self, key):
        """ getter """
        if key in self.cache_data:
            return self.cache_data[key]
        return None
