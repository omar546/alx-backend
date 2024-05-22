#!/usr/bin/env python3
""" LIFOCache, inherits from BaseCaching, a caching system """

Base = __import__('base_caching').BaseCaching


class LIFOCache(Base):
    """ class LIFOCache """

    def __init__(self):
        """ Init """
        super().__init__()
        self.order = []

    def put(self, key, item):
        """ setter (put) """
        if key and item:
            if len(self.cache_data) >= self.MAX_ITEMS:
                if key in self.cache_data:
                    del self.cache_data[key]
                    self.order.remove(key)
                else:
                    del self.cache_data[self.order[self.MAX_ITEMS - 1]]
                    discarded = self.order.pop(self.MAX_ITEMS - 1)
                    print("DISCARD:", discarded)

            self.cache_data[key] = item
            self.order.append(key)

    def get(self, key):
        """ getter (get) """
        if key in self.cache_data:
            return self.cache_data[key]
        return None
