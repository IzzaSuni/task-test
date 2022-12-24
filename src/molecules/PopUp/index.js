export default function PopUp({ children, open}) {
  return <div className={`popup popup-${open}`}>{children}</div>;
}
