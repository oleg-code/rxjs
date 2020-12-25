const Time = (props) => {
  return (
    <div className="time">
      {props.hours > 9 ? props.hours : "0" + props.hours} : {" "}
      {props.minutes > 9 ? props.minutes : "0" + props.minutes} : {" "}
      {props.seconds > 9 ? props.seconds : "0" + props.seconds}
    </div>
  );
};

export default Time;
