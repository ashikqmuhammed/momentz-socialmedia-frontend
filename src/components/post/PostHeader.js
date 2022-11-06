import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { Dots } from '../../svg'

export default function PostHeader({post,singleView}) {
  return (
    <div className={`post_header ${singleView?"":""}`}>
    <Link
      to={`/profile/${post.user.username}`}
      className="post_header_left"
    >
      <img src={post?.user.picture} alt="" />
      <div className="header_col">
        <div className="post_profile_name">
          {`${post.user.first_name} ${post.user.last_name}`}
          <div className="updated_p">
            {post.type === "profilePicture" &&
              `updated ${
                post.gender === "male" ? "his" : "her"
              } profile picture`}
            {post.type === "cover" &&
              `updated ${
                post.gender === "male" ? "his" : "her"
              } cover picture`}
          </div>
        </div>
        <div className="post_profile_date">
          <Moment fromNow interval={30}>
            {post.createdAt}
          </Moment>
        </div>
      </div>
    </Link>
    <div className="post_header_right hover1">
      <Dots color="#828387" />
    </div>
  </div>
  )
}
