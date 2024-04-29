import React, { useState, useEffect } from "react";

const WordPressContent = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const username = "Manuel";
    const password = "DrGd Y8jC 7PYW ZaPJ QFuu fuaL";

    const requestOptions = {
      method: "GET",
      headers: new Headers({
        Authorization: "Basic " + btoa(username + ":" + password),
      }),
      credentials: "include",
    };

    fetch("http://localhost/weekly_ex/wordpress/wp-json/wp/v2/posts", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore durante il recupero dei contenuti da WordPress");
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="container">
      <h2 className="my-4 text-center">Ultimi Articoli</h2>
      <div className="row">
        {posts.map((post) => (
          <div key={post.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h3
                  className="card-title text-center"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                ></h3>
                <hr></hr>
                <div
                  className="card-text"
                  dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordPressContent;
