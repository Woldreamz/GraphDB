import React, { useState } from "react";
import { toast } from "react-toastify";
import { HTTP } from "../../utils";
import PropTypes from "prop-types";
import "../../assets/css/modal.css";

const DBModal = ({ handleClose }) => {
  const [databaseType, setDatabaseType] = useState("Blazegraph");
  const [name_space, setNamespace] = useState(""); // New state variable for name_space
  const [port, setPort] = useState("9999");
  const [minMemory, setMinMemory] = useState("");
  const [maxMemory, setMaxMemory] = useState("");
  const [installationPath, setInstallationPath] = useState(""); // State for installation path

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!databaseType || !installationPath) {
      toast.error(
        "Please select the database type and provide the installation path."
      );
      return;
    }

    if (!name_space) {
      toast.error("Please provide a name_space.");
      return;
    }

    const data = {
      name_space, // Include name_space in the data object
      properties: {
        "com.bigdata.rdf.store.DataLoader":
          "com.bigdata.rdf.data.RDFDataLoader",
        "com.bigdata.rdf.store.DataLoader.context":
          "com.bigdata.rdf.data.RDFDataLoaderContext",
        "com.bigdata.rdf.sail.isolates": "true",
        "com.bigdata.rdf.sail.quads": "true",
        "com.bigdata.rdf.sail.axioms": "true",
        "com.bigdata.rdf.sail.includeInferred": "true",
        "com.bigdata.rdf.sail.incremental": "false",
        "com.bigdata.rdf.sail.name_space": name_space, // Include name_space in properties if needed
        "com.bigdata.journal.AbstractJournal.minMemory": "512m", // Include minMemory in properties
        "com.bigdata.journal.AbstractJournal.maxMemory": "4g", // Include maxMemory in properties
      },
      port,
      minMemory,
      maxMemory,
      installationPath, // Include installation path in data
    };

    try {
      await HTTP.post("db_create/", data, {
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        },
      });
      toast.success("Database created successfully.");
      handleClose();
    } catch (error) {
      console.error("There was an error creating the database!", error);
      toast.error("Failed to create the database. Please try again.");
    }
  };

  const handleFolderChoose = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setInstallationPath(file.webkitRelativePath || file.path || file.name);
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <p className="text-muted">
          새로운 데이터베이스를 생성하기 위해 데이터베이스의 유형을 선택하고,
          설치 경로와 Port를 입력해주세요. 추가적으로 최소/최대 메모리 사용량을
          입력하면, 이에 맞게 데이터베이스가 실행됩니다.
        </p>

        {/* Namespace Input */}
        <div className="mb-3 row align-items-center">
          <label htmlFor="name_space" className="col-sm-3 col-form-label">
            Namespace
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              id="name_space"
              className="form-control"
              value={name_space}
              onChange={(e) => setNamespace(e.target.value)}
              placeholder="Enter name_space"
            />
          </div>
        </div>

        {/* Database Type Selection */}
        <h6>Required</h6>
        <div className="mb-3 row align-items-center">
          <label htmlFor="databaseType" className="col-sm-3 col-form-label">
            Database Type
          </label>
          <div className="col-sm-3">
            <select
              id="databaseType"
              className="form-select"
              value={databaseType}
              onChange={(e) => setDatabaseType(e.target.value)}
            >
              <option value="">Select Database Type</option>
              <option value="Blazegraph">Blazegraph</option>
            </select>
          </div>
        </div>

        {/* Installation Path */}
        <div className="mb-3 row align-items-center">
          <label htmlFor="installationPath" className="col-sm-3 col-form-label">
            Installation Path
          </label>
          <div className="col-sm-9">
            <div className="input-group">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleFolderChoose}
              >
                Choose folder
              </button>
              <input
                type="text"
                id="installationPath"
                className="form-control"
                value={installationPath}
                onChange={(e) => setInstallationPath(e.target.value)}
                placeholder="Enter or select installation path"
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Hidden File Input for Folder Selection */}
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          webkitdirectory=""
          onChange={handleFileChange}
        />

        {/* Port */}
        <div className="mb-3 row align-items-center">
          <label htmlFor="port" className="col-sm-3 col-form-label">
            Port
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              id="port"
              className="form-control"
              value={port}
              onChange={(e) => setPort(e.target.value)}
            />
          </div>
        </div>

        <h6>Optional</h6>
        {/* Minimum Memory Usage */}
        <div className="mb-3 row align-items-center">
          <label htmlFor="minMemory" className="col-sm-5 col-form-label">
            Minimum Memory Usage (-Xms)
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              id="minMemory"
              className="form-control"
              value={minMemory}
              onChange={(e) => setMinMemory(e.target.value)}
            />
          </div>
        </div>

        {/* Maximum Memory Usage */}
        <div className="mb-3 row align-items-center">
          <label htmlFor="maxMemory" className="col-sm-5 col-form-label">
            Maximum Memory Usage (-Xmx)
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              id="maxMemory"
              className="form-control"
              value={maxMemory}
              onChange={(e) => setMaxMemory(e.target.value)}
            />
          </div>
        </div>

        <div className="d-flex justify-content-center mt-5">
          <button type="submit" className="btn btn-primary w-50">
            Create database
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};

DBModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default DBModal;
