# Adrenaline Moto branding, contact page, and admin cleanup

## What will change
- Extract the supplied Adrenaline Moto mark into a clean, transparent logo and use it across the storefront and admin area.
- Update the visual identity to match the reference: black/charcoal surfaces, strong red highlights, crisp white text, and restrained metallic details.
- Rename the default storefront identity to **Adrenaline Moto / ادرينالين موتو**.
- Change the default WhatsApp contact to **01121363214** (stored in international format for WhatsApp links) and set the supplied Google Maps location.
- Add a public **Contact us** page with WhatsApp, Facebook, TikTok, Instagram, and location links.
- Add Contact us to desktop navigation, mobile navigation, and the footer.
- Expand admin settings so the business name, phone, map, and all social links can be edited.
- Reorder the admin menu around common work: Overview, Products, Categories, Contact & settings; improve mobile navigation and page titles.
- Fix the current admin route/navigation inconsistencies and existing form/list errors so create, edit, delete, and navigation actions work reliably.

## Data and access
- Extend the existing store settings record with Facebook, TikTok, and Instagram fields.
- Keep settings publicly readable so the storefront can display them.
- Keep changes restricted to signed-in administrators.
- Preserve existing products, categories, users, and images.

## Verification
- Check storefront and admin flows at desktop and mobile sizes.
- Verify all navigation links, contact actions, admin saving, and logo rendering.
- Confirm every public content page has Arabic page title and sharing metadata.
- Confirm the latest project build has no errors.

## Technical details
- The supplied image is used as the source for a cleaned transparent brand asset, not displayed with its large black margins.
- WhatsApp links will use the Egyptian international number `201121363214`, while the visible number remains `01121363214`.
- The supplied Maps URL will be normalized to an absolute `https://` link.
