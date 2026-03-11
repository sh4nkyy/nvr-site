'use client'

type Props = {
  size?: number
  color?: string
  className?: string
}

export default function NVRLogo({ size = 120, color = '#EEEEF8', className = '' }: Props) {
  return (
    <svg
      viewBox="0 0 3000 3000"
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Nothing Very Real"
    >
      <path
        fillRule="evenodd"
        strokeMiterlimit="99999"
        strokeLinejoin="round"
        strokeLinecap="round"
        stroke={color}
        fill="none"
        strokeOpacity="1"
        strokeWidth="242.91"
        d="M 1153.8,1730.8 L 1153.8 1384.6 L 1500.0 1730.8 L 1500.0 1384.6 L 1846.2 1730.8 L 1846.2 1384.6 L 1500.0 1384.6"
      />
    </svg>
  )
}
