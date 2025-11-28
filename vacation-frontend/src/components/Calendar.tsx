'use client';

import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay, isWeekend, addMonths, subMonths, isBefore, startOfDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { Holiday } from '@/types';

interface CalendarProps {
  holidays: Holiday[];
  selectedStart: Date | null;
  selectedEnd: Date | null;
  onSelectStart: (date: Date) => void;
  onSelectEnd: (date: Date) => void;
  minDate?: Date;
}

export default function Calendar({
  holidays,
  selectedStart,
  selectedEnd,
  onSelectStart,
  onSelectEnd,
  minDate,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = startOfDay(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const firstDayOfWeek = monthStart.getDay();
  const emptyDays = Array(firstDayOfWeek).fill(null);

  const isHoliday = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return holidays.some((h) => h.fecha === dateStr || h.fecha.startsWith(dateStr));
  };

  const getHolidayName = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const holiday = holidays.find((h) => h.fecha === dateStr || h.fecha.startsWith(dateStr));
    return holiday?.nombre;
  };

  const isSelected = (date: Date) => {
    if (selectedStart && selectedEnd) {
      return date >= selectedStart && date <= selectedEnd;
    }
    if (selectedStart) {
      return isSameDay(date, selectedStart);
    }
    return false;
  };

  const isDisabled = (date: Date) => {
    if (minDate && isBefore(date, minDate)) return true;
    if (isBefore(date, today)) return true;
    return false;
  };

  const handleDayClick = (date: Date) => {
    if (isDisabled(date)) return;

    // Si no hay fecha de inicio, o si ya hay ambas fechas seleccionadas, empezar de nuevo
    if (!selectedStart || (selectedStart && selectedEnd && !isSameDay(selectedStart, selectedEnd))) {
      onSelectStart(date);
      onSelectEnd(date);
    } else {
      // Ya hay fecha de inicio seleccionada, ahora seleccionar fecha fin
      if (date < selectedStart) {
        // Si la fecha es anterior, intercambiar
        onSelectEnd(selectedStart);
        onSelectStart(date);
      } else {
        onSelectEnd(date);
      }
    }
  };

  const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-lg font-semibold text-gray-800 capitalize">
          {format(currentMonth, 'MMMM yyyy', { locale: es })}
        </h2>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square" />
        ))}

        {days.map((day) => {
          const disabled = isDisabled(day);
          const weekend = isWeekend(day);
          const holiday = isHoliday(day);
          const selected = isSelected(day);
          const holidayName = getHolidayName(day);

          return (
            <button
              key={day.toString()}
              onClick={() => handleDayClick(day)}
              disabled={disabled}
              title={holidayName || undefined}
              className={`
                aspect-square flex items-center justify-center text-sm rounded-lg relative
                transition-colors
                ${disabled ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-blue-50 cursor-pointer'}
                ${selected ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
                ${isToday(day) && !selected ? 'ring-2 ring-blue-400' : ''}
                ${weekend && !selected && !disabled ? 'text-gray-400' : ''}
                ${holiday && !selected ? 'bg-red-100 text-red-700' : ''}
              `}
            >
              {format(day, 'd')}
              {holiday && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-500" />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-red-100 rounded" />
          <span>Festivo</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-blue-600 rounded" />
          <span>Seleccionado</span>
        </div>
      </div>
    </div>
  );
}
