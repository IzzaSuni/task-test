import Text from "../Text";

export default function ProgressBar({ width = "100%" }) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div className="progress-wrap">
        <div
          className="progress"
          style={{
            width: width,
            background: width === "100%" ? "#43936C" : "#01959F",
          }}
        ></div>
      </div>
      {width === "100%" ? (
        <img src="/assets/checklist.svg" />
      ) : (
        <Text color="#757575">{width}</Text>
      )}
    </div>
  );
}
