export type MemberListItemProps = {
  name: string;
  instrument: string;
  description: string;
  imageOnRight?: boolean;
  imageSrc?: string;
};

const MemberListItem = ({
  name,
  instrument,
  description,
  imageOnRight = false,
  imageSrc = '/SSS01167 (1).jpg',
}: MemberListItemProps) => {
  return (
    <article className="relative overflow-hidden bg-black/72 backdrop-blur-sm border border-teal-500/35 border-l-4 border-l-teal-500 rounded-xl p-4 sm:p-6 md:p-7 transition-all duration-300 shadow-2xl hover:border-l-teal-400 hover:shadow-[0_0_36px_rgba(45,212,191,0.16)] group">
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(120deg,rgba(45,212,191,0.10)_0%,rgba(0,0,0,0)_42%)]" />

      <div
        className={`relative z-10 flex flex-col ${imageOnRight ? 'md:flex-row-reverse' : 'md:flex-row'} items-stretch gap-4 sm:gap-6`}
      >
        <div className="w-full md:w-44 lg:w-52 shrink-0">
          <img
            src={imageSrc}
            alt={name}
            className="h-56 sm:h-64 md:h-full min-h-56 w-full object-cover rounded-lg border border-teal-300/35 shadow-[0_0_18px_rgba(45,212,191,0.12)]"
          />
        </div>

        <div className="flex-1 self-center min-w-0">
          <p className="text-[11px] sm:text-xs font-black uppercase tracking-[0.22em] text-teal-300 mb-2">Band Member</p>
          <h3
            className="text-3xl sm:text-4xl font-black mb-1 text-white uppercase tracking-tight group-hover:text-teal-200 transition-colors duration-300"
            style={{ fontFamily: '"Bebas Neue", system-ui, sans-serif', letterSpacing: '0.02em' }}
          >
            {name}
          </h3>
          <p className="text-base sm:text-lg text-teal-300 font-bold uppercase tracking-[0.12em] mb-3 sm:mb-4 group-hover:text-teal-200 transition-colors duration-300">
            {instrument}
          </p>
          <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-light group-hover:text-gray-100 transition-colors duration-300">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
};

export default MemberListItem;
