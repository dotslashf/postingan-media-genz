import Canvas from "@/components/Canvas";
import { Disclosure } from "@headlessui/react";
import Head from "next/head";
import React from "react";

export default function Home() {
  const [mediaText, setMediaText] = React.useState("MEDIAGENZ");
  const [caption, setCaption] = React.useState(
    `Postingan Media "Kekinian"\nModal Background Putih\nDan Text Hitam, \nBut Almost \nAny Gen Z Fall For It 😆`
  );
  const [mediaPosition, setMediaPosition] = React.useState("tr");
  const [captionControl, setCaptionControl] = React.useState({
    align: "center",
    topOffset: 0,
    maxWidth: 490,
  });
  const [colorMode, setColorMode] = React.useState("light");
  const [fontSize, setFontSize] = React.useState({
    media: 48,
    caption: 24,
  });
  const [tweetToFetch, setTweetToFetch] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchHandler = async () => {
    setIsLoading(true);
    const tweetId = tweetToFetch.split("/").pop();
    fetch("/api/tweet/" + tweetId).then((res) => {
      setIsLoading(false);
      if (res.ok) {
        res.json().then((data) => {
          setMediaText(data.username);
          setCaption(data.text);
        });
      }
    });
  };

  return (
    <>
      <Head>
        <title>Postingan Media Gen Z</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="h-full max-w-lg mx-auto py-4 px-4 shadow-lg flex flex-col space-y-2">
        <div className="flex gap-x-4">
          <div className="w-full">
            <label
              htmlFor="media"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Media
            </label>
            <div className="mt-2">
              <input
                id="media"
                name="media"
                className="w-full px-2 py-2 rounded-md border-gray-400 border"
                placeholder="ICKWR"
                value={mediaText}
                onChange={(e) => setMediaText(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div>
          <label
            htmlFor="caption"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Caption
          </label>
          <div className="mt-2">
            <textarea
              id="caption"
              name="caption"
              rows={4}
              className="w-full px-2 py-2 rounded-md border-gray-400 border"
              placeholder="kulkas LG 2 pintu minat inbok"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>
        </div>
        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-full h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
          <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 ">
            or
          </span>
        </div>
        <div className="flex gap-x-4">
          <div className="w-full">
            <label
              htmlFor="fetchTweet"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Fetch Tweet
            </label>
            <div className="mt-2 flex items-center space-x-2">
              <input
                id="fetchTweet"
                name="fetchTweet"
                className="w-full px-2 py-2 rounded-md border-gray-400 border"
                placeholder="https://twitter.com/anjimeNation/status/1636783962562629632?s=20"
                onChange={(e) => setTweetToFetch(e.target.value)}
              />
              <button
                type="button"
                className="focus:outline-none text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 flex items-center shadow-md "
                onClick={fetchHandler}
              >
                Fetch
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className={`ml-4 w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="text-sm w-full px-2 py-2 rounded-md border-gray-400 border flex justify-between items-center">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Options
                </label>
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className={`w-4 h-4 ${open ? "transform rotate-180" : ""}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </Disclosure.Button>
              <Disclosure.Panel className="text-gray-500">
                <div className="grid grid-cols-2 gap-2">
                  <div className="">
                    <label
                      htmlFor="align"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Caption Align
                    </label>
                    <div className="mt-2">
                      <select
                        id="mediaPosition"
                        className="w-full px-2 py-2 rounded-md border-gray-400 border"
                        defaultValue={"center"}
                        onChange={(e) => {
                          setCaptionControl({
                            ...captionControl,
                            align: e.target.value,
                          });
                        }}
                      >
                        <option value={""}>Pilih align</option>
                        <option value="left">Left</option>
                        <option value="right">Right</option>
                        <option value="center">Center</option>
                      </select>
                    </div>
                  </div>
                  <div className="">
                    <label
                      htmlFor="mediaPosition"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Media Position
                    </label>
                    <select
                      id="mediaPosition"
                      className="mt-2 w-full px-2 py-2 rounded-md border-gray-400 border"
                      defaultValue={"tr"}
                      onChange={(e) => {
                        setMediaPosition(e.target.value);
                      }}
                    >
                      <option value={""}>Pilih posisi</option>
                      <option value="tl">Atas Kiri</option>
                      <option value="tr">Atas Kanan</option>
                      <option value="bl">Bawah Kiri</option>
                      <option value="br">Bawah Kanan</option>
                    </select>
                  </div>
                  <div className="">
                    <label
                      htmlFor="topOffset"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Top Offset
                    </label>
                    <div className="mt-2">
                      <input
                        id="topOffset"
                        name="topOffset"
                        className="w-full px-2 py-2 rounded-md border-gray-400 border"
                        placeholder="0"
                        value={captionControl.topOffset}
                        onChange={(e) =>
                          setCaptionControl({
                            ...captionControl,
                            topOffset: parseInt(e.target.value),
                          })
                        }
                        type="number"
                      />
                    </div>
                  </div>
                  <div className="">
                    <label
                      htmlFor="maxWidth"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Max Width
                    </label>
                    <div className="mt-2">
                      <input
                        id="maxWidth"
                        name="maxWidth"
                        className="w-full px-2 py-2 rounded-md border-gray-400 border"
                        defaultValue={captionControl.maxWidth}
                        onChange={(e) =>
                          setCaptionControl({
                            ...captionControl,
                            maxWidth: parseInt(e.target.value),
                          })
                        }
                        type="number"
                      />
                    </div>
                  </div>
                  <div className="">
                    <label
                      htmlFor="fontSizeCaption"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Font Size Caption
                    </label>
                    <div className="mt-2">
                      <input
                        id="fontSizeCaption"
                        name="fontSizeCaption"
                        className="w-full px-2 py-2 rounded-md border-gray-400 border"
                        placeholder="0"
                        value={fontSize.caption}
                        onChange={(e) =>
                          setFontSize({
                            ...fontSize,
                            caption: parseInt(e.target.value),
                          })
                        }
                        type="number"
                      />
                    </div>
                  </div>
                  <div className="">
                    <label
                      htmlFor="fontSizeMedia"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Font Size Media
                    </label>
                    <div className="mt-2">
                      <input
                        id="fontSizeMedia"
                        name="fontSizeMedia"
                        className="w-full px-2 py-2 rounded-md border-gray-400 border"
                        placeholder="0"
                        value={fontSize.media}
                        onChange={(e) =>
                          setFontSize({
                            ...fontSize,
                            media: parseInt(e.target.value),
                          })
                        }
                        type="number"
                      />
                    </div>
                  </div>
                  <div className="">
                    <label
                      htmlFor="colorMode"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Color Mode
                    </label>
                    <select
                      id="colorMode"
                      className="w-full px-2 py-2 rounded-md border-gray-400 border mt-2"
                      defaultValue={colorMode}
                      onChange={(e) => {
                        setColorMode(e.target.value);
                      }}
                    >
                      <option value={""}>Pilih color mode</option>
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                    </select>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <div className="">
          <Canvas
            mediaText={mediaText}
            caption={caption}
            mediaPosition={mediaPosition}
            captionControl={captionControl}
            colorMode={colorMode}
            fontSize={fontSize}
          />
        </div>
      </div>
    </>
  );
}
