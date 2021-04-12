import { Clone, Cred, Signature } from "nodegit";
import fs from "fs";
import { kebabCase } from "./utils/utils";

/**
 * Push the content to respective place in product docs repo
 *
 * Much of the code here is taken from https://github.com/blond/nodegit-clone/blob/master/lib/clone.js
 * @param {string} ghToken The Github PAT
 * @param {string} title The title of epic
 * @param {string} content The markdown content of the epic
 */
export async function handleGit(ghToken: string, title: string, content: string) {
  try {
    const url = "https://github.com/FieldAssist/fa_vuepress_product_docs.git";
    const localPath = "./fa_vuepress_product_docs";
    const defaultCallbacks = {
      certificateCheck: () => 1,
      credentials: () => {
        // In order to authorize the clone operation, we'll need to respond to a low-level callback
        // that expects credentials to be passed.
        // This function will respond back with the OAuth token.
        return Cred.userpassPlaintextNew(ghToken, "x-oauth-basic");
      }
    };

    const repo = await Clone.clone(url, localPath, {
      fetchOpts: {
        callbacks: defaultCallbacks,
      },
      checkoutBranch: 'main',
    });

    const mdPath = `${ localPath }/docs/src/guide/epics/${ kebabCase(title) }.md`;

    await fs.promises.writeFile(mdPath, content);

    const author = Signature.now("Ayush P Gupta", "ayushpguptaapg@gmail.com");
    const committer = Signature.now("Ayush P Gupta", "ayushpguptaapg@gmail.com");

    const index = await repo.refreshIndex();

    const files = await repo.getStatus();
    files.forEach(file => index.addByPath(file.path()));
    //await index.addByPath(mdPath);

    await index.write();

    const oid = await index.writeTree();

    const parent = await repo.getHeadCommit();

    const commitId = await repo.createCommit("HEAD", author, committer, 'Update from https://github.com/FieldAssist/fa_vuejs_azure_api_dashboard.git', oid, [parent]);

    console.log(`Committed: ${ commitId }`);

    //const remote = await Remote.create(repo, "origin", `git@github.com:FieldAssist/fa_vuepress_product_docs.git`);
    const remote = await repo.getRemote('origin');
    await remote.push(
      ["refs/heads/main:refs/heads/main"],
      {
        callbacks: defaultCallbacks,
      }
    );
    console.log('Pushed changes successfully!');
  } catch (e) {
    console.error(e);
    throw e;
  }
}


