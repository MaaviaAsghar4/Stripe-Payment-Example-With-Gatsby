import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import styles from "../styles/index.module.css";
import { loadStripe } from "@stripe/stripe-js";

export interface productType {
  unit_amount: number;
  product: {
    images: string[];
    name: string;
    description: string;
  };
  id: string;
}

const IndexPage = () => {
  const redirectToCheckout = async (e: React.FormEvent, productID: string) => {
    e.preventDefault();
    const stripe = await loadStripe(
      "pk_test_51I57h8IUr09x1a6fSKpVNKLZvTRYfS0C8wXhiUflQvE122dQuusow5BR04LRvw6ue8ZmPeH3XJrw376fvmtDlaBl00GMDNz0iz"
    );
    const { error } = await stripe!.redirectToCheckout({
      mode: "payment",
      lineItems: [{ price: productID, quantity: 1 }],
      successUrl: "http://localhost:8000/Success",
      cancelUrl: "http://localhost:8000/Failure",
    });

    if (error) {
      console.warn("Error:", error);
    }
  };
  const data = useStaticQuery(graphql`
    query MyQuery {
      allStripePrice {
        nodes {
          unit_amount
          product {
            images
            name
            description
          }
          id
        }
      }
    }
  `);
  return (
    <main>
      <title>Home Page</title>
      <div className={styles.head}>
        <h1>Best Furniture In The Town</h1>
        <h2>Celebrate Your Life With Classic Furniture</h2>
      </div>
      <div className={styles.productContainer}>
        {data &&
          data.allStripePrice.nodes.map((products: productType) => {
            return (
              <div className={styles.product} key={products.id}>
                <img
                  src={products.product.images[0]}
                  alt={products.product.name}
                />
                <h3>{products.product.name}</h3>
                <span>USD: ${products.unit_amount / 100}</span>
                <p>{products.product.description}</p>
                <button onClick={(e) => redirectToCheckout(e, products.id)}>
                  Add To Cart
                </button>
              </div>
            );
          })}
      </div>
    </main>
  );
};

export default IndexPage;
