import dbPromise from "./utils/db.js";

async function createTablesAndInsertMockData() {
  const db = await dbPromise;

  // Create Shows Table (if not already created)
  await db.exec(`
    CREATE TABLE IF NOT EXISTS shows (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      platform TEXT,
      title TEXT,
      releaseDate TEXT,
      genre TEXT,
      synopsis TEXT,
      cast TEXT,
      imageUrl TEXT,
      resourceLink TEXT
    );
  `);

  // Create Subscriptions Table with subscriptionLink
  await db.exec(`
    CREATE TABLE IF NOT EXISTS subscriptions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      platform TEXT,
      planName TEXT,
      priceUSD REAL,
      priceCAD REAL,
      features TEXT,
      subscriptionLink TEXT
    );
  `);

  // Mock Data for Shows
  const mockShows = [
    {
      platform: "Netflix",
      title: "Pulse",
      releaseDate: "2025-04-03",
      genre: "Medical Drama",
      synopsis: "Set in a Level 1 Trauma Center in Miami during a deadly hurricane.",
      cast: "Willa Fitzgerald, Colin Woodell, Justina Machado",
      imageUrl: "https://tse3.mm.bing.net/th?id=OIP.NsL9-thzVE0VqZzmarBoogHaE8&pid=Api",
      resourceLink: "https://www.netflix.com/title/81234567",
    },
    {
      platform: "Amazon Prime Video",
      title: "The Bondsman",
      releaseDate: "2025-04-03",
      genre: "Action Horror",
      synopsis: "Fred Herbert, a bounty hunter, returns from the dead.",
      cast: "Kevin Bacon, Jennifer Nettles, Beth Grant",
      imageUrl: "https://tse3.mm.bing.net/th?id=OIP.H2itbxEmivGgLJyv2efi0gHaDE&pid=Api",
      resourceLink: "https://www.amazon.com/dp/B09X1YZ9P2",
    },
    {
      platform: "Disney+",
      title: "Andor: Season 2",
      releaseDate: "2025-04-22",
      genre: "Science Fiction",
      synopsis: "The second and final season follows Cassian Andor's journey.",
      cast: "Diego Luna, Stellan Skarsgård, Forest Whitaker",
      imageUrl: "https://tse4.mm.bing.net/th?id=OIP.nsbdDlu_g4SjxTJ3FlfJCgHaK9&pid=Api",
      resourceLink: "https://www.disneyplus.com/series/andor/81112345",
    },
  ];

  // Mock Data for Subscription Plans with Links
  const mockSubscriptions = [
    {
      platform: "Netflix",
      planName: "Basic with Ads",
      priceUSD: 6.99,
      priceCAD: 7.99,
      features: "720p, Ads included, 1 device, Limited content",
      subscriptionLink: "https://www.netflix.com/signup",
    },
    {
      platform: "Netflix",
      planName: "Standard",
      priceUSD: 15.49,
      priceCAD: 16.49,
      features: "1080p, 2 devices, No ads, Downloadable content",
      subscriptionLink: "https://www.netflix.com/signup",
    },
    {
      platform: "Netflix",
      planName: "Premium",
      priceUSD: 22.99,
      priceCAD: 23.99,
      features: "4K + HDR, 4 devices, Spatial audio, No ads",
      subscriptionLink: "https://www.netflix.com/signup",
    },
    {
      platform: "Amazon Prime Video",
      planName: "Prime Video Only",
      priceUSD: 8.99,
      priceCAD: 9.99,
      features: "Access to Prime Video library",
      subscriptionLink: "https://www.amazon.com/primevideo",
    },
    {
      platform: "Amazon Prime Video",
      planName: "Amazon Prime",
      priceUSD: 14.99,
      priceCAD: 16.99,
      features: "Prime Video + Free Shipping + Prime Music",
      subscriptionLink: "https://www.amazon.com/prime",
    },
    {
      platform: "Disney+",
      planName: "Basic with Ads",
      priceUSD: 7.99,
      priceCAD: 8.99,
      features: "HD streaming, Ads included",
      subscriptionLink: "https://www.disneyplus.com/signup",
    },
    {
      platform: "Disney+",
      planName: "Premium (Ad-Free)",
      priceUSD: 13.99,
      priceCAD: 14.99,
      features: "4K Ultra HD, HDR, Dolby Atmos, No ads",
      subscriptionLink: "https://www.disneyplus.com/signup",
    },
    {
      platform: "Disney+",
      planName: "Disney+ Bundle (Hulu + ESPN+)",
      priceUSD: 19.99,
      priceCAD: 21.99,
      features: "Full Disney+ library + Hulu + ESPN+",
      subscriptionLink: "https://www.disneyplus.com/bundle",
    },
  ];

  // Insert Mock Shows
  for (const show of mockShows) {
    await db.run(
      `INSERT INTO shows (platform, title, releaseDate, genre, synopsis, cast, imageUrl, resourceLink)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        show.platform,
        show.title,
        show.releaseDate,
        show.genre,
        show.synopsis,
        show.cast,
        show.imageUrl,
        show.resourceLink,
      ]
    );
  }

  // Insert Mock Subscriptions with Links
  for (const plan of mockSubscriptions) {
    await db.run(
      `INSERT INTO subscriptions (platform, planName, priceUSD, priceCAD, features, subscriptionLink)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        plan.platform,
        plan.planName,
        plan.priceUSD,
        plan.priceCAD,
        plan.features,
        plan.subscriptionLink,
      ]
    );
  }

  console.log("✅ Mock data inserted successfully with subscription links!");
}

// Run script
createTablesAndInsertMockData().catch((err) => {
  console.error("❌ Error inserting mock data:", err);
});
