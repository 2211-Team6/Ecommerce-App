const {
  client
} = require('./');
const { createProduct } = require('./models/products');
const {createUser} = require("./models/user")
const {createReview} = require("./models/reviews")

// drop tables in correct order
async function dropTables() {
  console.log("Dropping All Tables...")
  try {
    await client.query(`
  DROP TABLE IF EXISTS reviews;
  DROP TABLE IF EXISTS product_tags;
  DROP TABLE IF EXISTS tags;
  DROP TABLE IF EXISTS cart_items;
  DROP TABLE IF EXISTS products;
  DROP TABLE IF EXISTS users;
  `);
  console.log("finishin dropTables")
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
  console.log("All Tables Dropped!")
}

// create all tables, in the correct order
async function createTables() {
  console.log("Starting to build tables...")
  try {
    await client.query(`
    CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
    CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    url TEXT NOT NULL
);
    CREATE TABLE cart_items (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL
);

    CREATE TABLE tags (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL
  );

  CREATE TABLE product_tags (
    "productId" INTEGER REFERENCES products(id), 
    "tagId" INTEGER REFERENCES tags(id),
    UNIQUE ("productId", "tagId")
);

    CREATE TABLE reviews (
      id SERIAL PRIMARY KEY,
      "userName" VARCHAR(255) REFERENCES users(username),
      "productId" INTEGER REFERENCES products(id),
      rating INTEGER,
      description TEXT NOT NULL
    );
  `);
  }
   catch (error) {
    console.error("Error building tables!");
    throw error;
  }
  console.log("All Tables created!")
};

async function populateInitialData() {
  try {
    const usersToCreate = [
      { username: "albert", password: "bertie99", email: "albert9@hotmail.com" },
      { username: "sandra", password: "sandra123", email: "sandy3@MSN.com" },
      { username: "glamgal", password: "glamgal123", email:"glamgal@AOL.com" },
    ];
    const user = await Promise.all(usersToCreate.map(createUser))
    console.log('Users created');
    console.log(user);
    console.log("Finished creating users!")

    const productsToCreate = [
      { title: "Air Force 1", description: "Brand new pair of blue AF1", price: 18099, quantity: 3, url: "https://www.sneakerfiles.com/wp-content/uploads/2021/08/air-jordan-1-high-dark-marina-blue-555088-404-release-info.jpeg"},
      { title: "Colombian Coffee", description: "1lb bag of organic Colombian coffee beans", price: 1601, quantity: 18, url: "https://i5.walmartimages.com/asr/f2c34a4f-8874-4ad1-bc83-8e733874a9b8_1.833a64e0f36e8bea5fbe1fc1b3e41ca0.jpeg"},
      { title: "Black Pens", description: "Pack of 8 black ink pens", price: 715, quantity: 42, url: "https://i5.walmartimages.com/asr/ccdd2273-3a13-4d2d-9123-c2b3fabdf396.23cbb880147069a22b93c92b86a9ca06.jpeg"},
      { title: "Coffee Mug", description: "Set of 5 blue ceramic coffee mugs", price: 5295, quantity: 89, url: "https://www.vicrays.com/wp-content/uploads/2021/06/1-mug-set-.jpg"},
      { title: "Whistlepig", description: "750 mL bottle of whistlepig whiskey. Aged 10 year. Small Batch Rye", price: 7499, quantity: 21, url: "https://www.abc.virginia.gov/library/product-images/july15-warehouse/whistle-pig-straight-rye-whiskey.jpg"},
      { title: "Iphone 14 Pro Max", description: "Apple's newest Iphone. Better than your android.", price: 119999, quantity: 50, url: "https://m.media-amazon.com/images/I/315eB2+GolL._AC_SY580_.jpg"},
      { title: "PS5", description: "Sony's next generation Playstation. In Stock soon!", price: 49999, quantity: 0, url: "https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$"},
      { title: "XBox Series X", description: "Next generation XBox. In Stock! Inventory sells out quickly. Act now!!!", price: 49999, quantity: 1, url: "https://i5.walmartimages.com/asr/12870b37-2928-4748-8e87-868e44ed218d.89acba7601d9b7c641d3c880ce173893.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF"},

    ]
    console.log("creating initial products")
    const products = await Promise.all(productsToCreate.map(createProduct))
    console.log("Here are the products", products)
    console.log("Finished creating initial products")

    const reviewsToCreate = [
      {username: "glamgal", productId: 1, rating: 2, description: "This shoe runs too small"},
      {username: "sandra", productId: 4, rating: 10, description: "I got this as a gift and I absolutly love it!"},
      {username: "glamgal", productId: 2, rating: 5, description: "I usually dont drink coffee but this will have me addicted"},
    ]
    console.log("creating initial reviews")
    const reviews = await Promise.all(reviewsToCreate.map(createReview))
    console.log("Here are the reviews", reviews)
    console.log("Finished creating initial reviews")

  } catch (error) {
    throw error;
  }
}

async function rebuildDB() {
  try {
    client.connect()
    await dropTables()
    await createTables()
  } catch (error) {
    console.log("Error during rebuildDB")
    throw error
  }
}


rebuildDB()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());