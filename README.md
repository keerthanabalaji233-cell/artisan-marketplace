# ArtisanAI – AI-Driven Market Linkage & Smart Cataloging

> **Virtual Business Manager for Artisans**  
> *Digitize → Enhance → Catalog → Price → Publish → Connect → Sell*

ArtisanAI is a modern, responsive, accessible, cross-platform web application engineered specifically for marginalized artisans, traditional weavers, Self-Help Groups (SHGs), and micro-entrepreneurs. It bridges the digital divide by transforming raw mobile craft photos into studio-grade e-commerce listings, providing voice-first multilingual cataloging, AI-assisted fair wage pricing, and direct linkages to verified B2B wholesale buyers and government open commerce platforms (such as ONDC and GeM).

---

## 🌟 Key Capabilities & Architectural Modules

### 1. Landing Page & Digital Transformation Hub
- **Hero Narrative:** *"From Traditional Craft to Digital Marketplace"*
- **7-Stage Workflow Pipeline:** Visual roadmap communicating the lifecycle:
  `Digitize ➔ Enhance ➔ Catalog ➔ Price ➔ Publish ➔ Connect ➔ Sell`
- **Simple 4-Step Onboarding:** Capture Product ➔ Enhance with AI ➔ Create Smart Catalog ➔ Connect with Buyers.
- **Measurable Goals:** Year-Round Market Access, Zero-Typing Low-Literacy Interfaces, Rapid 3-Minute Cataloging, and Direct Buyer Connections.

### 2. Artisan Dashboard
- Personalized welcome greeting with audio speech synthesis (*"Good Morning, Artisan 👋"*).
- Summary KPI Cards: Products Listed, Orders, Buyer Enquiries, and Estimated Revenue.
- 4 Large Low-Literacy Quick Actions:
  - 📷 **Add Product** (Camera capture)
  - ✨ **Enhance Photo** (Studio lighting & cleanup)
  - 🎤 **Create Catalog by Voice** (Regional voice descriptions)
  - 💰 **Get Smart Price** (Fair wage calculator)
- **AI Suggestions Hub:** Actionable proactive advice on photo lighting, care instructions, and festive market demand surges.
- Product inventory cards with status pills and quick actions.

### 3. AI Image Enhancer & Studio
- **Before/After Interactive Comparison Slider:** Real-time draggable split-screen comparing original workshop photography with AI studio output.
- **Automated AI Cleanup:**
  - Subject edge segmentation & background removal
  - 5500K daylight studio softbox illumination
  - Realistic contact shadow synthesis
  - Micro-texture weave sharpness optimization
  - Standardized 1:1 square crop with safe padding
- Multi-format preview generator (Front view, Zoomed weave texture, B2B lifestyle mockup).
- Instant *"Save to Catalog"* pipeline integration.

### 4. Multilingual AI Auto-Cataloger
- **Voice-First Input:** Speech recognition supporting 8 Indian languages:
  - English, हिन्दी (Hindi), தமிழ் (Tamil), తెలుగు (Telugu), ಕನ್ನಡ (Kannada), മലയാളം (Malayalam), বাংলা (Bengali), मराठी (Marathi).
- Interactive microphone with live pulsing audio waveform and real-time transcription.
- **AI Structured Extraction:**
  - Product Name (Bilingual English & Hindi)
  - Short Catchy Description (for WhatsApp & buyer leads)
  - Detailed Heritage Story & Artisan Provenance
  - Materials & Yarn Count
  - Craft Technique & GI-Certification status
  - Color palette & natural vegetable dye notes
  - Dimensions, Weight & HSN Export Codes
  - Care & Washing Instructions
  - SEO buyer tags
- Audio TTS (🔊) read-aloud functionality for users with limited literacy.

### 5. Dynamic Pricing Assistant
- **Living Wage & Cost Engine:** Computes prices using raw material expenses, artisan loom/wheel hours, state minimum wage benchmarks, craft intricacy weights, packaging, and platform escrow contingencies.
- **Transparent Formula:**
  $$\text{Suggested Price} = (\text{Raw Materials} + \text{Artisan Labour} + \text{Packaging} + \text{Platform Contingency}) \times (1 + \text{Fair Margin [22\%]})$$
- Visual comparison bar comparing Direct Costs, Suggested Fair Price, and Market Wholesale Ranges.
- Prominent compliance disclaimer clarifying simulated benchmark indices.

### 6. Product Catalog ("My Digital Catalog")
- Real-time search, category filter chips (Textiles, Handicrafts, Pottery, Embroidery, Woodcraft), price range slider, and stock availability filters.
- Product cards with publish/draft toggles, direct WhatsApp/web sharing, and detailed specifications.
- **Product Details Modal:** Full artisan lineage, materials, dimensions, care guide, GI tag authentication, and B2B wholesale volume pricing tiers (e.g. 5+, 25+, 50+ units).

### 7. Market Linkage / B2B Marketplace ("Connect With Buyers")
- Direct pipeline to institutional buyers, retail boutique chains, corporate gifting agencies, and government e-marketplace demo opportunities.
- Buyer opportunity cards showing required units, target budget ranges, delivery deadlines, and verification badges.
- **Interactive Quotation System:** Artisans can select items from their catalog, propose unit prices, add custom notes, and send formal proposals.

### 8. Orders & Enquiries Management
- Multi-state pipeline: *New Enquiries, Pending Orders, Confirmed Orders, and Completed Orders*.
- Order cards with advance escrow tracking, deadline reminders, and status indicators.
- **Direct Negotiation Modal:** Real-time messaging thread between buyer and artisan with one-click status transitions.

### 9. Profile & Settings
- Master artisan profile (Lakshmi Devi, Pochampally Ikat Weaver, GI-AP-0023 certified).
- Business capacity, Self-Help Group (SHG) collective details, and bank DBT account verification.
- **Accessibility Suite:**
  - 8-Language interface switcher
  - Text-to-Speech (TTS) Voice Assistance toggle
  - High-Contrast / Large Touch Target mode
  - Visual video and audio how-to tutorials

### 10. Floating "Sahayak" AI Assistant
- Always-accessible floating assistant equipped with contextual prompt chips (*"How can I add a product?", "Suggest a price", "Improve my photo"*).
- Conversational chat with speech read-aloud capability.

---

## 🎨 Visual Design System

- **Primary:** Deep Terracotta (`#A73A24`)
- **Secondary:** Warm Sand (`#F5EFE6`, `#EADBC8`)
- **Accent:** Muted Forest Green (`#2D6A4F`)
- **Background:** Handloom Off-White (`#FAF8F5`)
- **Text:** Dark Charcoal (`#1F2421`) for high readability
- **Touch Minimum:** $\ge 48\text{px}$ touch targets on all interactive controls
- **Responsive Layout:** Left sidebar on desktop screens ($\ge 1024\text{px}$), bottom navigation bar on mobile screens.

---

## 💾 Relational Database Schema (PostgreSQL 16 Specification)

The application includes an in-app **System Architecture & Database Inspector** displaying complete table specifications for:
1. `users` (Authentication, phone OTP, roles, language)
2. `artisans` (Craft type, location, GI certifications, monthly capacity)
3. `products` (Inventory, category, craft type, pricing, HSN codes)
4. `product_images` (Raw workshop photos vs AI enhanced studio outputs)
5. `product_descriptions` (Multilingual descriptions, extracted materials, SEO keywords)
6. `pricing_recommendations` (Cost breakdown logs, living wage multipliers)
7. `buyers` (Verified B2B retailers, export houses, ONDC participants)
8. `buyer_requirements` (Bulk purchase tenders, budget caps, deadlines)
9. `orders` (Escrow status, delivery schedules, negotiation threads)
10. `ai_requests` (Audit log for vision enhancement, Indic-Whisper STT, and LLM cataloging)
11. `notifications` (Multichannel alerts for new RFQs and orders)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation & Run
```bash
# Clone or navigate to the project directory
cd "artisan marketing project"

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 🧪 Interactive 7-Step Demo Flow (For Evaluators & Hackathons)

To demonstrate the full user flow in 2 minutes:
1. Tap the **"✨ Guided Demo (7-Steps)"** button in the top navigation bar.
2. Step 1: Open **Artisan Dashboard** and tap *"Add Product"*.
3. Step 2: Open **AI Image Studio**, drag the before/after comparison slider, and tap *"Enhance with AI"*.
4. Step 3: Open **AI Product Cataloger**, select Tamil or Hindi, tap *"Tap to Speak"*, and observe real-time transcription and dual-language description generation.
5. Step 4: Open **AI Smart Pricing**, review the transparent cost breakdown and living wage calculation, and apply the ₹2,450 suggested price.
6. Step 5: Save & publish the product to **My Digital Catalog** with celebratory confetti.
7. Step 6: Explore the **B2B Marketplace** and submit a quotation to an institutional buyer.
8. Step 7: View the incoming buyer enquiry in **Orders & Enquiries** and accept the offer!
