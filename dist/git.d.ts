/**
 * Push the content to respective place in product docs repo
 *
 * Much of the code here is taken from https://github.com/blond/nodegit-clone/blob/master/lib/clone.js
 * @param {string} ghToken The Github PAT
 * @param {string} title The title of epic
 * @param {string} content The markdown content of the epic
 * @param {string} commitMsg The commit message
 */
export declare function handleGit(ghToken: string, title: string, content: string, commitMsg: string): Promise<void>;
//# sourceMappingURL=git.d.ts.map