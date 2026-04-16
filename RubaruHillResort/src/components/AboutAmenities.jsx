import "../css/Amenities.css";
export default function AboutAmenities() {
  return (
    <div className="container my-5">
      {/* ABOUT US */}
      <div className="row align-items-center mb-5">
        <div className="col-md-6">
          <img src="/images/About.jpeg" className="img-fluid rounded shadow" />
        </div>

        <div className="col-md-6">
          <h2>About Us</h2>
          <p>
            Nestled amidst serene hills and surrounded by lush greenery, our
            hill resort is a peaceful retreat designed for those seeking
            relaxation, a deeper connection with nature and wild life
            Enthusiasts. We offer a tranquil escape where fresh mountain, air,
            scenic view, and bird songs soothes your soul. Whether you are here
            for a romantic getaway.
          </p>
        </div>
      </div>

      {/* AMENITIES */}
      <div className="text-center mb-4">
        <h2>Amenities</h2>
      </div>
      {/* CARDS */}
      <div className="row text-center">
        <div className="col-md-4 col-6 mb-4">
          <div className="recreation-card">
            <div className="icon">🚗</div>

            <p>Parking</p>
          </div>
        </div>

        <div className="col-md-4 col-6 mb-4">
          <div className="recreation-card">
            <div className="icon">📶</div>
            <p>Free WiFi</p>
          </div>
        </div>

        <div className="col-md-4 col-6 mb-4">
          <div className="recreation-card">
            <div className="icon">🔥</div>

            <p>Bonfire</p>
          </div>
        </div>
        <div className="col-md-4 col-6 mb-4">
          <div className="recreation-card">
            <div className="icon">🚿</div>

            <p>Hot Water</p>
          </div>
        </div>
        <div className="col-md-4 col-6 mb-4">
          <div className="recreation-card">
            <div className="icon">🏕️</div>

            <p>Chillout Cottage</p>
          </div>
        </div>
        <div className="col-md-4 col-6 mb-4">
          <div className="recreation-card">
            <div className="icon">🛏️</div>

            <p>Dormitory</p>
          </div>
        </div>
      </div>

      {/* HOW TO REACH */}
      <div className="mt-5 text-center">
        <h2>How to Reach</h2>
      </div>

      {/* CARDS */}
      <div className="row text-center">
        <div className="col-md-4 col-6 mb-4">
          <div className="recreation-card">
            <div className="icon">✈️</div>

            <p>Dibrugarh Airport (152 km)</p>
          </div>
        </div>
        <div className="col-md-4 col-6 mb-4">
          <div className="recreation-card">
            <div className="icon">🚆</div>
            <p>Tinsukia Railway Station (102 km)</p>
          </div>
        </div>
      </div>
      <div className="row text-center mt-4">
        <div className="col-md-6 mb-3">
          <div className="amenity-box"></div>
        </div>
      </div>

      {/* NEARBY ATTRACTIONS */}
      <div className="mt-5 text-center">
        <h2>Nearby Destination</h2>
      </div>

      <div className="row mt-4">
        <div className="col-md-4 col-6 mb-4">
          <div className="recreation-card">
            <div className="icon"> 🌊</div>
            <p>Sally Lake (9 km)</p>
          </div>
        </div>

        <div className="col-md-4 col-6 mb-4">
          <div className="recreation-card">
            <div className="icon"> ⛰️</div>

            <p>Mayudia (44 km)</p>
          </div>
        </div>

        <div className="col-md-4 col-6 mb-4">
          <div className="recreation-card">
            <div className="icon">🏛️</div>
            <p>Bhishmaknagar (50 km)</p>
          </div>
        </div>

        <div className="col-md-4 col-6 mb-4">
          <div className="recreation-card">
            <div className="icon"> 🏛️</div>

            <p>RIWATCH Museum (20 km)</p>
          </div>
        </div>

        <div className="col-md-4 col-6 mb-4">
          <div className="recreation-card">
            <div className="icon"> 💦</div>

            <p>Ahiko Water Park</p>
          </div>
        </div>

        <div className="col-md-4 col-6 mb-4">
          <div className="recreation-card">
            <div className="icon"> 🐾</div>

            <p>Zoo</p>
          </div>
        </div>
      </div>
    </div>
  );
}
