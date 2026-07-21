# 🏡 HomeHarbor

**HomeHarbor** is a full-stack property rental listing web application — think of it as a lightweight Airbnb-style platform where users can browse, search, and list stays like beachfront cottages, downtown lofts, and mountain retreats.

🔗 **Live Demo:** [homeharbor-qh9j.onrender.com](https://homeharbor-qh9j.onrender.com/)

> ⚠️ Note: The live demo is hosted on Render's free tier, so the first request after inactivity may take 30–60 seconds to spin up.

---

## ✨ Features

- 🔎 **Browse & Search Listings** — explore curated stays with smart, real-time autocomplete suggestions (including image thumbnails) in the search bar
- 🏠 **Add / Host a Listing** — users can create and publish their own property listings
- 🔐 **Authentication** — secure signup/login system with session-based auth
- ☁️ **Image Uploads** — listing photos are uploaded and served via Cloudinary
- ✅ **Server-Side Validation** — request payloads validated with Joi before hitting the database
- 💬 **Flash Messages** — user feedback (success/error) shown via flash messages after actions

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Runtime** | Node.js (v20.x) |
| **Framework** | Express.js |
| **Templating** | EJS + EJS-Mate (layout support) |
| **Database** | MongoDB with Mongoose (ODM) |
| **Auth** | Passport.js (`passport-local`, `passport-local-mongoose`) |
| **Session Store** | `express-session` + `connect-mongo` |
| **File Uploads** | Multer + Cloudinary (`multer-storage-cloudinary`) |
| **Validation** | Joi |
| **Other** | `connect-flash`, `cookie-parser`, `method-override`, `dotenv` |

---

## 📁 Project Structure

```
HomeHarbor/
├── controllers/     # Route handler logic (business logic)
├── init/            # DB connection / seed / initialization scripts
├── models/          # Mongoose schemas/models
├── public/          # Static assets (CSS, client-side JS, images)
├── routes/          # Express route definitions
├── utils/           # Helper/utility functions
├── views/           # EJS templates (pages, partials, layouts)
├── app.js           # Application entry point
├── cloudConfig.js   # Cloudinary configuration
├── middleware.js    # Custom Express middleware (auth checks, etc.)
├── schema.js         # Joi validation schemas
├── package.json
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v20.x
- A [MongoDB](https://www.mongodb.com/) database (local or Atlas)
- A [Cloudinary](https://cloudinary.com/) account (for image uploads)

### Installation

```bash
# Clone the repository
git clone https://github.com/sachinkumar7106/HomeHarbor.git
cd HomeHarbor

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory. Based on the dependencies used (`dotenv`, `cloudinary`, `mongoose`), you'll likely need variables similar to:

```env
# MongoDB connection string
ATLASDB_URL=your_mongodb_connection_string

# Session secret
SECRET=your_session_secret

# Cloudinary credentials
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

> ⚠️ **I'm not fully certain of the exact variable names** — please verify these against what's actually referenced in `app.js` and `cloudConfig.js` in your repo, and update this section accordingly.

### Run the App

```bash
node app.js
```

By default, Express apps typically run on `http://localhost:3000` (confirm the port in `app.js`).

---

## 📌 Usage

1. Visit the homepage and click **Explore** to browse listings.
2. Use the search bar for real-time autocomplete suggestions.
3. **Sign up** / **Log in** to access account-specific features.
4. Click **Add Listing** to host your own property (requires login).

---

## 👤 Author

**Sachin Kumar**
GitHub: [@sachinkumar7106](https://github.com/sachinkumar7106)

---

## 📄 License

No license has been specified for this repository. All rights reserved by the author unless stated otherwise.
