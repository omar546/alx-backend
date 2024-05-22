#!/usr/bin/python3
""" FIFOCache, inherits from BaseCaching, a caching system """

Base = __import__('base_caching').BaseCaching


class FIFOCache(Base):
    """ class FIFOCache """

    def __init__(self):
        """ Init"""
        super().__init__()
        self.order = []

    def put(self, key, item):
        """ setter (put) """
        if key and item:
            if key in self.cache_data:
                self.cache_data[key] = item
                return

            if len(self.cache_data) >= Base.MAX_ITEMS:
                discarded = self.order.pop(0)
                del self.cache_data[discarded]
                print("DISCARD:", discarded)

            self.cache_data[key] = item
            self.order.append(key)

    def get(self, key):
        """ getter """
        if key in self.cache_data:
            return self.cache_data[key]
        return None
