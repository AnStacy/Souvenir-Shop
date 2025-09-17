"use client";

import { useMemo, useState } from "react";
import { useCart } from "../context/CartContext";
import styles from "../page.module.css";

const US_STATES = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

const fmt = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    n
  );

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

const isUSPhone = (v) =>
  /^(\+1\s?)?(\(?\d{3}\)?[\s-]?)\d{3}[\s-]?\d{4}$/.test(v.trim());

const isZip = (v) => /^\d{5}$/.test(v.trim());

export default function CheckoutPage() {
  const { items, totals } = useCart();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const [touched, setTouched] = useState({});

  const errors = useMemo(() => {
    const e = {};
    if (form.fullName.trim().length < 2)
      e.fullName = "Enter your name (min: 2 symbols)";
    if (!isUSPhone(form.phone)) e.phone = "Phone number (+1 555 555 5555)";
    if (!isEmail(form.email)) e.email = "Invalid email";
    if (!form.street.trim()) e.street = "Street required";
    if (!form.city.trim()) e.city = "City required";
    if (!US_STATES.includes(form.state)) e.state = "Choose state";
    if (!isZip(form.zip)) e.zip = "ZIP - 5 numbers";
    return e;
  }, [form]);

  const isValid = Object.keys(errors).length === 0 && items.length > 0;

  const onChange = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const onBlur = (key) => () => setTouched((t) => ({ ...t, [key]: true }));

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Checkout</h1>

      <div className={styles.gridCheckout}>
        <section className={styles.card}>
          <h2 className={styles.sectionTitle}>Contacts</h2>

          {/* Name */}
          <label className={styles.label}>
            Full Name
            <input
              className={`${styles.input} ${
                touched.fullName && errors.fullName ? styles.inputError : ""
              }`}
              type="text"
              value={form.fullName}
              onChange={onChange("fullName")}
              onBlur={onBlur("fullName")}
              placeholder="Jane Doe"
              autoComplete="name"
            />
            {touched.fullName && errors.fullName && (
              <span className={styles.error}>{errors.fullName}</span>
            )}
          </label>

          {/* Phone */}
          <label className={styles.label}>
            Phone Number
            <input
              className={`${styles.input} ${
                touched.phone && errors.phone ? styles.inputError : ""
              }`}
              type="tel"
              value={form.phone}
              onChange={onChange("phone")}
              onBlur={onBlur("phone")}
              placeholder="+1 555 555 5555"
              autoComplete="tel"
            />
            {touched.phone && errors.phone && (
              <span className={styles.error}>{errors.phone}</span>
            )}
          </label>

          {/* Email */}
          <label className={styles.label}>
            Email
            <input
              className={`${styles.input} ${
                touched.email && errors.email ? styles.inputError : ""
              }`}
              type="email"
              value={form.email}
              onChange={onChange("email")}
              onBlur={onBlur("email")}
              placeholder="jane@example.com"
              autoComplete="email"
            />
            {touched.email && errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </label>

          {/* Street */}
          <label className={styles.label}>
            Street Address
            <input
              className={`${styles.input} ${
                touched.street && errors.street ? styles.inputError : ""
              }`}
              type="text"
              value={form.street}
              onChange={onChange("street")}
              onBlur={onBlur("street")}
              placeholder="123 Main St"
              autoComplete="address"
            />
            {touched.street && errors.street && (
              <span className={styles.error}>{errors.street}</span>
            )}
          </label>

          {/* City */}
          <label className={styles.label}>
            City
            <input
              className={`${styles.input} ${
                touched.city && errors.city ? styles.inputError : ""
              }`}
              type="text"
              value={form.city}
              onChange={onChange("city")}
              onBlur={onBlur("city")}
              placeholder="Austin"
              autoComplete="address"
            />
            {touched.city && errors.city && (
              <span className={styles.error}>{errors.city}</span>
            )}
          </label>

          {/* State */}
          <label className={styles.label}>
            State
            <select
              className={`${styles.input} ${
                touched.state && errors.state ? styles.inputError : ""
              }`}
              value={form.state}
              onChange={onChange("state")}
              onBlur={onBlur("state")}
              autoComplete="address"
            >
              <option value="">Select State</option>
              {US_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {touched.state && errors.state && (
              <span className={styles.error}>{errors.state}</span>
            )}
          </label>

          {/* ZIP */}
          <label className={styles.label}>
            ZIP
            <input
              className={`${styles.input} ${
                touched.zip && errors.zip ? styles.inputError : ""
              }`}
              type="text"
              value={form.zip}
              onChange={onChange("zip")}
              onBlur={onBlur("zip")}
              placeholder="10001"
              inputMode="numeric"
              autoComplete="postal-code"
            />
            {touched.zip && errors.zip && (
              <span className={styles.error}>{errors.zip}</span>
            )}
          </label>

          {!isValid && (
            <div className={styles.noteSmall}>
              Fill out the form correctly and make sure there are items in your
              cart.
            </div>
          )}

          {/* Btn */}
          <button
            className={styles.payBtn}
            disabled={!isValid}
            onClick={() => {
              alert("Form is Valid");
            }}
          >
            Pay
          </button>

          {/* If cart is empty */}
          {items.length === 0 && (
            <div className={styles.note}>
              Your cart is empty — add products to continue.
            </div>
          )}
        </section>

        <aside className="styles.card">
          <h2 className={styles.sectionTitle}>Order Summary</h2>
          {items.length === 0 ? (
            <p className={styles.empty}> Cart is empty.</p>
          ) : (
            <>
              <div className={styles.totals}>
                <p>Subtotal</p>
                <div className={styles.totalNum}>{fmt(totals.subtotal)}</div>
              </div>

              <ul className={styles.summaryList}>
                {items.map((it) => (
                  <li key={it.id} className={styles.summaryItem}>
                    <div className={styles.summaryRowLeft}>
                      <img
                        className={styles.thumb}
                        src={it.image}
                        alt={it.name}
                      />
                      <div>
                        <div className={styles.itemName}>{it.name}</div>
                        <div className={styles.itemLineTotal}>
                          Total price: {fmt(it.price * it.qty)}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </aside>
      </div>
    </main>
  );
}
