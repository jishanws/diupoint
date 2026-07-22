'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Container from '@/components/ui/container';
import VerificationTick from '@/components/ui/verification-tick';
import { useAuth } from '@/lib/auth/auth-context';
import { useCart } from '@/lib/cart/cart-context';
import {
  APP_ROUTES,
  createVerifyAccountHref,
} from '@/lib/routes';

interface SearchInputProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
}

function SearchInput({
  className = '',
  value,
  onChange,
  onSubmit,
}: SearchInputProps) {
  const isControlled =
    typeof value === 'string' && typeof onChange === 'function';
  const [internalValue, setInternalValue] = useState('');
  const resolvedValue = isControlled ? value : internalValue;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit?.(resolvedValue.trim());
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative w-full rounded-full border-2 border-diu-dark bg-background shadow-[3px_3px_0_rgba(26,26,46,0.85)] transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[4px_4px_0_rgba(26,26,46,0.85)] focus-within:-translate-y-[1px] focus-within:shadow-[4px_4px_0_rgba(26,26,46,0.85)] ${className}`}
    >
      <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center sm:left-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          className="h-4 w-4 text-diu-dark"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
      <input
        type="search"
        value={resolvedValue}
        onChange={(event) => {
          if (isControlled) {
            onChange(event.target.value);
            return;
          }
          setInternalValue(event.target.value);
        }}
        placeholder="Search DIUPoint"
        className="w-full rounded-full bg-transparent py-2.5 pl-10 pr-10 text-sm font-medium text-diu-dark placeholder-diu-dark/60 outline-none sm:pl-11 sm:pr-11 sm:py-2.5"
      />
      <button
        type="submit"
        aria-label="Search marketplace"
        className="absolute inset-y-0 right-3 inline-flex items-center text-diu-dark transition-colors hover:text-diu-blue"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>
    </form>
  );
}

interface NavbarProps {
  searchQuery?: string;
  onSearchQueryChange?: (value: string) => void;
  onSearchSubmit?: (value: string) => void;
}

export default function Navbar({
  searchQuery,
  onSearchQueryChange,
  onSearchSubmit,
}: NavbarProps) {
  const router = useRouter();
  const {
    isAuthenticated,
    currentUser,
    verificationStatus,
    isLoading,
    logout,
  } = useAuth();
  const { quantityCount } = useCart();
  const [mounted, setMounted] = useState(false);
  const [openMenuForUserId, setOpenMenuForUserId] = useState<string | null>(
    null
  );
  const accountMenuRef = useRef<HTMLDivElement | null>(null);
  const isAccountMenuOpen = Boolean(
    currentUser && openMenuForUserId === currentUser.id
  );
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isAccountMenuOpen) {
      return;
    }

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      const target = event.target as Node | null;
      if (!target || !accountMenuRef.current) {
        return;
      }

      if (!accountMenuRef.current.contains(target)) {
        setOpenMenuForUserId(null);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpenMenuForUserId(null);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAccountMenuOpen]);

  const isVerified = verificationStatus === 'VERIFIED';
  const isStoreAccount = currentUser?.accountType === 'STORE';
  const accountFirstName =
    currentUser?.fullName?.trim().split(/\s+/)[0] ?? 'Account';
  const accountMenuItemClass =
    'flex h-10 items-center rounded-lg px-3 text-sm font-semibold text-diu-dark transition-colors hover:bg-diu-blue/10 hover:text-diu-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-diu-blue';

  function closeAccountMenu() {
    setOpenMenuForUserId(null);
  }

  function toggleAccountMenu() {
    if (!currentUser) {
      return;
    }

    setOpenMenuForUserId((previous) =>
      previous === currentUser.id ? null : currentUser.id
    );
  }

  function handleLogout() {
    closeAccountMenu();
    logout();
  }

  function handleSearchSubmit(value: string) {
    if (onSearchSubmit) {
      onSearchSubmit(value);
      return;
    }

    const query = value.trim();
    if (!query) {
      router.push(APP_ROUTES.search);
      return;
    }

    router.push(`${APP_ROUTES.search}?q=${encodeURIComponent(query)}`);
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b-2 border-diu-dark">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-3 py-3 lg:py-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link
              href={APP_ROUTES.home}
              className="flex shrink-0 items-center"
            >
              <span className="font-display font-semibold text-[clamp(22px,4vw,28px)] text-diu-dark leading-none tracking-wide">
                DIU Point
              </span>
            </Link>
          </div>

          {/* Search — center column on desktop only */}
          <SearchInput
            className="hidden flex-1 sm:block max-w-sm mx-auto"
            value={searchQuery}
            onChange={onSearchQueryChange}
            onSubmit={handleSearchSubmit}
          />

          {/* Action group */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3 flex-wrap">
            {/* Verified students only tag */}
            {(!isLoading && isAuthenticated && isVerified) ? (
              <span className="hidden lg:inline-block bg-diu-green text-white font-semibold text-xs px-3 py-1.5 rounded-full border-[2px] border-diu-dark whitespace-nowrap">
                Verified students only ✓
              </span>
            ) : null}

            {/* Post Item */}
            <Link
              href={APP_ROUTES.postItem}
              className="bg-diu-orange text-white border-2 border-diu-dark rounded-full px-4 py-2 font-bold text-[13px] sm:text-[14px] cursor-pointer whitespace-nowrap transition-transform hover:-translate-y-[1px] active:translate-y-0"
            >
              + Post
            </Link>

            {/* Sign In / Account */}
            {!isLoading && isAuthenticated ? (
              <div
                ref={accountMenuRef}
                className="relative"
              >
                <button
                  type="button"
                  onClick={toggleAccountMenu}
                  aria-haspopup="menu"
                  aria-expanded={isAccountMenuOpen}
                  aria-controls="account-menu"
                  className="flex h-[38px] items-center gap-2 rounded-[10px] border-[2px] border-diu-dark bg-white px-2 sm:px-3 text-sm font-bold text-diu-dark hover:bg-gray-50 focus:outline-none transition-transform hover:-translate-y-[1px]"
                >
                  <span className="hidden sm:block truncate max-w-[6rem]">{accountFirstName}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a7.5 7.5 0 0 1 15 0"
                    />
                  </svg>
                </button>

                {isAccountMenuOpen ? (
                  <div
                    id="account-menu"
                    role="menu"
                    aria-label="Account menu"
                    className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-[min(90vw,20rem)] sm:w-64 overflow-hidden rounded-[16px] border-2 border-diu-dark bg-white p-3 shadow-[4px_4px_0_rgba(26,26,46,0.85)]"
                  >
                    <div className="mb-2 rounded-xl border-[2px] border-diu-dark bg-[#F7F4EC] px-3.5 py-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-diu-dark">
                            {currentUser?.fullName ?? 'Account'}
                          </p>
                          <p
                            className="truncate text-xs font-semibold text-diu-dark/70"
                            title={currentUser?.email}
                          >
                            {currentUser?.email}
                          </p>
                        </div>
                        {isVerified ? (
                          <VerificationTick className="shrink-0" />
                        ) : (
                          <span className="shrink-0 rounded-full border-[2px] border-diu-dark bg-diu-yellow px-2 py-0.5 text-[11px] font-bold text-diu-dark">
                            Unverified
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <Link
                        href={APP_ROUTES.myListings}
                        role="menuitem"
                        onClick={closeAccountMenu}
                        className={accountMenuItemClass}
                      >
                        My Listings
                      </Link>

                      {isStoreAccount ? (
                        <Link
                          href={APP_ROUTES.storeDashboard}
                          role="menuitem"
                          onClick={closeAccountMenu}
                          className={accountMenuItemClass}
                        >
                          Store Dashboard
                        </Link>
                      ) : null}

                      <Link
                        href={APP_ROUTES.cart}
                        role="menuitem"
                        onClick={closeAccountMenu}
                        className={`${accountMenuItemClass} justify-between`}
                      >
                        <span>Cart</span>
                        {quantityCount > 0 ? (
                          <span className="inline-flex items-center justify-center rounded-full border-[2px] border-diu-dark bg-diu-yellow px-2 py-0.5 text-[11px] font-bold leading-none text-diu-dark">
                            {quantityCount}
                          </span>
                        ) : null}
                      </Link>

                      <Link
                        href={APP_ROUTES.orders}
                        role="menuitem"
                        onClick={closeAccountMenu}
                        className={accountMenuItemClass}
                      >
                        Orders
                      </Link>

                      <Link
                        href={APP_ROUTES.favorites}
                        role="menuitem"
                        onClick={closeAccountMenu}
                        className={accountMenuItemClass}
                      >
                        Saved Items
                      </Link>

                      {!isVerified ? (
                        <Link
                          href={createVerifyAccountHref(APP_ROUTES.home)}
                          role="menuitem"
                          onClick={closeAccountMenu}
                          className={accountMenuItemClass}
                        >
                          Verify Account
                        </Link>
                      ) : null}
                    </div>

                    <div className="my-2 border-t-[2px] border-diu-dark/10" />

                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleLogout}
                      className="flex h-10 w-full items-center rounded-lg px-3 text-left text-sm font-bold text-diu-orange transition-colors hover:bg-diu-orange/10 focus:outline-none"
                    >
                      Log out
                    </button>
                  </div>
                ) : null}
              </div>
            ) : (
              <Link
                href={APP_ROUTES.signIn}
                className="flex h-[38px] items-center rounded-[10px] border-[2px] border-diu-dark bg-white px-3 text-[13px] sm:text-[14px] font-bold text-diu-dark transition-transform hover:-translate-y-[1px]"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* Search row — mobile only */}
        <div className="px-0.5 pb-3 sm:hidden mt-1">
          <SearchInput
            value={searchQuery}
            onChange={onSearchQueryChange}
            onSubmit={handleSearchSubmit}
          />
        </div>
      </Container>
    </header>
  );
}
