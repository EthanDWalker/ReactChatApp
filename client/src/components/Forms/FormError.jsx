export default function FormError(props) {
  let children;
  ({ children } = props);
  return <div className="text-red text-sm text-center">{children}</div>;
}
