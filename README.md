# clone repo
git clone https://github.com/sanjivani-rajoriya/resizable-panels.git
cd resizable-panels

# Install dependencies
npm install

# Run the development server
npm run dev

# Design Decisions

1. Next.js
Provides strong typing and modern app structure with the App Router.

2. Single State Management (no Context/Redux)
For simplicity, all form state is handled in the main component with useState. This avoids unnecessary complexity.

3. TailwindCSS
Used for fast styling with utility classes.

4. Added styles and functionality to manage resolution and resize widths
