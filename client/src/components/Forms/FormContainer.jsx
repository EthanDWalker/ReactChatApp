import {} from "react";

export default function FormContainer(props) {
  let children, title, onSubmit;
  ({ children, title, onSubmit } = props);
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="px-6 py-5 bg-second sm:rounded-xl max-sm:w-screen">
        <h1 className="text-xl font-bold text-center">{title}</h1>
        <form className="flex flex-col" onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </div>
  );
}
