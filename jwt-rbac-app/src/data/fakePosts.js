const fakePosts = [
  {
    id: 1,
    title: "Platform Launch Update",
    content: "The new dashboard is live and the team is reviewing analytics for the next release cycle.",
    author: "Alice Admin",
    role: "admin",
    createdAt: "2026-08-01T09:00:00.000Z"
  },
  {
    id: 2,
    title: "Content Review Notes",
    content: "Editors should publish only approved content and keep the editorial checklist updated before Friday.",
    author: "Sam Editor",
    role: "editor",
    createdAt: "2026-08-03T12:20:00.000Z"
  },
  {
    id: 3,
    title: "Reader Highlights",
    content: "This week’s top stories include product updates, feature announcements, and community feedback summaries.",
    author: "Nina Viewer",
    role: "viewer",
    createdAt: "2026-08-05T18:30:00.000Z"
  }
];

export const getInitialPosts = () => structuredClone(fakePosts);

export default fakePosts;
