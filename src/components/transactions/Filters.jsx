export default function Filters() {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      
      <input
        placeholder="Search..."
        className="bg-[#1e293b] px-4 py-2 rounded w-60"
      />

      <select className="bg-[#1e293b] px-4 py-2 rounded">
        <option>All Types</option>
        <option>Income</option>
        <option>Expense</option>
      </select>

      <select className="bg-[#1e293b] px-4 py-2 rounded">
        <option>All Categories</option>
        <option>Food</option>
        <option>Salary</option>
        <option>Shopping</option>
      </select>

      <input type="date" className="bg-[#1e293b] px-4 py-2 rounded" />
      <input type="date" className="bg-[#1e293b] px-4 py-2 rounded" />

      <select className="bg-[#1e293b] px-4 py-2 rounded">
        <option>Sort by Date</option>
      </select>

    </div>
  );
}