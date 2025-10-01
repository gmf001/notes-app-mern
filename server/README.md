## Notes App - API

This document provides an overview of the API endpoints available in the application. The server is built using Node.js and TypeScript, and it serves as the backend for the application.

## Base URL

All API endpoints are prefixed with the following base URL:

```
http://localhost:4000/api
```

## Features

- Create, Read, Update, and Delete (CRUD) operations for notes.
- Each note consists of a title and content.
- Rate limiting with express-rate-limit
