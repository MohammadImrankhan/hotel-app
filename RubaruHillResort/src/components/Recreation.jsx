import "../css/Recreation.css";

export default function Recreation() {
  return (
    <div className="container my-5">
      {/* TITLE */}
      <div className="text-center mb-4">
        <h2 className="section-title">Recreation & Activities</h2>
        <p className="text-muted">
          Relax, explore and enjoy nature at Rubaru Hill Resort
        </p>
      </div>

      {/* CARDS */}
      <div className="row text-center">
        <div className="col-md-4 col-6 mb-4">
          <div className="recreation-card">
            <div className="icon">👨‍👩‍👧</div>
            <h5>Kids Play Area</h5>
            <p>Safe & fun space for children</p>
          </div>
        </div>

        <div className="col-md-4 col-6 mb-4">
          <div className="recreation-card">
            <div className="icon">🚶‍♂️</div>
            <h5>Walking Trail</h5>
            <p>Peaceful nature walk experience</p>
          </div>
        </div>

        <div className="col-md-4 col-6 mb-4">
          <div className="recreation-card">
            <div className="icon">🔥</div>
            <h5>Bonfire Nights</h5>
            <p>Enjoy evenings with warmth & music</p>
          </div>
        </div>
      </div>
    </div>
  );
}
