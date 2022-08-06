import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import { useNavigate } from "react-router-dom";

const Index = () => {
  
  let navigate = useNavigate();

  const [patientLists, setPatientLists] = useState([]);

  useEffect(() => {
    
    if (localStorage.getItem("token") === null) {
      navigate("/");
      console.log("=====");
    }

    getAppi();
  }, []);

  const getAppi = async () => {
    try {
      const response = await axios({
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        url: "https://emrtest.genensys.com/rpm/getPatientList",
      });
      setPatientLists(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitRedirect = (id) => {
    navigate("/patient-detail", { state: id });
  };

  return (
    <>
      <div className="main-configration-wrapper">
        <div className="container mx-auto patients-lists-wrapper">
          <div className="grid grid-cols-12 gap-4 dashboards-cards">
            <div className="col-span-12">
              <div className="card mb-4 p-6 bg-white">
                <div className="card-body">
                  <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
                    <h2 className="text-2xl text-gray-900 font-bold mt-5 mb-10 decoration-orange-900 decoration-2 underline">
                      Patients lists
                    </h2>
                    <table className="min-w-full basic-table">
                      <thead>
                        <tr>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Date of birth</th>
                          <th>Primary Insurance</th>
                          <th>Secondary Insurances</th>
                          <th>Minutes this month</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        <>
                          {patientLists &&
                            patientLists?.map((item, index) => {
                              return (
                                <tr
                                  key={index}
                                  onClick={() =>
                                    handleSubmitRedirect(item.patientId)
                                  }
                                >
                                  <td>{item?.firstname}</td>
                                  <td>{item?.lastname}</td>
                                  <td>{item?.dateOfBirth}</td>
                                  <td>{item?.primayInsurance}</td>
                                  <td>{item?.secondaryInsurance}</td>
                                  <td>{item?.mins}</td>
                                </tr>
                              );
                            })}
                        </>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Header />
    </>
  );
};

export default Index;
