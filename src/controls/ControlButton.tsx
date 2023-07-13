export default function ControlButton(
    {children, onClick}:
        { children: React.ReactNode, onClick: () => void }) {
    return (
        <button onClick={onClick}>{children}</button>
    )
}