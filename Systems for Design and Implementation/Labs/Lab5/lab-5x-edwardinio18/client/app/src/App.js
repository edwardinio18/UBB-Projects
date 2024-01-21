import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";

import Cigarettes from "./pages/Cigarettes";
import Brands from "./pages/Brands";
import People from "./pages/People";

import GetCigarettes from "./components/Cigarettes/GetCigarettes";
import GetCigaretteByID from "./components/Cigarettes/GetCigaretteByID";
import FilterCigarettes from "./components/Cigarettes/FilterCigarettes";
import AddCigarette from "./components/Cigarettes/AddCigarette";
import UpdateCigarette from "./components/Cigarettes/UpdateCigarette";
import DeleteCigarette from "./components/Cigarettes/DeleteCigarette";
import UpdateManyCigs from "./components/Cigarettes/UpdateManyCigs";

import GetBrands from "./components/Brands/GetBrands";
import GetBrandByID from "./components/Brands/GetBrandByID";
import StatReportBrand1 from "./components/Brands/StatReportBrand1";
import StatReportBrand2 from "./components/Brands/StatReportBrand2";
import AddBrand from "./components/Brands/AddBrand";
import AddManyCigsBrand from "./components/Brands/AddManyCigsBrand";
import UpdateBrand from "./components/Brands/UpdateBrand";
import DeleteBrand from "./components/Brands/DeleteBrand";

import GetPeople from "./components/People/GetPeople";
import GetPersonByID from "./components/People/GetPersonByID";
import AddPerson from "./components/People/AddPerson";
import UpdatePerson from "./components/People/UpdatePerson";
import DeletePerson from "./components/People/DeletePerson";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/cigarettes" element={<Cigarettes />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/people" element={<People />} />

        <Route path="/get-cigarettes" element={<GetCigarettes />} />
        <Route path="/get-cigarette-by-id" element={<GetCigaretteByID />} />
        <Route path="/filter-cigarettes" element={<FilterCigarettes />} />
        <Route path="/add-cigarette" element={<AddCigarette />} />
        <Route path="/update-cigarette" element={<UpdateCigarette />} />
        <Route path="/delete-cigarette" element={<DeleteCigarette />} />
        <Route path="/update-cigarettes-brand" element={<UpdateManyCigs />} />

        <Route path="/get-brands" element={<GetBrands />} />
        <Route path="/get-brand-by-id" element={<GetBrandByID />} />
        <Route path="/get-stats-brand-1" element={<StatReportBrand1 />} />
        <Route path="/get-stats-brand-2" element={<StatReportBrand2 />} />
        <Route path="/add-brand" element={<AddBrand />} />
        <Route path="/add-many-cigarettes-to-brand" element={<AddManyCigsBrand />} />
        <Route path="/update-brand" element={<UpdateBrand />} />
        <Route path="/delete-brand" element={<DeleteBrand />} />

        <Route path="/get-people" element={<GetPeople />} />
        <Route path="/get-person-by-id" element={<GetPersonByID />} />
        <Route path="/add-person" element={<AddPerson />} />
        <Route path="/update-person" element={<UpdatePerson />} />
        <Route path="/delete-person" element={<DeletePerson />} />
      </Routes>
    </Router>
  );
}

export default App;
