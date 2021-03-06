/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of the GNU Affero General Public License v3.0.
 * You should have received a copy of the GNU Affero General Public License along with
 * this program. If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * This code was originally copied from Facebook at node_modules/@docusaurus/theme-classic (2.0.0-alpha.58)
 * and modified under MIT license
 *
 */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useUserPreferencesContext from '@theme/hooks/useUserPreferencesContext';
import useLockBodyScroll from '@theme/hooks/useLockBodyScroll';
import useWindowSize, { windowSizes } from '@theme/hooks/useWindowSize';
import useLogo from '@theme/hooks/useLogo';
import useScrollPosition from '@theme/hooks/useScrollPosition';
import Link from '@docusaurus/Link';
import isInternalUrl from '@docusaurus/isInternalUrl';

import styles from './styles.module.css';
import { css } from '@emotion/core';

const MOBILE_TOGGLE_SIZE = 24;

function usePrevious(value) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

// Compare the 2 paths, ignoring trailing /
const isSamePath = (path1, path2) => {
  const normalize = (str) => (str.endsWith('/') ? str : `${str}/`);
  return normalize(path1) === normalize(path2);
};

const isActiveSidebarItem = (item, activePath) => {
  if (item.type === 'link') {
    return isSamePath(item.href, activePath);
  }
  if (item.type === 'category') {
    return item.items.some((subItem) => isActiveSidebarItem(subItem, activePath));
  }
  return false;
};

function DocSidebarItemCategory({ item, onItemClick, collapsible, activePath, ...props }) {
  const { items, label } = item;

  const isActive = isActiveSidebarItem(item, activePath);
  const wasActive = usePrevious(isActive);

  // active categories are always initialized as expanded
  // the default (item.collapsed) is only used for non-active categories
  const [collapsed, setCollapsed] = useState(() => {
    if (!collapsible) {
      return false;
    }
    return isActive ? false : item.collapsed;
  });

  // If we navigate to a category, it should automatically expand itself
  useEffect(() => {
    const justBecameActive = isActive && !wasActive;
    if (justBecameActive && collapsed) {
      setCollapsed(false);
    }
  }, [isActive, wasActive, collapsed]);

  const handleItemClick = useCallback(
    (e) => {
      e.preventDefault();
      setCollapsed((state) => !state);
    },
    [setCollapsed],
  );

  if (items.length === 0) {
    return null;
  }

  return (
    <li
      className={clsx('menu__list-item', {
        'menu__list-item--collapsed': collapsed,
      })}
      key={label}
    >
      <a
        className={clsx('menu__link', {
          'menu__link--sublist': collapsible,
          'menu__link--active': collapsible && isActive,
          [styles.menuLinkText]: !collapsible,
        })}
        onClick={collapsible ? handleItemClick : undefined}
        href={collapsible ? '#!' : undefined}
        {...props}
      >
        {label}
      </a>
      <ul className="menu__list">
        {items.map((childItem) => (
          <DocSidebarItem
            tabIndex={collapsed ? '-1' : '0'}
            key={childItem.label}
            item={childItem}
            onItemClick={onItemClick}
            collapsible={collapsible}
            activePath={activePath}
          />
        ))}
      </ul>
    </li>
  );
}

function DocSidebarItemLink({
  item,
  onItemClick,
  activePath,
  collapsible: _collapsible,
  ...props
}) {
  const { href, label } = item;
  const isActive = isActiveSidebarItem(item, activePath);
  return (
    <li className="menu__list-item" key={label}>
      <Link
        className={clsx('menu__link', {
          'menu__link--active': isActive,
        })}
        to={href}
        {...(isInternalUrl(href)
          ? {
              isNavLink: true,
              exact: true,
              onClick: onItemClick,
            }
          : {
              target: '_blank',
              rel: 'noreferrer noopener',
            })}
        {...props}
      >
        {label}
      </Link>
    </li>
  );
}

function DocSidebarItem(props) {
  switch (props.item.type) {
    case 'category':
      return <DocSidebarItemCategory {...props} />;
    case 'link':
    default:
      return <DocSidebarItemLink {...props} />;
  }
}

function DocSidebar(props) {
  const [showResponsiveSidebar, setShowResponsiveSidebar] = useState(false);
  const {
    siteConfig: { themeConfig: { navbar: { title, hideOnScroll = false } = {} } } = {},
    isClient,
  } = useDocusaurusContext();
  const { logoLink, logoLinkProps, logoImageUrl, logoAlt } = useLogo();
  const { isAnnouncementBarClosed } = useUserPreferencesContext();
  const { scrollY } = useScrollPosition();

  const { docsSidebars, path, sidebar: currentSidebar, sidebarCollapsible } = props;

  useLockBodyScroll(showResponsiveSidebar);
  const windowSize = useWindowSize();

  useEffect(() => {
    if (windowSize === windowSizes.desktop) {
      setShowResponsiveSidebar(false);
    }
  }, [windowSize]);

  if (!currentSidebar) {
    return null;
  }

  const sidebarData = docsSidebars[currentSidebar];

  if (!sidebarData) {
    throw new Error(`Cannot find the sidebar "${currentSidebar}" in the sidebar config!`);
  }

  return (
    <div
      className={clsx(styles.sidebar, {
        [styles.sidebarWithHideableNavbar]: hideOnScroll,
      })}
    >
      {hideOnScroll && (
        <Link tabIndex="-1" className={styles.sidebarLogo} to={logoLink} {...logoLinkProps}>
          {logoImageUrl != null && <img key={isClient} src={logoImageUrl} alt={logoAlt} />}
          {title != null && <strong>{title}</strong>}
        </Link>
      )}
      <div
        className={clsx('menu', 'menu--responsive', styles.menu, {
          'menu--show': showResponsiveSidebar,
          [styles.menuWithAnnouncementBar]: !isAnnouncementBarClosed && scrollY === 0,
        })}
        css={css`
          @media only screen and (max-width: 1000px) {
            padding-top: 0 !important;
          }
        `}
      >
        <button
          aria-label={showResponsiveSidebar ? 'Close Menu' : 'Open Menu'}
          aria-haspopup="true"
          className="button button--secondary button--sm menu__button"
          type="button"
          onClick={() => {
            setShowResponsiveSidebar(!showResponsiveSidebar);
          }}
        >
          {showResponsiveSidebar ? (
            <span className={clsx(styles.sidebarMenuIcon, styles.sidebarMenuCloseIcon)}>
              &times;
            </span>
          ) : (
            <svg
              aria-label="Menu"
              className={styles.sidebarMenuIcon}
              xmlns="http://www.w3.org/2000/svg"
              height={MOBILE_TOGGLE_SIZE}
              width={MOBILE_TOGGLE_SIZE}
              viewBox="0 0 32 32"
              role="img"
              focusable="false"
            >
              <title>Menu</title>
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="2"
                d="M4 7h22M4 15h22M4 23h22"
              />
            </svg>
          )}
        </button>
        <ul className="menu__list">
          {sidebarData.map((item) => (
            <DocSidebarItem
              key={item.label}
              item={item}
              onItemClick={(e) => {
                e.target.blur();
                setShowResponsiveSidebar(false);
              }}
              collapsible={sidebarCollapsible}
              activePath={path}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DocSidebar;
