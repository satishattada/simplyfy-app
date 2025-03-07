import React from "react";
import "./styles.css";
import { withParamsAndNavigate } from "../../../routes/with-params-navigate";
import { useNavigate } from 'react-router-dom';
import demand from '../../../assets/icons/demand.jpg';
import team from '../../../assets/icons/team.jpg';
import finance from '../../../assets/icons/finance.jpg';

function Dashboard() {
  const navigate = useNavigate();
  const cards = [
    { id: 1, path: "contracts-management", description: "Contracts Management", image: `${demand}`, disabled: false },
    { id: 2, path: "employee-management", description: "Employee Management", image: `${team}`, disabled: true },
    { id: 3, path: "finance-management", description: "Finance Management", image: `${finance}`, disabled: true },
  ];

  const handleCardClick = (path: string, disabled: boolean) => {
    if (!disabled) {
      navigate(`${path}`);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-around mt-5">
        {cards.map((card) => (
          <div
            className={`card ${card.disabled ? 'disabled' : ''}`}
            onClick={() => handleCardClick(card.path, card.disabled)}
            key={card.id}
          >
            <img src={card.image} className="card-img-top" alt="..." />
            <div className="card-body">
              <p className="card-text">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default withParamsAndNavigate(Dashboard);