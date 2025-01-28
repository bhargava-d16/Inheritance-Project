import React from "react";
import { MdClose } from "react-icons/md"; // Importing Close icon

const Button = ({ skill, isEditing, onRemove }) => {
  return (
    <span className="inline-flex items-center justify-between px-4 py-2 bg-blue-200 text-blue-800 rounded-full text-sm font-semibold shadow-md m-1 gap-2">
      <span>{skill}</span>
      {isEditing && (
        <button onClick={() => onRemove(skill)} className="focus:outline-none flex items-center">
          <MdClose className="w-4 h-4 text-blue-800 hover:text-red-600 transition duration-200" />
        </button>
      )}
    </span>
  );
};

export default Button;