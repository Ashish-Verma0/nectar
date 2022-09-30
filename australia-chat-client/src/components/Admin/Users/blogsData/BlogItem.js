import React from "react";
import parse from "html-react-parser";
const BlogItem = ({ blogData }) => {
  const { _id, title, message, image } = blogData;
  const content = parse(`${message}`);
  //   const [readMore, setIsReadMore] = useState(false);
  //                   {parse(`${message}`).props.children.slice(0, 100)}
  //                   <span onClick={() => setIsReadMore(!readMore)}>
  //                     <b style={{ cursor: "pointer" }}>...Read More</b>
  //                   </span>
  //                 </div>
  //               ) : (
  //                 <div>
  //                   {parse(`${message}`).props.children}
  //                   <span onClick={() => setIsReadMore(!readMore)}>
  //                     <b style={{ cursor: "pointer" }}>&nbsp;...Read Less</b>
  //                   </span>
  //                 </div>
  //               )}
  return (
    <div key={_id}>
      <div
        className="card mb-3 mt-5 shadow bg-body"
        style={{ maxWidth: "100%" }}
      >
        <div className="row mt-2">
          {image && (
            <div className="col-3">
              <img
                src={`/api/v1/media/blog-get-img/${image}`}
                className="img-fluid rounded-start my-2"
                alt="recent blog photos"
                width="100%"
              />
            </div>
          )}

          <div className={image ? "col-9" : "col-12"}>
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <div>{content}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
