<a href="https://deployable.onrender.com">
    <img src="/public/assets/logo-with-name.png" alt="Chillouit logo" title="Chillout" align="right" height="120" />
</a>

# ParticleHoppers - Chillout

## Summary
<strong>Chillout</strong> is a user-friendly, all-in-one web application for mental wellbeing, offering guided breathing exercises, daily affirmations, and a supportive community. Made for NUS' Summer Module - Orbital 2023.

## Project Members
- [Tristan Tan](https://github.com/tristantanjh)
- [Ang Jon Ming](https://github.com/jon3r4de)

## Team Details
- Team ID: 5786
- Proposed Level of Achievement: Project Apollo

## Links to Project Materials
:link: [Deployed Website](deployable.onrender.com) <br />
- Test account email: test@123.com <br />
- Test account password: qwerty <br />
- <strong>Important Note: </strong>
Due to the utilisation of Render’s free tier plan, <strong>give the site some time (2-3 mins) to load properly.</strong> Thank you for your understanding! Please do feel free to sign up and register for an account as well.  <br /> 

:link: [Full Project Report](https://docs.google.com/document/d/1ctNVm1ha0iiPmlu6EHwB36X8JLEnm9yRs0PH3Cgq8eE/edit?usp=sharing) - For in-depth explanations of our vision, features, code testing, and more.<br />
:link: [Project Log](https://docs.google.com/spreadsheets/d/1cML4a_aWpPTm2hQLwyhGzjmt5MItagE3rgn5ERFA23M/edit?usp=sharing) <br />
#### Milestone 1:
:link: [Project Poster](https://drive.google.com/file/d/1wKMOjY1evthR4v6OxI13As8c7c-RTsiU/view?usp=share_link) <br />
:link: [Project Video](https://drive.google.com/file/d/1SaEuSlFxoPv6LiglToKESfpwx5Rzdj6P/view?usp=share_link) <br />
:link: [Figma Mockup](https://www.figma.com/proto/GEaP6orIS4Les171C551vj/Mockups?node-id=1-55&starting-point-node-id=1%3A55) <br />
#### Milestone 2:
:link: [Project Poster](https://drive.google.com/file/d/19XQvNEd_dZurZDhpaZOCWUK7JK3FbVZk/view?usp=sharing) <br />
:link: [Project Video](https://drive.google.com/file/d/11Gqw2FP7n--oqbPxiMS8DrcF7V3fryTF/view) <br />
#### Milestone 3:
:link: [Project Poster]() <br />
:link: [Project Video]() <br />

## Installation (For Developers)
- Install Node.js from their [website](https://nodejs.org/en).
- Install Nodemon (if not already installed):
```bash
npm install -g nodemon
```
- After that, run these commands in the terminal:
```bash
git clone https://github.com/tristantanjh/ParticleHoppers.git
cd ParticleHoppers 
npm install
nodemon
```
- Follow the steps in the `.env.example` file before proceeding.
- Finally, view the app by going to `localhost:3000` in your browser.

---

### Motivation
The fast-paced nature of modern society, coupled with demanding work environments, personal responsibilities, and societal pressures, can lead to overwhelming feelings and have a profound impact on mental health.

The motivation behind developing this mental health application is to address these widespread challenges and offer support to individuals from diverse backgrounds. By providing accessible resources and tools, the application aims to empower users with effective coping mechanisms and strategies to effectively manage stress and anxiety, promoting mental well-being irrespective of age, occupation, or educational background.

### Aim
Our aim is to ensure that mental health resources and tools for managing mental health are as easily accessible and user-friendly as possible.

### User Stories
- As a schooling student who is under a lot of stress, having to juggle between assignments, examinations, extracurriculars, and others, I want to be able to have a simple to use platform where I can easily regulate my stress and regain the motivation to continue on.
- As someone struggling with mental health issues, I want to be able to have ready access to sufficient and quality resources to help me tackle them.
- As a student who is experiencing new environments and schedules, I want to have an easy way to pen down my jumbled thoughts to help me understand them more clearly.
- As a student who frequently feels overwhelmed, I would like to take periodic mental breaks to reflect and to take small steps back to reflect and assess my current situation holistically, which will allow me to gain a more positive outlook and cope better with the challenges I face.

### Features
- Breathing exercises: Mindful practices for relaxation, stress reduction, and emotional balance. Suitable for users of all levels, empowering proactive self-care and mindfulness.
- Daily affirmations: Daily dose of inspiration, positivity, and encouragement to support mental well-being. Carefully selected messages that resonate with users and promote a positive mindset.
- Journaling: Personal journal for self-reflection and expression. Capture daily moments, reflections, and events. Limited editing to foster authenticity and present-moment expression. Review past entries for growth, self-awareness, and valuable insights over time.

### How are we different from similar platforms?

- <strong>Format and Flow of application</strong>
  - We aim to make our app as simple as possible to use, with a streamlined and linear flow that prevents overwhelming users with information. By prioritizing user experience, we ensure that navigating our app feels intuitive and effortless, allowing you to focus on your journey towards inner balance and serenity. 

- <strong>Choice of mindfulness activities</strong>
  - Our unique combination of guided breathing exercises, daily affirmations along with personal journaling, creates a harmonious and user-friendly space for the user’s mental wellbeing needs.

### Tech Stack
| Tech | Purpose | Reason For Choice | Category |
| -------- | -------- | -------- | -------- |
| ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)   | Styling for visual presentation and layout of web pages. | Fundamental in designing an appealing and responsive website. | Language |
| ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)   | Markup language for structuring web pages and displaying content. | Essential in building complicated web pages. |  Language |
| ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) | Enables interactivity with the web application. | Gives the web application its functionality by adding interactivity and dynamic behavior to the website on the client-side. |  Language |
| ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) | NoSQL Database to store user information and in-application data. | - Subsequent ease of scalability due to horizontal scaling. </br></br> - Ease of implementation due to its native support for JavaScript. | Database |
| ![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white) | Pre-designed CSS templates and JavaScript Components | To streamline the process of building a responsive and visually appealing web application. | Framework |
| ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) | Back-End web application framework for server-side development. | - Ability to use JavaScript for both client-side and server-side development for seamless development. </br></br> - Offers an extensive ecosystem with numerous developer-friendly features. | Framework |
| ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) | Distributed version control system used for tracking changes in source code. | - Allows for easy tracking and managing changes to source code over time. </br></br> - Enables seamless collaboration among our developers working on the same project. | Version Control |
| ![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white) | Cloud hosting platform that simplifies the deployment and management of web applications. | - Provides infrastructure and automation tools to easily deploy applications to various cloud providers, ensuring scalability, reliability, and ease of maintenance. </br></br> - It provides a free tier, making it cost-effective for us to deploy and run our applications on the internet. | Server Hosting |
