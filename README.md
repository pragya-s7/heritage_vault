# Heritage Vault

## Inspiration
For the first time in history, every future generation will grow up in the digital age. Unlike the past, where family stories were passed down through oral tradition, letters, or photographs, we now have the power to preserve memories permanently in digital form. Yet, despite this, so much family history still gets lost over time.

Heritage Vault was created to bridge this gap- providing a dedicated space where families can securely store, share, and pass down their stories for generations. With AI-powered transcription, sentiment analysis, and interactive features, we aim to ensure that every family's legacy remains alive in the digital era.

## What it does
Heritage Vault allows users to:
- Record and upload generational stories in text, audio, or video formats
- Transcribe audio stories into searchable text using Gemini AI
- Analyze stories for key themes, sentiment, and highlights
- Securely store stories in a family vault, accessible only to invited members
- Comment on and interact with stories from family members

## How we built it
**Frontend (React.js & Tailwind CSS)**
We designed the frontend using React.js for its flexibility and modular structure, allowing us to create reusable components like story cards, comment sections, and the family vault dashboard.

- React Router was used for navigation, ensuring seamless transitions between pages.
- Tailwind CSS was chosen for styling to create a clean, accessible, and responsive UI.
- Auth0 was implemented for authentication, allowing users to log in securely with Google or email-based login.

**Backend (Node.js, Express.js, MongoDB)**
The backend is built with Node.js and Express.js, providing a scalable API structure to handle story creation, user authentication, file uploads, and AI-powered analysis.

- MongoDB was used as the database due to its flexibility in handling structured (user data) and unstructured (stories, transcripts) content.
- Mongoose was used to define schemas for Users, Stories, and Family Vaults, ensuring efficient data relationships.
- Express.js API Routes were designed to handle CRUD operations for stories, user management, and comments.

**AI-Powered Features (Google Gemini AI)**
One of the most innovative aspects of Heritage Vault is its AI-powered transcription and analysis:

- Speech-to-Text Transcription: When a user uploads an audio story, it is processed using Gemini AI's transcription API, converting it into searchable text.
- Sentiment & Theme Analysis: The text is further analyzed to extract key topics, sentiment, and important highlights, helping users organize their family histories.

**Collaboration & Engagement**
To make Heritage Vault interactive and engaging, we included:

- A comment system that allows authenticated users (via Auth0) to leave comments on stories.
- Family Vault Sharing, where members of a family can securely share stories with each other, ensuring privacy and exclusivity.

## Challenges we ran into
We had one persistent issue with the Gemini API key despite asking for help during Office Hours and trying multiple different implementations (i.e. @google/generative-ai vs @google-cloud/vertexai). Although we were able to pass a sample test connection with the API, we were getting permissions errors when we tried to call Gemini 1.5-Pro in order to perform the transcription of uploaded audio files. Although this permissions error persisted, the workflow setup is fully complete and should be functional with a working Gemini API key. We decided to move forward due to time constraints. 

## Accomplishments that we're proud of
- Implemented OAuth authentication via Google and email login, ensuring only authorized users can contribute to family archives
- Designed a clean, intuitive interface using React.js & Tailwind CSS
- Allowed for multimedia inputs using React Quill
- Designed workflow for sentiment analysis and LLM integration

## What we learned
Building Heritage Vault was an incredible learning experience, especially in full-stack development and generative AI integration. We gained hands-on experience working across React.js, Node.js, Express.js, and MongoDB, strengthening our ability to design scalable architectures, manage API calls efficiently, and implement secure authentication with Auth0. One of the biggest challenges and learning opportunities was integrating Gemini AI for speech-to-text transcription, sentiment analysis, and keyword extraction. We learned how to properly structure API requests, handle authentication errors, and optimize AI-powered content processing to enhance user experience. Additionally, working with file uploads, cloud storage, and real-time collaboration features gave us deeper insights into handling large datasets, securing user-generated content, and optimizing application performance.

## What's next for Heritage Vault
With a working Gemini API key, we would like to flesh out transcription services and sentiment analysis.
We also want to set up family-based roles to allow users to modify only their family's vault