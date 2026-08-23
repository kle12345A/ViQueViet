export function Stats({ items }: { items: { value: string; label: string }[] }) {
  return <div className="stats-grid">{items.map((item) => <div className="stat" key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}</div>;
}
