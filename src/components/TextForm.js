import React, { useEffect, useState } from "react";
import MicIcon from "@mui/icons-material/Mic";
import { forwardRef, useRef } from "react";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import copy from "copy-to-clipboard";
import { Button, ButtonGroup, Card, ListGroup } from "react-bootstrap";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import Radium, { StyleRoot } from "radium";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import TextIncreaseIcon from "@mui/icons-material/TextIncrease";
import TextDecreaseIcon from "@mui/icons-material/TextDecrease";
import { useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { Tooltip } from "@mui/material";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import MicOffIcon from "@mui/icons-material/MicOff";
import DoneIcon from "@mui/icons-material/Done";

const ComponentToPrint = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      style={{
        padding: "10px",
        fontWeight: "500",
      }}
    >
      <p
        style={{
          fontWeight: props.fontWeight ? "800" : "500",
          fontSize: `${props.fontSize}px`,
          padding: "10px",
          textAlign: `${props.textAlign}`,
          fontStyle: props.fontStyle && "italic",
          textDecoration: props.textDecoration && "underline",
          color: `${props.color}`,
        }}
      >
        {props.text.length > 0 ? props.text : "Nothing to preview!"}
      </p>
    </div>
  );
});

const SpeechRecogition =
  window.SpeechRecogition || window.webkitSpeechRecognition;
const mic = new SpeechRecogition();
mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

function TextForm(props) {
  const [textAlign, settextAlign] = useState("start");
  const [fontSize, setfontSize] = useState(20);
  const [fontWeight, setfontWeight] = useState(false);
  const [fontStyle, setfontStyle] = useState(false);
  const [copytext, setcopy] = useState(false);
  const [textDecoration, settextDecoration] = useState(false);
  const [color, setColor] = useColor("#000");
  const [pallete, setpallete] = React.useState("#0000");
  const [text, setText] = useState("");
  const [output, setoutput] = useState(text);
  const [listen, setlisten] = useState(false);
  const [note, setnote] = useState(null);
  const [saveNotes, setsaveNotes] = useState([]);

  useEffect(() => {
    handleListen();
  }, [listen]);

  const handleListen = () => {
    if (listen) {
      mic.start();
      mic.onend = () => {
        console.log("continue");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("stopped");
      };
    }
    mic.onstart = () => {
      console.log("Mic on");
    };
    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      setnote(transcript);
      console.log(transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };

  const handleSaveNote = () => {
    setsaveNotes([...saveNotes, note]);
    setnote("");
    setoutput(output + "\n" + note + "\n");
  };

  let newNote = "";
  saveNotes.map((n) => (newNote += n + "\n"));

  console.log(output);

  const ref = useRef();
  const ConvertToUp = () => {
    const newText = output.toUpperCase();
    setoutput(newText);
  };
  const handleOnChange = (event) => {
    setText(event.target.value);
    setoutput(newNote + "\n" + event.target.value);
  };
  const ConvertToLo = () => {
    const newText = output.toLowerCase();
    setoutput(newText);
  };

  console.log(output);
  const CopyText = () => {
    copy(output);
    setcopy(true);
    setInterval(() => {
      setcopy(false);
    }, 2000);
  };
  const ExtraSpace = () => {
    const newText = text.split(/[ ]+/);
    setText(newText.join(" "));
  };

  const Capitalize = () => {
    let newText = output.split(/[.]+/);
    let string;
    let newstr = "";
    console.log(newText.length);
    if (newText.length > 1) {
      for (let i = 0; i < newText.length - 1; i++) {
        newText[i] = newText[i].trim();
        if (newText[i][0] !== "") {
          const str = newText[i];
          {
            str && (string = str[0].toUpperCase() + str.slice(1));
          }
          newstr += string + ". ";
        }
      }
      console.log(newText[newText.length - 1]);
      newText[newText.length - 1] = newText[newText.length - 1].trim();
      if (newText[newText.length - 1] !== "") {
        newstr +=
          newText[newText.length - 1][0].toUpperCase() +
          newText[newText.length - 1].slice(1);
      }
      setoutput(newstr);
    } else if (newText !== "") {
      newstr = newText[0][0].toUpperCase() + newText[0].slice(1);

      setoutput(newstr);
    }
  };
  const Clear = () => {
    const newText = "";
    setText(newText);
  };

  return (
    <>
      <StyleRoot>
        <ButtonGroup
          aria-label="Basic example"
          style={{
            display: "flex",
            margin: "auto",
            width: "50%",
            flexWrap: "wrap",
            backgroundColor: "var(--btn-bg)",
            padding: "5px 5px",
            borderRadius: "10px",
          }}
        >
          <button
            type="button"
            class="btn"
            onClick={() => settextAlign("center")}
          >
            <FormatAlignCenterIcon />
          </button>
          <button
            type="button"
            class="btn"
            onClick={() => settextAlign("start")}
          >
            <FormatAlignLeftIcon />
          </button>
          <button
            type="button"
            class="btn "
            onClick={() => settextAlign("end")}
          >
            <FormatAlignRightIcon />
          </button>
          <button
            type="button"
            class="btn "
            onClick={() => settextAlign("justify")}
          >
            <FormatAlignJustifyIcon />
          </button>
          <button
            type="button"
            class="btn "
            onClick={() => setfontWeight(!fontWeight)}
          >
            <FormatBoldIcon />
          </button>
          <button
            type="button"
            class="btn "
            onClick={() => setfontStyle(!fontStyle)}
          >
            <FormatItalicIcon />
          </button>
          <button
            type="button"
            class="btn "
            onClick={() => settextDecoration(!textDecoration)}
          >
            <FormatUnderlinedIcon />
          </button>
          <button
            type="button"
            class="btn "
            onClick={() => setfontSize(fontSize - 2)}
          >
            <TextDecreaseIcon />
          </button>
          <button
            type="button"
            class="btn "
            onClick={() => setfontSize(fontSize + 2)}
          >
            <TextIncreaseIcon />
          </button>
          <button type="button" class="btn">
            <input
              type="color"
              name="favcolor"
              onChange={(e) => {
                setColor(e.target.value);
                setpallete(e.target.value);
              }}
            />
          </button>

          <button type="button" class="btn " onClick={ConvertToUp}>
            ABC
          </button>
          <button type="button" class="btn " onClick={ConvertToLo}>
            abc
          </button>
          <button type="button" class="btn " onClick={Capitalize}>
            Capitalize
          </button>
          <button type="button" class="btn btnend" onClick={ExtraSpace}>
            RemoveExtraSpace
          </button>
        </ButtonGroup>
        <br />
        <br />
        <div className="mx-4 my-3">
          <div
            className="contain"
            style={{
              display: "flex",
              "@media (max-width: 1100px)": {
                flexDirection: "column",
                justifyContent: "center",
              },
            }}
          >
            <div
              style={{
                "@media (max-width: 1100px)": {
                  width: "80%",
                  margin: "auto",
                },
                width: "35%",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--poppins)",
                  fontWeight: "600",
                  letterSpacing: "1.1px",
                }}
              >
                {props.heading}
                &nbsp; &nbsp;
                <Tooltip title="Clear All" arrow placement="top">
                  <ClearAllIcon style={{ cursor: "pointer" }} onClick={Clear} />
                </Tooltip>
              </h2>
              <textarea
                className="form-control my-3"
                style={{
                  backgroundColor: "var(--btn-bg)",
                  fontSize: "20px",
                  border: "3px solid var(--logo-text)",
                }}
                onChange={handleOnChange}
                value={text}
                rows="9"
                placeholder="Enter text here"
              ></textarea>
              {listen ? (
                <span>
                  <MicIcon />
                </span>
              ) : (
                <span>
                  <MicOffIcon />
                </span>
              )}
              &nbsp; &nbsp;
              <Button
                className="but"
                style={{
                  backgroundColor: "var(--logo-text)",
                  border: "2px solid black",
                  borderRadius: "20px",
                  padding: "5px 15px",
                  fontSize: "20px",
                }}
                onClick={handleSaveNote}
                disabled={!note}
              >
                Save Note
              </Button>
              &nbsp; &nbsp;
              <Button
                className="but"
                style={{
                  backgroundColor: "var(--logo-text)",
                  border: "none",
                  padding: "5px 15px",
                  border: "2px solid black",
                  borderRadius: "20px",
                  fontSize: "20px",
                }}
                onClick={() => setlisten((prevState) => !prevState)}
              >
                {listen ? <span>Stop</span> : <span>Start</span>}
              </Button>
              &nbsp; &nbsp;
              <Tooltip title="Clear All" arrow placement="top">
                <ClearAllIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => setnote("")}
                />
              </Tooltip>
              <hr style={{ height: "2px" }} />
              <p style={{fontSize:'20px'}}>{note}</p>
            </div>
            <div
              style={{
                width: "35%",
                "@media (max-width: 1100px)": {
                  width: "80%",
                  margin: "auto",
                },
                margin: "0% 4%",
              }}
            >
              <h3>
                <b
                  style={{
                    fontFamily: "var(--poppins)",
                    letterSpacing: "1.1px",
                  }}
                >
                  {" "}
                  Preview
                </b>{" "}
                &nbsp; &nbsp;
                <ReactToPrint content={() => ref.current}>
                  <PrintContextConsumer>
                    {({ handlePrint }) => (
                      <Tooltip title="Print" arrow placement="top">
                        <LocalPrintshopIcon
                          onClick={handlePrint}
                          style={{ cursor: "pointer" }}
                        />
                      </Tooltip>
                    )}
                  </PrintContextConsumer>
                </ReactToPrint>
                &nbsp; &nbsp;
                <Tooltip title="Clear All" arrow placement="top">
                  <ClearAllIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => {setoutput(""); setText("");setnote("")}}
                  />
                </Tooltip>
                &nbsp; &nbsp;
                {copytext ? (
                  <DoneIcon />
                ) : (
                  <Tooltip title="Copy" arrow placement="top">
                    <ContentCopyRoundedIcon
                      onClick={CopyText}
                      style={{ cursor: "pointer" }}
                    />
                  </Tooltip>
                )}
              </h3>
              <hr style={{ height: "2px" }} />

              <div className="box">
                <ComponentToPrint
                  // id="box1"
                  ref={ref}
                  text={output}
                  textAlign={textAlign}
                  fontWeight={fontWeight}
                  fontSize={fontSize}
                  fontStyle={fontStyle}
                  textDecoration={textDecoration}
                  color={color}
                />
              </div>
            </div>
            <div
              style={{
                width: "15%",
                marginTop: "2%",
                "@media (max-width: 1100px)": {
                  width: "80%",
                  margin: "auto",
                },
                height: "200px",
              }}
            >
              <Card
                style={{
                  width: "auto",
                  border: "3px solid var(--logo-text)",
                  backgroundColor: "var(--logo-bg)",
                }}
              >
                <ListGroup variant="flush">
                  <ListGroup.Item
                    style={{
                      backgroundColor: "var(--logo-bg)",
                      fontFamily: "var(--quicksand)",
                    }}
                  >
                    Words: &nbsp;
                    {
                      (output).split(/\s+/).filter((element) => {
                        return element.length !== 0;
                      }).length
                    }{" "}
                  </ListGroup.Item>
                  <ListGroup.Item
                    style={{
                      backgroundColor: "var(--logo-bg)",
                      fontFamily: "var(--quicksand)",
                    }}
                  >
                    Characters: &nbsp; {(output).length}{" "}
                  </ListGroup.Item>
                  <ListGroup.Item
                    style={{
                      backgroundColor: "var(--logo-bg)",
                      fontFamily: "var(--quicksand)",
                    }}
                  >
                    Minutes Read: &nbsp;{" "}
                    {0.08 *
                      (output).split(" ").filter((element) => {
                        return element.length !== 0;
                      }).length}{" "}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </div>
          </div>
        </div>
      </StyleRoot>
    </>
  );
}

export default Radium(TextForm);
