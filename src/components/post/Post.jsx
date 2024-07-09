import {
  DeleteForeverSharp,
  MoreVert,
  ReplySharp,
  ShapeLine,
  Share,
  ShareOutlined,
} from "@mui/icons-material";
import React, { useState, useEffect, useContext } from "react";
import "./post.css";
import axios from "axios";
import { format } from "timeago.js";
import { Users } from "../../dummyData";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Comment from "../comment/Comment";
import { CopyToClipboard } from "react-copy-to-clipboard";
function Post({ post, owner }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const [iscopy, setIscopy] = useState(false);
  const { user: currentUser } = useContext(AuthContext);
  const [showMoreoptions, setShowMoreOptions] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [fileExt, setfileExt] = useState("png");

  const deletePost = async (postId, userId) => {
    const res = await axios.post(
      process.env.REACT_APP_API_URL + "/post/" + postId,
      { userid: userId }
    );
    window.location.reload(true);
  };

  const showMore = () => {
    setShowMoreOptions(!showMoreoptions);
  };

  useEffect(() => {
    setIsLike(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        process.env.REACT_APP_API_URL + `/user?userid=${post.userid}`
      );

      setUser(res.data);
    };

    fetchUser();
  }, [post.userid]);

  const [like, setLike] = useState(post.likes.length);
  const [isLike, setIsLike] = useState(false);

  const handleLike = () => {
    try {
      axios.put(process.env.REACT_APP_API_URL + "/post/" + post._id + "/like", {
        userid: currentUser._id,
      });
    } catch (e) {}
    setLike(isLike ? like - 1 : like + 1);
    setIsLike(!isLike);
  };

  useEffect(() => {
    if (post.img)
      setfileExt(
        post.img.substring(post.img.lastIndexOf(".") + 1, post.img.length)
      );
  }, [post]);

  if (user)
    return (
      <div className="post">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <Link
                to={`/profile/${post.anonymous ? "anonymous" : user.username}`}
              >
                <img
                  className="postProfileImg"
                  src={
                    !post.anonymous
                      ? user.profilePicture
                        ? PF + "/person/" + user.profilePicture
                        : PF + "/person/noAvatar.png"
                      : PF + "/person/noAvatar.png"
                  }
                />
              </Link>

              <span className="postUserName">
                {!post.anonymous ? user.username : "Anonymous"}
              </span>
              <span className="postDate">{format(post.createdAt)}</span>
            </div>
            <div className="postTopRight">
              <MoreVert className="threedot" onClick={showMore} />

              {showMoreoptions ? (
                owner == false ? (
                  <div className="sharepostOptions">
                    {iscopy ? (
                      <span className="CopiedText">copied</span>
                    ) : (
                      <></>
                    )}
                    <ShareOutlined
                      className="sharePostOptionsicons"
                      onClick={() => {
                        setIscopy(true);
                        setTimeout(() => setIscopy(false), 2000);
                        navigator.clipboard.writeText(
                          "http://localhost:3000/post/" + post._id
                        );
                      }}
                    />
                  </div>
                ) : (
                  <div className="sharepostOptions">
                    <ShareOutlined className="sharePostOptionsicons" />
                    <DeleteForeverSharp
                      className="sharePostOptionsicons"
                      onClick={() => deletePost(post._id, currentUser._id)}
                    />
                  </div>
                )
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="postCenter">
            <Link
              to={`/post/${post._id}`}
              style={{
                textDecoration: "none",
                color: "white",
                cursor: "pointer",
              }}
            >
              <span className="postText">{post?.desc}</span>
              {fileExt === "jpg" ||
              fileExt === "png" ||
              fileExt === "jpeg" ||
              fileExt === "webp" ? (
                <img
                  src={PF + "/post/" + post.img}
                  alt=""
                  className="postImg"
                />
              ) : fileExt === "mp4" || fileExt === "gif" ? (
                <>
                  <video alt="" className="postImg" controls>
                    <source src={PF + "/post/" + post.img} type="video/mp4" />
                  </video>
                </>
              ) : (
                <></>
              )}
            </Link>
          </div>
          <div className="postBottom">
            <div className="postBottomLeft">
              <img
                className="likeIcon"
                src="social_client/assets/like.png"
                onClick={handleLike}
              />
              <img
                className="likeIcon"
                src="social_client/assets/heart.png"
                onClick={handleLike}
              />
              <span className="postLikeCounter">{like}</span>
            </div>
            <div className="postBottomRight">
              <span
                className="postCommentText"
                onClick={() => {
                  setShowComment(!showComment);
                }}
              >
                {post.comments.length} comments
              </span>
            </div>
          </div>
          {showComment ? (
            <Comment
              comment={post.comments}
              postid={post._id}
              postUserid={post.userid}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    );
}

export default Post;
