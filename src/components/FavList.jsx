import { BsCartPlus, BsTrash3Fill } from "react-icons/bs";
import { FcRating } from "react-icons/fc";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from "reactstrap";

export const FavListComponent = ({
  id,
  title,
  price,
  rating,
  description,
  category,
  image,
  addToCart,
  handleDeleteFromFav,
}) => {
  const rate = Math.round(rating.rate);
  let stars = new Array(rate).fill("star");
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

        {/* <CardSubtitle className="mb-2 text-muted">{description}</CardSubtitle> */}

        <CardText style={{ fontSize: "24px" }}>Price: ${price}</CardText>

        <div className="action-btns">
          <Button
            onClick={() => {
              addToCart(id);
              handleDeleteFromFav(id);
            }}
          >
            <BsCartPlus style={{ fontSize: "22px" }} />
          </Button>
          <Button onClick={() => handleDeleteFromFav(id)}>
            <BsTrash3Fill style={{ fontSize: "22px" }} />
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
