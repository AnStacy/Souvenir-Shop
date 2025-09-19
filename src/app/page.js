"use client";

import styles from "./page.module.css";
import { useCart } from "./context/CartContext";
import Link from "next/link";
import Image from "next/image";

const PRODUCTS = [
  {
    id: "doll",
    name: "Ukrainian Doll",
    price: 24.99,
    image: "/doll.png",
    stock: 8,
  },
  {
    id: "tote",
    name: "Ukrainian Tote",
    price: 23.99,
    image: "/tote.png",
    stock: 7,
  },
  {
    id: "keychain",
    name: "Keychain",
    price: 11.99,
    image: "/keychain.png",
    stock: 18,
  },
  {
    id: "earrings",
    name: "Earrings",
    price: 15.99,
    image: "/earrings.png",
    stock: 12,
  },
  {
    id: "mug",
    name: "Mug",
    price: 9.99,
    image: "/mug.png",
    stock: 24,
  },
  {
    id: "magnet",
    name: "Fridge Magnet",
    price: 5.99,
    image: "/magnet.png",
    stock: 29,
  },
];

const fmt = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    n
  );

export default function Home() {
  const { addToCart } = useCart();

  return (
    <main className={styles.container}>
      <div className={styles.navigation}>
        <Link className={styles.title} href="/">
          Souvenirs
        </Link>
        <Link className={styles.cardHref} href="./cart">
          Cart
        </Link>
      </div>
      <ul className={styles.grid}>
        {PRODUCTS.map((p) => (
          <li key={p.id} className={styles.card}>
            <Image
              src={p.image}
              alt={p.name}
              className={styles.image}
              width={400}
              height={400}
            />
            <div className={styles.info}>
              <h2 className={styles.name}>{p.name}</h2>
              <p className={styles.price}>{fmt(p.price)}</p>
              <button className={styles.btn} onClick={() => addToCart(p, 1)}>
                Add to cart
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
