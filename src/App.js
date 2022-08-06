import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Login from './Screens/Login';
import Patients from './Screens/Patients';
import PatientDetail from "./Screens/PatientDetail";

function App() {
  console.log('apppp')
  return (
    <BrowserRouter>
      <Routes>
          <Route index path="/" element={<Login />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/patient-detail" element={<PatientDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
