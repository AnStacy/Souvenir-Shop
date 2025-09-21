"use client";

import Link from "next/link";
import styles from "../page.module.css";
import { useCart } from "../context/CartContext";
import Image from "next/image";

const fmt = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    n
  );

export default function CartPage() {
  const { items, updateQty, removeFromCart, totals } = useCart();

  if (items.length === 0) {
    return (
      <main className={styles.container}>
        <h1 className={styles.title}>Your Cart</h1>
        <p className={styles.empty}>Cart is empty</p>
        <Link className={styles.link} href="/">
          <span className={styles.linkText}>Go to catalog</span>
        </Link>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Your Cart</h1>
      <ul className={styles.list}>
        {items.map((it) => (
          <li key={it.id} className={styles.item}>
            <Image
              src={it.image}
              alt={it.name}
              className={styles.thumb}
              width={400}
              height={400}
            />

            <div className={styles.info}>
              <h2 className={styles.name}>{it.name}</h2>
              <p className={styles.price}>{fmt(it.price)}</p>

              <div className={styles.qtyRow}>
                <button
                  className={styles.qtyBtn}
                  onClick={() => updateQty(it.id, it.qty - 1)}
                  aria-label="decrease quantity"
                >
                  -
                </button>
                <span className={styles.qty}>{it.qty}</span>
                <button
                  className={styles.qtyBtn}
                  onClick={() => updateQty(it.id, it.qty + 1)}
                  aria-label="increase quantity"
                >
                  +
                </button>

                <button
                  className={styles.remove}
                  onClick={() => removeFromCart(it.id)}
                >
                  Remove
                </button>
              </div>
            </div>

            <div className={styles.lineTotal}>{fmt(it.price * it.qty)}</div>
          </li>
        ))}
      </ul>
      <div className={styles.summary}>
        <p>Subtotal: </p>
        <p className={styles.total}>{fmt(totals.subtotal)}</p>
      </div>
      <div className={styles.actions}>
        <Link className={styles.secondary} href="/">
          Continue Shopping
        </Link>
        <Link className={styles.primary} href="/checkout">
          Proceed to checkout
        </Link>
      </div>
    </main>
  );
}
