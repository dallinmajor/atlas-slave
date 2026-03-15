import type { UpcomingShowData } from "../assets/upcomingShows";

const formatShowDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
};

const ShowCard = ({ venue, location, date, time, link }: UpcomingShowData) => {
    if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
        throw new Error('ShowCard date must be a valid Date object.');
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const showDate = new Date(date);
    showDate.setHours(0, 0, 0, 0);

    const isPastShow = showDate < today;

    const hasLink = Boolean(link);
    const isInteractive = hasLink && !isPastShow;

    const cardContent = (
        <>
            {isPastShow && (
                <div className="absolute inset-0 z-10 bg-black/80" />
            )}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                <div>
                    <h2
                        className="text-lg sm:text-xl md:text-2xl font-black mb-0.5 text-white uppercase tracking-tight"
                        style={{ fontWeight: 900, letterSpacing: '-0.02em' }}
                    >
                        {venue}
                    </h2>
                    <p className="text-sm text-teal-300 font-medium uppercase tracking-wider">
                        {location}
                    </p>
                </div>
                <div className="text-left md:text-right">
                    {isInteractive && (
                        <p className="text-xs text-teal-300/80 font-semibold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-1">
                            Get Tickets
                        </p>
                    )}
                    <p
                        className="text-base sm:text-lg md:text-xl font-black text-white uppercase tracking-tight mb-0.5"
                        style={{ fontWeight: 900, wordSpacing: '0.2em' }}
                    >
                        {formatShowDate(date)}
                    </p>
                    <p className="text-sm text-gray-300 font-light uppercase tracking-wider">
                        {time}
                    </p>
                </div>
            </div>
        </>
    );

    if (isInteractive) {
        return (
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative bg-black/40 backdrop-blur-sm border border-teal-500/20 rounded-lg p-3 sm:p-4 hover:border-teal-400/60 hover:shadow-teal-900/30 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 shadow-2xl overflow-hidden cursor-pointer"
                aria-label={`${venue} show details (opens in a new tab)`}
            >
                {cardContent}
            </a>
        );
    }

    return (
        <div className="relative bg-black/40 backdrop-blur-sm border border-teal-500/20 rounded-lg p-3 sm:p-4 transition-all duration-300 shadow-2xl overflow-hidden">
            {cardContent}
        </div>
    );
};

export default ShowCard;