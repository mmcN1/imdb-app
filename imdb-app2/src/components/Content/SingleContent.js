import React from "react";
import { img_300, unavailable } from "../../config/config";
import "./SingleContent.css";
import { Badge } from "@mui/material";
import ContentModal from "../ContentModal/ContentModal";


const SingleContent = ({
  id,
  title,
  poster,
  vote_average,
  date,
  overview,
  media_type,
}) => {
  return (
    <ContentModal media_type={media_type} id={id}>
      <Badge badgeContent={Math.round(vote_average * 10) / 10} color={vote_average > 6 ? 'primary' : 'secondary'} />
      <img
        className="poster"
        src={poster ? `${img_300}/${poster}` : unavailable}
        alt={title}
      />
      <h1 className="title">
        {title}
      </h1>
      <span className="subTitle">
        {media_type === "tv" ? "Series" : "Movies"}

        <span className="subTitle">{date}</span>
      </span>
    </ContentModal>
  );
};

export default SingleContent;
