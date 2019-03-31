import React from "react";
import ReactDOM from "react-dom";
import posed from "react-pose";
import { easing } from "popmotion";
import "./styles.css";

// pose 1 - fat jelly head
const startPos = { x: 50, y: 100 };
const startControlPt = { x: 10, y: 100 };

const middlePt = { x: 110, y: 10 };
const middleControlPt = { x: 20, y: 10 };

const endPos = { x: 180, y: 100 };
const endControlPt = { x: 210, y: 100 };

// pose 2 - up and flat
const start2Pos = { x: 10, y: 30 };
const start2ControlPt = { x: 0, y: 20 };

const middle2Pt = { x: 110, y: 10 };
const middle2ControlPt = { x: 20, y: 10 };

const end2Pos = { x: 210, y: 30 };
const end2ControlPt = { x: 220, y: 20 };

// pose 3 - mid thrust position
const start3Pos = { x: 20, y: 90 };
const start3ControlPt = { x: 70, y: 60 };

const middle3Pt = { x: 110, y: 10 };
const middle3ControlPt = { x: 40, y: 10 };

const end3Pos = { x: 200, y: 90 };
const end3ControlPt = { x: 150, y: 60 };

const path3 = ` M${start3Pos.x} ${start3Pos.y}
                C ${start3ControlPt.x} ${start3ControlPt.y}, 
                ${middle3ControlPt.x} ${middle3ControlPt.y}, 
                ${middle3Pt.x} ${middle3Pt.y} 
                S ${end3ControlPt.x} ${end3ControlPt.y}, 
                ${end3Pos.x} ${end3Pos.y} z`;

const path1 = ` M${startPos.x} ${startPos.y}
                C ${startControlPt.x} ${startControlPt.y}, 
                ${middleControlPt.x} ${middleControlPt.y}, 
                ${middlePt.x} ${middlePt.y} 
                S ${endControlPt.x} ${endControlPt.y}, 
                ${endPos.x} ${endPos.y} z`;

const path2 = ` M${start2Pos.x} ${start2Pos.y}
                C ${start2ControlPt.x} ${start2ControlPt.y}, 
                ${middle2ControlPt.x} ${middle2ControlPt.y}, 
                ${middle2Pt.x} ${middle2Pt.y} 
                S ${end2ControlPt.x} ${end2ControlPt.y}, 
                ${end2Pos.x} ${end2Pos.y} z`;

const PathFramed = posed.path({
  init: { d: path1 },
  swim: {
    d: path1,
    transition: {
      type: "keyframes",
      values: [path1, path2, path3, path1],
      loop: Infinity,
      easings: [easing.bounceInOut, easing.bounceInOut, easing.easeOut],
      times: [0, 0.6, 0.85, 1],
      duration: 2000
    }
  }
});

class Example extends React.Component {
  render() {
    return (
      <div style={{ background: "yellow" }}>
        <div style={{ padding: 20 }}>
          <svg width="600" height="600">
            <g transform={"translate(0 0)"}>
              <path fill={"none"} stroke={"black"} d={path1} />
              <path fill={"none"} stroke={"black"} d={path2} />
              <path fill={"none"} stroke={"black"} d={path3} />
            </g>

            <g transform={"translate(300 0)"}>
              {/* <PathFramed pose={isVisible ? "swim" : "hidden"} /> */}
              <PathFramed initialPose="pre" pose="swim" />
            </g>
          </svg>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Example />, document.getElementById("root"));
