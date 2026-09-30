export default function Header() {
  return (
    <header className="header">
      <div>
        <p className="eyebrow">Merchant workspace</p>
        <h1>Payment overview</h1>
      </div>

      <div className="merchant-profile">
        <div className="avatar">AM</div>
        <div>
          <strong>Alif Merchant</strong>
          <span>Demo Store</span>
        </div>
        <span className="chevron">⌄</span>
      </div>
    </header>
  );
}
