const GITHUB_REPOS_URL = 'https://api.github.com/users/p-carrillo/repos?per_page=100&type=owner';
const FETCH_TIMEOUT_MS = 8000;
const EMPTY_MESSAGE = 'No repositories available';

const REPO_SECTIONS = [
    { targetId: 'projects-list-content', prefix: 'project_' },
    { targetId: 'templates-list-content', prefix: 'template_' },
    { targetId: 'technical-tests-list-content', prefixes: ['challenge_', 'chellenge_'] }
];

const FALLBACK_REPOS = [
    { name: 'project_trillo', html_url: 'https://github.com/p-carrillo/project_trillo', pushed_at: '2026-02-24T20:35:24Z', fork: false, archived: false },
    { name: 'project_client-tools', html_url: 'https://github.com/p-carrillo/project_client-tools', pushed_at: '2026-02-16T19:31:33Z', fork: false, archived: false },
    { name: 'project_silicon-traveler', html_url: 'https://github.com/p-carrillo/project_silicon-traveler', pushed_at: '2026-02-16T12:15:14Z', fork: false, archived: false },
    { name: 'project_llot', html_url: 'https://github.com/p-carrillo/project_llot', pushed_at: '2026-02-14T18:49:26Z', fork: false, archived: false },
    { name: 'project_diteria-home', html_url: 'https://github.com/p-carrillo/project_diteria-home', pushed_at: '2026-01-21T16:13:46Z', fork: false, archived: false },
    { name: 'project_diteria-blogs', html_url: 'https://github.com/p-carrillo/project_diteria-blogs', pushed_at: '2025-06-13T16:10:35Z', fork: false, archived: false },
    { name: 'project_sergas-checker', html_url: 'https://github.com/p-carrillo/project_sergas-checker', pushed_at: '2025-06-16T10:40:50Z', fork: false, archived: false },
    { name: 'template_agentic-typescript', html_url: 'https://github.com/p-carrillo/template_agentic-typescript', pushed_at: '2026-02-16T18:58:50Z', fork: false, archived: false },
    { name: 'template_hexagonal-symfony', html_url: 'https://github.com/p-carrillo/template_hexagonal-symfony', pushed_at: '2025-06-14T11:16:24Z', fork: false, archived: false },
    { name: 'template_plain-symfony', html_url: 'https://github.com/p-carrillo/template_plain-symfony', pushed_at: '2025-06-13T14:36:54Z', fork: false, archived: false },
    { name: 'challenge_doctors-technical-test', html_url: 'https://github.com/p-carrillo/challenge_doctors-technical-test', pushed_at: '2025-06-01T00:00:00Z', fork: false, archived: false }
];

function clearStateClasses(element) {
    element.classList.remove('loading-text', 'fallback-text', 'error-text', 'empty-text');
}

function isRenderableRepo(repo) {
    return Boolean(
        repo &&
        typeof repo.name === 'string' &&
        typeof repo.html_url === 'string' &&
        !repo.fork &&
        !repo.archived
    );
}

function toHumanReadableName(repoName, prefix) {
    const withoutPrefix = repoName.slice(prefix.length);
    return withoutPrefix
        .replace(/[-_]+/g, ' ')
        .trim()
        .split(/\s+/)
        .map(function(word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
}

function sortByPushedDateDesc(a, b) {
    const aDate = Date.parse(a.pushed_at || 0);
    const bDate = Date.parse(b.pushed_at || 0);
    return bDate - aDate;
}

function getSectionPrefixes(section) {
    if (Array.isArray(section.prefixes) && section.prefixes.length > 0) {
        return section.prefixes;
    }

    if (typeof section.prefix === 'string' && section.prefix.length > 0) {
        return [section.prefix];
    }

    return [];
}

function getMatchingPrefix(repoName, section) {
    const prefixes = getSectionPrefixes(section);
    return prefixes.find(function(prefix) {
        return repoName.startsWith(prefix);
    }) || '';
}

function renderSection(section, repos, options) {
    const container = document.getElementById(section.targetId);
    if (!container) {
        return;
    }

    clearStateClasses(container);

    const sectionRepos = repos
        .filter(function(repo) {
            return getMatchingPrefix(repo.name, section) !== '';
        })
        .sort(sortByPushedDateDesc);

    if (sectionRepos.length === 0) {
        container.textContent = EMPTY_MESSAGE;
        container.classList.add('empty-text');
        return;
    }

    container.textContent = '';
    const fragment = document.createDocumentFragment();

    sectionRepos.forEach(function(repo, index) {
        if (index > 0) {
            fragment.appendChild(document.createTextNode(', '));
        }

        const link = document.createElement('a');
        link.href = repo.html_url;
        link.className = 'project-link';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = toHumanReadableName(repo.name, getMatchingPrefix(repo.name, section));
        fragment.appendChild(link);
    });

    container.appendChild(fragment);

    if (options.isFallback) {
        container.classList.add('fallback-text');
    }

    if (options.isError) {
        container.classList.add('error-text');
    }
}

function renderRepositories(repos, options) {
    REPO_SECTIONS.forEach(function(section) {
        renderSection(section, repos, options);
    });
}

async function fetchRepositories() {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(function() {
        controller.abort();
    }, FETCH_TIMEOUT_MS);

    try {
        const response = await fetch(GITHUB_REPOS_URL, {
            headers: {
                Accept: 'application/vnd.github+json'
            },
            signal: controller.signal
        });

        if (!response.ok) {
            throw new Error('GitHub API request failed with status ' + response.status);
        }

        const payload = await response.json();
        if (!Array.isArray(payload)) {
            throw new Error('GitHub API payload is not an array');
        }

        return payload.filter(isRenderableRepo);
    } finally {
        window.clearTimeout(timeoutId);
    }
}

async function loadRepositories() {
    try {
        const repositories = await fetchRepositories();
        renderRepositories(repositories, { isFallback: false });
    } catch (error) {
        console.warn('Unable to load repositories from GitHub. Rendering fallback list.', error);
        const fallbackRepositories = FALLBACK_REPOS.filter(isRenderableRepo);
        renderRepositories(fallbackRepositories, { isFallback: true, isError: true });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadRepositories();
});
