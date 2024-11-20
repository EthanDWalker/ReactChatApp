export default function FormInput(props) {
  let children, id, type;
  ({ children, id, type } = props);
  return (
    <>
      <label className="py-1 pl-1 text-md">{children}</label>
      <input
        type={type}
        name={id}
        className="rounded-md bg-first outline-none hover:outline-third hover:outline-offset-0 px-1 py-0.5"
      ></input>
    </>
  );
}
