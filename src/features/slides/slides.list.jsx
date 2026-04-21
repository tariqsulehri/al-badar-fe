import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PptxGenJS from "pptxgenjs";
import SearchBar from "../../components/searchBar/search.bar.component";
import { getAllSlides } from "../../services/apis/slideService";
import SlidesDataTable from "../../features/slides/components/table/slides.mui.datatable";
import CustomButton from "../../components/form-controls/buttons/customButton";
import { showToastNotification } from "../../helpers/notificationsHepler";
import { addSlide, clearSlides } from "../../features/slides/slice/slidesForPptxSlice";
import pptxHelper from "./components/helpers/pptxHelper";
import ThemeSwitcher from "../../components/ThemeSwitcher/ThemeSwitcher";

const SlideList = () => {
  const navigate  = useNavigate();
  const dispatch  = useDispatch();
  const selectedSlides = useSelector((state) => state.slidesForPptx.slidesForPptx);
  const selectedCount  = selectedSlides.length;

  const [slides,      setSlides]      = useState([]);
  const [totalRows,   setTotalRows]   = useState(0);
  const [page,        setPage]        = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchBy,    setSearchBy]    = useState("code");
  const [searchText,  setSearchText]  = useState("");
  const [loading,     setLoading]     = useState(false);

  const fetchSlides = async (
    nextPage        = page,
    nextRowsPerPage = rowsPerPage,
    nextSearchBy    = searchBy,
    nextSearchText  = searchText,
  ) => {
    setLoading(true);
    try {
      const response = await getAllSlides(nextRowsPerPage, nextPage + 1, nextSearchBy, nextSearchText);
      setSlides(response?.data || []);
      setTotalRows(response?.totalRecords || 0);
    } catch {
      showToastNotification("error", "Failed to fetch slides");
      setSlides([]);
      setTotalRows(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSlides(); }, [page, rowsPerPage]);

  const handleSearch = (nextSearchBy, nextSearchText) => {
    setSearchBy(nextSearchBy);
    setSearchText(nextSearchText);
    setPage(0);
    fetchSlides(0, rowsPerPage, nextSearchBy, nextSearchText);
  };

  const handleSelectPage = () => {
    dispatch(addSlide(slides.filter(Boolean)));
    showToastNotification("success", `${slides.length} slides on this page selected`);
  };

  const handleReset = () => {
    dispatch(clearSlides());
    showToastNotification("success", "Selection cleared");
  };

  const handleGeneratePptx = async () => {
    if (!selectedCount) {
      showToastNotification("error", "Select slides first");
      return;
    }
    try {
      const pptx = new PptxGenJS();
      await pptxHelper.createPptx(pptx, selectedSlides);
      await pptx.writeFile("slides-export.pptx");
      showToastNotification("success", `PPTX generated for ${selectedCount} slides`);
    } catch {
      showToastNotification("error", "Failed to create PPTX");
    }
  };

  return (
    <section className="page-section surface-grid">

      {/* ── Header ────────────────────────────────────────────── */}
      <header className="page-header page-card">
        <div>
          <span className="page-header__eyebrow">Inventory</span>
          <h1>Slides List</h1>
        </div>

        <div className="page-header__actions">
          {/* Left cluster: selection actions */}
          <CustomButton
            label="Select Page"
            handleClick={handleSelectPage}
            variant="outlined"
          />
          <CustomButton
            label="View Selected"
            handleClick={() => navigate("/slides/selected_slides")}
            variant="outlined"
          />
          <CustomButton
            label={selectedCount ? `Generate PPTX (${selectedCount})` : "Generate PPTX"}
            handleClick={handleGeneratePptx}
            disabled={!selectedCount}
          />
          {selectedCount > 0 && (
            <CustomButton
              label={`Reset (${selectedCount})`}
              handleClick={handleReset}
              variant="outlined"
              color="warning"
            />
          )}

          {/* Divider */}
          <div className="page-header__divider" />

          {/* Right: create */}
          <CustomButton
            label="+ Create Slide"
            handleClick={() => navigate("/slides/create")}
          />
        </div>
      </header>

      {/* ── Theme bar ─────────────────────────────────────────── */}
      <div className="page-card" style={{ padding: "12px 20px" }}>
        <ThemeSwitcher variant="bar" />
      </div>

      {/* ── Stat cards ────────────────────────────────────────── */}
      <div className="stats-grid">
        <article className="page-card stat-card">
          <span className="stat-card__label">Total Records</span>
          <div className="stat-card__value">{String(totalRows || 0).padStart(2, "0")}</div>
          <div className="stat-card__detail">Matching slides in current query</div>
        </article>
        <article className="page-card stat-card">
          <span className="stat-card__label">Search Field</span>
          <div className="stat-card__value">{searchBy}</div>
          <div className="stat-card__detail">Active filter field</div>
        </article>
        <article className="page-card stat-card">
          <span className="stat-card__label">Page Size</span>
          <div className="stat-card__value">{rowsPerPage}</div>
          <div className="stat-card__detail">Rows shown per page</div>
        </article>
        <article className={`page-card stat-card${selectedCount > 0 ? " stat-card--selected" : ""}`}>
          <span className="stat-card__label">Selected for PPTX</span>
          <div className="stat-card__value">{String(selectedCount).padStart(2, "0")}</div>
          <div className="stat-card__detail">
            {selectedCount > 0 ? "Ready to export — click Generate PPTX" : "Select rows to queue for export"}
          </div>
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
        onRowsPerPageChange={(value) => { setRowsPerPage(value); setPage(0); }}
      />
    </section>
  );
};

export default SlideList;
