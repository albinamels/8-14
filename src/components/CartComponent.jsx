import {
  Button,
  Table,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { BsTrash3Fill } from "react-icons/bs";

export const CartComponent = ({
  cart,
  updateQuantity,
  handleDeleteFromCart,
}) => {
  const numbers = [];
  for (let i = 1; i <= 10; i++) {
    numbers.push(i);
  }
  return (
    <Table hover style={{ width: "80vw", margin: "50px auto" }}>
      <thead>
        <tr>
          <th></th>
          <th>Image</th>
          <th>Title</th>
          <th>Price $</th>
          <th>Quantity</th>
          <th>Total $</th>
        </tr>
      </thead>
      <tbody>
        {cart.map((cartItem) => {
          const { id, image, title, price, quantity } = cartItem;
          return (
            <>
              <tr key={id}>
                <th>
                  <Button onClick={() => handleDeleteFromCart(id)}>
                    <BsTrash3Fill />
                  </Button>
                </th>
                <td>
                  <img src={image} height={60} />
                </td>
                <td>{title}</td>
                <td>{price.toFixed(2)}</td>
                <td>
                  <UncontrolledDropdown>
                    <DropdownToggle caret color="secondary">
                      {quantity}
                    </DropdownToggle>
                    <DropdownMenu dark>
                      {numbers.map((number) => {
                        return (
                          <DropdownItem
                            onClick={() => updateQuantity(id, number)}
                          >
                            {number}
                          </DropdownItem>
                        );
                      })}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </td>
                <td>{(price * quantity).toFixed(2)}</td>
              </tr>
            </>
          );
        })}
      </tbody>
      <tfoot>
        <h3>
          Cart Total $:
          {cart.length > 0 &&
            cart
              .reduce((acc, cartItem) => {
                return (acc += cartItem.price * cartItem.quantity);
              }, 0)
              .toFixed(2)}
        </h3>
      </tfoot>
    </Table>
  );
};
