This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn / npm install
yarn dev  / npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Trigger orders from site location

To trigger orders from a specific site location use the orders path and pass a "site" parameter with the location.
So ordering from table 5 in VENUE_NAME would be
https://ordercloud.bg/orders/VENUE_NAME?site=5

## Guidelines for images

### Menu

- Product Images: Square(1:1 ratio)
- Category Images: Landscape(3:1 ratio w:h)

### Customization

- Venue Logo Image: Square(1:1 ratio)
- Venue Cover Image: Landscape(4:1 ratio w:h)
