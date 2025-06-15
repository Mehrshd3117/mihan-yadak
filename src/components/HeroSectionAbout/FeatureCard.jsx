import { memo } from "react";

const FeatureCard = memo(({ Icon, title, description }) => (
  <div className="bg-white dark:bg-slate-800 rounded-xl md:rounded-2xl shadow-lg hover:shadow-orange-200 p-4 md:p-6 text-center border border-gray-100 dark:border-gray-700 w-full transition-shadow duration-300">
    <div className="flex justify-center mb-3 md:mb-4">
      <div className="bg-gradient-to-tr from-orange-100 to-orange-200 rounded-full p-2 md:p-3">
        <Icon className="w-8 h-8 md:w-10 md:h-10 text-orange-500" />
      </div>
    </div>
    <h3 className="text-base md:text-lg font-bold text-orange-500 my-3 md:my-5">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm leading-relaxed">
      {description}
    </p>
  </div>
));

export default FeatureCard;
