export type UpcomingShowData = {
    venue: string;
    location: string;
    date: Date;
    time: string;
    link?: string;
    otherBands?: string[];
};

export type ShowData = {
    upcomingShows: UpcomingShowData[];
    pastShows: UpcomingShowData[];
};

const toDayNumber = (date: Date): number =>
    date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();

const parseReferenceDate = (referenceDate: Date | string): Date => {
    if (referenceDate instanceof Date) {
        return referenceDate;
    }

    const match = referenceDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (match) {
        const year = Number(match[1]);
        const month = Number(match[2]);
        const day = Number(match[3]);
        return new Date(year, month - 1, day);
    }

    return new Date(referenceDate);
};

export const allShowData: UpcomingShowData[] = [
    {
        venue: "Velour",
        location: "Provo, Utah",
        date: new Date(2026, 3, 4),
        time: "8:00 PM",
        link: "https://velour.eventcalendarapp.com/festival-of-fools-costume-concert-w-no-such-animal",
        otherBands: ["No Such Animal", "Grally" ],
    },
    {
        venue: "Fork Fest",
        location: "American Fork, Utah",
        date: new Date(2026, 5, 13),
        time: "12:45 PM",
        link: "https://www.forkfest.org/",
        otherBands: ["Neon Trees", "Joshua James", "Fictionist"]
    }
];

export const sortShowsByTimeline = (
    shows: UpcomingShowData[],
    referenceDate: Date | string = new Date(),
): ShowData => {
    const today = parseReferenceDate(referenceDate);
    const todayDayNumber = toDayNumber(today);

    const upcomingShows = shows
        .filter((show) => toDayNumber(show.date) >= todayDayNumber)
        .sort((a, b) => toDayNumber(a.date) - toDayNumber(b.date));

    const pastShows = shows
        .filter((show) => toDayNumber(show.date) < todayDayNumber)
        .sort((a, b) => toDayNumber(b.date) - toDayNumber(a.date));

    return {
        upcomingShows,
        pastShows,
    };
};

const showData = sortShowsByTimeline(allShowData);

export default showData;