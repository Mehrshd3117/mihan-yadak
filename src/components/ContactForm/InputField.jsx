// components/InputField.jsx
import React, { memo } from "react";

export default memo(function InputField({ label, error, ...inputProps }) {
  const hasError = Boolean(error);
  const baseCls =
    "peer w-full border rounded-lg px-4 pt-5 pb-2 text-sm transition duration-200 bg-white dark:bg-slate-800 placeholder-transparent focus:outline-none focus:ring-2";
  const errorCls = "border-red-500 ring-red-300 dark:ring-red-400";
  const okCls =
    "border-gray-300 dark:border-gray-600 focus:border-orange-500 focus:ring-orange-200 dark:focus:ring-orange-500/40";

  return (
    <div className="relative">
      <input
        {...inputProps}
        className={`${baseCls} ${hasError ? errorCls : okCls}`}
        placeholder=" "
      />
      <label
        className="absolute right-3 -top-2.5 text-xs px-1 bg-white dark:bg-slate-800
          text-gray-600 dark:text-gray-300
          transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 dark:peer-placeholder-shown:text-gray-500
          peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-orange-500"
      >
        {label}
      </label>
      {hasError && (
        <p className="text-red-600 dark:text-red-400 text-xs mt-1 font-medium">
          {error.message}
        </p>
      )}
    </div>
  );
});
