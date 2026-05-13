import type { UpcomingShowData } from "../assets/upcomingShows";

const formatDayMonth = (date: Date): string =>
    date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();

const formatMonth = (date: Date): string =>
    date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();

const formatDay = (date: Date): string =>
    date.toLocaleDateString('en-US', { day: '2-digit' });

type ShowCardProps = UpcomingShowData & {
    isNextShow?: boolean;
    isPastShow?: boolean;
};

const ShowCard = ({ venue, location, date, time, link, otherBands, isNextShow = false, isPastShow = false }: ShowCardProps) => {
    if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
        throw new Error('ShowCard date must be a valid Date object.');
    }

    const isInteractive = Boolean(link) && !isPastShow;
    const supportingBands = (otherBands ?? []).filter((band) => band.trim().length > 0);
    const footerLine = supportingBands.length > 0
        ? ['Atlas Slave', ...supportingBands].join(', ')
        : 'Atlas Slave Live';

    const cardContent = (
        <>
            {isPastShow && (
                <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                    <span
                        className="text-white/20 font-black uppercase tracking-[0.25em] text-3xl sm:text-4xl border-4 border-white/15 px-5 py-1 select-none"
                        style={{ transform: 'rotate(-12deg)', fontFamily: '"Bebas Neue", system-ui, sans-serif' }}
                    >
                        Past Show
                    </span>
                </div>
            )}

            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(135deg,rgba(45,212,191,0.08)_0%,rgba(0,0,0,0)_45%)]" />

            <p
                className="relative z-10 text-xs font-black uppercase tracking-[0.35em] text-teal-400 mb-4"
                style={{ fontFamily: '"Barlow Condensed", system-ui, sans-serif' }}
            >
                {isPastShow ? 'Past Show' : isNextShow ? 'Next Show' : 'Upcoming Show'}
            </p>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-[140px_1fr_auto] gap-4 md:gap-6 items-stretch">
                <div
                    className={`px-3 py-3 flex flex-col items-center justify-center border-2 ${
                        isPastShow
                            ? 'bg-zinc-800 text-zinc-100 border-zinc-500 shadow-[0_0_18px_rgba(255,255,255,0.08)]'
                            : 'bg-teal-500 text-black border-teal-300 shadow-[0_0_25px_rgba(45,212,191,0.3)]'
                    }`}
                >
                    <span className="text-xs sm:text-sm font-black tracking-[0.2em] uppercase" style={{ fontFamily: '"Barlow Condensed", system-ui, sans-serif' }}>
                        {formatMonth(date)}
                    </span>
                    <span className="text-5xl sm:text-6xl leading-none font-black" style={{ fontFamily: '"Bebas Neue", system-ui, sans-serif', letterSpacing: '0.03em' }}>
                        {formatDay(date)}
                    </span>
                    <span className="text-sm sm:text-base font-black tracking-[0.2em] uppercase" style={{ fontFamily: '"Barlow Condensed", system-ui, sans-serif' }}>
                        {date.getFullYear()}
                    </span>
                </div>

                <div className="min-w-0 flex flex-col justify-center">
                    <h2
                        className="text-5xl sm:text-6xl md:text-7xl font-black text-white uppercase leading-none mb-2"
                        style={{ fontFamily: '"Bebas Neue", system-ui, sans-serif', letterSpacing: '0.02em' }}
                    >
                        {venue}
                    </h2>
                    <p className="text-xl sm:text-2xl font-bold text-teal-300 uppercase tracking-wider mb-1" style={{ fontFamily: '"Barlow Condensed", system-ui, sans-serif' }}>
                        {location}
                    </p>
                    <p className="text-sm sm:text-base text-gray-300 uppercase tracking-wider" style={{ fontFamily: '"Barlow Condensed", system-ui, sans-serif' }}>
                        Doors {time}
                    </p>
                </div>

                {isInteractive && (
                    <div className="hidden md:flex items-stretch">
                        <span
                            className="inline-flex items-center gap-2 bg-teal-500 group-hover:bg-teal-400 text-black font-black uppercase tracking-[0.18em] text-sm px-5 py-2.5 transition-colors duration-200"
                            style={{ fontFamily: '"Barlow Condensed", system-ui, sans-serif', writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                        >
                            Get Tickets
                        </span>
                    </div>
                )}
            </div>

            {isInteractive && (
                <div className="relative z-10 md:hidden mt-4">
                    <span
                        className="inline-flex w-full justify-center items-center gap-2 bg-teal-500 group-hover:bg-teal-400 text-black font-black uppercase tracking-[0.18em] text-sm sm:text-base px-5 py-2.5 transition-colors duration-200"
                        style={{ fontFamily: '"Barlow Condensed", system-ui, sans-serif' }}
                    >
                        Get Tickets
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4 shrink-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </span>
                </div>
            )}

            <div className="relative z-10 mt-4 border-t border-teal-500/20 pt-3 text-sm text-teal-200/85 uppercase tracking-[0.15em]" style={{ fontFamily: '"Barlow Condensed", system-ui, sans-serif' }}>
                {footerLine}
            </div>
        </>
    );

    if (isInteractive) {
        return (
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative bg-black/70 backdrop-blur-sm border border-teal-500/30 border-l-4 border-l-teal-500 px-5 sm:px-7 py-5 sm:py-7 hover:shadow-[0_0_55px_rgba(45,212,191,0.2)] hover:-translate-y-0.5 transition-all duration-300 shadow-2xl overflow-hidden cursor-pointer"
                aria-label={`${venue} show on ${formatDayMonth(date)} ${date.getFullYear()} — get tickets`}
            >
                {cardContent}
            </a>
        );
    }

    return (
        <div className="relative bg-black/70 backdrop-blur-sm border border-teal-500/30 border-l-4 border-l-teal-500/30 px-5 sm:px-7 py-5 sm:py-7 shadow-2xl overflow-hidden">
            {cardContent}
        </div>
    );
};

export default ShowCard;