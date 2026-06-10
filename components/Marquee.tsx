export default function Marquee({ items }: { items: string[] }) {
  const track = (
    <div className="marquee__track" aria-hidden="true">
      {items.map((item, i) => (
        <span
          key={i}
          className="text-lg font-semibold whitespace-nowrap text-gray-400"
        >
          {item}
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee">
      {track}
      {track}
    </div>
  );
}
