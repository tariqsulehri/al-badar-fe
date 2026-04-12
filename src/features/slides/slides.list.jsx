import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/searchBar/search.bar.component";
import { getAllSlides } from "../../services/apis/slideService";
import SlidesDataTable from "../../features/slides/components/table/slides.mui.datatable";
import CustomButton from "../../components/form-controls/buttons/customButton";
import { showToastNotification } from "../../helpers/notificationsHepler";

const SlideList = () => {
  const navigate = useNavigate();
  const [slides, setSlides] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchBy, setSearchBy] = useState("code");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchSlides = async (nextPage = page, nextRowsPerPage = rowsPerPage, nextSearchBy = searchBy, nextSearchText = searchText) => {
    setLoading(true);
    try {
      const response = await getAllSlides(nextRowsPerPage, nextPage + 1, nextSearchBy, nextSearchText);
      setSlides(response?.data || []);
      setTotalRows(response?.totalRecords || 0);
    } catch (error) {
      showToastNotification("error", "Failed to fetch slides");
      setSlides([]);
      setTotalRows(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, [page, rowsPerPage]);

  const handleSearch = (nextSearchBy, nextSearchText) => {
    setSearchBy(nextSearchBy);
    setSearchText(nextSearchText);
    setPage(0);
    fetchSlides(0, rowsPerPage, nextSearchBy, nextSearchText);
  };

  return (
    <section className="page-section surface-grid">
      <header className="page-header page-card" style={{ padding: "28px" }}>
        <div>
          <span className="page-header__eyebrow">Inventory View</span>
          <h1>Slides List</h1>
          <p>
            Review slide inventory with clearer hierarchy, stronger location visibility, and a cleaner
            edit flow for operational teams.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <CustomButton label="Create Slide" handleClick={() => navigate("/slides/create")} />
        </div>
      </header>

      <div className="stats-grid">
        <article className="page-card stat-card">
          <span className="stat-card__label">Inventory Count</span>
          <div className="stat-card__value">{String(totalRows || 0).padStart(2, "0")}</div>
          <div className="stat-card__detail">Total matching slide records in the current query.</div>
        </article>
        <article className="page-card stat-card">
          <span className="stat-card__label">Search Scope</span>
          <div className="stat-card__value">{searchBy}</div>
          <div className="stat-card__detail">Current field being used for filtering.</div>
        </article>
        <article className="page-card stat-card">
          <span className="stat-card__label">Rows Per Page</span>
          <div className="stat-card__value">{rowsPerPage}</div>
          <div className="stat-card__detail">Adjust the page density based on review needs.</div>
        </article>
        <article className="page-card stat-card">
          <span className="stat-card__label">Edit Flow</span>
          <div className="stat-card__value">Ready</div>
          <div className="stat-card__detail">Click any row to open the editor for that record.</div>
        </article>
      </div>

      <SearchBar onSearch={handleSearch} />

      <SlidesDataTable
        data={slides}
        totalRows={totalRows}
        page={page}
        rowsPerPage={rowsPerPage}
        loading={loading}
        onPageChange={setPage}
        onRowsPerPageChange={(value) => {
          setRowsPerPage(value);
          setPage(0);
        }}
      />
    </section>
  );
};

export default SlideList;
