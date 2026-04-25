# SCIS Hub
A Q&A forum for the University of Maine School of Computing and Information Science.

## Getting Started
Clone the repo and install dependencies:

```bash
git clone https://github.com/norus04/scis-hub.git
cd scis-hub
npm install
npm start
```

The app will open at localhost:3000.

You will need to create a `.env` file in the project root with the following Firebase credentials:

```
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
```

Contact a team member for the credentials.

## Live Demo

[Demo will be recorded soon.]

## Team Contributions

- **Noah Rushing** — Firebase authentication, Firestore database setup, post functionality, authentication frontend (Sign In, Register pages), routing and app configuration
- **Kenzie Young** — High fidelity Figma mockups and prototyping
- **Drew Robinson** — Home page UI, Create Post page UI
- **Brendon Price** — Incorporated user feedback into mockup designs
- **Ryan Kelley** — Initial low fidelity mockup foundation

## Known Limitations & Not Yet Implemented

- Post detail page (viewing a post and its answers) not yet implemented
- AI response generation not yet implemented
- Profile page (About Me, Post History, Settings) not yet implemented
- User search not yet implemented
- Upvoting and answer verification not yet implemented
- Faculty role permissions not enforced beyond navbar display
- No email domain restriction (any email can register)