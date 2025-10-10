// SVG Flag Icons for Language Selection

interface FlagProps {
  width?: number;
  height?: number;
  className?: string;
}

export const UKFlag: React.FC<FlagProps> = ({ width = 32, height = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 60 30"
    width={width}
    height={height}
    className={className}
  >
    <clipPath id="uk-clip">
      <path d="M0,0 v30 h60 v-30 z" />
    </clipPath>
    <clipPath id="uk-clip2">
      <path d="M30,15 h30 v15 z v-15 h-30 z h-30 v15 z v-15 h30 z" />
    </clipPath>
    <g clipPath="url(#uk-clip)">
      <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#uk-clip2)" stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </g>
  </svg>
);

export const SpainFlag: React.FC<FlagProps> = ({ width = 32, height = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 750 500"
    width={width}
    height={height}
    className={className}
  >
    <rect width="750" height="500" fill="#AA151B" />
    <rect width="750" height="250" y="125" fill="#F1BF00" />
  </svg>
);

export const BrazilFlag: React.FC<FlagProps> = ({ width = 32, height = 24, className = '' }) => (
  <svg width={width} className={className} height={height} viewBox="-2100 -1470 4200 2940" xmlns="http://www.w3.org/2000/svg"><defs><g id="G"><clipPath id="g"><path d="m-31.5 0v-70h63v70zm31.5-47v12h31.5v-12z"/></clipPath><use clip-path="url(#g)" /><path d="M5-35H31.5V-25H5z"/><path d="m21.5-35h10v35h-10z"/></g><g id="R"><use/><path d="m28 0c0-10 0-32-15-32h-19c22 0 22 22 22 32"/></g><g id="s" fill="#fff"><g id="c"><path id="t" transform="rotate(18,0,-1)" d="m0-1v1h0.5"/><use transform="scale(-1,1)" /></g><use transform="rotate(72)" /><use transform="rotate(-72)" /><use transform="rotate(144)" /><use transform="rotate(216)" /></g><g id="a"><use transform="scale(31.5)" /></g><g id="b"><use transform="scale(26.25)" /></g><g id="f"><use transform="scale(21)" /></g><g id="h"><use transform="scale(15)" /></g><g id="i"><use transform="scale(10.5)" /></g><path id="D" d="m-31.5 0h33a30 30 0 0 0 30-30v-10a30 30 0 0 0-30-30h-33zm13-13h19a19 19 0 0 0 19-19v-6a19 19 0 0 0-19-19h-19z" fill-rule="evenodd"/><path id="E" transform="translate(-31.5)" d="m0 0h63v-13h-51v-18h40v-12h-40v-14h48v-13h-60z"/><path id="e" d="m-26.25 0h52.5v-12h-40.5v-16h33v-12h-33v-11h39.25v-12h-51.25z"/><path id="M" d="m-31.5 0h12v-48l14 48h11l14-48v48h12v-70h-17.5l-14 48-14-48h-17.5z"/><path id="O" d="m0 0a31.5 35 0 0 0 0-70 31.5 35 0 0 0 0 70m0-13a18.5 22 0 0 0 0-44 18.5 22 0 0 0 0 44" fill-rule="evenodd"/><path id="P" d="m-31.5 0h13v-26h28a22 22 0 0 0 0-44h-40zm13-39h27a9 9 0 0 0 0-18h-27z" fill-rule="evenodd"/><path id="S" d="m-15.75-22c0 7 6.75 10.5 16.75 10.5s14.74-3.25 14.75-7.75c0-14.25-46.75-5.25-46.5-30.25 0.25-21.5 24.75-20.5 33.75-20.5s26 4 25.75 21.25h-15.25c0-7.5-7-10.25-15-10.25-7.75 0-13.25 1.25-13.25 8.5-0.25 11.75 46.25 4 46.25 28.75 0 18.25-18 21.75-31.5 21.75-11.5 0-31.55-4.5-31.5-22z"/></defs><clipPath id="B"><circle r="735"/></clipPath><path d="m-2100-1470h4200v2940h-4200z" fill="#009440"/><path d="M -1743,0 0,1113 1743,0 0,-1113 Z" fill="#ffcb00"/><circle r="735" fill="#302681"/><path d="m-2205 1470a1785 1785 0 0 1 3570 0h-105a1680 1680 0 1 0-3360 0z" clip-path="url(#B)" fill="#fff"/><g transform="translate(-420,1470)" fill="#009440"><use transform="rotate(-7)" y="-1697.5" /><use transform="rotate(-4)" y="-1697.5" /><use transform="rotate(-1)" y="-1697.5" /><use transform="rotate(2)" y="-1697.5" /><use transform="rotate(5)" y="-1697.5" /><use transform="rotate(9.75)" y="-1697.5" /><use transform="rotate(14.5)" y="-1697.5" /><use transform="rotate(17.5)" y="-1697.5" /><use transform="rotate(20.5)" y="-1697.5" /><use transform="rotate(23.5)" y="-1697.5" /><use transform="rotate(26.5)" y="-1697.5" /><use transform="rotate(29.5)" y="-1697.5" /><use transform="rotate(32.5)" y="-1697.5" /><use transform="rotate(35.5)" y="-1697.5" /><use transform="rotate(38.5)" y="-1697.5" /></g><use x="-600" y="-132" /><use x="-535" y="177" /><use x="-625" y="243" /><use x="-463" y="132" /><use x="-382" y="250" /><use x="-404" y="323" /><use x="228" y="-228" /><use x="515" y="258" /><use x="617" y="265" /><use x="545" y="323" /><use x="368" y="477" /><use x="367" y="551" /><use x="441" y="419" /><use x="500" y="382" /><use x="365" y="405" /><use x="-280" y="30" /><use x="200" y="-37" /><use y="330" /><use x="85" y="184" /><use y="118" /><use x="-74" y="184" /><use x="-37" y="235" /><use x="220" y="495" /><use x="283" y="430" /><use x="162" y="412" /><use x="-295" y="390"/><use y="575"/></svg>
);

export const getFlagComponent = (language: 'english' | 'spanish' | 'portuguese') => {
  switch (language) {
    case 'english':
      return UKFlag;
    case 'spanish':
      return SpainFlag;
    case 'portuguese':
      return BrazilFlag;
    default:
      return UKFlag;
  }
};

