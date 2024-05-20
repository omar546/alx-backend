#!/usr/bin/env python3
"""
Defines a function named index_range that calculates the start and end indices
for pagination based on given page and page_size parameters.
"""
from typing import Tuple

def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
    Calculates and returns the start and end indices for a given page and 
    page size. These indices define the range of items to be displayed on that
    particular page.
    
    Args:
        page (int): The current page number (1-indexed).
        page_size (int): The number of items per page.
    
    Returns:
        Tuple[int, int]: A tuple containing the start index (inclusive) and the
        end index (exclusive) for the items to be displayed.
    """
    return ((page - 1) * page_size, page * page_size)
