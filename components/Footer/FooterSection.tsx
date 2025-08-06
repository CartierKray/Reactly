"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const FooterSection: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b bg-[#123728] text-white">
      {/* Footer Navigation */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 ">
        <div className="grid grid-cols-1 text-center md:text-start md:grid-cols-4 gap-6">
          {/* Column 1 */}
          <div>
            <h3 className="font-semibold tracking-wide text-[text-white] text-lg mb-4">
              AANBOD
            </h3>
            <ul className="space-y-2 text-[14px]">
              <li className="xl-nav-link hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                Veel gekozen
              </li>
              <br />
              <li className="xl-nav-link hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                Nieuwe Occasions
              </li>
              <br />
              <li className="xl-nav-link hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                Bedrijfswagens
              </li>
              <br />
              <li className="xl-nav-link hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                Elektrische autos
              </li>
              <br />
              <li className="xl-nav-link hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                Merken en modellen
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-semibold tracking-wide text-[text-white] text-lg mb-4">
              ZAKELIJK LEASEN
            </h3>
            <ul className="space-y-2 text-[14px]">
              <li className="xl-nav-link hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                Short lease
              </li>
              <br />
              <li className="xl-nav-link hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                Financial Lease
              </li>
              <br />
              <li className="xl-nav-link hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                Operational lease
              </li>
              <br />
              <li className="xl-nav-link hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                Equipment lease
              </li>
              <br />
              <li className="xl-nav-link hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                Bereken jouw lease
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-semibold tracking-wide text-[text-white] text-lg mb-4">
              OVER ONS
            </h3>
            <ul className="space-y-2 text-[14px]">
              <li className="xl-nav-link hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                Blogs
              </li>
              <br />
              <li className="xl-nav-link hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                Reviews
              </li>
              <br />
              <li className="xl-nav-link hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                Voor wie
              </li>
              <br />
              <li className="xl-nav-link hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                Over ons
              </li>
              <br />
              <li className="xl-nav-link hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                Contact
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="font-bold text-lg text-[text-white] mb-4">
              CONTACT
            </h3>
            <address className="not-italic space-y-2 text-[14px]">
              <p className="text-gray-400">Nijenburg 98</p>
              <p className="text-gray-400">1081GG Amsterdam</p>
              <p>
                <a
                  href="tel:+31(0)618891346"
                  className="hover:underline hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out"
                >
                  📞 +31 (0)6 18 89 13 46
                </a>
              </p>
              <p>
                <a
                  href="mailto:info@beterlease.nl"
                  className="hover:underline hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out"
                >
                  📩&nbsp; Info@beterlease.nl
                </a>
              </p>
              <p className="text-gray-400 hover:tracking-wider hover:font-semibold transition-all duration-300 ease-in-out">
                Bereikbaar tussen 09:00-21:00
              </p>
              {/* <p className="text-gray-400">
                DutchLease is onderdeel van VWPFS
              </p> */}
            </address>
          </div>
        </div>

        <div className="flex flex-col gap-y-4 md:flex-row items-center justify-between mt-8 border-t border-white/50 pt-8">
          {/* Disclaimer */}
          <div className="">
            <div className="text-xs text-gray-400">
              {" "}
              © 2025 BeterLease.nl - Alle rechten voorbehouden
            </div>
          </div>

          <div className="scale-75 flex md:hidden lg:flex justify-center">
            <ul className="payment-icon-list flex gap-2 ">
              <li>
                <svg
                  className="payment-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  viewBox="0 0 38 24"
                  width="38"
                  height="24"
                  aria-label="American Express"
                >
                  <title id="pi-american_express">American Express</title>
                  <g fill="none">
                    <path
                      fill="#000"
                      d="M35,0 L3,0 C1.3,0 0,1.3 0,3 L0,21 C0,22.7 1.4,24 3,24 L35,24 C36.7,24 38,22.7 38,21 L38,3 C38,1.3 36.6,0 35,0 Z"
                      opacity=".07"
                    ></path>
                    <path
                      fill="#006FCF"
                      d="M35,1 C36.1,1 37,1.9 37,3 L37,21 C37,22.1 36.1,23 35,23 L3,23 C1.9,23 1,22.1 1,21 L1,3 C1,1.9 1.9,1 3,1 L35,1"
                    ></path>
                    <path
                      fill="#FFF"
                      d="M8.971,10.268 L9.745,12.144 L8.203,12.144 L8.971,10.268 Z M25.046,10.346 L22.069,10.346 L22.069,11.173 L24.998,11.173 L24.998,12.412 L22.075,12.412 L22.075,13.334 L25.052,13.334 L25.052,14.073 L27.129,11.828 L25.052,9.488 L25.046,10.346 L25.046,10.346 Z M10.983,8.006 L14.978,8.006 L15.865,9.941 L16.687,8 L27.057,8 L28.135,9.19 L29.25,8 L34.013,8 L30.494,11.852 L33.977,15.68 L29.143,15.68 L28.065,14.49 L26.94,15.68 L10.03,15.68 L9.536,14.49 L8.406,14.49 L7.911,15.68 L4,15.68 L7.286,8 L10.716,8 L10.983,8.006 Z M19.646,9.084 L17.407,9.084 L15.907,12.62 L14.282,9.084 L12.06,9.084 L12.06,13.894 L10,9.084 L8.007,9.084 L5.625,14.596 L7.18,14.596 L7.674,13.406 L10.27,13.406 L10.764,14.596 L13.484,14.596 L13.484,10.661 L15.235,14.602 L16.425,14.602 L18.165,10.673 L18.165,14.603 L19.623,14.603 L19.647,9.083 L19.646,9.084 Z M28.986,11.852 L31.517,9.084 L29.695,9.084 L28.094,10.81 L26.546,9.084 L20.652,9.084 L20.652,14.602 L26.462,14.602 L28.076,12.864 L29.624,14.602 L31.499,14.602 L28.987,11.852 L28.986,11.852 Z"
                    ></path>
                  </g>
                </svg>
              </li>

              <li>
                <svg
                  className="payment-icon"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  x="0"
                  y="0"
                  width="38"
                  height="24"
                  viewBox="0 0 165.521 105.965"
                  aria-label="Apple Pay"
                >
                  <title id="pi-apple_pay">Apple Pay</title>
                  <path
                    fill="#ededed"
                    d="M150.698 0H14.823c-.566 0-1.133 0-1.698.003-.477.004-.953.009-1.43.022-1.039.028-2.087.09-3.113.274a10.51 10.51 0 0 0-2.958.975 9.932 9.932 0 0 0-4.35 4.35 10.463 10.463 0 0 0-.975 2.96C.113 9.611.052 10.658.024 11.696a70.22 70.22 0 0 0-.022 1.43C0 13.69 0 14.256 0 14.823v76.318c0 .567 0 1.132.002 1.699.003.476.009.953.022 1.43.028 1.036.09 2.084.275 3.11a10.46 10.46 0 0 0 .974 2.96 9.897 9.897 0 0 0 1.83 2.52 9.874 9.874 0 0 0 2.52 1.83c.947.483 1.917.79 2.96.977 1.025.183 2.073.245 3.112.273.477.011.953.017 1.43.02.565.004 1.132.004 1.698.004h135.875c.565 0 1.132 0 1.697-.004.476-.002.952-.009 1.431-.02 1.037-.028 2.085-.09 3.113-.273a10.478 10.478 0 0 0 2.958-.977 9.955 9.955 0 0 0 4.35-4.35c.483-.947.789-1.917.974-2.96.186-1.026.246-2.074.274-3.11.013-.477.02-.954.022-1.43.004-.567.004-1.132.004-1.699V14.824c0-.567 0-1.133-.004-1.699a63.067 63.067 0 0 0-.022-1.429c-.028-1.038-.088-2.085-.274-3.112a10.4 10.4 0 0 0-.974-2.96 9.94 9.94 0 0 0-4.35-4.35A10.52 10.52 0 0 0 156.939.3c-1.028-.185-2.076-.246-3.113-.274a71.417 71.417 0 0 0-1.431-.022C151.83 0 151.263 0 150.698 0z"
                  ></path>
                  <path
                    fill="#FFF"
                    d="M150.698 3.532l1.672.003c.452.003.905.008 1.36.02.793.022 1.719.065 2.583.22.75.135 1.38.34 1.984.648a6.392 6.392 0 0 1 2.804 2.807c.306.6.51 1.226.645 1.983.154.854.197 1.783.218 2.58.013.45.019.9.02 1.36.005.557.005 1.113.005 1.671v76.318c0 .558 0 1.114-.004 1.682-.002.45-.008.9-.02 1.35-.022.796-.065 1.725-.221 2.589a6.855 6.855 0 0 1-.645 1.975 6.397 6.397 0 0 1-2.808 2.807c-.6.306-1.228.511-1.971.645-.881.157-1.847.2-2.574.22-.457.01-.912.017-1.379.019-.555.004-1.113.004-1.669.004H14.801c-.55 0-1.1 0-1.66-.004a74.993 74.993 0 0 1-1.35-.018c-.744-.02-1.71-.064-2.584-.22a6.938 6.938 0 0 1-1.986-.65 6.337 6.337 0 0 1-1.622-1.18 6.355 6.355 0 0 1-1.178-1.623 6.935 6.935 0 0 1-.646-1.985c-.156-.863-.2-1.788-.22-2.578a66.088 66.088 0 0 1-.02-1.355l-.003-1.327V14.474l.002-1.325a66.7 66.7 0 0 1 .02-1.357c.022-.792.065-1.717.222-2.587a6.924 6.924 0 0 1 .646-1.981c.304-.598.7-1.144 1.18-1.623a6.386 6.386 0 0 1 1.624-1.18 6.96 6.96 0 0 1 1.98-.646c.865-.155 1.792-.198 2.586-.22.452-.012.905-.017 1.354-.02l1.677-.003h135.875"
                  ></path>
                  <g>
                    <g>
                      <path
                        fill="#000"
                        d="M43.508 35.77c1.404-1.755 2.356-4.112 2.105-6.52-2.054.102-4.56 1.355-6.012 3.112-1.303 1.504-2.456 3.959-2.156 6.266 2.306.2 4.61-1.152 6.063-2.858"
                      ></path>
                      <path
                        fill="#000"
                        d="M45.587 39.079c-3.35-.2-6.196 1.9-7.795 1.9-1.6 0-4.049-1.8-6.698-1.751-3.447.05-6.645 2-8.395 5.1-3.598 6.2-.95 15.4 2.55 20.45 1.699 2.5 3.747 5.25 6.445 5.151 2.55-.1 3.549-1.65 6.647-1.65 3.097 0 3.997 1.65 6.696 1.6 2.798-.05 4.548-2.5 6.247-5 1.95-2.85 2.747-5.6 2.797-5.75-.05-.05-5.396-2.101-5.446-8.251-.05-5.15 4.198-7.6 4.398-7.751-2.399-3.548-6.147-3.948-7.447-4.048"
                      ></path>
                    </g>
                    <g>
                      <path
                        fill="#000"
                        d="M78.973 32.11c7.278 0 12.347 5.017 12.347 12.321 0 7.33-5.173 12.373-12.529 12.373h-8.058V69.62h-5.822V32.11h14.062zm-8.24 19.807h6.68c5.07 0 7.954-2.729 7.954-7.46 0-4.73-2.885-7.434-7.928-7.434h-6.706v14.894z"
                      ></path>
                      <path
                        fill="#000"
                        d="M92.764 61.847c0-4.809 3.665-7.564 10.423-7.98l7.252-.442v-2.08c0-3.04-2.001-4.704-5.562-4.704-2.938 0-5.07 1.507-5.51 3.82h-5.252c.157-4.86 4.731-8.395 10.918-8.395 6.654 0 10.995 3.483 10.995 8.89v18.663h-5.38v-4.497h-.13c-1.534 2.937-4.914 4.782-8.579 4.782-5.406 0-9.175-3.222-9.175-8.057zm17.675-2.417v-2.106l-6.472.416c-3.64.234-5.536 1.585-5.536 3.95 0 2.288 1.975 3.77 5.068 3.77 3.95 0 6.94-2.522 6.94-6.03z"
                      ></path>
                      <path
                        fill="#000"
                        d="M120.975 79.652v-4.496c.364.051 1.247.103 1.715.103 2.573 0 4.029-1.09 4.913-3.899l.52-1.663-9.852-27.293h6.082l6.863 22.146h.13l6.862-22.146h5.927l-10.216 28.67c-2.34 6.577-5.017 8.735-10.683 8.735-.442 0-1.872-.052-2.261-.157z"
                      ></path>
                    </g>
                  </g>
                </svg>
              </li>

              <li>
                <svg
                  className="payment-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  viewBox="0 0 38 24"
                  width="38"
                  height="24"
                  aria-label="Google Pay"
                >
                  <title id="pi-google_pay">Google Pay</title>
                  <path
                    d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                    fill="#000"
                    opacity=".07"
                  ></path>
                  <path
                    d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                    fill="#FFF"
                  ></path>
                  <path
                    d="M18.093 11.976v3.2h-1.018v-7.9h2.691a2.447 2.447 0 0 1 1.747.692 2.28 2.28 0 0 1 .11 3.224l-.11.116c-.47.447-1.098.69-1.747.674l-1.673-.006zm0-3.732v2.788h1.698c.377.012.741-.135 1.005-.404a1.391 1.391 0 0 0-1.005-2.354l-1.698-.03zm6.484 1.348c.65-.03 1.286.188 1.778.613.445.43.682 1.03.65 1.649v3.334h-.969v-.766h-.049a1.93 1.93 0 0 1-1.673.931 2.17 2.17 0 0 1-1.496-.533 1.667 1.667 0 0 1-.613-1.324 1.606 1.606 0 0 1 .613-1.336 2.746 2.746 0 0 1 1.698-.515c.517-.02 1.03.093 1.49.331v-.208a1.134 1.134 0 0 0-.417-.901 1.416 1.416 0 0 0-.98-.368 1.545 1.545 0 0 0-1.319.717l-.895-.564a2.488 2.488 0 0 1 2.182-1.06zM23.29 13.52a.79.79 0 0 0 .337.662c.223.176.5.269.785.263.429-.001.84-.17 1.146-.472.305-.286.478-.685.478-1.103a2.047 2.047 0 0 0-1.324-.374 1.716 1.716 0 0 0-1.03.294.883.883 0 0 0-.392.73zm9.286-3.75l-3.39 7.79h-1.048l1.281-2.728-2.224-5.062h1.103l1.612 3.885 1.569-3.885h1.097z"
                    fill="#5F6368"
                  ></path>
                  <path
                    d="M13.986 11.284c0-.308-.024-.616-.073-.92h-4.29v1.747h2.451a2.096 2.096 0 0 1-.9 1.373v1.134h1.464a4.433 4.433 0 0 0 1.348-3.334z"
                    fill="#4285F4"
                  ></path>
                  <path
                    d="M9.629 15.721a4.352 4.352 0 0 0 3.01-1.097l-1.466-1.14a2.752 2.752 0 0 1-4.094-1.44H5.577v1.17a4.53 4.53 0 0 0 4.052 2.507z"
                    fill="#34A853"
                  ></path>
                  <path
                    d="M7.079 12.05a2.709 2.709 0 0 1 0-1.735v-1.17H5.577a4.505 4.505 0 0 0 0 4.075l1.502-1.17z"
                    fill="#FBBC04"
                  ></path>
                  <path
                    d="M9.629 8.44a2.452 2.452 0 0 1 1.74.68l1.3-1.293a4.37 4.37 0 0 0-3.065-1.183 4.53 4.53 0 0 0-4.027 2.5l1.502 1.171a2.715 2.715 0 0 1 2.55-1.875z"
                    fill="#EA4335"
                  ></path>
                </svg>
              </li>

              <li>
                <svg
                  className="payment-icon"
                  viewBox="0 0 38 24"
                  xmlns="http://www.w3.org/2000/svg"
                  width="38"
                  height="24"
                  role="img"
                  aria-label="iDEAL"
                >
                  <title id="pi-ideal">iDEAL</title>
                  <path
                    opacity=".07"
                    d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3Z"
                  ></path>
                  <path
                    d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32Z"
                    fill="#fff"
                  ></path>
                  <path
                    d="M14 6.912V19h5.648C24.776 19 27 16.302 27 12.486 27 8.834 24.776 6 19.648 6h-4.67c-.543 0-.978.414-.978.912Z"
                    fill="#C06"
                  ></path>
                  <path d="M19.312 21h-8.884C9.64 21 9 20.373 9 19.6V5.4c0-.773.64-1.4 1.428-1.4h8.884C27.742 4 29 9.317 29 12.482 29 17.974 25.555 21 19.313 21h-.001ZM10.428 4.467a.944.944 0 0 0-.878.573.936.936 0 0 0-.074.36v14.2a.936.936 0 0 0 .59.866c.115.046.238.07.362.068h8.884c5.938 0 9.212-2.86 9.212-8.052 0-6.972-5.774-8.015-9.212-8.015h-8.884Z"></path>
                  <path
                    d="M16.252 11.008c.188 0 .361.03.528.088.167.06.304.155.427.273.116.125.21.28.282.457.065.184.101.398.101.649 0 .22-.028.42-.08.604a1.417 1.417 0 0 1-.245.479 1.197 1.197 0 0 1-.413.317 1.437 1.437 0 0 1-.586.118H15V11h1.252v.008Zm-.044 2.44c.095 0 .181-.016.276-.045a.539.539 0 0 0 .23-.155.863.863 0 0 0 .168-.28c.043-.118.065-.25.065-.42 0-.147-.015-.287-.044-.405a.814.814 0 0 0-.145-.31.656.656 0 0 0-.26-.199 1.047 1.047 0 0 0-.398-.066h-.464v1.887h.572v-.008Zm3.995-2.44v.553h-1.548v.64h1.426v.51h-1.426v.73h1.585v.552h-2.229V11h2.194v.008h-.002Zm2.215 0 1.1 2.992h-.673l-.224-.663h-1.1l-.232.663h-.652l1.108-2.992h.673Zm.037 1.835-.37-1.098h-.007l-.384 1.098h.76Zm2.112-1.835v2.44H26V14h-2.076v-2.992h.643Z"
                    fill="#fff"
                  ></path>
                  <path d="M11.5 13.652c.829 0 1.5-.593 1.5-1.326 0-.732-.671-1.326-1.5-1.326s-1.5.594-1.5 1.326c0 .732.671 1.326 1.5 1.326ZM12.63 19c-1.258 0-2.269-.9-2.269-2.007v-1.568a.969.969 0 0 1 .337-.715c.214-.189.502-.294.802-.291a1.24 1.24 0 0 1 .433.073c.137.05.262.124.368.218.106.093.19.205.248.327a.93.93 0 0 1 .09.388V19h-.008Z"></path>
                </svg>
              </li>

              <li>
                <svg
                  className="payment-icon"
                  viewBox="0 0 38 24"
                  xmlns="http://www.w3.org/2000/svg"
                  width="38"
                  height="24"
                  role="img"
                  aria-label="Maestro"
                >
                  <title id="pi-maestro">Maestro</title>
                  <path
                    opacity=".07"
                    d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                  ></path>
                  <circle fill="#EB001B" cx="15" cy="12" r="7"></circle>
                  <circle fill="#00A2E5" cx="23" cy="12" r="7"></circle>
                  <path
                    fill="#7375CF"
                    d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"
                  ></path>
                </svg>
              </li>

              <li>
                <svg
                  className="payment-icon"
                  viewBox="0 0 38 24"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  width="38"
                  height="24"
                  aria-label="Mastercard"
                >
                  <title id="pi-master">Mastercard</title>
                  <path
                    opacity=".07"
                    d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                  ></path>
                  <circle fill="#EB001B" cx="15" cy="12" r="7"></circle>
                  <circle fill="#F79E1B" cx="23" cy="12" r="7"></circle>
                  <path
                    fill="#FF5F00"
                    d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"
                  ></path>
                </svg>
              </li>

              <li>
                <svg
                  className="payment-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  viewBox="0 0 38 24"
                  width="38"
                  height="24"
                  aria-label="Shop Pay"
                >
                  <title id="pi-shopify_pay">Shop Pay</title>
                  <path
                    opacity=".07"
                    d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                    fill="#000"
                  ></path>
                  <path
                    d="M35.889 0C37.05 0 38 .982 38 2.182v19.636c0 1.2-.95 2.182-2.111 2.182H2.11C.95 24 0 23.018 0 21.818V2.182C0 .982.95 0 2.111 0H35.89z"
                    fill="#5A31F4"
                  ></path>
                  <path
                    d="M9.35 11.368c-1.017-.223-1.47-.31-1.47-.705 0-.372.306-.558.92-.558.54 0 .934.238 1.225.704a.079.079 0 00.104.03l1.146-.584a.082.082 0 00.032-.114c-.475-.831-1.353-1.286-2.51-1.286-1.52 0-2.464.755-2.464 1.956 0 1.275 1.15 1.597 2.17 1.82 1.02.222 1.474.31 1.474.705 0 .396-.332.582-.993.582-.612 0-1.065-.282-1.34-.83a.08.08 0 00-.107-.035l-1.143.57a.083.083 0 00-.036.111c.454.92 1.384 1.437 2.627 1.437 1.583 0 2.539-.742 2.539-1.98s-1.155-1.598-2.173-1.82v-.003zM15.49 8.855c-.65 0-1.224.232-1.636.646a.04.04 0 01-.069-.03v-2.64a.08.08 0 00-.08-.081H12.27a.08.08 0 00-.08.082v8.194a.08.08 0 00.08.082h1.433a.08.08 0 00.081-.082v-3.594c0-.695.528-1.227 1.239-1.227.71 0 1.226.521 1.226 1.227v3.594a.08.08 0 00.081.082h1.433a.08.08 0 00.081-.082v-3.594c0-1.51-.981-2.577-2.355-2.577zM20.753 8.62c-.778 0-1.507.24-2.03.588a.082.082 0 00-.027.109l.632 1.088a.08.08 0 00.11.03 2.5 2.5 0 011.318-.366c1.25 0 2.17.891 2.17 2.068 0 1.003-.736 1.745-1.669 1.745-.76 0-1.288-.446-1.288-1.077 0-.361.152-.657.548-.866a.08.08 0 00.032-.113l-.596-1.018a.08.08 0 00-.098-.035c-.799.299-1.359 1.018-1.359 1.984 0 1.46 1.152 2.55 2.76 2.55 1.877 0 3.227-1.313 3.227-3.195 0-2.018-1.57-3.492-3.73-3.492zM28.675 8.843c-.724 0-1.373.27-1.845.746-.026.027-.069.007-.069-.029v-.572a.08.08 0 00-.08-.082h-1.397a.08.08 0 00-.08.082v8.182a.08.08 0 00.08.081h1.433a.08.08 0 00.081-.081v-2.683c0-.036.043-.054.069-.03a2.6 2.6 0 001.808.7c1.682 0 2.993-1.373 2.993-3.157s-1.313-3.157-2.993-3.157zm-.271 4.929c-.956 0-1.681-.768-1.681-1.783s.723-1.783 1.681-1.783c.958 0 1.68.755 1.68 1.783 0 1.027-.713 1.783-1.681 1.783h.001z"
                    fill="#fff"
                  ></path>
                </svg>
              </li>

              <li>
                <svg
                  className="payment-icon"
                  viewBox="0 0 38 24"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  width="38"
                  height="24"
                  aria-label="Visa"
                >
                  <title id="pi-visa">Visa</title>
                  <path
                    opacity=".07"
                    d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                  ></path>
                  <path
                    d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z"
                    fill="#142688"
                  ></path>
                </svg>
              </li>
            </ul>
          </div>

          <div className="text-xs text-gray-400 text-center lg:text-left">
            <ul className="flex">
              <Link href={"/algemene-voorwaarden"}>
                <li className="mr-2 xl-nav-link hover:text-white hover:font-semibold transition-all duration-300 ease-in-out">
                  Algemene voorwaarden
                </li>
              </Link>
              <Link href={"/privacyverklaring"}>
                <li className="mr-2 xl-nav-link hover:text-white hover:font-semibold transition-all duration-300 ease-in-out">
                  Privacyverklaring{" "}
                </li>
              </Link>
              <Link href={"/contact#contactgegevens"}>
                <li className="mr-2 xl-nav-link hover:text-white hover:font-semibold transition-all duration-300 ease-in-out">
                  Contact
                </li>
              </Link>
            </ul>
            {/* Privacyverklaring • Algemene voorwaarden • Verzekeringsvoorwaarden */}
          </div>
          {/* Social */}
          {/* <div>
            <p className="text-[11px] font-extralight text-gray-400 text-center lg:text-right mt-4 lg:mt-0">
              <Link href="https://www.capitalcodex.nl">
                Site designed by{" "}
                <span className="font-extrabold xl-nav-link hover:tracking-wider hover:font-semibold transition-all hover:text-white duration-300 ease-in-out">
                  Capital Code X
                </span>
              </Link>
            </p>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
