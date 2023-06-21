import Link from "next/link";

interface ItemProps {
  close: () => void;
  icon: React.ReactNode;
  action: string | (() => void);
  text: string;
  className?: string;
}

function Item({ close, icon, action, text, className }: ItemProps) {
  return (
    <li onClick={close} className={className}>
      <ButtonOrA
        action={action}
        className="px-3 py-3 w-full text-sm font-medium flex items-center space-x-2 hover:bg-blue-100/70 focus-visible:outline-none focus-visible:bg-blue-100/70"
      >
        {icon}
        <span> {text} </span>
      </ButtonOrA>
    </li>
  );
}

function ButtonOrA({
  className,
  action,
  children,
}: {
  className: string;
  action: string | (() => void);
  children: React.ReactNode;
}) {
  return typeof action === "string" ? (
    <Link href={action} className={className}>
      {children}
    </Link>
  ) : (
    <button onClick={action} className={className}>
      {children}
    </button>
  );
}
