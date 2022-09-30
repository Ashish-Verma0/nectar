import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";
import BlogItem from "./BlogItem";
const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0, 150) : text}
      <button className="btn " onClick={toggleReadMore}>
        {isReadMore ? "...read more" : " show less"}
      </button>
    </p>
  );
};

const RecentBlog = () => {
  const page = 1;
  const [totalUser, setTotalUser] = useState("");
  const limit = 10;

  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(
        `/api/v1/admin/blog/getallBlog/${limit}/${page}`
      );
      setData(res.data.blog);
      setTotalUser(res.data.totalBlog);
    } catch (error) {}
  };
  useEffect(() => {
    getData();
  }, []);

  const fun = async (e, pageNo) => {
    // setPage(pageNo)
    const res = await axios.get(
      `/api/v1/admin/blog/getallBlog/${limit}/${pageNo}`
    );
    // console.log(res);
    setData(res.data.blog);
  };
  // console.log(data);

  return (
    <div className="col-md-12 blogShort ">
      {data.map((elem) => {
        return <BlogItem key={elem._id} blogData={elem} />;
      })}
      <div className="mt-5 mb-5 d-flex justify-content-end align-items-end ">
        <Stack spacing={2}>
          <Pagination
            onChange={fun}
            count={
              Math.trunc(totalUser / limit) +
              (totalUser % limit === 0 ? +0 : +1)
            }
            color="primary"
          />
        </Stack>
      </div>
    </div>
  );
};

export default RecentBlog;
