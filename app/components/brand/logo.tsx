import LogoImage from '~/assets/logo.svg';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <svg className="h-full w-full fill-current">
        <use href={`${LogoImage}#logo`} />
      </svg>
    </div>
  );
}
