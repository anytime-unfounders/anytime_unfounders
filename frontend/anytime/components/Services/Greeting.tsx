type GreetingProps = {
  /** Full name to display; pass null/undefined while loading */
  name?: string | null;
};

export default function Greeting({ name }: GreetingProps) {
  const display = name?.trim() || "there";
  return (
    <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
      <span>Hello,</span>
      {/* second line */}
      <span className="block text-[#6D39B8] font-bold">{display}!</span>
    </h1>
  );
}
