export type OrbitingNameProps = {
  name: string
}

export function OrbitingName({ name }: OrbitingNameProps) {
  return (
    <svg
      viewBox="0 0 1300 420"
      className="w-full max-w-5xl text-brand-blue"
      aria-hidden="true"
    >
      <path id="orbit-arc" d="M 60 320 Q 650 100 1240 320" fill="none" />
      <text
        fontSize="110"
        fontWeight="700"
        letterSpacing="1"
        fill="currentColor"
      >
        <textPath href="#orbit-arc" startOffset="50%" textAnchor="middle">
          {name}
        </textPath>
      </text>
    </svg>
  )
}
