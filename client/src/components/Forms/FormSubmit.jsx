export default function FormSubmit(props) {
  let children;
  ({ children } = props);
  return (
    <div className="pt-4 flex justify-center">
      <button className="rounded-md bg-third px-2 py-1" type="submit">
        {children}
      </button>
    </div>
  );
}
