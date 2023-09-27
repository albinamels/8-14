import { FcLike, FcLikePlaceholder, FcRating } from "react-icons/fc";
import { BsCartPlus, BsCartCheckFill } from "react-icons/bs";

import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from "reactstrap";
import ModalComp from "./ModalComponent";

export const Product = ({
  id,
  title,
  rating,
  price,
  description,
  category,
  image,
  addToCart,
  addToFav,
  checkFav,
  checkCart,
}) => {
  const modalProps = {
    id,
    title,
    rating,
    price,
    description,
    category,
    image,
    addToCart,
    addToFav,
    checkFav,
    checkCart,
  };
  const isFav = checkFav(id);
  const isCart = checkCart(id);

  const rate = Math.round(rating.rate);
  let stars = new Array(rate).fill("star");
  // const stars = [];
  // for (let i = 1; i <= rate; i++) {
  //   stars.push(i);
  // }

  return (
    <Card style={{ width: "16rem" }}>
      <div className="img-container">
        <img src={image} />
      </div>

      <CardBody>
        <CardTitle className="card-title" tag="h5">
          {title}
        </CardTitle>
        <CardTitle className="card-title" tag="h5">
          {stars.map((star) => {
            return <FcRating />;
          })}{" "}
          {rating.rate}
        </CardTitle>
        {/* <CardSubtitle className="mb-2 text-muted" tag="h6">
          {category}
        </CardSubtitle> */}
        <CardText tag="h5">Price: ${price.toFixed(2)}</CardText>
      </CardBody>

      <div className="action-btns">
        <ModalComp {...modalProps} />

        <Button onClick={() => addToCart(id)}>
          {isCart ? (
            <BsCartCheckFill style={{ fontSize: "24px", color: "yellow" }} />
          ) : (
            <BsCartPlus style={{ fontSize: "22px" }} />
          )}
        </Button>

        <Button onClick={() => addToFav(id)}>
          {isFav ? (
            <FcLike style={{ fontSize: "24px" }} />
          ) : (
            <FcLikePlaceholder />
          )}
        </Button>
      </div>
    </Card>
  );
};
