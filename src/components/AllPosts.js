// src/components/AllPosts.js

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sanityClient from "../client.js";
import signature from '../extras/signature.png';

export default function AllPosts() {
  const [allPostsData, setAllPosts] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post"]{
        title,
        slug,
        mainImage{
        asset->{
          _id,
          url
        }
      }
    }`
      )
      .then((data) => setAllPosts(data))
      .catch(console.error);
  }, []);

  return (
    <div className="bg-black min-h-screen p-12">
      <div className="container mx-auto">
        <img 
          alt=""
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          src={signature}>
        </img>
        <h3 className="text-lg text-gray-600 flex justify-center mb-12">
          Welcome to my blog posts page!
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPostsData &&
            allPostsData.map((post, index) => (
              <Link to={"/" + post.slug.current} key={post.slug.current}>
                <span
                  className="block h-64 relative rounded shadow leading-snug bg-white
                      border-l-8 border-green-400"
                  key={index}
                >
                  <img
                    className="w-full h-full rounded-r object-cover absolute"
                    src={post.mainImage.asset.url}
                    alt=""
                  />
                  <span
                    className="block relative h-full flex justify-end items-end pr
                      -4 pb-4"
                  >
                    <h2
                      className="text-gray-800 text-lg font-bold px-3 py-4 bg-red-700
                        text-red-100 bg-opacity-75 rounded"
                    >
                      {post.title}
                    </h2>
                  </span>
                </span>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}