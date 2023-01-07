import Text from "../Text";

export default function Label({ title, theme, desc }) {
  return (
    <>
      <div
        className="card-title"
        style={{
          background: theme.background,
          border: `1px solid ${theme.border}`,
        }}
      >
        <Text color={theme.color} size={"small"}>
          {title}
        </Text>
      </div>
      <div className="card-list-title">
        <Text style={{ marginBottom: "8px" }} color="black" bold size={"small"}>
          {desc}
        </Text>
      </div>
    </>
  );
}
