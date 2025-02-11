/* import { Component } from "react"; */

import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";
import { useEffect, useState } from "react";

/* class CommentArea extends Component { */

const CommentArea = (props) => {
  /*   state = {
    comments: [],
    isLoading: false,
    isError: false,
  }; */

  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // componentDidMount = async () => {
  //   try {
  //     let response = await fetch(
  //       'https://striveschool-api.herokuapp.com/api/comments/' +
  //         this.props.asin,
  //       {
  //         headers: {
  //           Authorization:
  //             'Bearer inserisci-qui-il-tuo-token',
  //         },
  //       }
  //     )
  //     console.log(response)
  //     if (response.ok) {
  //       let comments = await response.json()
  //       this.setState({ comments: comments, isLoading: false, isError: false })
  //     } else {
  //       console.log('error')
  //       this.setState({ isLoading: false, isError: true })
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     this.setState({ isLoading: false, isError: true })
  //   }
  // }

  /*  componentDidUpdate = async (prevProps) => { */
  const fetchComments = async () => {
    /*     if (prevProps.asin !== this.props.asin) {
      this.setState({
        isLoading: true,
      }); */

    setIsLoading(true);
    setIsError(false);

    try {
      /* let response = await fetch("https://striveschool-api.herokuapp.com/api/comments/" + this.props.asin, { */
      let response = await fetch("https://striveschool-api.herokuapp.com/api/comments/" + props.asin, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNGFkNGI3NDcwMTAwMTU4YjJhYmQiLCJpYXQiOjE3MzkyNzg1MjIsImV4cCI6MTc0MDQ4ODEyMn0.m1zQBXftHmCyomVGYCqDe-42tw9eCrtkmHo0yyv94r8",
        },
      });
      console.log(response);
      if (response.ok) {
        let comments = await response.json();
        /*           this.setState({
            comments: comments,
            isLoading: false,
            isError: false,
          }); */

        setComments(comments);
        setIsError(false);
      } else {
        /* this.setState({ isLoading: false, isError: true }); */
        setIsError(true);
      }
    } catch (error) {
      console.log(error);
      /* this.setState({ isLoading: false, isError: true }); */
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (props.asin) {
      fetchComments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.asin]);

  return (
    <div className="text-center sticky-top">
      {isLoading && <Loading />}
      {isError && <Error />}
      <AddComment asin={props.asin} />
      <CommentList commentsToShow={comments} />
    </div>
  );
};

export default CommentArea;
