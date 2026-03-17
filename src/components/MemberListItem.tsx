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
    <article className="bg-black/65 backdrop-blur-sm border-2 border-teal-500/50 hover:border-teal-400 rounded-lg p-4 sm:p-6 md:p-8 transition-all duration-300 shadow-xl hover:shadow-teal-500/20 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 to-teal-500/0 group-hover:from-teal-500/5 group-hover:to-teal-500/10 transition-all duration-500 pointer-events-none" />

      <div
        className={`relative z-10 flex flex-col ${imageOnRight ? 'md:flex-row-reverse' : 'md:flex-row'} items-stretch gap-4 sm:gap-6`}
      >
        <div className="w-full md:w-40 lg:w-48 shrink-0">
          <img
            src={imageSrc}
            alt={name}
            className="h-56 sm:h-64 md:h-full min-h-56 w-full object-cover rounded-md border border-teal-500/40"
          />
        </div>

        <div className="flex-1 self-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-1 text-white uppercase tracking-wide group-hover:text-teal-300 transition-colors duration-300">
            {name}
          </h3>
          <p className="text-sm sm:text-base text-teal-300 font-medium uppercase tracking-wider mb-3 sm:mb-4 group-hover:text-teal-200 transition-colors duration-300">
            {instrument}
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed font-light group-hover:text-gray-100 transition-colors duration-300">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
};

export default MemberListItem;
