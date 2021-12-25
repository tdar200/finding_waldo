import React, { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
import { Button, Dropdown } from "react-bootstrap";

function App() {
  const characters = [
    [[0.9440962680586654], [0.7610153542858077]],
    [[0.41841001512790726], [0.6008641432304468]],
    [[0.028973509933774833], [0.8642858020368801]],
  ];

  const offset1 = 0.003;
  const offset2 = 0.03;
  const offset3 = 0.015;

  const myRef = useRef(null);
  const bodyRef = useRef(null);

  const [data, setData] = useState([]);
  const [show, setShow] = useState(true);
  const [show2, setShow2] = useState(false);

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  const [charactersCount, setCharacterCount] = useState([
    "ash",
    "neo",
    "stewie",
  ]);

  useEffect(() => {
    if (show || show2) {
      bodyRef.current.parentNode.parentNode.style = "overflow-y:hidden";
    }
    else {
      bodyRef.current.parentNode.parentNode.style = "overflow-y:scroll"
    }
  }, [show, show2]);

  useEffect(() => {
    if (charactersCount.length === 0) {
      setShow2(true);
      window.scrollTo(0, 0);
    }

    if (show === false && show2 === false) {
      const setTimer = setInterval(() => {
        if (seconds < 59) {
          setSeconds((prev) => prev + 1);
        } else {
          setSeconds(0);
          setMinutes((prev) => prev + 1);
        }

        if (minutes >= 59) {
          setMinutes(0);
          setHours((prev) => prev + 1);
        }
      }, 1000);

      return () => {
        clearInterval(setTimer);
      };
    }
  });

  const fetchData = async () => {
    const { data } = await axios.get("/api/getting");

    setData(data[0]);
  };

  const imageClick = (e) => {
    var offset = myRef.current.getBoundingClientRect();
    var x = e.pageX / offset.width;
    var y = (e.pageY - 50) / offset.height;
    console.log(x, y);

    // console.log(
    //   Math.sqrt(
    //     Math.pow(x - Math.abs(characters[2][0]), 2) +
    //       Math.pow(y - Math.abs(characters[2][1]), 2)
    //   )
    // );

    if (
      Math.sqrt(
        Math.pow(x - Math.abs(characters[0][0]), 2) +
          Math.pow(y - Math.abs(characters[0][1]), 2)
      ) < offset1
    ) {
      console.log("found stewie boyyy");

      let index = charactersCount.indexOf("stewie");

      let newList = charactersCount;

      if (index !== -1 && newList.length > 1) {
        newList.splice(index, 1);

        setCharacterCount([...newList]);
      } else if (index !== -1 && newList.length === 1) {
        setCharacterCount([]);
        setShow2(true);
      }
    }
    if (
      Math.sqrt(
        Math.pow(x - Math.abs(characters[1][0]), 2) +
          Math.pow(y - Math.abs(characters[1][1]), 2)
      ) < offset2
    ) {
      console.log("found neo boyyy");

      let index = charactersCount.indexOf("neo");

      let newList = charactersCount;

      if (index !== -1 && newList.length > 1) {
        newList.splice(index, 1);
        setCharacterCount([...newList]);
      } else if (index !== -1 && newList.length === 1) {
        setCharacterCount([]);
        setShow2(true);
      }
    }
    if (
      Math.sqrt(
        Math.pow(x - Math.abs(characters[2][0]), 2) +
          Math.pow(y - Math.abs(characters[2][1]), 2)
      ) < offset3
    ) {
      console.log("found ash boyyy");
      let index = charactersCount.indexOf("ash");
      let newList = charactersCount;
      if (index !== -1 && newList.length > 1) {
        newList.splice(index, 1);
        setCharacterCount([...newList]);
      } else if (index !== -1 && newList.length === 1) {
        setCharacterCount([]);
        setShow2(true);
      }
    }
  };

  const foundAll = () => {
    return (
      <div
        style={show2 ? { display: "block" } : { display: "none" }}
        className='modal-2'
      >
        <div className='modal-content-2'>
          <h1>Find Game</h1>
          <p>Congratulations! You finished in </p>
          <h2>
            {hours < 10 ? "0" + hours + ":" : hours + ":"}
            {minutes < 10 ? "0" + minutes + ":" : minutes + ":"}
            {seconds < 10 ? "0" + seconds : seconds}
          </h2>
        </div>
      </div>
    );
  };

  useEffect(() => {
    fetchData();
    console.log("fetching data");
  }, []);

  const startGame = () => {
    setShow(false);
  };

  // console.log(charactersCount);

  console.log(show);
  console.log(show2);

  return (
    <div ref={bodyRef} className='Container'>
      <nav>
        <Dropdown>
          <Dropdown.Toggle
            disabled={show === true || show2 === true ? true : false}
            variant='danger'
            id='dropdown-basic'
          >
            Find {charactersCount.length}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href='#/action-1'>
              <img src='https://www.seekpng.com/png/full/766-7660020_stewie-stewie-griffin.png' />
              Stewie Griffin
            </Dropdown.Item>
            <Dropdown.Item href='#/action-2'>
              <img src='https://www.pngkey.com/png/full/266-2660354_neo-neo-matrix.png' />
              Neo
            </Dropdown.Item>
            <Dropdown.Item href='#/action-3'>
              <img src='https://www.nicepng.com/png/full/139-1394970_ash-ketchum-png-photo-original-ash-ketchum.png' />
              Ash Ketchum
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <div className='timer'>
          <h2>{hours < 10 ? "0" + hours + ":" : hours + ":"}</h2>
          <h2>{minutes < 10 ? "0" + minutes + ":" : minutes + ":"}</h2>
          <h2>{seconds < 10 ? "0" + seconds : seconds}</h2>
        </div>
      </nav>

      {show2 && foundAll()}

      <div
        style={show ? { display: "block" } : { display: "none" }}
        className='modal'
      >
        <div className='modal-content'>
          <h1>Find Game</h1>
          <div>
            <img src='https://www.seekpng.com/png/full/766-7660020_stewie-stewie-griffin.png' />
            <p>Stewie Griffin</p>
          </div>
          <div>
            <img src='https://www.pngkey.com/png/full/266-2660354_neo-neo-matrix.png' />
            <p>Neo</p>
          </div>
          <div>
            <img src='https://www.nicepng.com/png/full/139-1394970_ash-ketchum-png-photo-original-ash-ketchum.png' />
            <p>Ash Ketchum</p>
          </div>
          <button onClick={startGame}>Start Game</button>
        </div>
      </div>

      <img
        ref={myRef}
        onClick={(e) => imageClick(e)}
        className='picture'
        src={data.pictures && data.pictures[0]}
        alt='no pic'
      ></img>
    </div>
    // </div>
  );
}

export default App;
