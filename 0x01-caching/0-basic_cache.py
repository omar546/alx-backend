#!/usr/bin/env python3
"""
BasicCache Module
"""

from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """
    implements a basic caching system
    without any limit on the number of items stored.
    """
    def __init__(self):
        """
        Initialize.
        """
        super().__init__()

    def put(self, key, item):
        """
        Setter (Add).
        """
        if not key or not item:
            return
        self.cache_data[key] = item

    def get(self, key):
        """
        Getter (Retrieve).
        """
        if not key:
            return None
        return self.cache_data.get(key)
