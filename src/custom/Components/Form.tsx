import React from "react";

interface Field {
  key: string;
  label: string;
  type: "text" | "number" | "date" | "checkbox";
}

interface DynamicFormProps {
  fields: Field[];
  data: Record<string, any>;
  onChange: (value: string | number | boolean, key: string) => void;
  isEditing?: boolean;
  readOnly?: boolean;
  onUpdate?: (data: Record<string, any>) => void;
  onDelete?: (data: Record<string, any>) => void;
  onCreate?: (data: Record<string, any>) => void;
}

const formatDate = (value: any): string => {
  if (!value) return "";
  const date = typeof value === "number" ? new Date(value) : new Date(value);
  return date.toISOString().split("T")[0];
};

const DynamicForm: React.FC<DynamicFormProps> = ({
  fields,
  data,
  onChange,
  isEditing = false,
  readOnly = false,
  onUpdate,
  onDelete,
  onCreate
}) => {
  const inputsAreReadOnly = isEditing && readOnly;

  return (
    <form className="space-y-4">
      {fields.map(({ key, label, type }) => (
        <div key={key} className="flex flex-col">
          {type === "checkbox" ? (
            <label className="inline-flex items-center mt-2 space-x-2">
              <input
                id={key}
                type="checkbox"
                checked={!!data[key]}
                onChange={(e) => onChange(e.target.checked, key)}
                className="form-checkbox h-5 w-5 text-blue-600"
                disabled={inputsAreReadOnly}
              />
              <span className="text-gray-700 font-medium">{label}</span>
            </label>
          ) : (
            <>
              <label htmlFor={key} className="mb-1 font-medium text-gray-700">
                {label}
              </label>
              <input
                id={key}
                type={type}
                value={
                  type === "date" ? formatDate(data[key]) : data[key] ?? ""
                }
                onChange={(e) =>
                  onChange(
                    type === "number" ? +e.target.value : e.target.value,
                    key
                  )
                }
                readOnly={inputsAreReadOnly}
                className={`border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                  inputsAreReadOnly
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : "focus:ring-blue-500"
                }`}
              />
            </>
          )}
        </div>
      ))}

      {
        isEditing ? (
          <div className="flex justify-end space-x-4 pt-4">
            {onUpdate && (
              <button
                type="button"
                onClick={() => onUpdate?.(data)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded cursor-pointer"
              >
                Update
              </button>
            )}
            <button
              type="button"
              onClick={() => onDelete?.(data)}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded cursor-pointer"
            >
              Delete
            </button>
          </div>
        ) : (
          <button
            id="create-buttonItem"
            type="button"
            onClick={() => onCreate?.(data)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded cursor-pointer"
          >
            Create
          </button>
        )}
      
    </form>
  );
};

export default DynamicForm;
