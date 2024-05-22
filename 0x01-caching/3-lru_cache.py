#!/usr/bin/python3
""" LRUCache, inherits from BaseCaching, a caching system """

from collections import OrderedDict

Base = __import__('base_caching').BaseCaching


class LRUCache(Base):
    """ class LRUCache """

    def __init__(self):
        """ Init """
        super().__init__()
        self.order = OrderedDict()

    def put(self, key, item):
        """ setter (put) """
        if key and item:
            self.order[key] = item
            self.order.move_to_end(key)
            self.cache_data[key] = item

        if len(self.cache_data) > Base.MAX_ITEMS:
            discarded = next(iter(self.order))
            del self.cache_data[discarded]
            print("DISCARD:", discarded)

        if len(self.order) > Base.MAX_ITEMS:
            self.order.popitem(last=False)

    def get(self, key):
        """ getter (get) """
        if key in self.cache_data:
            self.order.move_to_end(key)
            return self.cache_data[key]
        return None
