#!/usr/bin/env python3
"""
Deletion-resilient hypermedia pagination
"""

import csv
import math
from typing import List, Dict


class Server:
    """Server class to paginate a dataset of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None
        self.__indexed_dataset = None

    def dataset(self) -> List[List]:
        """Loads and caches the dataset.
        
        Returns:
            List[List]: The dataset loaded from the CSV file, excluding the header row.
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]  # Skip the header row

        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """Creates an indexed version of the dataset.
        
        Returns:
            Dict[int, List]: A dictionary where the keys are index positions starting from 0 and the values are the rows of the dataset.
        """
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            self.__indexed_dataset = {i: dataset[i] for i in range(len(dataset))}
        return self.__indexed_dataset

    def get_hyper_index(self, index: int = None, page_size: int = 10) -> Dict:
        """Returns a dictionary with pagination information that is resilient to deletions in the dataset.
        
        Args:
            index (int): The starting index of the page. Defaults to None.
            page_size (int): The number of items per page. Defaults to 10.
        
        Returns:
            Dict: A dictionary containing the start index, next index, page size, and the data for the page.
        
        Raises:
            AssertionError: If index is not a non-negative integer or if page_size is not a positive integer.
        """
        assert isinstance(index, int) and index >= 0
        assert isinstance(page_size, int) and page_size > 0

        dataset = self.indexed_dataset()
        dataset_length = len(dataset)
        data = []

        current_index = index

        while len(data) < page_size and current_index < dataset_length:
            if dataset.get(current_index) is not None:
                data.append(dataset[current_index])
            current_index += 1

        next_index = current_index if current_index < dataset_length else None

        return {
            'index': index,
            'next_index': next_index,
            'page_size': page_size,
            'data': data
        }
