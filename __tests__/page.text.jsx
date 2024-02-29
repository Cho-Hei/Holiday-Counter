import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Footer from "../src/components/Footer";
import Holiday from "../src/components/Holiday";

describe("Page", () => {
  it("renders Footer", () => {
    render(<Footer />);

    const NextText = screen.getByText("Next");

    expect(NextText).toBeInTheDocument();
  });

  it("renders Hero (Holiday Screen)", () => {
    render(<Holiday holiday={demo_holidays} index={0} />);

    const DisplayHoliday = screen.getByText("Christmas Day");
    const HolidayDate = screen.getByText("2024 December 25");

    expect(DisplayHoliday).toBeInTheDocument();
    expect(HolidayDate).toBeInTheDocument();
  });

  it("click to the next holiday", async () => {
    render(<Holiday holiday={demo_holidays} index={0} />);
    render(<Footer currentIndex={0} />);

    const DisplayHoliday = screen.getByText("Christmas Day");
    const HolidayDate = screen.getByText("2024 December 25");

    expect(DisplayHoliday).toBeInTheDocument();
    expect(HolidayDate).toBeInTheDocument();

    // Previous button should not be visible
    const PrevText = screen.queryByText("Previous");
    expect(PrevText).toBeNull();

    // Clicking the next holiday button
    userEvent.click(screen.getByText("Next"));

    // Manually render to the next holiday (as <Hero /> is not rendering due to fetch is not supported)
    render(<Holiday holiday={demo_holidays} index={1} />);
    render(<Footer currentIndex={1} />);
    expect(
      await screen.findByText("First Weekday After Christmas Day")
    ).toBeInTheDocument();

    // Next holiday should be visible
    const DisplayNextHoliday = screen.getByText(
      "First Weekday After Christmas Day"
    );
    const NextHolidayDate = screen.getByText("2024 December 26");

    expect(DisplayNextHoliday).toBeInTheDocument();
    expect(NextHolidayDate).toBeInTheDocument();

    // Previous button should be visible
    const PrevText2 = screen.getByText("Previous");
    expect(PrevText2).toBeInTheDocument();
  });
});

const demo_holidays = [
  {
    name: "Christmas Day",
    description:
      "Christmas Day is one of the biggest Christian celebrations and falls on December 25 in the Gregorian calendar.",
    country: {
      id: "hk",
      name: "Hong Kong",
    },
    date: {
      iso: "2024-12-25",
      datetime: {
        year: 2024,
        month: 12,
        day: 25,
      },
    },
    type: ["National holiday"],
    primary_type: "National holiday",
    canonical_url: "",
    urlid: "hong-kong/christmas-day",
    locations: "All",
    states: "All",
  },
  {
    name: "First Weekday After Christmas Day",
    description:
      "First Weekday After Christmas Day is a national holiday in Hong Kong",
    country: {
      id: "hk",
      name: "Hong Kong",
    },
    date: {
      iso: "2024-12-26",
      datetime: {
        year: 2024,
        month: 12,
        day: 26,
      },
    },
    type: ["National holiday"],
    primary_type: "National holiday",
    canonical_url: "",
    urlid: "hong-kong/boxing-day",
    locations: "All",
    states: "All",
  },
];
