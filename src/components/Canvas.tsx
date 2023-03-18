import React, { useEffect } from "react";

interface Props {
  mediaText: string;
  mediaPosition: string;
  caption: string;
  captionControl: {
    align: string;
    topOffset: number;
    maxWidth?: number;
  };
  colorMode: "light" | "dark" | string;
}

const DARK_COLOR = "#18191A";
const LIGHT_COLOR = "#FFFFFF";

const Canvas = (props: Props) => {
  const canvas = React.useRef<HTMLCanvasElement>(null);
  const textColor = props.colorMode === "light" ? DARK_COLOR : LIGHT_COLOR;
  const canvasInfo = {
    width: 500,
    height: 500,
  };

  useEffect(() => {
    if (canvas.current) {
      const ctx = canvas.current.getContext("2d")!;
      removeMediaText(ctx);
      removeCaptionText(ctx);
      ctx.fillStyle = props.colorMode === "light" ? LIGHT_COLOR : DARK_COLOR;
      ctx.fillRect(0, 0, canvasInfo.width, canvasInfo.height);
      drawMediaText(ctx, props.mediaText);
      drawCaption(ctx, props.caption);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props.mediaText,
    props.mediaPosition,
    props.caption,
    props.captionControl,
    props.colorMode,
  ]);

  const removeMediaText = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, 500, 100);
    ctx.clearRect(0, 400, 500, 500);
  };

  const removeCaptionText = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 100, 500, 400);
  };

  const drawMediaText = (ctx: CanvasRenderingContext2D, text: string) => {
    ctx.fillStyle = textColor;
    ctx.font = "48px Bebas Neue";
    ctx.textAlign = "center";
    if (props.mediaPosition.includes("r")) ctx.textAlign = "right";
    if (props.mediaPosition.includes("l")) ctx.textAlign = "left";
    if (props.mediaPosition === "tr") ctx.fillText(text, 490, 50);
    if (props.mediaPosition === "tl") ctx.fillText(text, 10, 50);
    if (props.mediaPosition === "br") ctx.fillText(text, 490, 485);
    if (props.mediaPosition === "bl") ctx.fillText(text, 10, 485);
  };

  const drawCaption = (ctx: CanvasRenderingContext2D, text: string) => {
    ctx.fillStyle = textColor;
    ctx.font = "32px Heebo";
    ctx.textAlign = (props.captionControl.align as CanvasTextAlign) || "center";
    const maxWidth = props.captionControl.maxWidth
      ? props.captionControl.maxWidth
      : 480;
    const lineHeight = 32;
    let x = canvasInfo.width / 2;
    if (props.captionControl.align === "left") {
      x = canvasInfo.width - maxWidth;
    }
    if (props.captionControl.align === "right") {
      x = maxWidth;
    }
    let y = 200;
    if (props.captionControl.topOffset) {
      y += props.captionControl.topOffset;
    }
    wrapText(ctx, text, x, y, maxWidth, lineHeight);
  };

  const wrapText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ) => {
    const lines = text.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const words = lines[i].split(" ");
      let line = "";

      for (let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + " ";
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          ctx.fillText(line, x, y);
          line = words[n] + " ";
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, x, y);
      y += lineHeight;
    }
  };

  const downloadHandler = () => {
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.current?.toDataURL("image/jpg")!;
    link.click();
  };

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvas}
        width={canvasInfo.width}
        height={canvasInfo.height}
        className="border border-gray-800 w-full mt-2"
      />
      <div className="mt-4">
        <button
          type="button"
          className="focus:outline-none text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 flex items-center shadow-md"
          onClick={downloadHandler}
        >
          Download
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="ml-4 w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Canvas;
