import { useEffect, useState } from "react";
import Link from "next/link";

import Loading from "../misc/Loading";

import { Input, Button } from "antd";
import { Table } from "antd";

import API from "../../lib/API";

const { Search } = Input;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "age",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "address",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Button>
        <Link href={`/users/${record.id}`}>View Posts</Link>
      </Button>
    ),
  },
];

const Users = () => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [originalResult, setOriginalResult] = useState([]);
  const [result, setResult] = useState([]);

  const searchResult = (val) => {
    if (val) {
      const duplicateArr = originalResult.filter((el) => {
        return el.name.toLowerCase().includes(val.toLowerCase());
      });
      setResult(duplicateArr);
    } else {
      setResult(originalResult);
    }
  };

  const searchHandler = (e) => {
    setSearch(e.target.value);
    searchResult(e.target.value);
  };

  const searchButtonHandler = (val) => {
    searchResult(val);
  };

  const initiate = async () => {
    const res = await API.get("/users");
    res.data = res.data.map((el) => {
      const address = el.address;
      return {
        ...el,
        key: el.id,
        address: `${address.suite}, ${address.street}, ${address.city}, ${address.zipcode}`,
      };
    });
    setOriginalResult(res.data);
    setResult(res.data);
    setLoading(false);
  };

  useEffect(() => {
    initiate();
  }, []);

  return (
    <div className="py-6">
      <h1 className="text-4xl font-semibold mb-4 font-Quicksand">Users</h1>
      <div className="py-10 px-8 space-y-1 rounded-xl shadow-blocks bg-white">
        {loading ? (
          <Loading text="Fetching..." />
        ) : (
          <div>
            <Search
              placeholder="Search by name"
              loading={false}
              size="large"
              value={search}
              onChange={searchHandler}
              onSearch={searchButtonHandler}
            />
            <Table
              className="mt-6"
              columns={columns}
              dataSource={result}
              pagination={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
