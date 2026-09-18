const suggestions = [
  "Pizza",
  "Chicken biryani",
  "Pasta",
  "Salad",
  "Noodles",
  "Masala dosa",
  "Burger",
  "Chocolate cake",
];

function SuggestionChips({ onSelect }) {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-2.5">

      {suggestions.map((item) => (

        <button
          key={item}
          onClick={() => onSelect(item)}
          className="rounded-full border border-paprika/40 bg-paper px-4 py-1.5 font-mono text-xs uppercase tracking-wide text-paprika transition hover:bg-paprika hover:text-paper"
        >
          {item}
        </button>

      ))}

    </div>
  );
}

export default SuggestionChips;
