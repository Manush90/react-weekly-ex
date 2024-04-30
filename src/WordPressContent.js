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

  const deletePost = (postId) => {
    console.log("ID del post da eliminare:", postId);
    const username = "Manuel";
    const password = "DrGd Y8jC 7PYW ZaPJ QFuu fuaL";

    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: "Basic " + btoa(username + ":" + password),
      },
    };

    fetch(`http://localhost/weekly_ex/wordpress/wp-json/wp/v2/posts/${postId}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore durante l'eliminazione dell'articolo");
        }

        setPosts(posts.filter((post) => post.id !== postId));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container cardd">
      <h2 className="my-4 text-center text-white">Ultimi Articoli</h2>
      <div className="row">
        {posts.map((post) => (
          <div key={post.id} className="col-md-4 mb-4">
            <div className="card position-relative">
              <div className="card-body bodycolor">
                <button
                  className="btn btn-danger position-absolute top-0 start-0 translate-middle m-2"
                  style={{ zIndex: 0 }}
                  onClick={() => deletePost(post.id)}
                >
                  x
                </button>
                <h3
                  className="card-title text-center"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                ></h3>
                <p className="date">
                  <br />
                  Data di pubblicazione: {new Date(post.date).toLocaleDateString()}
                </p>
                <hr />
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
