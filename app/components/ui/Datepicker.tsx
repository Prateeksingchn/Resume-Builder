'use client';

import React, { useState, useRef, useEffect } from 'react';
import { format, addMonths, subMonths, startOfMonth, addYears, subYears } from 'date-fns';

interface DatepickerProps {
  value: string;
  onChange: (date: Date | null) => void;
  customInput?: any;
  placeholder?: string;
  displayFormat?: string;
  minDate?: Date;
  maxDate?: Date;
  popperPlacement?: 'bottom-start' | 'bottom-end';
}

export default function Datepicker({
  value,
  onChange,
  customInput,
  placeholder = 'Select date',
  displayFormat = 'MMM yyyy',
  minDate,
  maxDate,
  popperPlacement = 'bottom-start'
}: DatepickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(value ? new Date(value) : new Date());
  const [isYearSelectOpen, setIsYearSelectOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Generate year range with visible years window
  const startYear = minDate ? minDate.getFullYear() : 1950;
  const endYear = maxDate ? maxDate.getFullYear() : 2030;
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsYearSelectOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigate = (direction: 'prev' | 'next') => {
    if (isYearSelectOpen) {
      // Navigate years
      setCurrentDate(direction === 'prev' 
        ? subYears(currentDate, 1)
        : addYears(currentDate, 1)
      );
    } else {
      // Navigate months
      setCurrentDate(direction === 'prev' 
        ? subMonths(currentDate, 1) 
        : addMonths(currentDate, 1)
      );
    }
  };

  const selectMonth = (monthIndex: number) => {
    const newDate = new Date(currentDate.getFullYear(), monthIndex);
    
    if (minDate && newDate < startOfMonth(minDate)) return;
    if (maxDate && newDate > startOfMonth(maxDate)) return;

    onChange(newDate);
    setIsOpen(false);
  };

  const selectYear = (year: number) => {
    setCurrentDate(new Date(year, currentDate.getMonth()));
    setIsYearSelectOpen(false);
  };

  const CustomInput = customInput || (({ value, onClick }: any) => (
    <button
      onClick={onClick}
      className="w-full px-4 py-2 text-left border rounded-lg"
    >
      {value || placeholder}
    </button>
  ));

  return (
    <div className="relative" ref={containerRef}>
      <CustomInput
        value={value ? format(new Date(value), displayFormat) : ''}
        onClick={() => setIsOpen(!isOpen)}
        placeholder={placeholder}
      />

      {isOpen && (
        <div 
          className={`absolute z-50 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 p-4 w-64 ${
            popperPlacement === 'bottom-end' ? 'right-0' : 'left-0'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate('prev')}
              className="p-1 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={
                isYearSelectOpen
                  ? currentDate.getFullYear() <= startYear
                  : minDate && subMonths(currentDate, 1) < startOfMonth(minDate)
              }
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setIsYearSelectOpen(!isYearSelectOpen)}
              className="font-medium hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
            >
              <span>{isYearSelectOpen ? `${currentDate.getFullYear()}` : format(currentDate, 'yyyy')}</span>
              <svg 
                className={`w-4 h-4 transform transition-transform ${isYearSelectOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button
              onClick={() => navigate('next')}
              className="p-1 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={
                isYearSelectOpen
                  ? currentDate.getFullYear() >= endYear
                  : maxDate && addMonths(currentDate, 1) > startOfMonth(maxDate)
              }
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {isYearSelectOpen ? (
            <div className="max-h-48 overflow-y-auto">
              <div className="grid grid-cols-3 gap-2">
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => selectYear(year)}
                    className={`
                      py-2 px-2 rounded-lg text-sm font-medium transition-colors
                      ${year === currentDate.getFullYear() 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'}
                    `}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {months.map((month, index) => {
                const monthDate = new Date(currentDate.getFullYear(), index);
                const isDisabled = 
                  (minDate && monthDate < startOfMonth(minDate)) ||
                  (maxDate && monthDate > startOfMonth(maxDate));

                return (
                  <button
                    key={month}
                    onClick={() => selectMonth(index)}
                    disabled={isDisabled}
                    className={`
                      py-2 px-2 rounded-lg text-sm font-medium transition-colors
                      ${isDisabled ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-blue-50 hover:text-blue-600'}
                      ${value && new Date(value).getMonth() === index && new Date(value).getFullYear() === currentDate.getFullYear()
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'text-gray-700'}
                    `}
                  >
                    {month.slice(0, 3)}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
} 