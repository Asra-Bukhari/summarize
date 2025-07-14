# 🧠 SummarAIze - AI-Powered Blog Summarizer with Urdu Translation

**SummarAIze** is a full-stack AI-powered web app that allows users to input any blog/article URL and instantly receive:
- ✍️ A concise **English summary**
- 🌙 A translated **Urdu version** of the summary

This project uses modern technologies like **Next.js**, **Cohere AI**, **MongoDB**, **Supabase**, and beautiful Tailwind-styled animations for a smooth and engaging user experience.

---

## 🚀 Features

| Feature                              | Description                                                                 |
|--------------------------------------|-----------------------------------------------------------------------------|
| 🔗 Blog Summarization                | Accepts a blog URL and fetches its content                                |
| 🧠 AI-Powered Summary                | Uses Cohere API to summarize extracted text                               |
| 🌐 Urdu Translation                 | Auto-translates the summary into Urdu                                     |
| 🧾 PDF Download                      | Download English summary in PDF format                                    |
| 📱 Mobile Responsive UI              | Fully responsive, animated, and polished interface                        |
| 🧩 State Management                  | LocalStorage to persist results during navigation                         |
| 🗂️ History (via Supabase - optional) | Stores past summaries for future reference                                |

---

## 🧱 Technologies Used

| Stack        | Details                                                              |
|--------------|----------------------------------------------------------------------|
| **Frontend** | Next.js 14, Tailwind CSS, Framer Motion                              |
| **Backend**  | API Routes in Next.js                                                |
| **AI**       | [Cohere Summarize API](https://docs.cohere.com/docs/summarize)       |
| **DBs**      | MongoDB for user/blog storage<br>Supabase for optional analytics     |
| **PDF**      | jsPDF for generating downloadable PDF summaries                      |

---

## 🧬 Project Structure

```bash
├── components/
│   ├── InputForm.tsx         # URL form & loading
│   ├── LoadingView.tsx       # Typing animation and delays
│   ├── SummaryCard.tsx       # English summary display
│   ├── UrduCard.tsx          # Urdu summary display
│
├── pages/
│   ├── index.tsx             # Main page
│   ├── result/page.tsx       # Summary output page
│   ├── api/summarize.ts      # API route for summarizing and translating
│
├── public/
│   ├── logo.png              # App logo
│
├── styles/
│   ├── globals.css           # Custom fonts and styles
```


## 📁 Environment Variables

| Variable         | Purpose                                                             |
| ---------------- | ------------------------------------------------------------------- |
| `COHERE_API_KEY` | Used to call the Cohere Summarize API                               |
| `MONGODB_URI`    | Connects to MongoDB Atlas for storing parsed blog content           |
| `SUPABASE_URL`   | URL for your Supabase project (optional logging/history support)    |
| `SUPABASE_KEY`   | Supabase anon/public key used to access Supabase tables client-side |


---

## 📊 Databases

### 🟢 MongoDB

* Used to store **blog content**, summaries, and optionally users.
* Connected via `MONGODB_URI`
* **Collection**: `blogs`

### 🟣 Supabase

* Used to store **summary metadata** and history.
* Connected via `SUPABASE_URL` and `SUPABASE_KEY`
* **Table**: `summaries`

---

## 🌐 Deployment (Vercel)

1. Push your code to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. Add the environment variables listed above
4. Click **Deploy**

✅ Runs on free, serverless infrastructure.


---

## 📸 Demo

Try it live: [https://summarize.vercel.app/](https://summarize.vercel.app/)


---

## 📸 Screenshots

| Home Page                       | Result Page                         |
| ------------------------------- | ----------------------------------- |
| ![Home](./screenshots/home.png) | ![Result](./screenshots/result.png) |


---

## 👨‍💻 Local Development

```bash
git clone https://github.com/yourusername/summarAIze.git
cd summarAIze
npm install
touch .env   # Paste your environment keys
npm run dev
```

Visit: `http://localhost:3000`

---

---

## 👩‍🎓 Author

**Asra Bukhari**  

- 🐙 GitHub: [@Asra-Bukhari](https://github.com/Asra-Bukhari)  
- 📁 Repo: [summarizer](https://github.com/Asra-Bukhari/summarizer)

---

## 📜 License

This project is **open-source** and available for use in **learning**, **research**, and **educational** projects.  
Attribution is appreciated. 💙

