import React from 'react';
import Input from '../Input';
import DatePicker from 'react-mobile-datepicker';
/**
 * A color picker component that allows users to select a color.
 *
 * @returns {JSX.Element} The color picker component.
 */
export default function MobileDatePicker({
  value,
  isOpen,
  onSelect,
  onCancel,
  name,
  placeholder,
}) {
  const monthMap = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec',
  };

  // Calculate the minimum and maximum dates
  const currentDate = new Date();
  const minDate = new Date();
  minDate.setFullYear(currentDate.getFullYear() - 80); // 80 years ago
  const maxDate = new Date();
  maxDate.setFullYear(currentDate.getFullYear() - 8); // 8 years ago

  const dateConfig = {
    year: {
      format: 'YYYY',
      caption: 'Year',
      step: 1,
    },
    month: {
      format: (value) => monthMap[value.getMonth() + 1],
      caption: 'Mon',
      step: 1,
    },
    date: {
      format: 'DD',
      caption: 'Day',
      step: 1,
    },
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  return (
    <>
      <Input
        name={name}
        placeholder={name}
        value={
          formatDate(value) !== formatDate(new Date())
            ? formatDate(value)
            : placeholder
        }
        readOnly // Prevent manual editing
      />
      <DatePicker
        value={value}
        isOpen={isOpen}
        onSelect={onSelect}
        onCancel={onCancel}
        confirmText="Confirm"
        cancelText="Cancel"
        dateConfig={dateConfig}
        min={minDate}
        max={maxDate}
      />
    </>
  );
}
