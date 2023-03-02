import { useEffect, useState, useRef, useCallback } from "react";

import Loading from "../misc/Loading";
import SmallLoading from "../misc/SmallLoading";

import PostComp from "../Posts/PostComp";

import { Input, notification } from "antd";

import API from "../../lib/API";

const { Search } = Input;

const Users = ({ query }) => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [user, setUser] = useState("");

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
    setSearchLoading(true);
    const res = await API.get(`/users/${query.id}/posts?q=${search}`);
    setResult(res.data);
    setSearchLoading(false);
    setLoading(false);
  }, [query, search]);

  useEffect(() => {
    if (!firstTime.current) {
      clearTimeout(myTimeout.current);

      setSearchLoading(true);

      myTimeout.current = setTimeout(() => {
        getPostsResult();
      }, 300);
    }
  }, [search, getPostsResult]);

  const userDetails = useCallback(async () => {
    const res = await API.get(`/users/${query.id}`);
    setUser(res.data.name);
  }, [query]);

  useEffect(() => {
    userDetails();
    getPostsResult();
    firstTime.current = false;
  }, [userDetails, getPostsResult]);

  return (
    <div className="py-6">
      <h1 className="text-4xl font-semibold mb-4 font-Quicksand">
        Posts by {user}
      </h1>
      <div className="py-10 px-8 space-y-1 rounded-xl shadow-blocks bg-white">
        {loading ? (
          <Loading text="Fetching..." />
        ) : (
          <div>
            {contextHolder}
            <Search
              placeholder="Search post"
              loading={searchLoading}
              size="large"
              value={search}
              onChange={searchHandler}
              onSearch={searchButtonHandler}
            />
            <div className="space-y-2 mt-4">
              {searchLoading ? (
                <SmallLoading text="Fetching..." />
              ) : (
                <div className="space-y-2 mt-4">
                  {result.map((el, ind) => {
                    const { id, title, body } = el;
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
