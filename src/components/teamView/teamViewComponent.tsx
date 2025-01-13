import React, { useState, useEffect } from "react";
import "./styles.css";
import Table from "react-bootstrap/Table";
import { Form, InputGroup, Button } from "react-bootstrap";
import { FaSearch, FaTimes } from "react-icons/fa";
import SearchComponent from "../search/searchComponent";
import AddTeamModal from "../addTeamModal/addTeamModal";
import { withParamsAndNavigate } from "../../routes/with-params-navigate";
import teamService from "../../services/teamService";
import { teamDataAtom, TeamReq } from "../../atoms/teamAtoms";
import { useAtom } from "jotai";

function TeamViewComponent() {
  const [query, setQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<TeamReq[] | undefined>(
    undefined
  );
  const [teamData, setTeamData] = useAtom(teamDataAtom);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>("add");
  const [modalData, setModalData] = useState<object>({});

  const handleToggleModel = () => {
    setShowModal(!showModal);
    setModalData({});
    setModalType("add");
  };
  useEffect(() => {
    teamService
      .getTeamData()
      .then((resp) => setTeamData(resp as TeamReq[]))
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    if (query === "" || query === undefined) {
      setFilteredData(teamData); // Show all data if the search query is empty
    } else {
      // Filter data based on the query
      const filtered = teamData && teamData?.filter(
        (item: any) =>
          item.infyId.includes(query) ||
          item.infyEmail?.toLowerCase().includes(query?.toLowerCase()) ||
          item.location?.toLowerCase().includes(query?.toLowerCase()) ||
          item.skills
            ?.split(",")
            .some((skill: string) =>
              skill.trim().toLowerCase().includes(query?.toLowerCase())
            ) ||
          item.PU?.toLowerCase().includes(query?.toLowerCase()) ||
          item.startDate?.toLowerCase().includes(query?.toLowerCase()) ||
          item.endDate?.toLowerCase().includes(query?.toLowerCase()) ||
          item.bpSponsorEmail?.toLowerCase().includes(query?.toLowerCase()) ||
          item.mission?.toLowerCase().includes(query?.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [teamData, query]);
  const handleSearchChange = (query: string) => {
    setQuery(query);
  };
  const handleEditModel = (request: any) => {
    console.log(request,'---------edit------');
    setShowModal(true);
    setModalData(request);
    setModalType("edit");
  }

  return (
    <>
      <AddTeamModal
        showModal={showModal}
        onClose={() => handleToggleModel()}
        modalType={modalType}
        modalData={modalType === "edit" ? modalData : undefined}
      />
      <div className="d-flex justify-content-between mt-5 mb-4">
        <SearchComponent onSearch={handleSearchChange} />
        <i
          className="bi bi-plus-circle edit-btn"
          onClick={() => handleToggleModel()}
        ></i>
      </div>
      <Table>
        <thead>
          <tr>
            <td>Infosys ID</td>
            <td>Infosys Email</td>
            <td>Location</td>
            <td>Skills</td>
            <td>PU</td>
            <td>Start Date</td>
            <td>End Date</td>
            <td>BP Sponsor Email</td>
            <td>Mission</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {filteredData && filteredData?.length > 0 ? (
            filteredData?.map((request) => (
              <tr key={request.infyId}>
                <td>{request.infyId}</td>
                <td>{request.infyEmail}</td>
                <td>{request.location}</td>
                <td>{request.skills}</td>
                <td>{request.PU}</td>
                <td>{request.startDate}</td>
                <td>{request.endDate}</td>
                <td>{request.bpSponsorEmail}</td>
                <td>{request.mission}</td>
                <td>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="rounded-btn"
                    onClick={() => handleEditModel(request)}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} className="text-center">
                No matching data found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
}

export default withParamsAndNavigate(TeamViewComponent);
