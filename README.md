# File-Gmailer

**File-Gmailer** is a web tool designed to transform local files into ready-to-send Gmail drafts instantly. It allows users to bulk-upload documents, prepare individual email metadata (**To, CC, Subject, Body**), and generate gmail drafts leveraging the **Gmail REST API**.

---

## Key Features

- **Bulk File Processing**  
  Upload up to **50 files** simultaneously via an intuitive drag-and-drop zone.

- **One-at-a-Time Focus**  
  A CSS `scroll-snap` layout ensures you focus on one draft at a time without visual clutter.

- **Privacy-First Architecture**  
  **No database.** Your files never touch any server except Google’s.  
  All processing happens entirely in your browser’s memory (RAM).

- **Sidebar Navigator**  
  An intuitive sidebar that tracks your scroll position and allows you to jump between drafts instantly.

- **Bulk Editing**  
  Bulk editing that lets you apply a single recipient, subject, or body to all uploaded files.

- **Rich Text Support**  
  Full HTML formatting within email bodies.

- **Smart MIME Encoding**  
  Automatically handles the conversion of binary files into Base64-encoded `multipart/mixed` email messages compatible with Gmail.

---

## Tech Stack

- **Framework:** React + Vite
- **Language:** TypeScript
- **Styling:** SCSS (Modular / BEM-inspired)
- **Authentication:** Google OAuth 2.0
- **API:** Gmail REST API
- **Rich Text Editor:** Tiptap
- **Icons:** Material UI Icons

---

## How It Functions

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

## Setup & Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/file-gmailer.git
cd file-gmailer
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables Create a `.env` file in the root directory:

```code snippet
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

### Start Development

```bash
npm run dev
```

---

## Security & Privacy

- **Direct API Interaction:**
  The app communicates directly with Google. No third-party servers ever see your files or email content.
- **Scoped Access:**
  The app only requests gmail.compose permissions, meaning it can only create new drafts and cannot read your existing emails.
- **Stateless Session:**
  All authentication tokens are kept in memory and are destroyed upon closing the browser tab.
