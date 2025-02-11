/* import { Component } from "react"; */
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

/* class AddComment extends Component { */

const AddComment = (props) => {
  /*   state = {
    comment: {
      comment: "",
      rate: 1,
      elementId: this.props.asin,
    },
  }; */
  const [commentText, setCommentText] = useState("");
  const [rate, setRate] = useState(1);
  const [elementId, setElementId] = useState(props.asin);

  /*   componentDidUpdate(prevProps) {
    if (prevProps.asin !== this.props.asin) {
      this.setState({
        comment: {
          ...this.state.comment,
          elementId: this.props.asin,
        },
      });
    }
  } */

  useEffect(() => {
    setElementId(props.asin);
  }, [props.asin]);

  /*   sendComment = async (e) => { */
  const sendComment = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch("https://striveschool-api.herokuapp.com/api/comments", {
        method: "POST",
        body: JSON.stringify({ comment: commentText, rate: rate, elementId: elementId }),
        headers: {
          "Content-type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNGFkNGI3NDcwMTAwMTU4YjJhYmQiLCJpYXQiOjE3MzkyNzg1MjIsImV4cCI6MTc0MDQ4ODEyMn0.m1zQBXftHmCyomVGYCqDe-42tw9eCrtkmHo0yyv94r8",
        },
      });
      if (response.ok) {
        alert("Recensione inviata!");
        /*         this.setState({
          comment: {
            comment: "",
            rate: 1,
            elementId: this.props.asin,
          },
        }); */
        setCommentText("");
        setRate(1);
        setElementId(props.asin);
      } else {
        throw new Error("Qualcosa è andato storto");
      }
    } catch (error) {
      alert(error);
    }
  };

  /*   render() { */
  return (
    <div className="my-3">
      <Form onSubmit={sendComment}>
        <Form.Group className="mb-2">
          <Form.Label>Recensione</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci qui il testo"
            /*               value={this.state.comment.comment}
              onChange={(e) =>
                this.setState({
                  comment: {
                    ...this.state.comment,
                    comment: e.target.value,
                  },
                })
              } */
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Valutazione</Form.Label>
          <Form.Control
            as="select"
            /*               value={this.state.comment.rate}
              onChange={(e) =>
                this.setState({
                  comment: {
                    ...this.state.comment,
                    rate: e.target.value,
                  },
                })
              } */
            value={rate}
            onChange={(e) => setRate(parseInt(e.target.value))}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Invia
        </Button>
      </Form>
    </div>
  );
};
/* } */

export default AddComment;
