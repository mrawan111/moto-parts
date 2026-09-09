# MotoParts Hub

Build a complete Arabic RTL responsive motorcycle spare parts catalog website.

The website is for a motorcycle spare parts business.

IMPORTANT:

This is NOT a full e-commerce checkout system.

There is NO customer authentication.

Customers browse products and order/inquire through WhatsApp.

Use Supabase as the backend database, authentication system, and image storage.

==================================================

1. GENERAL BUSINESS IDEA

==================================================

Create a simple, modern Arabic motorcycle spare parts catalog.

Customers should be able to:

- Browse all motorcycle spare parts

- View product details

- View multiple product images

- Search for products

- Filter products by categories

- Browse hierarchical categories

- See product price

- See whether the product is available or sold out

- Click "اطلب عبر واتساب" to contact the business through WhatsApp

WhatsApp receiver number:

01274498847

Use the international format when generating the WhatsApp URL:

201274498847

The WhatsApp button should open a pre-filled message containing:

- Product name

- Product price

- A short request to order/inquire

Example:

السلام عليكم،

أريد الاستفسار عن المنتج:

اسم المنتج: تيل فرامل أمامي

السعر: 250 جنيه

==================================================

2. LANGUAGE AND DIRECTION

==================================================

The entire customer-facing website must be Arabic.

Use:

- Arabic RTL layout

- Arabic labels

- Arabic buttons

- Arabic navigation

- Arabic product information

- Arabic empty states

- Arabic validation messages

- Arabic admin interface

Use a professional Arabic font such as Cairo or Tajawal.

The interface must feel natural for Egyptian Arabic users.

Currency:

EGP / جنيه

==================================================

3. VISUAL IDENTITY

==================================================

Use the attached reference image as inspiration for the visual identity.

The visual style should be inspired by the motorcycle spare parts shop sign shown in the reference image.

Main visual direction:

- Strong red

- Yellow

- Green

- Black/dark outlines

- High contrast

- Automotive / motorcycle spare parts feeling

- Bold Arabic typography

- Energetic but professional

DO NOT simply copy the image.

Instead, create a modern digital version of the same visual identity.

The website should look like a professional motorcycle spare parts business, not a generic SaaS template.

Use subtle gradients where appropriate.

The main colors should be based around:

- Red

- Yellow

- Green

- Dark charcoal/black

- White

Use the colors carefully so the website remains clean and readable.

Avoid excessive animations.

Use subtle hover effects and smooth transitions.

==================================================

4. WEBSITE STRUCTURE

==================================================

Create the following public pages:

1. Home / Product Gallery

2. Product Details

3. Category filtered products

4. Search results

5. 404 page

Admin pages:

1. Admin Login

2. Admin Dashboard

3. Manage Products

4. Create Product

5. Edit Product

6. Manage Categories

7. Create Category

8. Edit Category

==================================================

5. CUSTOMER HOME PAGE

==================================================

Create a visually strong Arabic homepage.

Header:

- Business logo

- Business name

- Navigation

- Search icon / search field

- Categories access

Hero section:

- Motorcycle spare parts visual style

- Short Arabic headline

- Short description

- CTA to browse products

Example headline:

"قطع غيار موتوسيكلات بجودة تثق فيها"

Example subtitle:

"اكتشف مجموعة كبيرة من قطع غيار الموتوسيكلات واطلبها بسهولة عبر واتساب."

Then show category navigation.

Then show product gallery.

==================================================

6. PRODUCT GALLERY

==================================================

Products should be displayed as modern cards.

Each card should contain:

- Main product image

- Product name

- Short description

- Price

- Availability status

- Category / categories

- WhatsApp order button

Example:

[Product Image]

تيل فرامل أمامي

قطعة غيار مناسبة لـ ...

250 جنيه

متوفر

[ اطلب عبر واتساب ]

If sold out:

[ نفد من المخزون ]

The sold-out product should still appear in the catalog.

Visually display:

"غير متوفر"

or

"نفد"

clearly on the product card.

The WhatsApp order button should not be available for sold-out products.

==================================================

7. PRODUCT DETAILS PAGE

==================================================

Create a dedicated product details page.

Display:

- Large main product image

- Multiple product images

- Image gallery

- Product name

- Price

- Full description

- Availability

- Categories

- WhatsApp order button

Use a clean image gallery/lightbox.

The product page should be mobile friendly.

WhatsApp button should generate a pre-filled message.

Example:

السلام عليكم،

أريد طلب المنتج التالي:

اسم المنتج: [PRODUCT NAME]

السعر: [PRICE] جنيه

==================================================

8. SEARCH

==================================================

Add product search.

Search should work by:

- Product name

- Product description

Search interface must be Arabic and mobile friendly.

Show a proper empty state if no products are found.

Example:

"لم يتم العثور على منتجات مطابقة للبحث"

==================================================

9. CATEGORY SYSTEM

==================================================

Implement hierarchical categories.

A category can have a parent category.

Example:

هوجان

    ├── F50

    ├── H250

    └── F250

جاكي

    ├── R50

    └── J200

Database structure should support:

- Parent categories

- Child categories

- Unlimited category nesting if possible

However, the initial UI should focus on a simple parent -> child structure.

Admin must be able to:

- Create category

- Edit category

- Delete category

- Set parent category

- Change category name

- View child categories

==================================================

10. MULTIPLE CATEGORIES PER PRODUCT

==================================================

A product can belong to multiple categories.

Do NOT store only one category_id inside products.

Use a many-to-many relationship.

Example:

Product:

"تيل فرامل"

Categories:

- هوجان F50

- هوجان H250

- هوجان F250

Create an appropriate junction table such as:

product_categories

with:

product_id

category_id

==================================================

11. FILTERING

==================================================

Customers should be able to filter products.

Filters should include:

- Parent category

- Child category

- Multiple categories

The filtering interface should be simple and mobile friendly.

Example:

البراند:

[ هوجان ]

الموديل:

[ F50 ]

[ H250 ]

[ F250 ]

Allow users to clear filters.

Show the number of matching products if appropriate.

==================================================

12. ADMIN AUTHENTICATION

==================================================

Customers DO NOT need authentication.

Only administrators need authentication.

Create a secure admin login page.

Login fields:

- Username

- Password

Do NOT hardcode the admin password in frontend code.

Use secure Supabase authentication / backend authentication.

The admin area must not be accessible to unauthenticated users.

If an unauthenticated user attempts to access:

/admin

redirect them to:

/admin/login

Protect all admin routes.

==================================================

13. ADMIN DASHBOARD

==================================================

Create a simple professional dashboard.

Dashboard should show:

- Total products

- Available products

- Sold out products

- Total categories

- Recent products

Use simple cards/statistics.

Do not overcomplicate the dashboard.

==================================================

14. ADMIN PRODUCT CRUD

==================================================

Admin must be able to:

CREATE PRODUCT

EDIT PRODUCT

DELETE PRODUCT

VIEW PRODUCTS

Product fields:

- Name

- Description

- Price

- Images

- Availability status

- Categories

Product status should include:

AVAILABLE

SOLD_OUT

Admin should be able to easily change availability.

Example:

[ متوفر ]

[ نفد ]

When the admin marks a product as SOLD_OUT:

- Product remains visible to customers

- Product displays "نفد"

- WhatsApp order button is disabled/hidden

When changed back to AVAILABLE:

- Product becomes orderable again.

==================================================

15. PRODUCT IMAGE MANAGEMENT

==================================================

Products can have multiple images.

Use Supabase Storage.

Admin should be able to:

- Upload images

- Preview images

- Set main image

- Delete images

- Reorder images if practical

Optimize images for web display.

Use lazy loading on the public gallery.

==================================================

16. ADMIN CATEGORY CRUD

==================================================

Admin can:

- Add category

- Edit category

- Delete category

- Assign parent category

- View category hierarchy

Prevent accidental deletion of categories that are currently used by products.

If a category has products, show a confirmation/warning before deletion.

==================================================

17. DATABASE

==================================================

Use Supabase PostgreSQL.

Suggested schema:

profiles

---------

id

username

role

created_at

categories

----------

id

name

parent_id

created_at

updated_at

products

--------

id

name

description

price

status

created_at

updated_at

product_images

--------------

id

product_id

image_url

is_primary

sort_order

created_at

product_categories

------------------

product_id

category_id

Use UUID primary keys where appropriate.

Use foreign keys and proper indexes.

==================================================

18. DATABASE SECURITY

==================================================

Implement proper Supabase Row Level Security.

Public users:

- Can read available products

- Can read sold-out products

- Can read categories

- Cannot modify anything

Authenticated admin:

- Can create products

- Can update products

- Can delete products

- Can create categories

- Can update categories

- Can delete categories

- Can manage product images

Do not expose admin credentials in frontend source code.

==================================================

19. WHATSAPP INTEGRATION

==================================================

Use WhatsApp Click to Chat.

Receiver:

201274498847

Every product should have an:

"اطلب عبر واتساب"

button.

Generate a URL-encoded WhatsApp message.

Example message:

السلام عليكم،

أريد الاستفسار عن المنتج التالي:

اسم المنتج: [PRODUCT NAME]

السعر: [PRICE] جنيه

رابط المنتج:

[PRODUCT URL]

Open WhatsApp in a new tab/window.

Do not create a customer account.

Do not create online payment.

Do not create checkout.

==================================================

20. MOBILE DESIGN

==================================================

The website must be mobile-first.

Most customers will access the website from their phones and WhatsApp.

Requirements:

- Responsive product grid

- Mobile navigation

- Large touch-friendly buttons

- Sticky WhatsApp CTA where appropriate

- Fast image loading

- No horizontal scrolling

- Responsive admin panel

Test layouts for:

- Mobile

- Tablet

- Desktop

==================================================

21. UX

==================================================

Keep the UI simple.

Avoid unnecessary features.

The main customer journey should be:

Home

→ Browse categories

→ Filter/search

→ Open product

→ View details

→ Click WhatsApp

→ Send inquiry/order

Make this journey extremely easy.

==================================================

22. PRODUCT SORTING

==================================================

Add simple sorting options:

- الأحدث

- السعر من الأقل للأعلى

- السعر من الأعلى للأقل

- الاسم

==================================================

23. EMPTY STATES

==================================================

Create proper Arabic empty states.

Examples:

"لا توجد منتجات حالياً"

"لا توجد منتجات مطابقة للفلاتر"

"لا توجد نتائج للبحث"

==================================================

24. ERROR HANDLING

==================================================

Handle:

- Failed image uploads

- Failed database requests

- Invalid product data

- Invalid price

- Missing product

- Unauthorized admin access

- Failed category deletion

Show clear Arabic error messages.

==================================================

25. SEO

==================================================

Implement basic SEO.

For product pages:

- Dynamic page title

- Meta description

- Product name in title

- Clean URLs if possible

Example:

/products/front-brake-pads

or an Arabic-compatible slug.

Also add Open Graph metadata for sharing product links.

When a product link is shared on WhatsApp/social media, it should have a good preview containing:

- Product image

- Product name

- Website title

- Description

==================================================

26. PERFORMANCE

==================================================

Optimize for fast loading.

Use:

- Lazy loading images

- Optimized image sizes

- Efficient database queries

- Pagination or infinite scrolling if the number of products becomes large

- Proper indexes

- Avoid loading all large images at once

==================================================

27. ADMIN UI

==================================================

The admin interface should be visually related to the customer website but can be more functional.

Admin sidebar:

- Dashboard

- المنتجات

- إضافة منتج

- التصنيفات

- إضافة تصنيف

- تسجيل الخروج

Products table should show:

- Image

- Product name

- Price

- Categories

- Status

- Created date

- Edit

- Delete

Use confirmation dialogs before destructive actions.

==================================================

28. LOGO AND BRANDING

==================================================

Use the uploaded reference image as inspiration for the logo and visual identity.

If there is no separate logo asset available, create a clean placeholder/logo area that can later be replaced by the real business logo.

Do not invent a completely unrelated brand identity.

The visual identity should feel like a modern digital version of the motorcycle spare parts store shown in the reference.

==================================================

29. IMPORTANT DESIGN RULE

==================================================

Do NOT use the typical generic Lovable startup dashboard style.

The customer website should look like a real Egyptian motorcycle spare parts business.

Prioritize:

- Strong Arabic typography

- Red/yellow/green visual identity

- Motorcycle spare parts atmosphere

- Product photography

- Simple navigation

- High contrast

- Mobile usability

Keep the interface clean and professional.

==================================================

30. INITIAL SEED DATA

==================================================

Create a few example categories to demonstrate the hierarchy:

هوجان

    F50

    H250

    F250

Create several example products with placeholder images.

The seed/demo products should clearly demonstrate:

- Product with one category

- Product with multiple categories

- Available product

- Sold-out product

- Multiple product images

==================================================

31. FINAL REQUIREMENTS

==================================================

Before finishing:

- Make sure RTL works correctly everywhere.

- Make sure Arabic text is displayed correctly.

- Make sure admin routes are protected.

- Make sure customer routes require no authentication.

- Make sure sold-out products are still visible.

- Make sure sold-out products cannot be ordered through WhatsApp.

- Make sure products can belong to multiple categories.

- Make sure categories support parent/child relationships.

- Make sure product images are stored in Supabase Storage.

- Make sure Supabase RLS policies are implemented.

- Make sure WhatsApp messages are correctly URL encoded.

- Make sure the WhatsApp receiver is 201274498847.

- Make sure the website is responsive.

- Make sure there are no broken routes.

- Make sure loading and error states are implemented.

- Make sure the design is consistent across public and admin interfaces.

Build the complete working application, not just static UI mockups.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e9c739c8-9534-4863-a8fd-368ce6fab035).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
