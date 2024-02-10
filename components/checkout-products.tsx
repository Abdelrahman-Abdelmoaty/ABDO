"use client";
import { useCart } from "@/store/CartProvider";

export default function CheckoutProducts() {
  const { cart } = useCart()();

  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="font-semibold text-left text-gray-500">Product</th>
          <th className="text-sm text-gray-500">
            <center>Size</center>
          </th>
          <th className="text-sm text-gray-500">
            <center>Color</center>
          </th>
          <th className="text-sm text-gray-500">
            <center>Price</center>
          </th>
          <th className="text-sm opacity-0">
            <center>x</center>
          </th>
          <th className="text-sm text-gray-500">
            <center>Qty</center>
          </th>
          <th className="text-sm text-gray-500">
            <center>Total</center>
          </th>
        </tr>
      </thead>
      <tbody></tbody>
      {cart.map((product) => (
        <tr key={product.id}>
          <td className="font-semibold text-left">{product.name}</td>
          <td className="text-sm text-gray-500 uppercase">
            <center>{product.size}</center>
          </td>
          <td className="text-sm text-gray-500 capitalize">
            <center>{product.color.name}</center>
          </td>
          <td className="text-sm text-gray-500">
            <center>${product.price}</center>
          </td>
          <td className="text-sm text-gray-500">
            <center>x</center>
          </td>
          <td className="text-sm text-gray-500">
            <center>{product.quantity}</center>
          </td>
          <td className="text-sm text-gray-500">
            <center>${product.price * product.quantity}</center>
          </td>
        </tr>
      ))}
    </table>
  );
}
