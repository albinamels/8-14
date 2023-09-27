import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap";
import { FcLike, FcLikePlaceholder, FcRating } from "react-icons/fc";
import { BsCartPlus, BsCartCheckFill } from "react-icons/bs";

function ModalComp({
  id,
  title,
  price,
  rating,
  description,
  category,
  image,
  addToCart,
  addToFav,
  checkFav,
  checkCart,
}) {
  const isFav = checkFav(id);
  const isCart = checkCart(id);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const rate = Math.round(rating.rate);
  let stars = new Array(rate).fill("star");

  return (
    <div>
      <Button color="secondary" onClick={toggle}>
        More Info
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
        fullscreen
        style={{ padding: "30px 160px" }}
      >
        {/* <Modal isOpen={modal} toggle={toggle}> */}
        <ModalHeader>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            {category}
          </CardSubtitle>
        </ModalHeader>

        <ModalBody className="d-flex">
          <div className="m-4 p-4">
            <img src={image} width={400} />
          </div>
          <CardBody className="m-4 p-4">
            <CardTitle className="card-title mt-3" tag="h5">
              {title}
            </CardTitle>

            <CardTitle className="card-title mt-3">{description}</CardTitle>

            <CardTitle className="card-title mt-3" tag="h5">
              {stars.map((star) => {
                return <FcRating />;
              })}{" "}
              {rating.rate}
            </CardTitle>

            <CardText className="mb-5" tag="h5">
              Price: ${price.toFixed(2)}
            </CardText>

            <Button onClick={() => addToCart(id)}>
              {isCart ? (
                <BsCartCheckFill
                  style={{ fontSize: "24px", color: "yellow" }}
                />
              ) : (
                <BsCartPlus style={{ fontSize: "22px" }} />
              )}
            </Button>

            <Button style={{ marginLeft: "10px" }} onClick={() => addToFav(id)}>
              {isFav ? (
                <FcLike style={{ fontSize: "24px" }} />
              ) : (
                <FcLikePlaceholder />
              )}
            </Button>
          </CardBody>
        </ModalBody>

        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalComp;
