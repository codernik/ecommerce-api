# E-Commerce API Rate Limiting Middleware

This project implements a Redis-based rate limiting middleware for an Express.js API with Kafka logging for excessive requests. It's suitable for APIs in e-commerce or other environments.

## Features

- This limits requests in fixed windows (e.g. 15 mins from first request) — not sliding windows. ( Sliding window considers last 15 mins from now )
- Per-user request tracking (IP-based)
- Configurable rate limits (defaults are 100 requests per 15 minutes) - can be set in .env file
- Logs excessive requests to Kafka
- Dockerized setup with Redis, Kafka, Zookeeper, and Node.js
- easy setup, just run run.sh

---

## Tech Stack

- **Node.js (Express.js)**
- **Redis**
- **Kafka (via kafkajs)**
- **Docker & Docker Compose**

---

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/codernik/ecommerce-api.git
cd ecommerce-api
```

### Setup Environment

Run with Docker

```
chmod +x run.sh
./run.sh
```
