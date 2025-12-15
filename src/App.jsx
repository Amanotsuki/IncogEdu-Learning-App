Open App.jsx and replace content with:

import EngagementDashboard from "./components/EngagementDashboard";
import PerformanceDashboard from "./components/PerformanceDashboard";

function App() {
  return (
    <div>
      <h1>IncogEdu Analytics Dashboard</h1>
      <EngagementDashboard />
      <PerformanceDashboard />
    </div>
  );
}

export default App;