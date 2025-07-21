
export default function parentEle({ name, setName }) {
  return (
    <>
      <label>Name </label>
      <input
        placeholder="Enter your name"
        type="text"
        id="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </>
  );
}
