"use client";

export default function Announcements() {
  const announcements = [
    {
      id: 1,
      title: "Hackathon Kickoff!",
      message:
        "Welcome to the hackathon! The event starts at 10 AM sharp. Be prepared!",
      createdAt: "2025-03-21",
    },
    {
      id: 2,
      title: "Submission Deadline Reminder",
      message:
        "Remember to submit your projects by 6 PM today! Late submissions won’t be accepted.",
      createdAt: "2025-03-20",
    },
    {
      id: 3,
      title: "Workshops Available",
      message:
        "Join our expert-led workshops at 2 PM in Room 301. Topics include AI and Web3!",
      createdAt: "2025-03-19",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Announcements</h1>
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="bg-white p-4 shadow rounded">
            <h2 className="text-lg font-semibold">{announcement.title}</h2>
            <p className="text-gray-700">{announcement.message}</p>
            <p className="text-sm text-gray-500 mt-2">
              Posted on: {announcement.createdAt}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
