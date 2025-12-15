import performanceData from "../data/studentPerformance.json";

export default function PerformanceDashboard() {
  const avgScore =
    performanceData.reduce(
      (sum, item) => sum + item.final_grade,
      0
    ) / performanceData.length;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Performance Analytics</h2>
      <p>Average Student Score: {avgScore.toFixed(1)}</p>
    </div>
  );
}