#!/usr/bin/env python3
"""
Defines and uses the index_range function from 0-simple_helper_function.py.
Implements a Server class with a get_page method for paginating baby names data.
"""
from typing import Tuple, List
import csv


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
    Calculates and returns the start and end indices for a given page and page size.
    """
    return ((page - 1) * page_size, page * page_size)


class Server:
    """
    Server class to paginate a dataset of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """
        Loads and caches the dataset.
        
        Returns:
            List[List]: The dataset loaded from the CSV file, excluding the header row.
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]  # Skip the header row

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
        Returns a specific page of baby names from the dataset.
        
        Args:
            page (int): The current page number (1-indexed). Defaults to 1.
            page_size (int): The number of items per page. Defaults to 10.
        
        Returns:
            List[List]: A list of rows corresponding to the requested page of data.
        
        Raises:
            AssertionError: If page or page_size is not a positive integer.
        """
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0
        start, end = index_range(page, page_size)
        with open(self.DATA_FILE) as f:
            reader = csv.reader(f)
            dataset = [row for row in reader]
        return dataset[start:end]
