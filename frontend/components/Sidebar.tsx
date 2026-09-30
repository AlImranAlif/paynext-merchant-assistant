'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">P</div>
        <div>
          <strong>PayNext</strong>
          <span>Merchant</span>
        </div>
      </div>

      <nav className="nav">
        <Link className={pathname === '/' ? 'nav-item active' : 'nav-item'} href="/">
          <span>▦</span> Dashboard
        </Link>
        <Link
          className={pathname.startsWith('/transactions') ? 'nav-item active' : 'nav-item'}
          href="/transactions"
        >
          <span>↔</span> Transactions
        </Link>
      </nav>

      <div className="sidebar-bottom">
        <div className="help-card">
          <span className="help-icon">?</span>
          <div>
            <strong>Need help?</strong>
            <p>Review your settlement activity.</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
