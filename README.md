# 🚀 Sahil Bhavsar — Data Analyst Portfolio

Welcome to the source code for my personal portfolio! This is a modern, responsive, and performance-optimized single-page application built to showcase my skills, projects, and career objective as a Data Analyst.

## 🔗 Live Preview
[Insert Live Link Here - e.g., sahil-bhavsar.netlify.app]

---

## ✨ Features
- **Dark Tech Theme:** Professionally designed UI tailored for data professionals, complete with neon blue/cyan accents (`#00d4ff`).
- **Data Analytics Visuals:** Custom CSS animations including a data analytics bar-chart dashboard, interactive skill bars, and a typing effect.
- **Real-Time Contact Form:** Integrated with **Firebase Realtime Database** to capture and securely store incoming messages instantly.
- **GitHub Activity Streak:** Pulls dynamic contribution data directly from my GitHub profile.
- **100% Mobile Responsive:** Optimized for desktops, tablets, and smartphones, with a custom off-canvas mobile drawer menu.

## 🛠️ Tech Stack & Architecture
This project intentionally avoids heavy frontend frameworks in favor of performance and clean code.
- **Structure:** Semantic HTML5
- **Styling:** Vanilla CSS3 (Custom Variables/Properties, CSS Grid, Flexbox, Media Queries)
- **Logic:** Vanilla JavaScript (ES6+), leveraging `requestAnimationFrame` for high-performance scroll and counter animations.
- **Backend/Database:** Firebase Web SDK (`firebase-app-compat`, `firebase-database-compat`, `firebase-analytics-compat`).

---

## 📂 Project Structure
```text
📦 Sahil-Protfolio
 ┣ 📜 index.html        # Main HTML layout, SEO meta tags, SVG icons, and Firebase SDK
 ┣ 📜 style.css         # All styles, animations, variables, and responsive media queries
 ┣ 📜 script.js         # Navigation logic, scroll-reveal animations, typing effect, and Firebase form handler
 ┣ 📜 SahilResume_Data_Analyst.pdf.pdf # Downloadable resume file
 ┗ 📜 README.md         # Project documentation
```

---

## 💻 Local Development Setup
If you want to run this project locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/bhavsarsahil/Sahil-Portfolio.git
   cd Sahil-Portfolio
   ```

2. **Serve the files:**
   Because Firebase requires the site to be served via `http/https` (and not a local `file://` protocol), you must use a local web server. Options include:
   - **VS Code:** Install the "Live Server" extension, right-click `index.html`, and click "Open with Live Server".
   - **Python:** Run `python -m http.server 8000` in the directory, then go to `http://localhost:8000`.

---

## 📬 Firebase Setup (For Forks/Clones)
If you are forking this repo and want the contact form to work for you:
1. Create a project at [Firebase Console](https://console.firebase.google.com/).
2. Setup a **Web App** and copy the `firebaseConfig` object.
3. Enable **Realtime Database** (Start in Test Mode).
4. Paste your `firebaseConfig` object at the bottom of `index.html` (replacing mine).
5. Update your Firebase Database rules to allow Writes but disable Reads (for security):
   ```json
   {
     "rules": {
       "contacts": {
         ".read": false,
         ".write": true
       }
     }
   }
   ```

---

## 👨‍💻 About Me
I'm Sahil Bhavsar, a 2025 BCA graduate from Gujarat Technology University, specializing in Data Analytics, Python, Pandas, SQL, and Excel. 

Interested in collaborating or hiring me? **[Reach out on LinkedIn!](https://www.linkedin.com/in/sahil-bhavsar-13ba262b9/)**

<br>

> _Crafted with ❤️ & Python Spirit_
