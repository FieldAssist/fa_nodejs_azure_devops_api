import { genSprintNotes } from "../event";
import fs from "fs";
import { kebabCase } from "../utils/utils";

async function runApp() {
  try {
    const org = 'flick2know';
    const token = '--';

    const startNumber = 100;
    const endNumber = 117;

    const sprintIterationPaths: string[] = []
    for (let i = startNumber; i <= endNumber; i++) {
      sprintIterationPaths.push(`Field_Assist\\Release 11\\Sprint ${i}`)
    }

    for (const sprintPath of sprintIterationPaths) {
      const sprintName = sprintPath.split('\\')[2]
      const sprintFileName = `${kebabCase(sprintName)}.md`
      console.log(sprintName)
      let orgUrl = `https://dev.azure.com/${org}`;
      const content = await genSprintNotes(orgUrl, token, [sprintPath], sprintName);
      await fs.promises.writeFile(`../fa_vuepress_product_docs/docs/src/guide/sprints/${sprintFileName}`, content);
    }
    //res.send(content);
  } catch (e) {
    console.error(e);
    //res.status(500).send(e?.toString());
  }
}

runApp();
