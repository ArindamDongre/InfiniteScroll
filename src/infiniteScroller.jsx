import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import "./infiniteScroller.css";

const InfiniteScroller = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchItems();
  }, [page]);

  const fetchItems = async () => {
    const res = await axios.get(
      "https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10"
    );
    const newItems = res.data;

    setItems([...items, ...newItems]);
    if (newItems.length < itemsPerPage) {
      setHasMore(false);
    }
  };

  const fetchMoreData = () => {
    setPage(page + 1);
  };

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      <ul className="item-list">
        {items.map((item) => (
          <li key={item.id} className="item">
            {item.title}
          </li>
        ))}
      </ul>
    </InfiniteScroll>
  );
};

export default InfiniteScroller;
