import React, { useEffect, useRef, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useLocation } from "react-router-dom";
import Header from "../../Components/Header";
import axios from "axios";
import ReactMonthPicker from "react-month-picker";
import "react-month-picker/css/month-picker.css";
import { useNavigate } from "react-router-dom";

const PatientDetail = () => {

  let navigate = useNavigate();
  
  const patientDetailId = useLocation();
  const monthPickerRef = useRef(null);
  const [dataApi, setDataApi] = useState([]);
  const [dataID, setDataID] = useState(null);
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const [value, setValue] = useState({
    year: currentYear,
    month: currentMonth,
  });

  let setZeroMonth;
  if (currentMonth > 9) {
    setZeroMonth = currentMonth;
  } else {
    setZeroMonth = "0" + currentMonth;
  }

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/");
      console.log("=====");
    }
    getAppi(setZeroMonth, currentYear);
  }, []);

  const getAppi = async (month, year) => {
    try {
      const response = await axios({
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        data: {
          key: patientDetailId.state,
          month: month,
          year: year,
        },
        url: "https://emrtest.genensys.com/rpm/getPatientEncounters",
      });
      setDataApi(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitList = (id) => {
    if (id === dataID) {
      setDataID(null);
    } else {
      setDataID(id);
    }
  };

  const showPicker = () => {
    if (monthPickerRef && monthPickerRef.current) {
      monthPickerRef.current.show();
    }
  };

  const hidePicker = () => {
    if (monthPickerRef && monthPickerRef.current) {
      monthPickerRef.current.dismiss();
    }
  };

  const handlePickerChange = (...args) => {
    let valSet;
    if (args[1] > 9) {
      valSet = args[1];
    } else {
      valSet = "0" + args[1];
    }
    setValue({ year: args[0], month: valSet });
    getAppi(valSet, args[0]);
    hidePicker();
  };

  const lang = {
    months: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    from: "From",
    to: "To",
  };

  return (
    <>
      <Header />
      <div className="main-configration-wrapper">
        <div className="container mx-auto patients-lists-wrapper">
          <div className="MonthYearPicker my-10">
            <button
              type="button"
              className="btn bg-slate-900 px-5 py-2 rounded-md text-white"
              onClick={showPicker}
            >
              Select Date
            </button>

            <ReactMonthPicker
              lang={lang.months}
              years={20}
              ref={monthPickerRef}
              onChange={handlePickerChange}
              value={value}
              onDismiss={hidePicker}
            />
          </div>
          <div className="grid lg:grid-cols-1 bg-white p-5 mb-5 rounded-sm gap-3">
            <ul className="patients-encounter-date">
              {dataApi.encounters &&
                dataApi.encounters.map((item, index) => {
                  return (
                    <li
                      className="shadow rounded-md py-3 px-10 mb-2"
                      key={index}
                    >
                      <div onClick={() => handleSubmitList(index)}>
                        <span className="text-sm text-neutral-500">
                          Encounter Date
                        </span>
                        <span className="mx-3">:</span>
                        <span className="text-md text-blue-800 font-semibold">
                          {item.encounterDate}
                        </span>
                      </div>
                      {dataID === index && (
                        <div className="mt-3 border-solid border-t-2 pt-3">
                          <p className="mb-1">
                            <span className="text-sm text-gray-500">
                              Start Time
                            </span>
                            <span className="mx-2">:</span>
                            <span className="text-sm font-semibold text-neutral-700">
                              {item.startTime}
                            </span>
                          </p>
                          <p>
                            <span className="text-sm text-gray-500">
                              End Time
                            </span>
                            <span className="mx-2">:</span>
                            <span className="text-sm font-semibold text-neutral-700">
                              {item.endTime}
                            </span>
                          </p>
                        </div>
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="col-span-12">
            <div className="card mb-4 p-6 bg-white">
              <div className="card-body">
                <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
                  <div className="flex align-center">
                    <div style={{ width: "100%" }} className="py-5">
                      <ResponsiveContainer width="100%" height={400}>
                        <LineChart
                          width={500}
                          height={300}
                          data={dataApi.vitals}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid />
                          <XAxis dataKey="encounterDate" />
                          <YAxis width={20} />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="distolic"
                            stroke="#8884d8"
                            dot={false}
                          />
                          <Line
                            type="monotone"
                            dataKey="pulse"
                            stroke="#82ca9d"
                            dot={false}
                          />
                          <Line
                            type="monotone"
                            dataKey="systolic"
                            stroke="#4882e3"
                            dot={false}
                          />
                          <Line
                            type="monotone"
                            dataKey="weight"
                            stroke="#db243a"
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientDetail;
