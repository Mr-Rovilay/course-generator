import React from "react";
import YouTube from "react-youtube";
import ReactMarkdown from "react-markdown";

// Define the YouTube player options
const opts = {
  height: "390",
  width: "640",
  playerVars: {
    autoplay: 0,
  },
};

const ChapterContent = ({ chapter, content }) => {
  return (
    <div className="p-10">
      <h2 className="mb-4 text-2xl font-medium">{chapter?.chapterName}</h2>
      <p className="mb-6 text-gray-500">{chapter?.about}</p>
      
      {content?.videoId && (
        <div className="flex justify-center my-6">
          <YouTube videoId={content?.videoId} opts={opts} />
        </div>
      )}

      <div>
        {content?.content?.details?.length > 0 ? (
          content.content.details.map((item, index) => (
            <div className="p-5 mb-3 rounded-lg bg-sky-50" key={index}>
              <h3 className="mb-2 text-lg font-medium">{item.title}</h3>
              <ReactMarkdown>{item?.explanation}</ReactMarkdown>
              {item.code && (
                <div className="p-4 mt-3 text-white bg-black rounded-md">
                  <pre>
                    <code>{item.code}</code>
                  </pre>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No details available for this chapter.</p>
        )}
      </div>
    </div>
  );
};

export default ChapterContent;
