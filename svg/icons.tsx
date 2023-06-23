import { SVGProps } from "react";

export function CartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      {...props}
    >
      <path
        fill="currentColor"
        d="M2.5 2a.5.5 0 0 0 0 1h.246a.5.5 0 0 1 .48.363l1.586 5.55A1.5 1.5 0 0 0 6.254 10h4.569a1.5 1.5 0 0 0 1.393-.943l1.474-3.686A1 1 0 0 0 12.762 4H4.448l-.261-.912A1.5 1.5 0 0 0 2.746 2H2.5Zm3.274 6.637L4.734 5h8.027l-1.474 3.686a.5.5 0 0 1-.464.314H6.254a.5.5 0 0 1-.48-.363ZM6.5 14a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Zm0-1a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1Zm4 1a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Zm0-1a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1Z"
      />
    </svg>
  );
}

export function SettingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 21 21"
      {...props}
    >
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(3 3)"
      >
        <path
          strokeWidth=".933"
          d="M7.5.5c.351 0 .697.026 1.034.076l.508 1.539c.445.127.868.308 1.26.536l1.46-.704c.517.397.977.865 1.365 1.389l-.73 1.447c.221.396.395.822.514 1.27l1.53.533a7.066 7.066 0 0 1-.017 1.948l-1.539.508a5.567 5.567 0 0 1-.536 1.26l.704 1.46a7.041 7.041 0 0 1-1.389 1.365l-1.447-.73a5.507 5.507 0 0 1-1.27.514l-.533 1.53a7.066 7.066 0 0 1-1.948-.017l-.508-1.539a5.567 5.567 0 0 1-1.26-.536l-1.46.704a7.041 7.041 0 0 1-1.365-1.389l.73-1.447a5.565 5.565 0 0 1-.514-1.27l-1.53-.534a7.066 7.066 0 0 1 .017-1.947l1.539-.508c.127-.445.308-.868.536-1.26l-.704-1.46a7.041 7.041 0 0 1 1.389-1.365l1.447.73a5.507 5.507 0 0 1 1.27-.514l.534-1.53A7.06 7.06 0 0 1 7.5.5z"
        />
        /
        <circle cx="7.5" cy="7.5" r="3" />
      </g>
    </svg>
  );
}

export function LogoutIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 21 21"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m14.595 13.5l2.905-3l-2.905-3m2.905 3h-9m6-7l-8 .002c-1.104.001-2 .896-2 2v9.995a2 2 0 0 0 2 2h8.095"
      />
    </svg>
  );
}

export function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        fillRule="evenodd"
        fill="currentColor"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function ArrowLeftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        fillRule="evenodd"
        fill="currentColor"
        clipRule="evenodd"
        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
      />
    </svg>
  );
}
