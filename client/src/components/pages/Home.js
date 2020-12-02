import React from "react";
import { useQuery, gql } from "@apollo/client";



export default function Home() {   
  const { loading, data } = useQuery(FETCH_POST_QUERY);
  console.log(loading, data)

  
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}


const FETCH_POST_QUERY = gql`
    {
      getPosts {
        id
        body
        createdAt
        username
        likeCount
        likes {
          username
        }
        commentCount
        comments {
          id
          username
          createdAt
          body
        }
      }
    }
  `;
