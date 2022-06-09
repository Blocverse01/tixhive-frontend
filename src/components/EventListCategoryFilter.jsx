import { useRecoilState } from "recoil";
import { eventListFilterState } from "recoil/atoms/events";
import { useEventCategories } from "hooks/data/events";

export default function EventListCategoryFilter() {
  const [eventFilter, setFilter] = useRecoilState(eventListFilterState);
  const eventCategories = useEventCategories();

  const updateFilter = ({ target: { name, value } }) => {
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <select
      name="category"
      onChange={updateFilter}
      value={eventFilter.category}
      className="EventsPage__upcoming__events__header__filter"
    >
      <option value={"Any Category"}>Any Category</option>
      {eventCategories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
}
