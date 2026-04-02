import React from "react";
import "../styles/inquiry.css";

const Inquiry = () => {
  return (
    <section className="inquiry-section container my-5">
      <div className="inquiry-bg">
        <div className="container inquiry-content">
          <div className="row align-items-center">
            <div className="col-md-7 text-white inquiry-text">
              <h4>An easy way to send requests to all suppliers</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
              <button className="btn btn-light mobile-btn">Send inquiry</button>
            </div>

            <div className="col-md-5 form-wrapper">
              <div className="form-box">
                <h6>Send quote to suppliers</h6>
                <input type="text" placeholder="What item you need?" className="form-control mb-2" />
                <textarea placeholder="Type more details" className="form-control mb-2"></textarea>
                <div className="d-flex gap-2 mb-3">
                  <input type="number" placeholder="Quantity" className="form-control" />
                  <select className="form-select">
                    <option>Pcs</option>
                    <option>Kg</option>
                  </select>
                </div>
                <button className="btn btn-primary w-100">Send inquiry</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Inquiry;