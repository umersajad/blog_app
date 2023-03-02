import { useEffect, useState, useRef , useCallback } from "react";
import Link from "next/link";

import Loading from "../misc/Loading";
import SmallLoading from "../misc/SmallLoading";
import { Pagination } from "antd";

import { Input, Button } from "antd";
import { Space, notification } from "antd";

import PostComp from "./PostComp";

import API from "../../lib/API";

const { Search } = Input;

const Posts = () => {
  const [loading, setLoading] = useState(true);
  const [resultLoading, setResultLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [itemsCount, setItemsCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const firstTime = useRef(true);
  const myTimeout = useRef();

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (message) => {
    const key = `open${Date.now()}`;
    api.open({
      message: "Action Successful",
      description: `Post has been successfully ${message}`,
      key,
    });
  };

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  const searchButtonHandler = () => {
    getPostsResult();
  };

  const getPostsResult = useCallback(async () => {
    setResultLoading(true);
    const res = await API.get(
      `/posts?q=${search}&_page=${currentPage}&_limit=25`
    );
    setItemsCount(res.headers.get("x-total-count"));
    setResult(res.data);
    setResultLoading(false);
    setLoading(false);
  } , [currentPage, search])

  useEffect(() => {
    if (!firstTime.current) {
      clearTimeout(myTimeout.current);

      setResultLoading(true);

      myTimeout.current = setTimeout(() => {
        getPostsResult();
      }, 300);
    }
  }, [search, getPostsResult]);

  useEffect(() => {
    getPostsResult();
    firstTime.current = false;
  }, [currentPage, getPostsResult]);

  return (
    <div className="py-6">
      <h1 className="text-4xl font-semibold mb-4 font-Quicksand">Posts</h1>
      <div className="py-10 px-8 space-y-1 rounded-xl shadow-blocks bg-white">
        {contextHolder}
        {loading ? (
          <Loading text="Fetching..." />
        ) : (
          <div>
            <Search
              placeholder="Search post"
              loading={resultLoading}
              size="large"
              value={search}
              onChange={searchHandler}
              onSearch={searchButtonHandler}
            />
            <div className="mt-6">
              <div className="mb-6 flex justify-end">
                <Pagination
                  onChange={(page) => {
                    setCurrentPage(page);
                  }}
                  defaultCurrent={currentPage}
                  total={itemsCount}
                  pageSize={25}
                  showSizeChanger={false}
                />
              </div>
              {resultLoading ? (
                <SmallLoading text="Fetching..." />
              ) : (
                <div className="space-y-2 mt-4">
                  {result.map((el, ind) => {
                    const { title, body, id } = el;
                    return (
                      <PostComp
                        key={id}
                        id={id}
                        title={title}
                        body={body}
                        onEdit={(title, body) => {
                          const duplicateArr = [...result];
                          duplicateArr[ind].title = title;
                          duplicateArr[ind].body = body;
                          setResult(duplicateArr);
                          openNotification("edited");
                        }}
                        onRemove={() => {
                          const duplicateArr = [...result];
                          duplicateArr.splice(ind, 1);
                          setResult(duplicateArr);
                          openNotification("removed");
                        }}
                      />
                    );
                  })}
                </div>
              )}
              <div className="mt-6 flex justify-end">
                <Pagination
                  onChange={(page) => {
                    setCurrentPage(page);
                  }}
                  defaultCurrent={currentPage}
                  total={itemsCount}
                  pageSize={25}
                  showSizeChanger={false}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;
