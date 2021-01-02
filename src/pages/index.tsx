import React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import styles from "../styles/index.module.css";

export interface productType {
  unit_amount: number;
  product: {
    id: string;
    images: string[];
    name: string;
    description: string;
  };
}

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      allStripePrice {
        nodes {
          unit_amount
          product {
            id
            images
            name
            description
          }
        }
      }
    }
  `);
  return (
    <main>
      <title>Home Page</title>
      <div className={styles.container}>
        <div className={styles.logo}>Furniture Website</div>
        <div>
          <Link className={styles.links} to="Product/">
            Cart
          </Link>
          <sup className={styles.cart}>{0}</sup>
        </div>
      </div>
      <div className={styles.head}>
        <h1>Best Furniture In The Town</h1>
        <h2>Celebrate Your Life With Classic Furniture</h2>
      </div>
      <div className={styles.productContainer}>
        {data &&
          data.allStripePrice.nodes.map((products: productType) => {
            return (
              <div className={styles.product} key={products.product.id}>
                <img
                  src={products.product.images[0]}
                  alt={products.product.name}
                />
                <h3>{products.product.name}</h3>
                <span>USD: {products.unit_amount}</span>
                <p>{products.product.description}</p>
                <button>Add To Cart</button>
              </div>
            );
          })}
      </div>
    </main>
  );
};

export default IndexPage;
