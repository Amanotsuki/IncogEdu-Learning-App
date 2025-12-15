import engagementData from "../data/engagement.json";

export default function EngagementDashboard() {
  const totalUsers = new Set(
    engagementData.map(item => item.user_id)
  ).size;

  const avgTimeSpent =
    engagementData.reduce((sum, item) => sum + item.time_spent, 0) /
    engagementData.length;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Learning Engagement</h2>
      <p>Total Active Learners: {totalUsers}</p>
      <p>Average Time Spent: {avgTimeSpent.toFixed(2)} minutes</p>
    </div>
  );
}