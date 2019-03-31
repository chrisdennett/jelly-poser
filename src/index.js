import React from "react";
import ReactDOM from "react-dom";
import posed from "react-pose";
import "./styles.css";

const startPos = { x: 70, y: 100 };
const startControlPt = { x: 10, y: 100 };

const middlePt = { x: 110, y: 10 };
const middleControlPt = { x: 20, y: 10 };

const endPos = { x: 160, y: 100 };
const endControlPt = { x: 210, y: 100 };

const start2Pos = { x: 10, y: 30 };
const start2ControlPt = { x: 0, y: 20 };

const middle2Pt = { x: 110, y: 10 };
const middle2ControlPt = { x: 20, y: 10 };

const end2Pos = { x: 210, y: 30 };
const end2ControlPt = { x: 220, y: 20 };

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

const Path = posed.path({
  path1: {
    d: path1,
    transition: {
      default: { type: "spring", stiffness: 90 }
    }
  },
  path2: {
    d: path2,
    transition: {
      default: { ease: "easeOut", duration: 500 }
    }
  }
});

const Box = posed.div({
  hidden: {
    opacity: 0.1,
    scaleX: 0.1,
    scaleY: 0.1,
    transition: { duration: 200 }
  },

  visible: {
    opacity: 1,
    scaleX: 1,
    scaleY: 1,
    transition: {
      opacity: { ease: "easeIn", duration: 500 },
      scaleY: { ease: "easeOut", duration: 100, delay: 1000 },
      default: { ease: "easeOut", duration: 100 }
    }
  }
});

class Example extends React.Component {
  state = { isVisible: true, path: "path1" };

  componentDidMount() {
    setInterval(() => {
      this.setState({
        isVisible: !this.state.isVisible,
        path: this.state.path === "path1" ? "path2" : "path1"
      });
    }, 2000);
  }

  render() {
    const { isVisible, path } = this.state;
    return (
      <div style={{ background: "yellow" }}>
        <div style={{ padding: 20 }}>
          <svg width="600" height="600">
            <g transform={"translate(0 200)"}>
              <path d={path2} />
            </g>

            <Path pose={path} />
          </svg>
          <Box className="box" pose={isVisible ? "visible" : "hidden"} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Example />, document.getElementById("root"));
