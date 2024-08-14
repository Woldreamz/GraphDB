# GraphDB Management Web Service

## Overview

This project is a full-stack application for managing Blazegraph databases using Django (backend) and Next.js (frontend). The application provides an interface for uploading TTL files and interacting with the Blazegraph database.

## Features

- Upload TTL files and query Blazegraph.
- Frontend built with Next.js and TypeScript.
- Backend built with Django and Django REST Framework.

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js and Yarn
- Python 3.x

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/graphdb_management.git
   cd graphdb_management
   ```
2. **Set up the backend:**

   ```bash
   cd backend
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   ```

3. **Set up the frontend:**

   ```bash

   cd ../frontend
   npm install
   npm run dev
   ```

4. **Run with Docker Compose:**

   ```bash

   docker-compose up --build
   ```
