export type UpcomingShowData = {
    venue: string;
    location: string;
    date: Date;
    time: string;
    link?: string;
};

export type ShowData = {
    upcomingShows: UpcomingShowData[];
    pastShows: UpcomingShowData[];
};

const allShowData: UpcomingShowData[] = [
    {
        venue: "Velour",
        location: "Provo, Utah",
        date: new Date(2026, 4, 4),
        time: "8:00 PM",
        link: "https://velour.eventcalendarapp.com/festival-of-fools-costume-concert-w-no-such-animal",
    },
    {
        venue: "The Complex",
        location: "Salt Lake City, Utah",
        date: new Date(2024, 0, 15),
        time: "9:00 PM",
        link: "https://www.thecomplexslc.com/events/atlas-slave",
    },
];

const sortShowsByTimeline = (
    shows: UpcomingShowData[],
    referenceDate = new Date(),
): ShowData => {
    const today = new Date(referenceDate);
    today.setHours(0, 0, 0, 0);

    const upcomingShows = shows
        .filter((show) => {
            const showDate = new Date(show.date);
            showDate.setHours(0, 0, 0, 0);
            return showDate >= today;
        })
        .sort((a, b) => a.date.getTime() - b.date.getTime());

    const pastShows = shows
        .filter((show) => {
            const showDate = new Date(show.date);
            showDate.setHours(0, 0, 0, 0);
            return showDate < today;
        })
        .sort((a, b) => b.date.getTime() - a.date.getTime());

    return {
        upcomingShows,
        pastShows,
    };
};

const showData = sortShowsByTimeline(allShowData);

export default showData;