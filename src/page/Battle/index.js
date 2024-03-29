import React, { useState, useEffect } from "react";
import { Row, Col, Alert } from "antd";
import SearchInput from "@/components/SearchInput";
import { pushRoute } from "@/untils/router";

import styles from "./index.less";

function Index() {
  const [playerOneName, setPlayerOneName] = useState("");
  const [playerTwoName, setPlayerTwoName] = useState("");

  const submitData = () => {
    pushRoute({
      page: "results",
      query: {
        play1: playerOneName,
        play2: playerTwoName
      }
    });
  };

  return (
    <div>
      <p className={styles.title}>Instructions</p>
      <Row style={{ display: "flex", justifyContent: "space-around" }}>
        <Col className={styles.small} md={8} sm={12} xs={12}>
          <span style={{ display: "block", fontSize: 18 }}>
            Enter two Github:
          </span>
          <i
            className="fa fa-users"
            style={{
              color: "rgb(255, 191, 116)",
              backgroundColor: "#eee"
            }}
          ></i>
        </Col>
        <Col className={styles.small} md={8} sm={12} xs={12}>
          <span style={{ display: "block", fontSize: 18 }}>Battle:</span>
          <i
            className="fa fa-fighter-jet"
            style={{
              color: "gray",
              backgroundColor: "#eee"
            }}
          ></i>
        </Col>
        <Col className={styles.small} md={8} sm={12} xs={12}>
          <span style={{ display: "block", fontSize: 18 }}>
            See the winner:
          </span>
          <i
            className="fa fa-trophy"
            style={{
              color: "rgb(244,234,47)",
              backgroundColor: "#eee"
            }}
          ></i>
        </Col>
      </Row>

      <p style={{ textAlign: "center", fontSize: 24, fontWeight: "bold" }}>
        Players
      </p>
      <Row style={{ display: "flex", width: "100%" }}>
        <Col style={{ width: "100%", paddingTop: 15 }} md={12} sm={24}>
          <p style={{ fontSize: 24, fontWeight: "bold" }}>Player One</p>
          <SearchInput
            getSuccessData={data => setPlayerOneName(data)}
            otherName={playerTwoName}
          />
        </Col>

        <Col style={{ width: "100%", paddingTop: 15 }} md={12} sm={24}>
          <p style={{ fontSize: 24, fontWeight: "bold" }}>Player Two</p>
          <SearchInput
            getSuccessData={data => setPlayerTwoName(data)}
            otherName={playerOneName}
          />
        </Col>
      </Row>

      <div
        style={{
          width: "100%",
          justifyContent: "center",
          marginTop: 50,
          display:
            playerOneName.length > 0 && playerTwoName.length > 0
              ? "flex"
              : "none"
        }}
      >
        <button
          style={{
            fontSize: 18,
            width: 200,
            paddingTop: 10,
            paddingBottom: 10,
            textAlign: "center"
          }}
          onClick={submitData}
        >
          Battle
        </button>
      </div>
    </div>
  );
}

export default Index;
