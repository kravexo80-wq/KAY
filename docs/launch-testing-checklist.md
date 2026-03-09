# Kravexo Launch Testing Checklist

Use this checklist against the deployed site before launch. Run the English pass first, then repeat the core storefront and checkout flow in Arabic.

## 1. Test Setup

- Confirm production environment variables are present in Vercel for auth, catalog, storage, checkout, and webhook handling.
- Confirm the latest database migrations and seed data are applied in the live Supabase project.
- Prepare two accounts:
  - one customer account
  - one admin account
- Prepare one active in-stock product, one inactive product, and one product with very low stock.
- Prepare one active category and one active collection assigned to at least one product.
- Prepare a Stripe test card and make sure the webhook endpoint is active.

## 2. Storefront Browsing

- Open `/en` and confirm the homepage loads without placeholder failures.
- Open `/ar` and confirm the homepage switches to RTL layout, Arabic copy, and Arabic navigation labels.
- Open `/en/shop` and `/ar/shop`.
- Open `/en/collections` and `/ar/collections`.
- Open at least one collection detail page in both languages.
- Open at least one product detail page in both languages.
- Confirm inactive products do not appear publicly.
- Confirm inactive categories and collections do not appear publicly.
- Confirm product images render correctly and the gallery still works with real uploaded assets.

## 3. Language And Routing

- Use the header language toggle on homepage, shop, collection detail, product detail, cart, login, account, and admin pages.
- Confirm switching language keeps the same page when possible.
- Confirm English stays LTR and Arabic stays RTL.
- Confirm logout returns to the correct localized homepage.
- Confirm login redirects preserve localized routes.

## 4. Customer Auth

- Sign up a new customer account with a valid password.
- Try a weak password and confirm the form blocks it clearly.
- Try mismatched password confirmation and confirm the form blocks it clearly.
- Log in with the new account.
- Log out.
- Run forgot-password and confirm the reset request flow completes.
- Complete the reset flow and confirm the new password works.

## 5. Customer Cart And Checkout

- Add a product to cart from the product page.
- Add the same variant again and confirm quantity increments instead of creating a duplicate line.
- Change quantity from the cart page.
- Remove an item from the cart page.
- Add an item in English, then switch to Arabic and confirm the cart is still correct.
- Try adding a variant with low stock until the stock limit message appears.
- Proceed to checkout from cart.
- Confirm checkout loads the correct items, prices, subtotal, shipping state, and total.
- Cancel from Stripe and confirm the cancel page loads correctly.
- Complete a successful Stripe test payment and confirm the success page loads correctly.

## 6. Orders

- After successful payment, confirm the customer account shows the new order.
- Open the customer order detail page and confirm:
  - order number
  - payment status
  - order status
  - line items
  - selected size and color
  - shipping summary
  - billing summary when present
- Confirm the admin orders list shows the same order.
- Open the admin order detail page and update the order status.
- Confirm the updated status appears consistently in admin and customer order views if intended by the current flow.

## 7. Inventory

- Use a low-stock product and complete a successful payment.
- Confirm stock decreases exactly once after payment.
- Confirm the same stock is reflected in admin product editing.
- Try purchasing beyond available stock and confirm the site blocks the action cleanly.
- If possible, repeat the checkout with the same low-stock item and confirm unavailable inventory is surfaced clearly.

## 8. Admin Catalog

- Log in as admin and confirm `/admin` is accessible.
- Confirm a customer account is redirected away from `/admin`.
- Create a new category.
- Edit that category and confirm slug, bilingual content, and active state save correctly.
- Create a new collection.
- Edit that collection and confirm slug, bilingual content, featured state if present, and active state save correctly.
- Create a new product with:
  - English and Arabic names
  - English and Arabic descriptions
  - category assignment
  - collection assignment
  - at least one variant
  - at least one image
- Edit that product and confirm updates appear on the storefront.
- Toggle active/inactive and featured states and confirm storefront visibility behaves correctly.

## 9. Admin Images

- Upload a new product image from the admin editor.
- Confirm the image preview appears in admin after save.
- Confirm the storefront product page uses the uploaded image.
- Reorder images and confirm the primary image changes correctly.
- Remove an uploaded image and confirm the product still renders correctly afterward.
- Test manual image URL fallback on one image row if you plan to keep using it.

## 10. Trust And SEO Pages

- Open About, Contact, FAQ, Shipping & Returns, Privacy Policy, and Terms in English and Arabic.
- Confirm each page has localized headings and readable layout.
- Share at least one storefront page URL and confirm Open Graph/title/description look reasonable.
- Confirm browser tab title and favicon look correct on core pages.

## 11. Final Launch Gate

- No console-breaking runtime errors on major flows.
- No dead-end buttons in customer or admin flows.
- No missing-image failures on primary catalog pages.
- No broken localized route transitions.
- No checkout failure for a correctly configured test order.
- No stock mismatch after a successful paid order.

## 12. Issue Logging Format

When something fails, capture:

- exact page URL
- active language
- signed-in role
- product slug or order number if relevant
- action taken
- visible error message
- whether the problem is reproducible
