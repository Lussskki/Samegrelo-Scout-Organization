# Samegrelo Scout Organization

A comprehensive web platform designed to manage and showcase scouting activities in the Samegrelo-Zemo Svaneti region. This project serves as a digital hub for organization members and the local community.

---

## Project Status: Work In Progress (WIP)

This project is currently in its final development phase. Once the remaining milestones are completed, the repository will be **archived** and maintained as a read-only project.

**Final Milestones:**
- [ ] Integration of the **Donation** module.
- [x] Final deployment to [www.scoutsofsamegrelo.com](http://www.scoutsofsamegrelo.com).
- [ ] Project Archiving (Read-Only mode).

---

## Website Structure

The website is designed with a clear hierarchy to ensure scouts and visitors can find information quickly:

* **Home Page**: Regional introduction, mission statement, and key highlights.
* **About Us**: History, core values, and leadership details.
* **Programs & Activities**: Information on scout ranks, seasonal camps, and weekly schedules.
* **News & Events**: Updates on registration deadlines and community events.
* **Gallery**: Photo documentation of past expeditions and ceremonies.
* **Contact / Join**: Registration portal for new members.

---

## Screens & Interface

Below is a breakdown of the primary screens within the application:

| Screen Name | Description | Key Features |
| :--- | :--- | :--- |
| **Landing Dashboard** | The primary entry point for all users. | Hero section, CTA buttons, Quick links. |
| **Event Management** | View for upcoming scouting events. | Date filters, Event descriptions, Location maps. |
| **Member Portal** | Private area for registered scouts. | Profile management, progress tracking. |
| **Admin Panel** | Backend interface for organization leaders. | Content management (CMS), user moderation. |

---

## Getting Started

## Environment Configuration

To run this project, you need to set up environment variables for both the backend and frontend.

### Backend Variables (`.env`)
```env
PORT=5000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
### Frontend Variables (.env)
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```
### Prerequisites
* A modern web browser (Chrome, Firefox, Safari)

### Installation
1. Clone the repository:
```bash 
git clone https://github.com/Lussskki/Samegrelo-Scout-Organization.git
```
2. Navigate to the folder
```bash
cd Samegrelo-Scout-Organization
```
3. Install dependencies
```bash
npm install
```
4. Start the development server Open your terminal and run:
```bash
npm run dev

The application will typically be available at http://localhost:5173.
```
5. Launch the project.

## Archive Notice
Once the final version is pushed, this repository will be archived.

**No further updates:** The code will no longer be maintained or updated.

**Read-Only:** The repository will remain public for educational and portfolio purposes, but pull requests and issues will be disabled.