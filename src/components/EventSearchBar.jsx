import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState } from "recoil";
import { eventListFilterState } from "recoil/atoms/events";

export default function EventSearchBar() {
  const [eventFilter, setFilter] = useRecoilState(eventListFilterState);

  const updateFilter = ({ target: { name, value } }) => {
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <section className="EventsPage__search__bar">
      <div field="true">
        <label>Looking for</label>
        <input
          value={eventFilter.name}
          onChange={updateFilter}
          type="search"
          name="name"
          placeholder="Blockchain Event"
        />
      </div>
      <div field="true">
        <label>In</label>
        <input
          onChange={updateFilter}
          value={eventFilter.location}
          type="search"
          name="location"
          placeholder="Lagos, Nigeria"
        />
      </div>
      <div field="last">
        <label>When</label>
        <select value={eventFilter.date} name="date" onChange={updateFilter}>
          <option>Any Date</option>
        </select>
      </div>
      <div>
        <button className="EventsPage__search__bar__button">
          <FontAwesomeIcon icon={solid("search")} />
        </button>
      </div>
    </section>
  );
}
