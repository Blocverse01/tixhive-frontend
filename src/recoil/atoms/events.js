import { atom, selector } from "recoil";

export const eventListState = atom({
  key: "eventList",
  default: [],
});

export const eventCategoriesState = selector({
  key: "eventCategories",
  get: ({ get }) => {
    const events = get(eventListState);
    const eventCategories = events.map((event) => event.category);
    const uniqueCategories = [...new Set(eventCategories)];
    return uniqueCategories;
  },
})

export const eventListFilterState = atom({
  key: 'EventListFilter',
  default: {
    category: "Any Category",
    name: "",
    date: "",
    location: ""
  },
});

export const filteredEventListState = selector({
  key: 'FilteredEventList',
  get: ({ get }) => {
    const filter = get(eventListFilterState);
    console.log(filter)
    let list = get(eventListState);
    console.log(list)
    if (filter.category && filter.category !== "Any Category") {
      console.log(filter);
      list = list.filter((item) => item.category === filter.category);
    }
    return list;
  },
});

