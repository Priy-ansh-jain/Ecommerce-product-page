import Product from "./Product";

// Define a functional component called Trending.
const Trending = () => {
  // Create an array of product objects, each containing details such as name, images, text, price, salePrice, discount, and link.
  const products = [
    {
      name: "Jolly Good Swing",
      images: [
        "https://res.cloudinary.com/larq/image/upload/q_auto,f_auto/w_900/v1701177839/SKU/SPA/v3/SET-3XSWIGM.png",
        "https://res.cloudinary.com/larq/image/upload/q_auto,f_auto/w_910/v1701177839/SKU/SPA/v3/SET-3XSWIGL.png",
      ],
      text: ["23 oz", "34 oz"],
      price: ["119.85", "149.85"],
      salePrice: ["104.93", "114.93"],
      discount: ["12.92%", "27.86%"],
      link: "/bottle1",
    },
    {
      name: "Pure Vibes",
      images: [
        "https://res.cloudinary.com/larq/image/upload/q_auto,f_auto/w_900/v1701177839/SKU/SPA/v3/SET-FLIP-UVC-STRAW-M-OB.png",
        "https://res.cloudinary.com/larq/image/upload/q_auto,f_auto/w_900/v1701177839/SKU/SPA/v3/SET-FLIP-UVC-STRAW-M-GW.png",
        "https://res.cloudinary.com/larq/image/upload/q_auto,f_auto/w_900/v1701177839/SKU/SPA/v3/SET-FLIP-UVC-STRAW-M-SM.png",
      ],
      text: ["Obsidian Black", "Granite White", "Seaside Mint"],
      price: ["129.85", "129.85", "129.85"],
      salePrice: ["109.00", "109.00", "109.00"],
      discount: ["20%", "20%", "20%"],
      link: "/bottle2",
    },
    {
      name: "LARQ Bottle PureVis",
      images: [
        "https://res.cloudinary.com/larq/image/upload/q_auto,f_auto/w_900/v1701177839/SKU/SPA/v3/BDMB050A.png",
        "https://res.cloudinary.com/larq/image/upload/q_auto,f_auto/w_900/v1701177839/SKU/SPA/v3/BDOB050A.png",
        "https://res.cloudinary.com/larq/image/upload/q_auto,f_auto/w_900/v1701177839/SKU/SPA/v3/BDSM050A.png",
        "https://res.cloudinary.com/larq/image/upload/q_auto,f_auto/w_900/v1701177839/SKU/SPA/v3/BDGW050A.png",
        "https://res.cloudinary.com/larq/image/upload/q_auto,f_auto/w_900/v1701177839/SKU/SPA/v3/BDHP050A.png",
      ],
      text: [
        "Moaco Blue",
        "Obsidian Black",
        "Seaside Mint",
        "Granite White",
        "Himalayan Pink",
      ],
      price: ["99.00", "99.00", "99.00", "99.00", "99.00"],
      salePrice: ["89.00", "89.00", "89.00", "89.00", "89.00"],
      discount: ["12.92%", "17.02%", "17.02%", "17.02%", "17.02%"],
      link: "/bottle3",
    },
    {
      name: "LARQ Pitcher PureVis™",
      images: [
        "https://res.cloudinary.com/larq/image/upload/q_auto,f_auto/w_900/v1701177839/SKU/SPA/v3/PAMB190A.png",
        "https://res.cloudinary.com/larq/image/upload/q_auto,f_auto/w_900/v1701177839/SKU/SPA/v3/PAPW190A.png",
      ],
      text: ["Monaco Blue", "Pure White"],
      price: ["168.00", "168.00"],

      // salePrice: ["139.00", "139.00"],
      link: "/bottle4",
    },
    {
      name: "LARQ Bottle Swig Top",
      images: [
        "https://res.cloudinary.com/larq/image/upload/q_auto,f_auto/w_900/v1701177839/SKU/SPA/v3/BNWOB068A.png",
        "https://res.cloudinary.com/larq/image/upload/q_auto,f_auto/w_900/v1701177839/SKU/SPA/v3/BNWGW068A.png",
        "https://res.cloudinary.com/larq/image/upload/q_auto,f_auto/w_900/v1701177839/SKU/SPA/v3/BNWEG068A.png",
      ],
      text: ["Obsidian Black", "Granite White", "Eucalyptus Green"],
      price: ["39.95", "39.95", "39.95"],
      //  salePrice: ["34.95"],
      link: "/bottle5",
    },
    {
      name: "LARQ Bottle Filtered",
      images: [
        "https://res.cloudinary.com/larq/image/upload/q_auto,f_auto/w_900/v1701177839/SKU/SPA/v3/BFDOB050A.png",
        "https://res.cloudinary.com/larq/image/upload/q_auto,f_auto/w_900/v1701177839/SKU/SPA/v3/BFDGW050A.png",
      ],
      text: ["Obsidian Black", "Granite White"],
      price: ["58.00", "58.00", "58.00"],
      salePrice: ["49.95", "49.95", "49.95"],
      discount: ["15%", "15%", "15%"],
      link: "/bottle6",
    },
    {
      name: "LARQ Bottle Slim",
      images: [
        "https://res.cloudinary.com/larq/image/upload/q_auto,f_auto/w_900/v1701177839/SKU/SPA/v3/BNSOB050A.png",
        "https://res.cloudinary.com/larq/image/upload/q_auto,f_auto/w_900/v1701177839/SKU/SPA/v3/BNSSM050A.png",
        "https://res.cloudinary.com/larq/image/upload/q_auto,f_auto/w_900/v1701177839/SKU/SPA/v3/BNSGW050A.png",
      ],
      text: ["Pure White", "Pure White", "Seaside Mint"],
      price: ["118.00", "118.00", "118.00"],
      salePrice: ["109.00", "109.00", "109.00"],
      discount: ["15%", "15%", "15%"],
      link: "/bottle7",
    },
  ];
  return (
    <div className="min-h-screen">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mt-8 mb-8 px-6">
          New Trending Products on Sale
        </h2>
        {/* Grid layout for displaying product cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:p-0 p-6 xl:p-4 lg:p-4 ">
          {/* Loop through each product in the products array and render a Product component for each */}
          {products.map((product, index) => (
            <Product key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trending;