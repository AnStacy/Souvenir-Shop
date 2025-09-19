"use client";

import { useCallback, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, US_STATES } from "../../lib/validation/checkoutSchema";
import { useCart } from "../context/CartContext";
import styles from "../page.module.css";
import Image from "next/image";

const fmt = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    n
  );

const formatPhone = (input) => {
  const digits = input.replace(/\D/g, "").slice(0, 10);
  const p1 = digits.slice(0, 3);
  const p2 = digits.slice(3, 6);
  const p3 = digits.slice(6, 10);
  if (digits.length > 6) return `(${p1}) ${p2}-${p3}`;
  if (digits.length > 3) return `(${p1}) ${p2}`;
  if (digits.length > 0) return `(${p1}`;
  return "";
};

export default function CheckoutPage() {
  const { items, totals } = useCart();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setValue,
    trigger,
  } = useForm({
    mode: "onTouched",
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      street: "",
      city: "",
      state: "",
      zip: "",
    },
  });

  const cartIsEmpty = items.length === 0;

  const onSubmit = async (data) => {
    if (cartIsEmpty) return;

    alert(
      "Form is valid ✅ (RHF + Zod). Next: create Stripe Checkout session."
    );
  };

  const showFormHint = !isValid || cartIsEmpty;

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Checkout</h1>

      <form
        className={styles.gridCheckout}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <section className={styles.card} aria-labelledby="billing-title">
          <h2 id="billing-title" className={styles.sectionTitle}>
            Contacts
          </h2>

          {/* Name */}
          <label className={styles.label}>
            Full Name
            <input
              className={`${styles.input} ${
                errors.fullName ? styles.inputError : ""
              }`}
              type="text"
              placeholder="Jane Doe"
              autoComplete="name"
              {...register("fullName")}
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? "err-fullName" : undefined}
            />
            {errors.fullName && (
              <span id="err-fullName" className={styles.error} role="alert">
                {errors.fullName.message}
              </span>
            )}
          </label>

          {/* Phone */}
          <label className={styles.label}>
            Phone Number
            <Controller
              name="phone"
              control={control}
              render={({ field: { value, onChange, onBlur } }) => (
                <input
                  className={`${styles.input} ${
                    errors.phone ? styles.inputError : ""
                  }`}
                  type="tel"
                  inputMode="tel"
                  placeholder="(123) 456-7890"
                  autoComplete="tel"
                  value={value}
                  onChange={(e) => {
                    const masked = formatPhone(e.target.value);
                    onChange(masked);
                    trigger("phone");
                  }}
                  onBlur={onBlur}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "err-phone" : undefined}
                />
              )}
            />
            {errors.phone && (
              <span id="err-phone" className={styles.error} role="alert">
                {errors.phone.message}
              </span>
            )}
          </label>

          {/* Email */}
          <label className={styles.label}>
            Email
            <input
              className={`${styles.input} ${
                errors.email ? styles.inputError : ""
              }`}
              type="email"
              inputMode="email"
              placeholder="jane@example.com"
              autoComplete="email"
              {...register("email")}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "err-email" : undefined}
            />
            {errors.email && (
              <span id="err-email" className={styles.error} role="alert">
                {errors.email.message}
              </span>
            )}
          </label>

          {/* Street */}
          <label className={styles.label}>
            Street Address
            <input
              className={`${styles.input} ${
                errors.street ? styles.inputError : ""
              }`}
              type="text"
              placeholder="123 Main St"
              autoComplete="address"
              {...register("street")}
              aria-invalid={!!errors.street}
              aria-describedby={errors.street ? "err-street" : undefined}
            />
            {errors.street && (
              <span id="err-street" className={styles.error} role="alert">
                {errors.street.message}
              </span>
            )}
          </label>

          {/* City */}
          <label className={styles.label}>
            City
            <input
              className={`${styles.input} ${
                errors.city ? styles.inputError : ""
              }`}
              type="text"
              placeholder="Austin"
              autoComplete="address"
              {...register("city")}
              aria-invalid={!!errors.city}
              aria-describedby={errors.city ? "err-city" : undefined}
            />
            {errors.city && (
              <span id="err-city" className={styles.error} role="alert">
                {errors.city.message}
              </span>
            )}
          </label>

          {/* State */}
          <label className={styles.label}>
            State
            <select
              className={`${styles.input} ${
                errors.state ? styles.inputError : ""
              }`}
              {...register("state")}
              autoComplete="address"
              aria-invalid={!!errors.state}
              aria-describedby={errors.state ? "err-state" : undefined}
            >
              <option value="">Select State</option>
              {US_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {errors.state && (
              <span id="err-state" className={styles.error} role="alert">
                {errors.state.message}
              </span>
            )}
          </label>

          {/* ZIP */}
          <label className={styles.label}>
            ZIP
            <input
              className={`${styles.input} ${
                errors.zip ? styles.inputError : ""
              }`}
              type="text"
              placeholder="10001"
              inputMode="numeric"
              autoComplete="postal-code"
              {...register("zip")}
              aria-invalid={!!errors.zip}
              aria-describedby={errors.zip ? "err-zip" : undefined}
            />
            {errors.zip && (
              <span id="err-zip" className={styles.error} role="alert">
                {errors.zip.message}
              </span>
            )}
          </label>

          {showFormHint && (
            <div className={styles.noteSmall} aria-live="polite">
              {cartIsEmpty
                ? "Your cart is empty — add products to continue."
                : "Fill out the form correctly to continue."}
            </div>
          )}

          {/* Btn */}
          <button
            type="submit"
            className={styles.payBtn}
            disabled={!isValid || isSubmitting || cartIsEmpty}
            aria-busy={isSubmitting}
            aria-disabled={!isValid || cartIsEmpty}
          >
            {isSubmitting ? "Processing..." : "Pay"}
          </button>
        </section>

        <aside className={styles.card} aria-labelledby="summary-title">
          <h2 id="summary-title" className={styles.sectionTitle}>
            Order Summary
          </h2>
          {cartIsEmpty ? (
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
                      <Image
                        className={styles.thumb}
                        src={it.image}
                        alt={it.name}
                        width={400}
                        height={400}
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
      </form>
    </main>
  );
}
