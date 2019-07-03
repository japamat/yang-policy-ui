import React from "react";
import "./App.css";
import bannerLogo from "./img/yang2020_white_red.png";
import errorIcon from "./img/baseline-error-24px.svg";
import {
  ReactiveBase,
  DataSearch,
  ResultList,
  ReactiveList
} from "@appbaseio/reactivesearch";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

function App() {
  const screenWidth = window.screen.width;
  
  return (
    <ReactiveBase app="policies-v1" credentials="" url="https://hjdb4k649f.execute-api.us-east-1.amazonaws.com/beta">
      <Navbar bg="yangblue" variant="dark" className="flex-wrap justify-content-around yang-nav">
        <Button className="donate-button" href="https://yang2020.com/donate">
          DONATE
        </Button>
        <Navbar.Brand className="yang-brand">
          <a href="https://yang2020.com">
            <img
              alt=""
              src={bannerLogo}
              height="60"
              className="d-inline-block align-top"
            />
          </a>
        </Navbar.Brand>
        <DataSearch
          componentId="mainSearch"
          dataField={["title", "brief", "action"]}
          showIcon={false}
          placeholder="Search Policies..."
          autosuggest={false}
          className="yang-search"
          highlight
          customHighlight={() => ({
            highlight: {
              pre_tags: ["<mark>"],
              post_tags: ["</mark>"],
              fields: {
                title: {}
              },
              number_of_fragments: 0
            }
          })}
        />
      </Navbar>
      <ReactiveList
        componentId="SearchResult"
        dataField="title"
        react={{
          and: ["mainSearch"]
        }}
        showResultStats={false}
        pagination={true}
        paginationAt={ screenWidth > 600 ? 'bottom' : 'both' }
        pages={screenWidth > 375 ? 5 : 3}
        URLParams={true}
        className="yang-results"
        render={({ data, error, loading }) => (
          <ReactiveList.ResultListWrapper>
            {loading ? <Spinner animation="grow" id="loading-spinner" /> : null}
            {error ? (
              <p className="error-text">
                <img className="error-image" src={errorIcon} alt="" /> Something
                Went Wrong
              </p>
            ) : null}
            {data.map(item => (
              <ResultList
                key={item._id}
                href={item.url}
                className="result-item"
              >
                <ResultList.Content>
                  <ResultList.Title
                    dangerouslySetInnerHTML={{
                      __html: `<p class="entry-title">${item.title}</p>`
                    }}
                  />
                  <ResultList.Description>
                    <p className="entry-description">{item.brief}</p>
                  </ResultList.Description>
                </ResultList.Content>
              </ResultList>
            ))}
          </ReactiveList.ResultListWrapper>
        )}
      />
      <div id="footer">
        <p>
          All data is sourced from{" "}
          <a href="https://yang2020.com">yang2020.com</a>. The creator of this
          site is not employed by or affiliated with Andrew Yang's campaign.
          <br />
          To contact, please reach out to{" "}
          <a href="https://twitter.com/chrome_yang/">@chrome_yang</a> on
          Twitter.
        </p>
      </div>
    </ReactiveBase>
  );
}

export default App;
