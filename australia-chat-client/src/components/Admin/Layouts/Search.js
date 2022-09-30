import React, { useState } from "react";
import axios from "axios";

import styles from "./Search.module.css";
import SearchList from "./SearchList";
const Search = () => {
  const [users, setUsers] = useState([]);
  const [text, setText] = useState("");

  const searchHandler = async (event) => {
    try {
      setText(event.target.value);
      const res = await axios.get(
        `api/v1/admin/user/searchUser/${event.target.value}`
      );
      if (res.data.user.length === 0) {
        setUsers([]);
      } else {
        setUsers(res.data.user);
      }
    } catch (error) {
      setUsers([]);
    }
  };
  return (
    <div
      style={{ position: "relative" }}
      className="row d-flex justify-content-center align-items-center"
    >
      <div>
        <div className={`form ${styles.searchForm}`}>
          <img
            className={styles.searchImg}
            src="/images/search.svg"
            alt="not found"
          />
          <input
            autoComplete="off"
            onChange={searchHandler}
            value={text}
            type="text"
            className="form-control shadow form-input"
            placeholder="Search "
            style={{ backgroundColor: "rgb(255 255 255) !important" }}
          />
          {users.length === 0 ? (
            ""
          ) : (
            <p
              onClick={() => {
                setUsers([]);
                setText("");
              }}
              className={`${styles.close}`}
            >
              X
            </p>
          )}
        </div>
      </div>
      {users.length === 0 ? (
        ""
      ) : (
        <div
          className="rounded"
          style={{
            backgroundColor: "#fff",
            position: "absolute",
            top: "49px",
            zIndex: "12",
            width: "97%",
            paddingBottom: "150vh",
          }}
        >
          {users.map((user) => {
            return <SearchList user={user} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Search;
