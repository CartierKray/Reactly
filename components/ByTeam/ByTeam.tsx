import Image from "next/image";
import React from "react";

function ByTeam() {
  return (
    <>
      <div className="grid grid-cols-1 justify-center items-center w-full xl:grid-cols-[2fr_0fr] gap-6 mx-auto">
        {/* Grid items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Marketing */}
          <div className="bg-[#FFF2F2] p-4 rounded-md">
            <h4 className="font-semibold text-sm flex items-center gap-2 text-[#1F1F1F]">
              <span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.958 2.625 6.166 5.458v4.25l7.792 2.834V2.625ZM1.917 5.458h1.416v4.25H1.916v-4.25Zm2.125 0h1.416v9.917H4.041V5.458Zm3.541.993v2.265l4.959 1.803V4.648L7.583 6.45Zm8.5-.284h-1.416V9h1.416V6.167Z"
                    fill="#FF326F"
                  ></path>
                </svg>
              </span>{" "}
              Marketing
            </h4>
            <p className="text-xs mt-2 text-[#333] leading-snug">
              Monitor your competitors’ digital performance & strategy. Make
              data-driven decisions that drive growth.
            </p>
          </div>

          {/* SEO */}
          <div className="bg-[#EAF9FF] p-4 rounded-md">
            <h4 className="font-semibold text-sm flex items-center gap-2 text-[#1F1F1F]">
              <span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.91 6.061 2.183 7.955l-.022-.07A4.556 4.556 0 0 1 6.5 1.946 4.562 4.562 0 0 1 11.054 6.5a4.554 4.554 0 0 1-8.369 2.489v-.002l-.014-.02 1.306-1.42 1.281 1.138.074.066.067-.074L7.747 6.06V7.514h1.046V4.283H5.61v1.045h1.389L5.29 7.23 4.053 6.056l-.074-.07-.07.075ZM.9 6.5c0 3.087 2.513 5.6 5.6 5.6 3.087 0 5.6-2.513 5.6-5.6C12.1 3.413 9.587.9 6.5.9A5.607 5.607 0 0 0 .9 6.5Z"
                    fill="#0FBFE5"
                    stroke="#0FBFE5"
                    stroke-width="0.2"
                  ></path>
                  <path
                    d="m10 10 4.5 4.5"
                    stroke="#0FBFE5"
                    stroke-width="1.3"
                  ></path>
                </svg>
              </span>{" "}
              SEO
            </h4>
            <p className="text-xs mt-2 text-[#333] leading-snug">
              Take your SEO to the next level with the industry’s most powerful
              data and drive real business impact.
            </p>
          </div>

          {/* Sales */}
          <div className="bg-[#FFF9EB] p-4 rounded-md">
            <h4 className="font-semibold text-sm flex items-center gap-2 text-[#1F1F1F]">
              <span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#FEB72B"
                    d="M12.706 13.41h-1.572V5.645h1.572zM9.803 13.41H8.23V6.616h1.572zM3.995 13.41H2.423V9.286h1.572zM6.898 13.41H5.326V7.586h1.572zM.5 14.521h14.795v1.48H.5z"
                  ></path>
                  <path
                    d="m2.456 5.89 8.588-3.28m0 0L8.305 1.385m2.739 1.225L9.819 5.35"
                    stroke="#FEB72B"
                    stroke-width="1.3"
                  ></path>
                </svg>
              </span>{" "}
              Sales
            </h4>
            <p className="text-xs mt-2 text-[#333] leading-snug">
              Find & enrich companies & contacts while providing unique digital
              insights to close business faster.
            </p>
          </div>

          {/* Research & Analysts */}
          <div className="bg-[#EFFFF9] p-4 rounded-md">
            <h4 className="font-semibold text-sm flex items-center gap-2 text-[#1F1F1F]">
              <span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.374 13.39a.337.337 0 0 0-.244-.1h-.044l-.123.037a3.357 3.357 0 0 1-.577.227 2.55 2.55 0 0 1-.752.11c-.787 0-1.46-.283-2.012-.83a2.719 2.719 0 0 1-.822-2.002c0-.792.271-1.448.822-2.003A2.763 2.763 0 0 1 11.634 8c.787 0 1.46.282 2.012.829.55.555.822 1.21.822 2.003 0 .264-.035.519-.096.764a2.897 2.897 0 0 1-.228.574.384.384 0 0 0 .061.446l1.706 1.73-.822.765-1.715-1.72Zm-1.74-4.252c-.464 0-.857.164-1.18.492-.325.328-.49.737-.49 1.202 0 .464.165.865.498 1.192a1.61 1.61 0 0 0 1.18.492 1.61 1.61 0 0 0 1.181-.492c.324-.327.49-.737.49-1.201 0-.465-.166-.865-.498-1.193a1.61 1.61 0 0 0-1.181-.492Z"
                    fill="#00CD98"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.333 1.333H2.666a2 2 0 0 0-2 2v9.334a2 2 0 0 0 2 2h6v-1.334h-6A.667.667 0 0 1 2 12.667V5.333h12V8h1.333V3.333a2 2 0 0 0-2-2ZM2 3.333c0-.368.298-.666.667-.666h10.666c.368 0 .667.298.667.666V4H2v-.667Z"
                    fill="#00CD98"
                  ></path>
                  <path
                    d="M7.333 12V6.667H6V12h1.333ZM4.667 8.667V12H3.333V8.667h1.334Z"
                    fill="#00CD98"
                  ></path>
                </svg>
              </span>{" "}
              Research & Analysts
            </h4>
            <p className="text-xs mt-2 text-[#333] leading-snug">
              Streamline and improve your research strategy with the industry’s
              most robust datasets and market insights.
            </p>
          </div>

          {/* E-commerce */}
          <div className="bg-[#F7F3FF] p-4 rounded-md">
            <h4 className="font-semibold text-sm flex items-center gap-2 text-[#1F1F1F]">
              <span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 .667c1.744 0 3.175 1.34 3.324 3.179l.01.154H14v10.667H2V4h2.667A3.333 3.333 0 0 1 8 .667Zm4.667 4.666h-1.334v1.334H10V5.333H6v1.334H4.667V5.333H3.333v8h9.334v-8ZM8 2c-1.027 0-1.873.774-1.99 1.876L6 4h4a2 2 0 0 0-2-2Z"
                    fill="#C24DFC"
                  ></path>
                </svg>
              </span>{" "}
              Ecommerce
            </h4>
            <p className="text-xs mt-2 text-[#333] leading-snug">
              Gain full visibility into your competitors’ ecommerce performance
              and marketing strategy.
            </p>
          </div>

          {/* PPC */}
          <div className="bg-[#EEF5FF] p-4 rounded-md">
            <h4 className="font-semibold text-sm flex items-center gap-2 text-[#1F1F1F]">
              <span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8 2.667a5.334 5.334 0 0 1 5.292 4.666h1.342a6.668 6.668 0 1 0-7.3 7.3v-1.34A5.334 5.334 0 0 1 8 2.666ZM7.544 6.7a.667.667 0 0 0-.843.843l2 6a.667.667 0 0 0 1.104.26l.862-.861 1.861 1.862c.26.26.683.26.943 0l1.334-1.334a.667.667 0 0 0 0-.942l-1.862-1.862.862-.862a.667.667 0 0 0-.26-1.104l-6-2Zm2.08 5.398L8.388 8.387 12.1 9.625l-.57.57a.667.667 0 0 0 0 .943L13.39 13l-.39.39-1.862-1.861a.667.667 0 0 0-.943 0l-.57.57Z"
                    fill="#195AFE"
                  ></path>
                </svg>
              </span>{" "}
              PPC
            </h4>
            <p className="text-xs mt-2 text-[#333] leading-snug">
              Get more ROI and faster, with access to your competitors’ winning
              paid search and display ad tactics.
            </p>
          </div>
        </div>

        {/* Latest column */}
        {/* <div className="border-l pl-6">
          <div className="space-y-3">
            <div>
              <Image
                src="/images/ai-dream-team.jpg"
                alt="AI Dream Team"
                width={1000}
                height={1000}
                className="rounded-md w-full object-cover"
              />
            </div>
            <h3 className="font-semibold text-base text-[#1F1F1F]">
              Your new AI dream team
            </h3>
            <p className="text-sm text-[#333] leading-snug">
              From strategy to execution, meet the AI Agents built for every
              part of your business, each powered by Similarweb’s trusted
              digital data.
              <br />
              Faster answers, smarter decisions.
            </p>
            <a
              href="#"
              className="text-sm font-medium text-[#1F3FFF] hover:underline"
            >
              Meet the AI Agents →
            </a>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default ByTeam;
