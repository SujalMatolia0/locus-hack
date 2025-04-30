# 🧠 Locus — Host & Participate in AI Hackathons

Locus is a full-stack web platform designed to **host and manage AI/ML hackathons**. Built using **AdonisJS**, **Next.js**, and **Prisma**, the platform provides a seamless experience for both participants and organizers — with GitHub-based authentication, clean submission workflows, and automatic participation certificates.

---

## 🚀 Features

- 🔐 **GitHub Login** for authentication
- 🏁 **Single-role users** with admin tools exposed by role logic
- 📜 **Hackathon = Question**: Each hackathon is a single-question challenge
- ✍️ **Text-based submissions**, stored in PostgreSQL via Prisma
- 🧾 **Participation certificates** generated and downloadable post-event
- 🧰 **Admin tools** to create, edit, and delete events
- 📊 **Next.js frontend** with Mantine for responsive UI
- ⚙️ **AdonisJS REST API**, organized under `/api/v1/`

---

## 🏗️ Tech Stack

| Layer     | Technology            |
|-----------|------------------------|
| Frontend  | Next.js, TypeScript, Mantine |
| Backend   | AdonisJS (REST API)    |
| Database  | PostgreSQL (via Prisma ORM) |
| Auth      | GitHub OAuth           |
| Storage   | Submissions in DB      |
| Certificates | Auto-generated PDF (via custom logic) |

---

## 📦 Project Structure

```
/backend
  └── start, app, routes (AdonisJS API)
  └── prisma (DB models)
  └── Dockerfile
/frontend
  └── app, components, pages (Next.js with Mantine)
  └── lib/api (Reusable API client like tRPC)
  └── Dockerfile
/packages
  └── shared utils or local packages (if any)
```

---

## 🧩 Prisma Models (Simplified)

```ts
model User {
  id        String   @id @default(uuid())
  githubId  String   @unique
  name      String
  email     String   @unique
  isAdmin   Boolean  @default(false)
  submissions Submission[]
  certificates Certificate[]
}

model Hackathon {
  id          String       @id @default(uuid())
  title       String
  description String
  deadline    DateTime
  submissions Submission[]
  certificates Certificate[]
}

model Submission {
  id          String    @id @default(uuid())
  user        User      @relation(fields: [userId], references: [id])
  userId      String
  hackathon   Hackathon @relation(fields: [hackathonId], references: [id])
  hackathonId String
  answer      String
  createdAt   DateTime  @default(now())
}

model Certificate {
  id          String    @id @default(uuid())
  user        User      @relation(fields: [userId], references: [id])
  userId      String
  hackathon   Hackathon @relation(fields: [hackathonId], references: [id])
  hackathonId String
  fileUrl     String
}
```

---

## 📋 API Overview (AdonisJS `/api/v1`)

- `POST /auth/github/callback` – GitHub OAuth callback
- `GET /hackathons` – List available events
- `POST /hackathons` – (Admin) Create event
- `POST /submit` – Submit answer
- `GET /certificates/:userId` – Get certificate links

---

## 📜 Setup Instructions

```bash
# 1. Clone the repo
git clone https://github.com/your-username/locus.git
cd locus

# 2. Start 
pnpm install
pnpm dev
```

---
