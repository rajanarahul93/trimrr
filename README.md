#  trimrr — Modern URL Shortener with Click Analytics

**trimrr** is a sleek, modern, full-stack URL shortening platform built with **React (Vite)**, **Supabase**, **Tailwind CSS**, and **Shadcn UI**. It lets users shorten URLs, optionally customize them, generate QR codes, and track click analytics including device type and location in real-time.

This project was built from scratch integrating authentication, protected routing, cloud storage for QR images, device and location tracking using external APIs and libraries, and data visualizations via interactive charts.

---

##  What This Project Does

-  **User Authentication:**  
  Email-based signup and login using Supabase Auth.

-  **Shorten and Manage URLs:**  
  Users can create both random and custom short URLs pointing to any original URL.

-  **QR Code Generation:**  
  Automatically generate QR codes for every short URL and store them in Supabase Storage Buckets.

-  **Click Tracking:**  
  Records each time a short URL is visited, logging:
   - **Device type** (mobile, desktop, etc.)
   - **Visitor’s city and country** (via `ipapi.co`)

-  **Analytics Dashboard:**  
  View:
   - Total clicks
   - Top cities by clicks
   - Device type distribution (pie and line charts via Recharts)

-  **Protected Routes:**  
  Authenticated access only for:
  - Dashboard (`/dashboard`)
  - Individual Link Stats (`/link/:id`)

-  **Copy, Download, Delete**  
   - Copy short URL
   - Download QR Code image
   - Delete URL (with confirmation)

---

##  Technologies Used

- **Frontend:** React (Vite), Tailwind CSS, Shadcn UI
- **Backend:** Supabase (Database, Auth, Storage)
- **Device Detection:** `ua-parser-js`
- **Charts:** Recharts
- **Routing:** React Router v6
- **State Management:** React Context API
- **Form Validation:** Yup
- **Loaders/Spinners:** `react-spinners`
- **Click Location:** `ipapi.co` API

---

##  Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/rajanarahul93/trimrr.git
cd trimrr
````

2. **Install dependencies**

```bash
npm install
```

3. **Setup Supabase**

* Create a free [Supabase](https://supabase.com/) project.
* Enable **Email Authentication** in Supabase settings.
* Create two tables:

  * `urls`

    * `id`, `original_url`, `short_url`, `custom_url`, `user_id`, `title`, `qr`, `created_at`
  * `clicks`

    * `id`, `url_id`, `city`, `device`, `country`, `created_at`
* Create a Supabase **Bucket** for QR images.

4. **Update Supabase config**

In `/src/db/supabase.js`:

```javascript
const supabase = createClient(
  "YOUR_SUPABASE_URL",
  "YOUR_SUPABASE_ANON_KEY"
);
```

5. **Run the app**

```bash
npm run dev
```

---

## How It Works (Step by Step)

1. **React project initialized using Vite.**
2. **Tailwind CSS** and **Shadcn UI** installed for styling and components.
3. Supabase project created with:

   * `urls` table for managing URL entries.
   * `clicks` table for storing click logs.
   * Supabase email authentication enabled.
4. Created **protected React routes** using React Router.
5. Built authentication pages:

   * `/auth` (Login/Signup with validation and email auth)
6. Developed a **Dashboard** displaying user’s short links, search functionality, and click stats.
7. Integrated **QR code generation** and uploaded to Supabase Buckets.
8. Set up click logging:

   * Captures visitor’s city and country via `ipapi.co`
   * Detects device type with `ua-parser-js`
   * Stores analytics in `clicks` table.
9. Visualized analytics with **Recharts** (Line chart for location, Pie chart for device type).
10. Enabled copy, download, and delete actions for links.
11. Added loaders, spinners, and error handling for all async operations.

---

##  Dashboard Features

* View and manage your shortened URLs.
* Copy or download QR codes.
* See click statistics (total, by city, by device).
* Delete links.
* Create new short or custom links with title and QR.

---

##  UI and Experience

* Responsive layout built with **Tailwind CSS** and **Shadcn UI components**.
* Clean, minimalistic dashboard with intuitive navigation.
* Real-time feedback on actions (spinners, loaders, error messages).

---

##  Author

Made by **Rahul**

* [GitHub](https://github.com/rajanarahul93)
* [LinkedIn](https://www.linkedin.com/in/rajanarahul93)
