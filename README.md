# Vehicle Contact Backend

## Overview

This is the backend API for a mobile application that allows users to contact vehicle owners by scanning a QR code. The application supports features such as OTP login, image uploads, anonymous calling, and emergency contact notifications.

## Features

- User registration and login with OTP using Twilio
- User details management
- QR code scanning and management
- Image uploads to Cloudinary
- Admin functionalities for managing users and generating QR codes

## Setup

### Prerequisites

- Node.js
- MongoDB
- Twilio account
- Cloudinary account

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/greatio-tech/trakyo-backend.git
   cd trakyo-backend

## Authentication

POST /api/auth/login: Send phone number to receive OTP.
POST /api/auth/verify: Verify OTP and get authentication token.

## User Management

GET /api/users/:id: Get user details (protected route).
PUT /api/users/:id: Update user details (protected route).

## QR Code Management

GET /api/qrcodes/:code: Get QR code details.
POST /api/qrcodes: Create a new QR code.
POST /api/qrcodes/:id/upload: Upload an image for a QR code.

## Admin Management

POST /api/admin/register: Register a new admin.
POST /api/admin/login: Login as admin.
POST /api/admin/generate-codes: Generate multiple QR codes.
GET /api/admin/users: Get list of all users.

## User Registration

POST /api/auth/register: Register a new user.

## Vehicle Management

POST /api/vehicles: Add a new vehicle.
PUT /api/vehicles/:id: Edit a vehicle.
DELETE /api/vehicles/:id: Delete a vehicle.
GET /api/vehicles/:id: Get a vehicle's details.
GET /api/vehicles: Get the list of user's vehicles.

## Support Management

GET /api/support: Get support requests for the user.
POST /api/support: Create a support request.
PUT /api/support/:id: Update a support request.

## Settings Management

GET /api/settings: Get user settings.
PUT /api/settings: Update user settings.

## Home Owner Alert

POST /api/alert/alert: Send alert to home owner.

## QR Code Scanning

GET /api/qrcodes/scan/:code: Scan QR code and get details.

## Listing Items

GET /api/list: Get list of all QR codes.