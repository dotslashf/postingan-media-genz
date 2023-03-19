import { HexColorPicker } from "react-colorful";

interface Props {
  label: string;
  color: string;
  setColor: (color: string) => void;
  isColorPickerOpen: boolean;
  setIsColorPickerOpen: (state: boolean) => void;
}

const ColorPicker = (props: Props) => {
  return (
    <div className="">
      <label
        htmlFor="colorMode"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {props.label}
      </label>
      <div className="flex w-full2 h-10 rounded-md border-gray-400 border mt-2 overflow-hidden">
        <div
          className="h-full flex-shrink-0 w-10 border-r border-gray-400"
          style={{ backgroundColor: props.color }}
          onClick={() => {
            props.setIsColorPickerOpen(!props.isColorPickerOpen);
          }}
        ></div>
        <input
          type="text"
          value={`#${props.color.replace("#", "")}`}
          className="flex-grow w-full px-2 rounded outline-none"
          maxLength={7}
          onKeyPress={(e) => {
            const validHexChars = /[0-9a-fA-F]/;
            if (!validHexChars.test(e.key)) {
              e.preventDefault();
            }
          }}
          onChange={(e) => {
            props.setColor(e.target.value);
          }}
        />
      </div>
      {props.isColorPickerOpen && (
        <div className="absolute">
          <HexColorPicker color={props.color} onChange={props.setColor} />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
