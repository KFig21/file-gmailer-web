# File-Gmailer 📎📧

**File-Gmailer** is a high-efficiency, privacy-focused web utility designed to transform local files into ready-to-send Gmail drafts instantly.

By leveraging the **Gmail REST API**, it allows users to bulk-upload documents and prepare individual email metadata (**To, CC, Subject, Body**) using a specialized, distraction-free **“one-at-a-time”** drafting interface.

---

## 🚀 Key Features

- **Bulk File Processing**  
  Upload up to **50 files** simultaneously via an intuitive drag-and-drop zone.

- **One-at-a-Time Focus**  
  A CSS `scroll-snap` layout ensures you focus on one draft at a time without visual clutter.

- **Privacy-First Architecture**  
  **No database.** Your files never touch any server except Google’s.  
  All processing happens entirely in your browser’s memory (RAM).

- **Sidebar Navigator**  
  A professional, text-based sidebar that tracks your scroll position and allows you to jump between drafts instantly.

- **Bulk Options Overlay**  
  A floating “Global” editor that lets you apply a single recipient, subject, or body to **all uploaded files** at once.

- **Rich Text Support**  
  Powered by **Tiptap**, enabling full HTML formatting within email bodies.

- **Smart MIME Encoding**  
  Automatically handles the conversion of binary files into Base64-encoded `multipart/mixed` email messages compatible with Gmail.

---

## 🛠️ Tech Stack

- **Framework:** React + Vite
- **Language:** TypeScript
- **Styling:** SCSS (Modular / BEM-inspired)
- **Authentication:** Google OAuth 2.0
- **API:** Gmail REST API
- **Rich Text Editor:** Tiptap
- **Icons:** Material UI Icons

---

## 📖 How It Functions

### 1. Data Handling

When files are selected, the browser creates local `File` objects. These are stored in a React state array (`drafts`).

Because there is **no backend database**, refreshing the page or closing the tab will immediately wipe all data.

---

### 2. Drafting Experience

The app uses a combination of:

- `scroll-snap-type`
- scroll position detection

As you scroll through drafts, the sidebar automatically updates its **active state** to show which file you are currently editing.

---

### 3. The Gmail Bridge

When draft creation is triggered:

1. The app reads the file as an `ArrayBuffer`
2. Converts the buffer into a Base64 string
3. Constructs a raw MIME message with headers:
   - `To`
   - `Subject`
   - `Content-Type`
4. Sends a direct `POST` request to the Gmail API

No intermediary servers are involved.

---

## ⚙️ Setup & Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/file-gmailer.git
cd file-gmailer
```
