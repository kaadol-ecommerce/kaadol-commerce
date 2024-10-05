export default function SpecLogo({children, text}:{children: React.ReactNode, text: string}) {
  return (
      <div className="flex gap-2 items-center">
        {children}
        <span>{text}</span>
      </div>
  );
}
