import React from 'react';
import { Parser } from '../lib/parser.js';

export function Icon({ name = 'file', size = 'm', className: customClassName }){
    const className = `icon icon-${size}${customClassName ? ' ' + customClassName : ''}`;
    const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };

    let paths;
    switch(name){
        case 'logo':
        case 'bolt':
            paths = (
                <>
                    <line x1="12" y1="12" x2="5" y2="6" {...common} strokeWidth={1.2} />
                    <line x1="12" y1="12" x2="19" y2="6" {...common} strokeWidth={1.2} />
                    <line x1="12" y1="12" x2="19" y2="18" {...common} strokeWidth={1.2} />
                    <line x1="12" y1="12" x2="5" y2="18" {...common} strokeWidth={1.2} />
                    <line x1="12" y1="12" x2="12" y2="3" {...common} strokeWidth={1.2} />
                    <circle cx="5" cy="6" r="1.8" fill="currentColor" opacity="0.7" />
                    <circle cx="19" cy="6" r="1.4" fill="currentColor" opacity="0.6" />
                    <circle cx="19" cy="18" r="1.8" fill="currentColor" opacity="0.7" />
                    <circle cx="5" cy="18" r="1.4" fill="currentColor" opacity="0.6" />
                    <circle cx="12" cy="3" r="1.2" fill="currentColor" opacity="0.5" />
                    <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity={0.15} {...common} strokeWidth={1.5} />
                    <circle cx="12" cy="12" r="1.2" fill="currentColor" />
                </>
            );
            break;
        case 'search':
            paths = (
                <>
                    <circle cx="11" cy="11" r="7" {...common} />
                    <line x1="20" y1="20" x2="16.65" y2="16.65" {...common} />
                </>
            );
            break;
        case 'folder':
            paths = <path d="M3 7.5A1.5 1.5 0 0 1 4.5 6H9l2 2h8.5A1.5 1.5 0 0 1 21 9.5v8A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5z" {...common} />;
            break;
        case 'folder-open':
            paths = (
                <>
                    <path d="M3 9.5A1.5 1.5 0 0 1 4.5 8H9l2 2h8.5A1.5 1.5 0 0 1 21 11.5V12" {...common} />
                    <path d="M4 12.5h17l-1.5 5A2 2 0 0 1 17.58 19H5.92A2 2 0 0 1 4 17.5z" {...common} />
                </>
            );
            break;
        case 'file':
            paths = (
                <>
                    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" {...common} />
                    <polyline points="14 3 14 8 19 8" {...common} />
                </>
            );
            break;
        case 'file-pdf':
            paths = (
                <>
                    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" {...common} />
                    <polyline points="14 3 14 8 19 8" {...common} />
                    <path d="M8 13h8M8 17h5" {...common} />
                </>
            );
            break;
        case 'layers':
            paths = (
                <>
                    <polygon points="12 3 3 8 12 13 21 8 12 3" {...common} />
                    <polyline points="3 12 12 17 21 12" {...common} />
                    <polyline points="3 16 12 21 21 16" {...common} />
                </>
            );
            break;
        case 'activity':
            paths = <polyline points="3 12 8 12 11 6 14 18 17 12 21 12" {...common} />;
            break;
        case 'shield':
            paths = <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6z" {...common} />;
            break;
        case 'lock':
            paths = (
                <>
                    <rect x="5" y="11" width="14" height="10" rx="2" {...common} />
                    <path d="M8 11V8a4 4 0 0 1 8 0v3" {...common} />
                </>
            );
            break;
        case 'factory':
            paths = (
                <>
                    <path d="M3 21h18" {...common} />
                    <path d="M5 21V9l5 3V9l5 3V6l4 2v13" {...common} />
                    <path d="M15 6V3h3v5" {...common} />
                </>
            );
            break;
        case 'eye':
            paths = (
                <>
                    <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z" {...common} />
                    <circle cx="12" cy="12" r="3" {...common} />
                </>
            );
            break;
        case 'hook':
            paths = <path d="M9 10V7a3 3 0 0 1 6 0v7a4 4 0 1 1-8 0v-1" {...common} />;
            break;
        case 'spark':
            paths = (
                <>
                    <path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8z" {...common} />
                    <path d="M19 15l.8 1.7L21.5 18l-1.7.8L19 20.5l-.8-1.7L16.5 18l1.7-.8z" {...common} />
                </>
            );
            break;
        case 'globe':
            paths = (
                <>
                    <circle cx="12" cy="12" r="9" {...common} />
                    <path d="M3 12h18" {...common} />
                    <path d="M12 3a15 15 0 0 1 0 18" {...common} />
                    <path d="M12 3a15 15 0 0 0 0 18" {...common} />
                </>
            );
            break;
        case 'layout':
            paths = (
                <>
                    <rect x="3" y="4" width="18" height="16" rx="2" {...common} />
                    <path d="M9 4v16" {...common} />
                    <path d="M9 10h12" {...common} />
                </>
            );
            break;
        case 'box':
            paths = (
                <>
                    <path d="M21 8.5 12 3 3 8.5 12 14z" {...common} />
                    <path d="M3 8.5V16l9 5 9-5V8.5" {...common} />
                    <path d="M12 14v7" {...common} />
                </>
            );
            break;
        case 'archive':
            paths = (
                <>
                    <rect x="3" y="3" width="18" height="5" rx="1" {...common} />
                    <path d="M5 8v11a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8" {...common} />
                    <path d="M10 12h4" {...common} />
                </>
            );
            break;
        case 'building':
            paths = (
                <>
                    <path d="M4 21h16" {...common} />
                    <path d="M7 21V8l5-5 5 5v13" {...common} />
                    <path d="M9 12h.01M12 12h.01M15 12h.01M9 16h.01M12 16h.01M15 16h.01" {...common} />
                </>
            );
            break;
        case 'route':
            paths = (
                <>
                    <circle cx="6" cy="18" r="2" {...common} />
                    <circle cx="18" cy="6" r="2" {...common} />
                    <path d="M8 18h4a4 4 0 0 0 4-4V8" {...common} />
                </>
            );
            break;
        case 'database':
            paths = (
                <>
                    <ellipse cx="12" cy="5" rx="7" ry="3" {...common} />
                    <path d="M5 5v10c0 1.7 3.1 3 7 3s7-1.3 7-3V5" {...common} />
                    <path d="M5 10c0 1.7 3.1 3 7 3s7-1.3 7-3" {...common} />
                    <path d="M5 15c0 1.7 3.1 3 7 3s7-1.3 7-3" {...common} />
                </>
            );
            break;
        case 'refresh':
            paths = (
                <>
                    <path d="M20 11a8 8 0 0 0-14.9-3" {...common} />
                    <polyline points="4 4 5 8 9 7" {...common} />
                    <path d="M4 13a8 8 0 0 0 14.9 3" {...common} />
                    <polyline points="20 20 19 16 15 17" {...common} />
                </>
            );
            break;
        case 'puzzle':
            paths = <path d="M10 4H6a2 2 0 0 0-2 2v4h2a2 2 0 1 1 0 4H4v4a2 2 0 0 0 2 2h4v-2a2 2 0 1 1 4 0v2h4a2 2 0 0 0 2-2v-4h-2a2 2 0 1 1 0-4h2V6a2 2 0 0 0-2-2h-4v2a2 2 0 1 1-4 0z" {...common} />;
            break;
        case 'radio':
            paths = (
                <>
                    <circle cx="12" cy="12" r="2" {...common} />
                    <path d="M16.24 7.76a6 6 0 0 1 0 8.48" {...common} />
                    <path d="M7.76 16.24a6 6 0 0 1 0-8.48" {...common} />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" {...common} />
                    <path d="M4.93 19.07a10 10 0 0 1 0-14.14" {...common} />
                </>
            );
            break;
        case 'link':
            paths = (
                <>
                    <path d="M10 13a5 5 0 0 1 0-7l1.5-1.5a5 5 0 0 1 7 7L17 13" {...common} />
                    <path d="M14 11a5 5 0 0 1 0 7L12.5 19.5a5 5 0 0 1-7-7L7 11" {...common} />
                </>
            );
            break;
        case 'help':
            paths = (
                <>
                    <circle cx="12" cy="12" r="10" {...common} />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" {...common} />
                    <line x1="12" y1="17" x2="12.01" y2="17" {...common} />
                </>
            );
            break;
        case 'warning':
            paths = (
                <>
                    <path d="M12 4 3 20h18L12 4z" {...common} />
                    <path d="M12 9v5" {...common} />
                    <path d="M12 17h.01" {...common} />
                </>
            );
            break;
        case 'scroll':
            paths = (
                <>
                    <path d="M7 3h10a2 2 0 0 1 2 2v12a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V5a2 2 0 0 1 2-2z" {...common} />
                    <path d="M9 8h6M9 12h6M9 16h4" {...common} />
                </>
            );
            break;
        case 'broom':
            paths = (
                <>
                    <path d="M14 4 6 12" {...common} />
                    <path d="m11 7 6 6" {...common} />
                    <path d="M3 14h7l3 7H6z" {...common} />
                </>
            );
            break;
        case 'split':
            paths = (
                <>
                    <path d="M8 4H5a2 2 0 0 0-2 2v3" {...common} />
                    <path d="M16 20h3a2 2 0 0 0 2-2v-3" {...common} />
                    <path d="M12 4v16" {...common} />
                    <path d="M9 8 12 5 15 8" {...common} />
                    <path d="M15 16 12 19 9 16" {...common} />
                </>
            );
            break;
        case 'copy':
            paths = (
                <>
                    <rect x="9" y="9" width="11" height="11" rx="2" {...common} />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" {...common} />
                </>
            );
            break;
        case 'beaker':
            paths = (
                <>
                    <path d="M10 3v5l-5 8a3 3 0 0 0 2.57 4.5h8.86A3 3 0 0 0 19 16l-5-8V3" {...common} />
                    <path d="M8 13h8" {...common} />
                </>
            );
            break;
        case 'ban':
            paths = (
                <>
                    <circle cx="12" cy="12" r="9" {...common} />
                    <path d="M5 19 19 5" {...common} />
                </>
            );
            break;
        case 'key':
            paths = (
                <>
                    <circle cx="8" cy="15" r="4" {...common} />
                    <path d="M12 15h9" {...common} />
                    <path d="M18 12v6" {...common} />
                    <path d="M21 13v4" {...common} />
                </>
            );
            break;
        case 'pull-request':
            paths = (
                <>
                    <circle cx="6" cy="5" r="2" {...common} />
                    <circle cx="18" cy="7" r="2" {...common} />
                    <circle cx="18" cy="19" r="2" {...common} />
                    <path d="M8 5h4a4 4 0 0 1 4 4v8" {...common} />
                    <path d="M16 9V7" {...common} />
                </>
            );
            break;
        case 'export':
            paths = (
                <>
                    <path d="M12 3v12" {...common} />
                    <polyline points="8 7 12 3 16 7" {...common} />
                    <path d="M5 14v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5" {...common} />
                </>
            );
            break;
        case 'share':
            paths = (
                <>
                    <circle cx="18" cy="5" r="2" {...common} />
                    <circle cx="6" cy="12" r="2" {...common} />
                    <circle cx="18" cy="19" r="2" {...common} />
                    <path d="M8 12 16 6" {...common} />
                    <path d="M8 12 16 18" {...common} />
                </>
            );
            break;
        case 'close':
            paths = (
                <>
                    <path d="M6 6l12 12" {...common} />
                    <path d="M18 6 6 18" {...common} />
                </>
            );
            break;
        case 'settings':
            paths = (
                <>
                    <circle cx="12" cy="12" r="3.2" {...common} />
                    <path d="M19.4 15a1.7 1.7 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.82-.33 1.7 1.7 0 0 0-1.02 1.53V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1.02-1.53 1.7 1.7 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.53-1.02H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.6 8.98a1.7 1.7 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 8.92 4.6 1.7 1.7 0 0 0 9.94 3.08V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1.02 1.53 1.7 1.7 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 8.98c.22.31.36.66.4 1.02H20a2 2 0 1 1 0 4h-.09c-.04.36-.18.71-.4 1.02z" {...common} />
                </>
            );
            break;
        case 'sun':
            paths = (
                <>
                    <circle cx="12" cy="12" r="4" {...common} />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" {...common} />
                </>
            );
            break;
        case 'moon':
            paths = <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" {...common} />;
            break;
        case 'graph':
            paths = (
                <>
                    <circle cx="5" cy="17" r="2" {...common} />
                    <circle cx="12" cy="7" r="2" {...common} />
                    <circle cx="19" cy="14" r="2" {...common} />
                    <path d="M6.7 15.6 10.3 8.4M13.8 8.1l3.4 4.8" {...common} />
                </>
            );
            break;
        case 'treemap':
            paths = (
                <>
                    <rect x="3" y="3" width="18" height="18" rx="2" {...common} />
                    <path d="M10 3v18M10 10h11M3 14h7" {...common} />
                </>
            );
            break;
        case 'matrix':
            paths = (
                <>
                    <rect x="4" y="4" width="16" height="16" rx="2" {...common} />
                    <path d="M4 10h16M4 14h16M10 4v16M14 4v16" {...common} />
                </>
            );
            break;
        case 'tree':
            paths = (
                <>
                    <path d="M12 3v18" {...common} />
                    <path d="M12 7 7 12M12 9l5 5M12 14l-4 5M12 16l4 5" {...common} />
                    <circle cx="12" cy="3" r="2" {...common} />
                    <circle cx="7" cy="12" r="2" {...common} />
                    <circle cx="17" cy="14" r="2" {...common} />
                    <circle cx="8" cy="19" r="2" {...common} />
                    <circle cx="16" cy="21" r="2" {...common} />
                </>
            );
            break;
        case 'flow':
            paths = (
                <>
                    <path d="M4 7h10" {...common} />
                    <polyline points="11 4 14 7 11 10" {...common} />
                    <path d="M4 17h16" {...common} />
                    <polyline points="17 14 20 17 17 20" {...common} />
                </>
            );
            break;
        case 'cluster':
            paths = (
                <>
                    <circle cx="8" cy="8" r="3" {...common} />
                    <circle cx="16" cy="8" r="3" {...common} />
                    <circle cx="12" cy="16" r="3" {...common} />
                    <path d="M10.5 10.5 11.5 13.5M13.5 13.5l1-3" {...common} />
                </>
            );
            break;
        case 'target':
            paths = (
                <>
                    <circle cx="12" cy="12" r="8" {...common} />
                    <circle cx="12" cy="12" r="4" {...common} />
                    <circle cx="12" cy="12" r="1" {...common} />
                </>
            );
            break;
        case 'impact':
            paths = (
                <>
                    <circle cx="12" cy="12" r="3" {...common} />
                    <path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M19.1 4.9l-2.8 2.8M7.7 16.3l-2.8 2.8" {...common} />
                </>
            );
            break;
        case 'users':
            paths = (
                <>
                    <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" {...common} />
                    <circle cx="9.5" cy="8" r="3" {...common} />
                    <path d="M20 21v-2a4 4 0 0 0-3-3.87" {...common} />
                    <path d="M14.5 5.2a3 3 0 0 1 0 5.6" {...common} />
                </>
            );
            break;
        case 'action':
            paths = <path d="M12 3v6M12 15v6M3 12h6M15 12h6M5.6 5.6l4.2 4.2M14.2 14.2l4.2 4.2M18.4 5.6l-4.2 4.2M9.8 14.2l-4.2 4.2" {...common} />;
            break;
        case 'image':
            paths = (
                <>
                    <rect x="3" y="5" width="18" height="14" rx="2" {...common} />
                    <circle cx="9" cy="10" r="1.5" {...common} />
                    <path d="M21 16l-5-5-5 6-2-2-6 5" {...common} />
                </>
            );
            break;
        case 'note':
            paths = (
                <>
                    <path d="M6 3h9l4 4v14H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" {...common} />
                    <path d="M15 3v4h4" {...common} />
                    <path d="M8 12h8M8 16h6" {...common} />
                </>
            );
            break;
        case 'code':
            paths = (
                <>
                    <polyline points="8 8 4 12 8 16" {...common} />
                    <polyline points="16 8 20 12 16 16" {...common} />
                    <path d="M13 6 11 18" {...common} />
                </>
            );
            break;
        case 'brush':
            paths = (
                <>
                    <path d="M18 3a3 3 0 0 1 3 3c0 4-3 6-6 9l-6-6c3-3 5-6 9-6z" {...common} />
                    <path d="M9 15c-3 0-5 2-5 5 3 0 5-2 5-5z" {...common} />
                </>
            );
            break;
        case 'chart':
            paths = (
                <>
                    <path d="M4 20V10" {...common} />
                    <path d="M10 20V4" {...common} />
                    <path d="M16 20v-6" {...common} />
                    <path d="M22 20H2" {...common} />
                </>
            );
            break;
        case 'security':
            paths = (
                <>
                    <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6z" {...common} />
                    <path d="M9 12l2 2 4-4" {...common} />
                </>
            );
            break;
        default:
            paths = (
                <>
                    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" {...common} />
                    <polyline points="14 3 14 8 19 8" {...common} />
                </>
            );
    }

    return (
        <span className={className} aria-hidden="true">
            <svg viewBox="0 0 24 24">
                {paths}
            </svg>
        </span>
    );
}

export function StatusDot({ color }){
    return <span className="status-dot" style={{ background: color || 'currentColor' }} />;
}

export function iconLabel(name, label, size, className){
    return (
        <>
            <Icon name={name} size={size || 's'} className={className} />
            {' '}
            {label}
        </>
    );
}

export function getSeverityColor(level){
    return level === 'critical' || level === 'high' ? 'var(--red)' : level === 'medium' ? 'var(--orange)' : 'var(--blue)';
}

export function getFilePreviewIconName(filename){
    if(Parser.isCSS(filename)) return 'brush';
    if(Parser.isJSON(filename)) return 'note';
    if(!Parser.isCode(filename)) return 'file';
    if(Parser.isVBA(filename)) return 'chart';
    if(Parser.isHTML(filename)) return 'globe';
    return 'code';
}

export function getAccentBlockStyle(borderColor, tint, extra){
    return Object.assign({
        background: 'var(--bg1)',
        border: 'var(--border-width) solid var(--border)',
        borderRadius: 0,
        boxShadow: 'var(--shadow-active)'
    }, extra || {});
}

export function buildAppUrl(repo, autoRun){
    const url = new URL(window.location.href);
    url.search = '';
    if(repo) url.searchParams.set('repo', repo);
    if(autoRun && repo) url.searchParams.set('run', '1');
    return url.toString();
}

export function getDialogTone(tone){
    if(tone === 'danger') return {
        color: 'var(--red)',
        borderColor: 'var(--border)',
        background: 'rgba(255,59,48,0.12)'
    };
    if(tone === 'info') return {
        color: 'var(--blue)',
        borderColor: 'var(--border)',
        background: 'rgba(0,240,255,0.12)'
    };
    return {
        color: 'var(--orange)',
        borderColor: 'var(--border)',
        background: 'rgba(255,179,0,0.12)'
    };
}

export class ErrorBoundary extends React.Component {
    constructor(props){
        super(props);
        this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error){
        return { hasError: true, error };
    }
    componentDidCatch(error, info){
        console.error('Codelyzer crashed:', error, info);
    }
    render(){
        if(this.state.hasError){
            return (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--bg0)', color: 'var(--t0)', fontFamily: 'JetBrains Mono, monospace', padding: 40, textAlign: 'center' }}>
                    <Icon name="logo" size="xxl" className="empty-icon" />
                    <h2 style={{ marginBottom: 12, color: 'var(--acc)' }}>Codelyzer ran into an issue</h2>
                    <p style={{ color: 'var(--t2)', marginBottom: 8, maxWidth: 500 }}>The codebase may be too large for your browser's available memory. Try analyzing a subfolder instead, or close other browser tabs to free memory.</p>
                    <p style={{ color: 'var(--t3)', fontSize: 11, marginBottom: 20 }}>{String(this.state.error)}</p>
                    <button onClick={() => this.setState({ hasError: false, error: null })} style={{ padding: '8px 20px', background: 'var(--acc)', color: 'var(--bg0)', border: 'var(--border-width) solid var(--border)', borderRadius: 0, boxShadow: 'var(--shadow-active)', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 800, textTransform: 'uppercase' }}>Reload</button>
                </div>
            );
        }
        return this.props.children;
    }
}
