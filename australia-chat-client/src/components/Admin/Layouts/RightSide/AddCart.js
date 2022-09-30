import React from "react";
import styels from "./AddCart.module.css";

const AddCart = () => {
  return (
    <>
      <div className="mx-lg-4 mb-lg-3">
        <h4 className="mb-lg-3">VIP Subscription</h4>
        <div className={`row ${styels.addCartAddSubscription}`}>
          <div className="col-2" style={{ cursor: "pointer" }}>
            <img src="/images/cart.svg" alt="not found" />
          </div>
          <div className="col-8">Add Subscription ID</div>
          <div className="col-2" style={{ cursor: "pointer" }}>
            <img src="/images/add.svg" alt="'not found" />
          </div>
        </div>
      </div>
      <li className={`mx-lg-4 mb-3 ${styels.addCartUsers}`}>
        <img src="/images/photo.jpeg" alt="not found" />
        <p>vip_1_week</p>
        <p style={{ cursor: "pointer" }}>
          <img src="/images/trash.svg" alt="not found" />
        </p>
      </li>
      <li className={`mx-lg-4  mb-3 ${styels.addCartUsers}`}>
        <img src="/images/photo.jpeg" alt="not found" />
        <p>vip_1_week</p>
        <p style={{ cursor: "pointer" }}>
          <img src="/images/trash.svg" alt="not found" />
        </p>
      </li>
      <li className={`mx-lg-4 mb-3 ${styels.addCartUsers}`}>
        <img src="/images/photo.jpeg" alt="not found" />
        <p>vip_1_week</p>
        <p style={{ cursor: "pointer" }}>
          <img src="/images/trash.svg" alt="not found" />
        </p>
      </li>
    </>
  );
};

export default AddCart;
