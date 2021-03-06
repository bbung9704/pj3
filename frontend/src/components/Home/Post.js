import React, { useRef, useContext } from "react";

import { TextField, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import "./post.css";

import { userContext } from "../../context/userContext.js";
import { feedContext } from "../../context/feedContext.js";
import { postFeed, getMainFeed } from "../../api/feed.js";

const Post = ({ history }) => {
  const CssTextField = withStyles({
    root: {
      "& .MuiInputBase-root": {
        fontSize: "85%",
      },
      "& label.Mui-focused": {
        color: "var(--main-color)",
      },
      "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
          borderColor: "var(--main-color)",
        },
      },
    },
  })(TextField);

  const userstate = useContext(userContext);
  const feedstate = useContext(feedContext);
  const fileRef = useRef(false);
  const bodyRef = useRef(false);
  const tagRef = useRef(false);

  const moveBack = () => {
    history.goBack();
  };

  const posting = () => {
    let body = bodyRef.current.value;
    body = body.replace(/(?:\r\n|\r|\n)/g, "<br />");
    const form = new FormData();
    const files = fileRef.current.files;

    let tags = tagRef.current.value;
    tags = tags.split(", ");

    for (let j = 0; j < tags.length; j++) {
      form.append("tag", tags[j]);
    }

    form.append("body", body);

    for (let i = 0; i < files.length; i++) {
      form.append("image", files[i]);
    }

    postFeed(userstate.userstate.token, form);
    setTimeout(() => {
      feedstate.feeddispatch({
        type: "RESET_FEEDS",
      });
      history.push("/home");
    }, 100);
  };

  return (
    <div className="feed">
      <span>Post</span>
      <div className="post-input-container">
        <CssTextField
          id="outlined-multiline-flexible"
          variant="outlined"
          label="Body"
          size="small"
          rows={8}
          inputRef={bodyRef}
          fullWidth={true}
          multiline
        />
        <input
          type="file"
          accept=".gif, .jpg, .jpeg, .png"
          multiple
          ref={fileRef}
        />
        <CssTextField
          id="outlined-multiline-flexible"
          variant="outlined"
          label="Tag"
          size="small"
          rows={1}
          placeholder="ex) tag1, tag2, tag3"
          inputRef={tagRef}
          fullWidth={true}
        />
      </div>
      <div className="post-bottom-btn">
        <Button variant="contained" size="small" onClick={moveBack}>
          Back
        </Button>
        <Button variant="contained" size="small" onClick={posting}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Post;
